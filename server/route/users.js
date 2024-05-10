import express from "express"
import User from "../models/User.js"

const router = express.Router()

// Get all users
router.get("/users", async (req, res) => {
    try {
        // Fetch all users from MongoDB
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).send({
            message: "Failed to fetch users",
            error: error.message,
        })
    }
})

router.post("/users", async (req, res) => {
    try {
        console.log(req.body)
        const { name, age, email } = req.body

        // Create a new user instance
        const user = new User({
            name,
            age,
            email,
        })

        // Save user to MongoDB
        await user.save()

        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({
            message: "Failed to create user",
            error: error.message,
        })
    }
})

// DELETE endpoint to delete a user by ID
router.delete("/users", async (req, res) => {
    try {
        console.log(req.body)
        const { _id } = req.body
        // Check if user exists
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        // Delete user from database
        await User.findByIdAndDelete(_id)

        res.json({ message: "User deleted successfully" })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Server error" })
    }
})

export default router
