import cors from "cors"
import bodyParser from "body-parser"
import express from "express"

import connectDB from "./db.js"
import uploadRouter from "./route/upload.js"
import usersRouter from "./route/users.js"
import postsRouter from "./route/posts.js"
import authRouter, { isAuthenticated } from "./route/auth.js"

connectDB()

// Create an Express application
const app = express()
const PORT = 3000

app.use(cors())
app.use(bodyParser.json())

app.use(uploadRouter)
app.use(usersRouter)
app.use(postsRouter)
app.use(authRouter)

// request hello
app.get("/hello", async (req, res) => {
    try {
        res.send("hello from seb's server!")
        console.log("sent hello from server!")
    } catch (err) {
        console.log(err)
    }
})

// Start the server
const port = process.env.PORT || PORT // Use the PORT environment variable if available, otherwise use port 3000
app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`)
})
