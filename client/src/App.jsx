import { useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import axios from "axios"

import User from "./User"
import { AddNewUser, GetAllUsers } from "./api"

const BASE_URL = "http://localhost:3000"

function App() {
    const [inputMsg, setInputMsg] = useState("")
    const [messageFromServer, setMessageFromServer] = useState("")

    const makePostRequest = async () => {
        try {
            const res = await axios.post(BASE_URL + "/post", {
                message: `${inputMsg}`,
            })
            console.log(res.data)
            const resMessageFromServer = await axios.get(BASE_URL + "/post")
            console.log(resMessageFromServer)
            setMessageFromServer(resMessageFromServer.data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <User />
            <div>
                <a href='https://vitejs.dev' target='_blank'>
                    <img src={viteLogo} className='logo' alt='Vite logo' />
                </a>
                <a href='https://react.dev' target='_blank'>
                    <img
                        src={reactLogo}
                        className='logo react'
                        alt='React logo'
                    />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className='card'>
                <input
                    value={inputMsg}
                    onChange={(e) => {
                        setInputMsg(e.target.value)
                    }}
                />
                <button onClick={makePostRequest}>make post request</button>
                <button onClick={GetAllUsers}>get all users</button>
                <button onClick={AddNewUser}>add new user</button>
                <br />
                <br />
                messageFromServer is : {messageFromServer}
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p className='read-the-docs'>
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
