import express from "express"
import Post from "../models/Post.js"

const router = express.Router()

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

export default router
