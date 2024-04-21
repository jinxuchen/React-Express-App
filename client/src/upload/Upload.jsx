import React, { useState } from "react"
import { Upload as Upload_, Button } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import axios from "axios"

import "../css/App.css"

const BASE_URL = process.env.BASE_URL

const Upload = () => {
    const [fileData, setFileData] = useState(null)

    // const res = await axios.get(BASE_URL + "/upload", {
    //     responseType: "json",
    // })
    // const data = res.data
    // setImageList(data)
    // console.log(data)

    const fileBufferToBlob = (object) => {
        const uint8Array = new Uint8Array(object.fileBuffer.data)
        return new Blob([uint8Array], {
            type: object.mimetype, // use mimetype from JSON response
        })
    }

    const getUploadedFile = async () => {
        try {
            const res = await axios.get(BASE_URL + "/upload", {
                responseType: "json",
            })
            setFileData(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const props = {
        name: "file",
        //post request here
        action: BASE_URL + "/upload",
        headers: {
            authorization: "authorization-text",
        },
        onChange({ file, fileList }) {
            if (file.status !== "uploading") {
                // console.log(file)
                // console.log(fileList)
            }
        },
    }

    return (
        <div className='Upload'>
            <h1>Upload</h1>
            <Button onClick={getUploadedFile}>get uploaded file</Button>
            <Upload_ {...props}>
                <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload_>
            {fileData &&
                fileData.length > 0 &&
                fileData.map((item) => {
                    return (
                        <>
                            <div>
                                <img
                                    className='upload-img'
                                    src={URL.createObjectURL(
                                        fileBufferToBlob(item)
                                    )}
                                    alt='Uploaded'
                                />

                                <a
                                    href={URL.createObjectURL(
                                        fileBufferToBlob(item)
                                    )}
                                    download='downloaded-file'
                                >
                                    Download File
                                </a>
                            </div>
                        </>
                    )
                })}
        </div>
    )
}

export default Upload
