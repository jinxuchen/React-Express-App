const express = require("express")
const multer = require("multer")
const Image = require("../models/Image") // Import Image model

const router = express.Router()
const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    // Check if the file is an image
    if (file.mimetype.startsWith("image/")) {
        cb(null, true) // Accept the file
    } else {
        cb(new Error("Only image files are allowed"), false) // Reject the file
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter })

//convert fileBuffer to URI
const fileBufferToURI = ({ mimetype, fileBuffer }) => {
    return `data:${mimetype};base64,${fileBuffer.toString("base64")}`
}

//multer middleware process multipart/form-data -> req.file
router.post("/upload", upload.single("file"), async (req, res) => {
    if (!req.file) {
        return res
            .status(400)
            .json({ message: "post /upload: No file uploaded" })
    }

    const newImage = new Image({
        fileName: req.file.originalname,
        fileBuffer: req.file.buffer,
        mimetype: req.file.mimetype,
    })

    try {
        // Save the image to MongoDB
        await newImage.save()

        res.status(200).json({
            message: "File received and saved to db successfully",
            fileName: req.file.originalname,
            size: req.file.size,
            mimetype: req.file.mimetype,
        })
    } catch (error) {
        console.error("Error saving image to MongoDB:", error.message)
        res.status(500).json({ message: "Failed to save image" })
    }
})

router.get("/upload-one", async (req, res) => {
    try {
        const image = await Image.findOne()
        if (!image === 0) {
            return res
                .status(404)
                .json({ message: "No image-one found in database" })
        }
        const imageDataURI = fileBufferToURI({
            mimetype: image.mimetype,
            fileBuffer: image.fileBuffer,
        })
        // Map the images to extract filename, mimetype, and fileBuffer
        const imageDetail = {
            fileName: image.fileName,
            mimetype: image.mimetype,
            imageDataURI: imageDataURI,
        }
        res.setHeader("Content-Type", "application/json")
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=${image.fileName}`
        )
        res.status(200).json(imageDetail) // Send the image details as a JSON array
    } catch (error) {
        console.error("Error fetching image from MongoDB:", error.message)
        res.status(500).json({ message: "Failed to fetch image" })
    }
})

router.get("/upload", async (req, res) => {
    try {
        const images = await Image.find().sort({ _id: -1 })

        if (!images || images.length === 0) {
            return res
                .status(404)
                .json({ message: "No images found in database" })
        }

        // Map the images to extract filename, mimetype, and fileBuffer
        const imageDetails = images.map((image) => ({
            fileName: image.fileName,
            mimetype: image.mimetype,
            imageDataURI: fileBufferToURI({
                mimetype: image.mimetype,
                fileBuffer: image.fileBuffer,
            }), // Convert buffer to base64 string
        }))

        res.setHeader("Content-Type", "application/json")
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=${images[0].fileName}`
        )
        res.status(200).json(imageDetails) // Send the image details as a JSON array
    } catch (error) {
        console.error("Error fetching image from MongoDB:", error.message)
        res.status(500).json({ message: "Failed to fetch image" })
    }
})

// Export the router
module.exports = router
