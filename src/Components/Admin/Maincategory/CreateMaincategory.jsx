import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Sidebar from '../Sidebar'

import formValidations from "../../Validations/formValidations"
import { addMaincategory, getMaincategory } from "../../../Store/ActionCreators/MaincategoryActionCreators"
export default function CreateMaincategory() {
  let [data, setData] = useState({
    name: ""
  })
  let [errorMessage, setErrorMessage] = useState({
    name: "Name Field is Mendatory"
  })
  let [show, setShow] = useState(false)
  let navigate = useNavigate()

  let MaincategoryStateData = useSelector((state) => state.MaincategoryStateData)
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
  function postData(e) {
    e.preventDefault()
    if (Object.values(errorMessage).find((x) => x && x.length !== 0)) {
      setShow(true)
    }
    else {
      let item = MaincategoryStateData.find((x) => x.name === data.name)
      if (item) {
        setShow(true)
        setErrorMessage((old) => {
          return {
            ...old,
            'name': "Already Exist"
          }
        })
      }
      else {
        dispatch(addMaincategory({ name: data.name }))
        navigate("/admin/maincategory")
      }
    }
  }
  function getAPIData() {
    dispatch(getMaincategory())
  }
  useEffect(() => {
    getAPIData()
  }, [MaincategoryStateData.length])
  return (
    <section id="company-services" className="padding-large">
      <div className='container-fluid my-2'>
        <div className="row">
          <div className="col-md-3"><Sidebar /></div>
          <div className="col-md-9">
            <h5 className='bg-primary p-2 text-center'>Create Maincategory <button onClick={() => window.history.back()} className='btn btn-secondary text-light'>Back</button></h5>
            <div className="mb-3">
              <form onSubmit={postData}>
                <div className="mb-3">
                  <label>Name<span className='text-danger'>*</span></label>
                  <input type="text" name="name" onChange={getInputData} placeholder='Maincategory Name' className='form-control' />
                  {show ? <p className='text-danger text-capitalize py-2'>{errorMessage.name}</p> : ""}
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
