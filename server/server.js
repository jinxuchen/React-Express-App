// Import the Express module
const express = require("express")
const axios = require("axios")
const cors = require("cors")
const bodyParser = require("body-parser")
const connectDB = require("./db")

const User = require("./models/User") // Import User model from models directory
const Post = require("./models/Post") // Import User model from models directory

connectDB()

// Create an Express application
const app = express()
const PORT = 3000

app.use(bodyParser.json())
app.use(cors())

//dummy get request
app.get("/", async (req, res) => {
    try {
        const response = await axios.get(
            "https://dummy.restapiexample.com/api/v1/employees"
        )
        console.log(response.data)
        res.json(response.data)
    } catch (err) {
        console.log(err)
    }
})

// request hello
app.get("/hello", async (req, res) => {
    try {
        res.send("hello from subtree-server!")
    } catch (err) {
        console.log(err)
    }
})

//post request
app.post("/post", (req, res) => {
    // Extract the message from the request body
    const message = req.body.message

    // Log the message to the console
    console.log("post: /post" + message)
    messageFromClient = message

    // Send a response back to the client
    res.send("Received message: " + message)
})

//post request
app.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (err) {
        console.log(err)
    }
})

app.post("/users", async (req, res) => {
    try {
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

// Get all users
app.get("/users", async (req, res) => {
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

// DELETE endpoint to delete a user by ID
app.delete("/users", async (req, res) => {
    try {
        const { _id } = req.body
        console.log(req.body)
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

// Start the server
const port = process.env.PORT || PORT // Use the PORT environment variable if available, otherwise use port 3000
app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`)
})
