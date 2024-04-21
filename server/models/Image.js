const mongoose = require("mongoose")

const imageSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    fileBuffer: {
        type: Buffer,
        required: true,
    },
    mimetype: {
        type: String,
        required: true,
    },
})

const Image = mongoose.model("Image", imageSchema)

module.exports = Image
