const express = require("express")
const firebase = require("firebase-admin")

// Initialize Firebase Admin SDK
const serviceAccount = require("../seb-firebase-firebase-adminsdk-j6s7v-54d8cb3f7b.json") // Replace with your service account key path

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
})

const isAuthenticated = async (req, res, next) => {
    //get bearer token
    const token = req.headers.authorization?.split("Bearer ")[1]
    try {
        const decodedToken = await firebase.auth().verifyIdToken(token)
        res.decodedToken = decodedToken
        console.log(decodedToken)
        next()
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" })
    }
}

const router = express.Router()

// Protected Route
router.get("/protected-route", isAuthenticated, (req, res) => {
    res.json({
        message: "log in success!",
        decodedToken: res.decodedToken,
    })
})

module.exports = router
