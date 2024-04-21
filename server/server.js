// Import the Express module
const express = require("express")
const axios = require("axios")
const cors = require("cors")
const bodyParser = require("body-parser")
const connectDB = require("./db")

const uploadRouter = require("./route/upload")
const usersRouter = require("./route/users")
const postsRouter = require("./route/posts")
// const multer = require("multer")

connectDB()

// Create an Express application
const app = express()
const PORT = 3000

app.use(cors())
app.use(bodyParser.json())

app.use(uploadRouter)
app.use(usersRouter)
app.use(postsRouter)

// request hello
app.get("/hello", async (req, res) => {
    try {
        res.send("hello from subtree-server!")
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
