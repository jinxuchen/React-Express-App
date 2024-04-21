const express = require("express")
const router = express.Router()
const multer = require("multer")

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

let fileBuffer = null
let fileName = null
let mimetype = null

//multer middleware process multipart/form-data -> req.file
router.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res
            .status(400)
            .json({ message: "post /upload: No file uploaded" })
    }

    console.log({
        message: "File received successfully",
        filename: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
    })

    // Store the uploaded file buffer
    fileBuffer = req.file.buffer
    fileName = req.file.originalname
    mimetype = req.file.mimetype

    res.status(200).json({
        message: "File received successfully",
        fileName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
    })
})

router.get("/upload", (req, res) => {
    if (!fileBuffer) {
        return res
            .status(404)
            .json({ message: " get /upload: No file uploaded" })
    }

    res.setHeader("Content-Type", "application/json")
    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`)
    res.send({
        fileBuffer,
        mimetype,
        fileName,
    })
})

// Export the router
module.exports = router
