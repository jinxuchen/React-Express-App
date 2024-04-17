import axios from "axios"
const HEROKU_URL = "https://seb-express-server-e4b328a3635b.herokuapp.com"
const BASE_URL = "http://localhost:3000"

const AddNewUser = async ({ name, age, email }) => {
    try {
        const res = await axios.post(HEROKU_URL + "/users", {
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
        const res = await axios.get(HEROKU_URL + "/users")
        console.log(res.data)
        return res.data
    } catch (err) {
        console.log(err.error)
    }
}

const DeleteUserById = async (id) => {
    console.log({ _id: id })
    try {
        const res = await axios.delete(HEROKU_URL + "/users", {
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
