const express = require("express")
const router = express.Router()
const Post = require("../models/Post") // Import User model from models directory

//post request
router.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
        console.log(posts)
    } catch (err) {
        console.log(err)
    }
})

//post request
router.post("/posts", (req, res) => {
    // Extract the message from the request body
    const message = req.body.message

    // Log the message to the console
    console.log("posts: /posst" + message)
    messageFromClient = message

    // Send a response back to the client
    res.send("Received message: " + message)
})

module.exports = router
