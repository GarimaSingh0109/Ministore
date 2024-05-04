import React, { useState } from 'react'

import formValidations from "./Validations/formValidations"
import { Link, useNavigate } from 'react-router-dom'
export default function Login() {
    let [show, setShow] = useState(false)
    let [errorMessage, setErrorMessage] = useState({
        username: "User Name field is mendatory",
        password: "Password field is mendatory",
    })
    let [data, setData] = useState({
        username: "",
        password: ""
    })
    let navigate = useNavigate()
    function getInputData(e) {
        let { name, value } = e.target
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: formValidations(e)
            }
        })
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    async function postData(e) {
        e.preventDefault()
        if (Object.values(errorMessage).find((x) => x && x.length !== 0)) {
            setShow(true)
        }
        else {
            let response = await fetch("/user", {
                method: "get",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            let item = response.find((x) => (x.username === data.username || x.email === data.username) && x.password === data.password)
            if (item) {
                localStorage.setItem("login", true)
                localStorage.setItem("name", item.name)
                localStorage.setItem("userid", item.id)
                localStorage.setItem("role", item.role)
                if (item.role === "Admin")
                    navigate("/admin")
                else
                    navigate("/profile")
            }
            else {
                setShow(true)
                setErrorMessage((old) => {
                    return {
                        ...old,
                        'username': "Invalid Credentials",
                    }
                })
            }
        }
    }
    return (
        <>
            <div className='container-fluid my-5'>
                <div style={{ height: 50 }}></div>
                <div className='row'>
                    <div className="col-md-6 col-sm-8 col-10 m-auto">
                        <h5 className='bg-primary text-light text-center p-2'><strong>Login</strong> To Your Account</h5>
                        <form onSubmit={postData}>
                            <div className="mb-3">
                                <label>User Name</label>
                                <input type="text" name="username" onChange={getInputData} className='form-control' placeholder='User Name or Email Address' />
                                {show ? <p className='text-capitalize px-2'>{errorMessage.username}</p> : ""}
                            </div>
                            <div className="mb-3">
                                <label>Password</label>
                                <input type="password" name="password" onChange={getInputData} className='form-control' placeholder='Password' />
                                {show ? <p className='text-capitalize px-2'>{errorMessage.password}</p> : ""}
                            </div>
                            <div className="mb-3">
                                <button type="submit" className='btn btn-primary text-light w-100'>Submit</button>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <Link to="#">Forget Password</Link>
                                <Link to="/signup">Don't Have an Account?Signup</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
