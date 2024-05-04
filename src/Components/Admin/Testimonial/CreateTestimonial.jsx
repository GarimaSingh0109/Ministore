import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../Sidebar'

import formValidations from "../../Validations/formValidations"
import { addTestimonial } from "../../../Store/ActionCreators/TestimonialActionCreators"
import imageValidations from '../../Validations/imageValidations'
export default function CreateTestimonial() {
  let [data, setData] = useState({
    name: "",
    message: "",
    star: "5",
    pic: ""
  })
  let [errorMessage, setErrorMessage] = useState({
    name: "Name Field is Mendatory",
    message: "Message Field is Mendatory",
    pic: "Pic is Mendatory"
  })
  let [show, setShow] = useState(false)
  let navigate = useNavigate()

  let dispatch = useDispatch()

  function getInputData(e) {
    var { name, value } = e.target
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
    var { files } = e.target
    var error = imageValidations(e)
    if (error)
      setShow(true)
    setErrorMessage((old) => {
      return {
        ...old,
        pic: error
      }
    })
    setData((old) => {
      return {
        ...old,
        'pic': files[0].name
      }
    })
  }
  function postData(e) {
    e.preventDefault()
    if (Object.values(errorMessage).find((x) => x && x.length !== 0)) {
      setShow(true)
    }
    else {
      let item = {
        name: data.name,
        message: data.message,
        star: data.star,
        pic: data.pic,
      }
      dispatch(addTestimonial({ ...item }))
      navigate("/admin/testimonial")
    }
  }
  return (
    <section id="company-services" className="padding-large">
      <div className='container-fluid my-2'>
        <div className="row">
          <div className="col-md-3"><Sidebar /></div>
          <div className="col-md-9">
            <h5 className='bg-primary p-2 text-center'>Create Testimonial <button onClick={() => window.history.back()} className='btn btn-secondary text-light'>Back</button></h5>
            <div className="mb-3">
              <form onSubmit={postData}>
                <div className="mb-3">
                  <label>Name<span className='text-danger'>*</span></label>
                  <input type="text" name="name" onChange={getInputData} placeholder='Testimonial Name' className='form-control mt-1' />
                  {show ? <p className='text-danger text-capitalize py-2'>{errorMessage.name}</p> : ""}
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Pic<span className='text-danger'>*</span></label>
                    <input type="file" name="pic" onChange={getInputFile} className='form-control mt-1' />
                    {show ? <p className='text-danger text-capitalize py-2'>{errorMessage.pic}</p> : ""}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Star<span className='text-danger'>*</span></label>
                    <input type="number" name="star" onChange={getInputData} placeholder='Star' value={data.star} className='form-control mt-1' />
                    {show ? <p className='text-danger text-capitalize py-2'>{errorMessage.star}</p> : ""}
                  </div>
                </div>
    
                <div className="mb-3">
                  <label>Message<span className='text-danger'>*</span></label>
                  <textarea name="message" onChange={getInputData} className='form-control' rows="5" placeholder='Message...'></textarea>
                </div>
                <div className="mb-3">
                  <button type="submit" className='btn btn-primary w-100'>Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
