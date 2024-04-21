import { useState } from "react"
import "../css/App.css"
import axios from "axios"

const BASE_URL = process.env.BASE_URL

const Demo = () => {
    const [inputMsg, setInputMsg] = useState("")
    const [messageFromServer, setMessageFromServer] = useState([])

    const makePostRequest = async () => {
        try {
            const res = await axios.post(BASE_URL + "/posts", {
                message: `${inputMsg}`,
            })
            console.log(res.data)
            const resMessageFromServer = await axios.get(BASE_URL + "/posts")
            console.log(resMessageFromServer)
            setMessageFromServer(resMessageFromServer.data)
        } catch (err) {
            console.log(err)
        }
    }

    const makeGetRequest = async () => {
        try {
            const res = await axios.get(BASE_URL + "/posts")
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <h1>Vite + React</h1>
            <div className='card'>
                <input
                    value={inputMsg}
                    onChange={(e) => {
                        setInputMsg(e.target.value)
                    }}
                />
                <button onClick={makeGetRequest}>
                    make get request to heroku server
                </button>
                <button onClick={makePostRequest}>make post request</button>
                <br />
                <br />
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

export default Demo
