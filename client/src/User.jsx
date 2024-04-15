import React, { useEffect, useState } from "react"
import { AddNewUser, GetAllUsers, DeleteUserById } from "./api"

const DEFAULT_NEW_USER = {
    name: "",
    age: "",
    email: "",
}

const User = () => {
    const [newUser, setNewUser] = useState(DEFAULT_NEW_USER)
    const [userList, setUserList] = useState([])

    const handleNewUserInputChange = (e) => {
        const { name, value } = e.target
        setNewUser((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const handleAddNewUser = async () => {
        await AddNewUser(newUser)
        fetchDataAllUser()
    }

    const handleDeleteUser = async (id) => {
        console.log(id)
        await DeleteUserById(id)
        fetchDataAllUser()
    }

    //update userList?
    const fetchDataAllUser = async () => {
        try {
            const data = await GetAllUsers()
            setUserList(data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchDataAllUser()
    }, [])

    return (
        <>
            User Page
            {/* refactor: <NewUserInpu /> tto be populated   */}
            <div>
                name:{" "}
                <input
                    name='name'
                    value={newUser.name}
                    onChange={handleNewUserInputChange}
                />
                <br />
                age:{" "}
                <input
                    name='age'
                    value={newUser.age}
                    onChange={handleNewUserInputChange}
                />
                <br />
                email:{" "}
                <input
                    name='email'
                    value={newUser.email}
                    onChange={handleNewUserInputChange}
                />
                <br />
                <button onClick={handleAddNewUser}>add new user</button>
            </div>
            <>
                {userList && userList.length > 0
                    ? userList.map((item, _key) => {
                          return (
                              <ul key={_key}>
                                  <span
                                      onClick={() => handleDeleteUser(item._id)}
                                  >
                                      X
                                  </span>
                                  <li>{item._id}</li>
                                  <li>{item.name}</li>
                                  <li>{item.age}</li>
                                  <li>{item.email}</li>
                              </ul>
                          )
                      })
                    : "no users in display"}
            </>
        </>
    )
}

export default User
