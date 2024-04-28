const express = require("express")
const firebase = require("firebase-admin")
const Post = require("../models/Post")

const router = express.Router()
// todo: add to .env, deploy path whatever..
const serviceAccount = require("../seb-firebase-firebase-adminsdk-j6s7v-54d8cb3f7b.json") // Replace with your service account key path
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
})
// async function deleteUser(uid) {
//     try {
//         await firebase.auth().deleteUser(uid)
//         console.log("User account successfully deleted:", uid)
//     } catch (error) {
//         console.error("Error deleting user account:", error)
//     }
// }

// router.get("/firebase-all-users", async (req, res) => {
//     const listUsersResult = await firebase.auth().listUsers()
//     listUsersResult.users.forEach(async (userRecord) => {
//         if (userRecord.uid !== "AF7yOqpX5AYGOagn8GH04v4rsBw2") {
//             await deleteUser(userRecord.uid)
//         }
//     })
//     res.json("success!")
// })
const isAuthenticated = async (req, res, next) => {
    //get bearer token
    const token = req.headers.authorization?.split("Bearer ")[1]
    try {
        const decodedToken = await firebase.auth().verifyIdToken(token)
        req.decodedToken = decodedToken
        console.log("authenticated!")
        next()
    } catch (error) {
        res.status(401).json({ message: "Unauthorized visit to server!" })
    }
}
// Protected Route
router.get("/protected-route", isAuthenticated, async (req, res) => {
    res.json({
        message: "welcome msg from protected-route!",
        decodedToken: req.decodedToken,
    })
})
router.post("/protected-route/posts", isAuthenticated, async (req, res) => {
    try {
        const uid = req.decodedToken.uid
        const { content } = req.body
        const post = new Post({
            content: content,
            author: uid,
        })
        await post.save()
        res.status(200).json("success!")
    } catch (err) {
        res.status(500).json({
            message: "failed to add new post",
            error: err.message,
        })
    }
})
router.get("/protected-route/posts", isAuthenticated, async (req, res) => {
    try {
        const uid = req.decodedToken.uid
        const posts = await Post.find({ author: uid })
        console.log(posts)

        res.json(posts)
    } catch (err) {
        res.status(500).json({
            message: "failed to get posts",
            error: err.message,
        })
    }
})
router.get("/protected-route/s", async (req, res) => {
    res.send({ message: "s!" })
})

module.exports = router
module.exports.isAuthenticated = isAuthenticated
