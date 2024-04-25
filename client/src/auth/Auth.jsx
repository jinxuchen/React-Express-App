import React, { useState, useEffect } from "react"
import auth from "./firebase.config"
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendEmailVerification,
} from "firebase/auth"
import axios from "axios"

function Auth() {
    const [email, setEmail] = useState("admin@gmail.com")
    const [password, setPassword] = useState("qwerty")
    const [emailRegister, setEmailRegister] = useState("admin@gmail.com")
    const [passwordRegister, setPasswordRegister] = useState("qwerty")
    const [jwt, setJwt] = useState("")
    const [errMsg, setErrMsg] = useState(null)

    const handleSignIn = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )
            const user = userCredential.user

            // Get the JWT token
            const idToken = await user.getIdToken()
            console.log("signInWithEmailAndPassword success! got jwt")
            setJwt(idToken)
        } catch (error) {
            console.error("Error signing in:", error)
        }
    }
    const sendJWT = async () => {
        try {
            const res = await axios.get(
                "http://localhost:3000/protected-route",
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            )
            console.log("sendJWT success:", res.data)
        } catch (err) {
            console.log("Error:", err.response?.data || err.message)
        }
    }
    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            // Register user with email and password
            const registeredUserCredential = await createUserWithEmailAndPassword(
                auth,
                emailRegister,
                passwordRegister
            )
            console.log(
                "register new user success! - registeredUserCredential: "
            )
            console.log(registeredUserCredential)

            //send email verif
            await sendEmailVerification(registeredUserCredential.user)
            console.log("sendEmailVerification success!")
        } catch (err) {
            setErrMsg(err.message)
            console.log("Error registering user:", err.message)
        }
    }
    const sendVeriEmail = async () => {
        try {
            // Get the current user
            const user = auth.currentUser

            // Check if user is logged in
            if (user) {
                await sendEmailVerification(user)
                console.log("sendEmailVerification success!")
            } else {
                // User is not logged in
                throw new Error("User not logged in")
            }
        } catch (err) {
            setErrMsg(err.message)
            console.log("Error sending verification email:", err.message)
        }
    }

    useEffect(() => {
        console.log("auth.currentUser: ")
        console.log(auth.currentUser)
    }, [auth.currentUser])

    return (
        <div>
            <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <input
                type='email'
                placeholder='Email Register'
                value={emailRegister}
                onChange={(e) => setEmailRegister(e.target.value)}
            />
            <input
                type='password'
                placeholder='Password Register'
                value={passwordRegister}
                onChange={(e) => setPasswordRegister(e.target.value)}
            />
            <button onClick={handleSignIn}>get jwt</button>
            <button onClick={sendJWT}>send jwt to /protected-route</button>
            <button onClick={handleRegister}>register email and pw</button>
            <button onClick={sendVeriEmail}>send verification email</button>
            <>{errMsg && errMsg}</>
            <br />

            {jwt ? "got jwp!" : "no jw"}
        </div>
    )
}

export default Auth
