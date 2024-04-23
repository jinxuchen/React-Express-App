import React, { useState } from "react"
import { auth } from "./firebase"
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth"
import axios from "axios"

function Auth() {
    const [email, setEmail] = useState("admin@gmail.com")
    const [password, setPassword] = useState("qwerty")
    const [emailRegister, setEmailRegister] = useState("admin@gmail.com")
    const [passwordRegister, setPasswordRegister] = useState("qwerty")
    const [jwt, setJwt] = useState("")

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
            console.log("Response:", res.data)
        } catch (err) {
            console.log("Error:", err.response?.data || err.message)
        }
    }
    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            // Register user with email and password
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                emailRegister,
                passwordRegister
            )
            console.log("User registered:", userCredential.user)
            // Optionally: Send email verification
            // await userCredential.user.sendEmailVerification();
        } catch (err) {
            console.error("Error registering user:", err.message)
        }
    }

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

            {jwt ? "got jwp!" : "no jw"}
        </div>
    )
}

export default Auth
