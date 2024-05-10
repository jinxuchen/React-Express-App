import mongoose from "mongoose"

// Define User Schema
const postSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    title: {
        type: String,
        // required: true,
    },
    author: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        // required: true,
    },
})

// Create User Model
const Post = mongoose.model("Post", postSchema)

export default Post
