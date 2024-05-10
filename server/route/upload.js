import express from "express"
import multer from "multer"
import Image from "../models/Image.js"

const router = express.Router()
const storage = multer.memoryStorage()
import { isAuthenticated } from "./auth.js"

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
router.post(
    "/upload",
    isAuthenticated,
    upload.single("file"),
    async (req, res) => {
        console.log(req.decodedToken.uid)

        if (!req.file) {
            return res
                .status(400)
                .json({ message: "post /upload: No file uploaded" })
        }

        const newImage = new Image({
            fileName: req.file.originalname,
            fileURI: fileBufferToURI({
                mimetype: req.file.mimetype,
                fileBuffer: req.file.buffer,
            }), // Convert buffer to base64 string
            mimetype: req.file.mimetype,
            author: { id: req.decodedToken.uid, email: req.decodedToken.email },
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
    }
)
//decoded token
// {
//     iss: 'https://securetoken.google.com/seb-firebase',
//     aud: 'seb-firebase',
//     auth_time: 1714634514,
//     user_id: 'AF7yOqpX5AYGOagn8GH04v4rsBw2',
//     sub: 'AF7yOqpX5AYGOagn8GH04v4rsBw2',
//     iat: 1714634514,
//     exp: 1714638114,
//     email: 'admin@gmail.com',
//     email_verified: false,
//     firebase: { identities: { email: [Array] }, sign_in_provider: 'password' },
//     uid: 'AF7yOqpX5AYGOagn8GH04v4rsBw2'
//   }
router.post("/getUploadImage", isAuthenticated, async (req, res) => {
    try {
        const filter = req.body.filter
        console.log(filter)

        let images = []
        if (filter) {
            images = await Image.find({
                //?
                'author.id': filter
            },
            ).sort({
                _id: -1,
            })
        } else {
            images = await Image.find({}).sort({
                _id: -1,
            })
        }
        // console.log(req.decodedToken)
        if (images.length > 0) {
            const imageDetails = images.map((image) => ({
                fileName: image.fileName,
                mimetype: image.mimetype,
                imageDataURI: image.fileURI,
                id: image._id.toString(),
                author: { id: image.author, email: image.author.email },
            }))

            res.setHeader("Content-Type", "application/json")
            res.setHeader(
                "Content-Disposition",
                `attachment; filename=${images[0].fileName}`
            )
            res.status(200).json(imageDetails)
        } else {
            res.status(200).send([])
        }
        // Send the image details as a JSON array
    } catch (error) {
        console.error(
            "Error fetching image (probably)from MongoDB:",
            error.message
        )
        res.status(500).json({ message: "Failed to fetch image" })
    }
})
router.post("/deleteUploadImageOne", isAuthenticated, async (req, res) => {
    try {
        const imageToDeleteId = req.body.id
        const userId = req.decodedToken.uid

        const imageToDelete = await Image.findOne({ _id: imageToDeleteId })

        if (!imageToDelete) {
            return res.status(404).json({ message: "Image not found" });
        } if (imageToDelete.author.id !== userId) {
            return res.status(403).json({ message: "this is not your img!" });
        }

        await Image.deleteOne({ _id: imageToDeleteId });
        res.status(200).json({ message: "Image deleted successfully" });
        // Send the image details as a JSON array
    } catch (error) {
        console.error(
            "Error fetching image (probably)from MongoDB:",
            error.message
        )
        res.status(500).json({ message: "Failed to fetch image" })
    }
})

// Export the router
export default router
