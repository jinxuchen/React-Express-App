import React, { useState, useEffect } from "react"
import auth from "./firebase.config"
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth"
import axios from "axios"

const BASE_URL = process.env.BASE_URL

function Auth() {
    const [email, setEmail] = useState("admin@gmail.com")
    const [password, setPassword] = useState("qwerty")
    const [emailRegister, setEmailRegister] = useState("admin@gmail.com")
    const [passwordRegister, setPasswordRegister] = useState("qwerty")
    const [message, setMessage] = useState(null)
    const [pageRoute, setPageRoute] = useState("signIn") //signIn, signUp

    const [currentUser, setCurrentUser] = useState(null)
    const [idToken, setIdToken] = useState(null)
    const [decodedToken, setDecodedToken] = useState(null)

    const handleSignIn = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )
            const user = userCredential.user
            setCurrentUser(user)
            // Get the JWT token
            const idToken = await user.getIdToken()
            setIdToken(idToken)
            setMessage("sign in success!")
            console.log("sign in success!")
            localStorage.setItem("idToken", idToken)
        } catch (error) {
            setMessage("sign in failed: " + error.message)
            console.log("sign in error: ", error.message)
        }
    }
    const handleSignOut = async () => {
        if (currentUser) {
            try {
                await auth.signOut()
                setCurrentUser(null)
                setIdToken(null)
                console.log("sign out success!")
                setMessage("sign out success!")
            } catch (err) {
                setMessage("sign out error: " + err.message)
            }
        } else {
            setMessage("not signed in yet")
            console.log("not signed in yet")
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
            setMessage("sign up success!")
            console.log(registeredUserCredential)
        } catch (err) {
            setMessage(err.message)
            console.log("Error registering user:", err.message)
        }
    }
    const sendToProtectedRoute = async () => {
        try {
            const token = localStorage.getItem("idToken")
            const res = await axios.get(BASE_URL + "/protected-route", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log("sendToProtectedRpite success!: ")
            console.log(res.data)
            setMessage(res.data.message)
            setDecodedToken(res.data.decodedToken)
        } catch (err) {
            setMessage(err.response.data.message)
            console.dir(err)
        }
    }

    const getProtecedRoutePosts = async () => {
        try {
            const token = localStorage.getItem("idToken")
            const res = await axios.get(BASE_URL + "/protected-route/posts", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const postProtecedRoutePosts = async () => {
        try {
            const token = localStorage.getItem("idToken")
            const res = await axios.post(
                BASE_URL + "/protected-route/posts",
                { content: "hello!" }, // Empty object for the request body
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const SignUpPage = () => (
        <div className='sign-up-page'>
            <h2>Sign Up</h2>
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
            <button onClick={handleRegister}>register email and pw</button>
        </div>
    )
    const SignInPage = () => (
        <>
            <h2>Sign In</h2>
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
            <button onClick={handleSignIn}>sign in</button>
        </>
    )

    return (
        <div
            className='Auth'
            style={{
                padding: "25px",
                border: "5px solid black",
                borderRadius: "30px",
            }}
        >
            <button onClick={sendToProtectedRoute}>sendToProtectedRoute</button>
            <button onClick={postProtecedRoutePosts}>
                postProtecedRoutePosts
            </button>
            <button onClick={getProtecedRoutePosts}>
                getProtecedRoutePosts
            </button>
            <h2>message</h2>
            <>{message ? message : "none"}</>
            <br />
            <>
                <h2> current user:</h2>
                {currentUser ? currentUser.email : "none"}
            </>
            <div>
                <button
                    onClick={() => {
                        setPageRoute("signIn")
                    }}
                >
                    go to sign in
                </button>
                <button
                    onClick={() => {
                        setPageRoute("signUp")
                    }}
                >
                    go to sign up
                </button>
            </div>
            {currentUser ? (
                <div>
                    <h2> Welcome to my site! </h2>
                    <button onClick={handleSignOut}>sign out</button>
                </div>
            ) : (
                <>{pageRoute === "signIn" ? <SignInPage /> : <SignUpPage />}</>
            )}
        </div>
    )
}

export default Auth
