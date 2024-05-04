import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link, useNavigate } from 'react-router-dom'

export default function AdminHome() {
  let [user, setUser] = useState({})
  let navigate = useNavigate()
  async function getAPIData() {
    let response = await fetch("/user/" + localStorage.getItem("userid"), {
      method: "get",
      headers: {
        "content-type": "application-json"
      }
    })
    response = await response.json()
    if (response) {
      setUser(response)
    }
    else {
      navigate("/login")
    }
  }
  useEffect(() => {
    getAPIData()
  }, [])
  return (
    <section id="company-services" className="padding-large">
      <div className='container-fluid my-2'>
        <div className="row">
          <div className="col-md-3"><Sidebar /></div>
          <div className="col-md-9">
            <h5 className='bg-primary p-2 text-center'>Admin Home</h5>
            <div className="row">
              <div className="col-md-6">
                {
                  user.pic ?
                    <img src={`/images/${user.pic}`} height={350} width="100%" /> :
                    <img src={`/images/noimage.png`} height={350} width="100%" />
                }
              </div>
              <div className="col-md-6">
                <table className='table table-bordered table-hover'>
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <td>{user.name}</td>
                    </tr>
                    <tr>
                      <th>User Name</th>
                      <td>{user.username}</td>
                    </tr>
                    <tr>
                      <th>Email Address</th>
                      <td>{user.email}</td>
                    </tr>
                    <tr>
                      <th>Phone</th>
                      <td>{user.phone}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}><Link to="/profile/update" className='btn btn-primary w-100'>Update Profile</Link></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
