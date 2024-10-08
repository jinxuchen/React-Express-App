// db.js

import mongoose from "mongoose"

const localURI = "mongodb://localhost:27017/express-mongo-db"
const userName = "seb"
const clusterPW = "123"
const clusterName = "Atkas"
const dbName = "test-db" //sample_mflix, test, test-db
const connectionString = `mongodb+srv://${userName}:${clusterPW}@${clusterName}.smiykpk.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=${clusterName}`

const connectDB = async () => {
    try {
        await mongoose.connect(connectionString, {})
        console.log("Successfully connected to test-db in MongoDB Atlas")

        // const posts = await Post.create([
        //     {
        //         title: "post-title-test",
        //         content: "post-content-test",
        //         author: "seb",
        //         date: "4/15/2024",
        //     },
        // ])
    } catch (error) {
        console.error("MongoDB connection failed:", error.message)
        process.exit(1) // Exit with failure
    }
}

export default connectDB
