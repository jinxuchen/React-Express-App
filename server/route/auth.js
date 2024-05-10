import express, { request } from "express"
import firebase from "firebase-admin"
import Post from "../models/Post.js"

const router = express.Router()
// todo: add to .env, deploy path whatever..
import serviceAccount from "../firebase-service-account.js"
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
})

// middleware function:
export const isAuthenticated = async (req, res, next) => {
    //get bearer token
    const token = req.headers.authorization?.split("Bearer ")[1]
    try {
        const decodedToken = await firebase.auth().verifyIdToken(token)
        req.decodedToken = decodedToken
        console.log("isAuthenticated: authenticated!")
        next()
    } catch (error) {
        res.status(401).json({ message: "Unauthorized visit to server!" })
    }
}

//apply middleware to /protected-route and all subroutes
router.use("/protected-route", isAuthenticated)
router.get("/protected-route", async (req, res) => {
    console.dir("decodedToken: ")
    console.dir(req.decodedToken)
    res.json({
        message: "welcome msg from protected-route!",
    })
})

router.get("/protected-route/posts", async (req, res) => {
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
router.post("/protected-route/posts", async (req, res) => {
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
router.get("/protected-route/s", async (req, res) => {
    res.send({ message: "s!" })
})

export default router
// export isAuthenticated
