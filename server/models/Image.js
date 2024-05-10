import mongoose from "mongoose"

//mongoose create Schema and model
const imageSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    fileURI: {
        type: String,
        required: true,
    },
    mimetype: {
        type: String,
        required: true,
    },
    author: {
        id: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
    },
})

const Image = mongoose.model("Image", imageSchema)

export default Image
