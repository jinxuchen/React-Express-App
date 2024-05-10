import mongoose from "mongoose"

// Define User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
})

// Create User Model
const User = mongoose.model("User", userSchema)

export default User
