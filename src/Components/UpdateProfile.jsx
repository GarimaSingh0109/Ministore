import React, { useEffect, useState } from 'react'

import formValidations from "./Validations/formValidations"
import { useNavigate } from 'react-router-dom'
export default function UpdateProfile() {
    let [show, setShow] = useState(false)
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        phone: ""
    })
    let [data, setData] = useState({
        name: "",
        phone: "",
        address: "",
        pin: "",
        city:"",
        state:"",
        pic:""
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
    function getInputFile(e) {
        let { name, files } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: files[0].name
            }
        })
    }
    async function postData(e) {
        e.preventDefault()
        if (Object.values(errorMessage).find((x) => x && x.length !== 0)) {
            setShow(true)
        }
        else {
            let response = await fetch("/user/"+localStorage.getItem("userid"), {
                method: "put",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({...data})
            })
            response = await response.json()
            if(data.role==="Buyer")
            navigate("/profile")
            else
            navigate("/admin")
        }
    }
    async function getAPIData() {
        let response = await fetch("/user/" + localStorage.getItem("userid"), {
            method: "get",
            headers: {
                "content-type": "application-json"
            }
        })
        response = await response.json()
        if (response) {
            setData((old) => {
                return {
                    ...old,
                    ...response
                }
            })
        }
        else {
            navigate("/login")
        }
    }
    useEffect(() => {
        getAPIData()
    }, [])
    return (
        <>
            <div className='container-fluid my-5'>
                <div style={{ height: 50 }}></div>
                <div className='row'>
                    <div className="col-md-8 col-sm-10 col-12 m-auto">
                        <h5 className='bg-primary text-light text-center p-2'><strong>Update</strong> your Profile</h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" value={data.name} onChange={getInputData} className='form-control' placeholder='Full Name' />
                                    {show ? <p className='text-capitalize px-2'>{errorMessage.name}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Phone</label>
                                    <input type="text" name="phone" value={data.phone} onChange={getInputData} className='form-control' placeholder='Phone Number' />
                                    {show ? <p className='text-capitalize px-2'>{errorMessage.phone}</p> : ""}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label>Address</label>
                                <textarea name="address" value={data.address} onChange={getInputData} rows="3" className='form-control' placeholder='Address...'></textarea>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>City</label>
                                    <input type="text" name="city" value={data.city} onChange={getInputData} placeholder='City Name' className='form-control' />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>State</label>
                                    <input type="text" name="state" value={data.state} onChange={getInputData} placeholder='State Name' className='form-control' />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Pin</label>
                                    <input type="text" name="pin" value={data.pin} onChange={getInputData} placeholder='PIN Code' className='form-control' />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Pic</label>
                                    <input type="file" name="pic" onChange={getInputFile} className='form-control' />
                                </div>
                            </div>
                            <div className="mb-3">
                                <button type="submit" className='btn btn-primary text-light w-100'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
