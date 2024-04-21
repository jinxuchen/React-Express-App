import axios from "axios"
const BASE_URL = process.env.BASE_URL

const AddNewUser = async ({ name, age, email }) => {
    try {
        const res = await axios.post(BASE_URL + "/users", {
            name: name,
            age: age,
            email: email,
        })
        console.log(res.data)
    } catch (err) {
        console.log("err", err)
        console.log("err.response.data", err.response.data)
        alert("add new user error: " + err.response.data.error)
    }
}

const GetAllUsers = async () => {
    try {
        const res = await axios.get(BASE_URL + "/users")
        console.log(res.data)
        return res.data
    } catch (err) {
        console.log(err.error)
    }
}

const DeleteUserById = async (id) => {
    try {
        const res = await axios.delete(BASE_URL + "/users", {
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                _id: id,
            },
        })
        console.log(res.data)
    } catch (err) {
        console.log(err)
    }
}

export { AddNewUser, GetAllUsers, DeleteUserById }
