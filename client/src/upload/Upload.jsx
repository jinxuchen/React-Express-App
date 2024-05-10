import React, { useState, useEffect } from "react"
import { Upload as Upload_, Button } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import axios from "axios"

import "../css/App.css"

const BASE_URL = process.env.BASE_URL

const Upload = () => {
    const [fileData, setFileData] = useState(null)
    const [token, setToken] = useState(null)

    const getUploadedFile = async (filterType) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"))
            const token = localStorage.getItem("idToken")
            const userId = user?.uid

            const res = await axios.post(
                BASE_URL + "/getUploadImage",
                { filter: filterType === "all" ? null : userId },
                {
                    headers: { Authorization: `Bearer ${token}` },
                    responseType: "json",
                }
            )
            setFileData(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    const deleteImageOne = async (id) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"))
            const token = localStorage.getItem("idToken")
            const userId = user?.uid
            await axios.post(
                BASE_URL + "/deleteUploadImageOne",
                { id: id },
                {
                    headers: { Authorization: `Bearer ${token}` },
                    responseType: "json",
                }
            )
            await getUploadedFile("all")
        } catch (err) {
            console.log(err)
        }
    }
    const uploadProps = {
        name: "file",
        accept: "image",
        //post request here
        action: BASE_URL + "/upload",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        onChange({ file, fileList }) {
            const token = localStorage.getItem("idToken")
            setToken(token)

            if (file.status === "done") {
                // Update the files state with the updated fileList
                getUploadedFile()
            }
        },
    }

    useEffect(() => {
        getUploadedFile("all")
    }, [])

    return (
        <div className='Upload'>
            <h1>Upload</h1>
            <Button onClick={() => getUploadedFile()}>
                get imgs uploaded by me
            </Button>
            <Button onClick={() => getUploadedFile("all")}>get all imgs</Button>

            <Upload_ {...uploadProps}>
                <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload_>

            {fileData && fileData.length > 0 ? (
                <div
                    className='image-group'
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                    }}
                >
                    {fileData.map((item, _key) => {
                        return (
                            <div className='upload-img-display' key={_key}>
                                <img
                                    className='upload-img'
                                    src={item.imageDataURI}
                                    alt='Uploaded'
                                />

                                <a
                                    href={item.imageDataURI}
                                    download='downloaded-file'
                                >
                                    Download File
                                </a>
                                <br />
                                <button onClick={() => deleteImageOne(item.id)}>
                                    Delete File
                                </button>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <p>no fileData to be displayed ;)</p>
            )}
        </div>
    )
}

export default Upload
