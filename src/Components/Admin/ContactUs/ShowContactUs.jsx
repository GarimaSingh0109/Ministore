import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { deleteContactUs, getContactUs, updateContactUs } from "../../../Store/ActionCreators/ContactUsActionCreators"

import { useNavigate, useParams } from 'react-router-dom';
export default function ShowContactUs() {
  let [data, setData] = useState([])
  let {id} = useParams()

  let navigate = useNavigate()
  let dispatch = useDispatch()
  let ContactUsStateData = useSelector((state) => state.ContactUsStateData)

  function deleteItem() {
    if (window.confirm("Are You Sure to Delete this Item :  ")) {
      dispatch(deleteContactUs({ id: id }))
      navigate("/admin/contactus")
    }
  }
  function updateItem() {
      dispatch(updateContactUs({ ...data,active:false }))
      setData((old)=>{
        return{
          ...old,
          active:false
        }
      })
  }
  function getAPIData() {
    dispatch(getContactUs())
    if (ContactUsStateData.length) {
      setData(ContactUsStateData.find((x)=>x.id===id))
    }
  }
  useEffect(() => {
    getAPIData()
  }, [ContactUsStateData.length])
  return (
    <section id="company-services" className="padding-large">
      <div className='container-fluid my-2'>
        <div className="row">
          <div className="col-md-3"><Sidebar /></div>
          <div className="col-md-9">
            <h5 className='bg-primary p-2 text-center'>ContactUs</h5>
            <table className='table table-bordered'>
              <tbody>
                <tr>
                  <th>ID</th>
                  <td>{data.id}</td>
                </tr>
                <tr>
                  <th>Name</th>
                  <td>{data.name}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{data.email}</td>
                </tr>
                <tr>
                  <th>Phone</th>
                  <td>{data.phone}</td>
                </tr>
                <tr>
                  <th>Subject</th>
                  <td>{data.subect}</td>
                </tr>
                <tr>
                  <th>Message</th>
                  <td>{data.message}</td>
                </tr>
                <tr>
                  <th>Date</th>
                  <td>{new Date(data.date).toLocaleString()}</td>
                </tr>
                <tr>
                  <th>Active</th>
                  <td>{data.active?"True":"False"}</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    {data.active?
                    <button className='btn btn-primary w-100' onClick={updateItem}>Update Status to Done</button>:
                    <button className='btn btn-danger w-100' onClick={deleteItem}>Delete</button>}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
