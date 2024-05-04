import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Editor } from "react-draft-wysiwyg"
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import Sidebar from '../Sidebar'

import formValidations from "../../Validations/formValidations"
import { updateProduct, getProduct } from "../../../Store/ActionCreators/ProductActionCreators"
import { getMaincategory } from "../../../Store/ActionCreators/MaincategoryActionCreators"
import { getSubcategory } from "../../../Store/ActionCreators/SubcategoryActionCreators"
import { getBrand } from "../../../Store/ActionCreators/BrandActionCreators"
import imageValidations from '../../Validations/imageValidations'
export default function UpdateProduct() {
  let { id } = useParams()
  let [maincategory, setMaincategory] = useState([])
  let [subcategory, setSubcategory] = useState([])
  let [brand, setBrand] = useState([])
  let [description, setDescription] = useState(EditorState.createEmpty())
  let [data, setData] = useState({
    name: "",
    maincategory: "",
    subcategory: "",
    brand: "",
    color: "",
    size: "",
    baseprice: "",
    discount: "",
    finalprice: "",
    stock: "In Stock",
    pic: []
  })
  let [errorMessage, setErrorMessage] = useState({
    name: "",
    color: "",
    size: "",
    baseprice: "",
    discount: "",
    pic: "",
  })
  let [show, setShow] = useState(false)
  let navigate = useNavigate()

  let MaincategoryStateData = useSelector((state) => state.MaincategoryStateData)
  let ProductStateData = useSelector((state) => state.ProductStateData)
  let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData)
  let BrandStateData = useSelector((state) => state.BrandStateData)
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
        'pic': Array.from(files).map((x) => x.name)
      }
    })
  }
  function postData(e) {
    e.preventDefault()
    if (Object.values(errorMessage).find((x) => x && x.length !== 0)) {
      setShow(true)
    }
    else {
      let baseprice = parseInt(data.baseprice)
      let discount = parseInt(data.discount)
      let finalprice = parseInt(baseprice - baseprice * discount / 100)
      let item = {
        id: id,
        name: data.name,
        maincategory: data.maincategory,
        subcategory: data.subcategory,
        brand: data.brand,
        color: data.color,
        size: data.size,
        baseprice: baseprice,
        discount: discount,
        finalprice: finalprice,
        stock: data.stock,
        description: draftToHtml(convertToRaw(description.getCurrentContent())),
        pic: data.pic
      }
      dispatch(updateProduct({ ...item }))
      navigate("/admin/product")
    }
  }
  function getAPIData() {
    dispatch(getProduct())
    dispatch(getMaincategory())
    if (MaincategoryStateData.length) {
      setMaincategory(MaincategoryStateData)
    }
    dispatch(getSubcategory())
    if (SubcategoryStateData.length) {
      setSubcategory(SubcategoryStateData)
    }
    dispatch(getBrand())
    if (BrandStateData.length) {
      setBrand(BrandStateData)
    }
    if (ProductStateData.length) {
      var item = ProductStateData.find((x) => x.id === id)
      if (item) {
        setData({ ...item })
        if (item.description) {
          const contentBlock = htmlToDraft(item.description)
          if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
            const editorState = EditorState.createWithContent(contentState)
            setDescription(editorState)
          }
        }
      }
    }
  }
  useEffect(() => {
    getAPIData()
  }, [ProductStateData.length, MaincategoryStateData.length, SubcategoryStateData.length, BrandStateData.length])
  return (
    <section id="company-services" className="padding-large">
      <div className='container-fluid my-2'>
        <div className="row">
          <div className="col-md-3"><Sidebar /></div>
          <div className="col-md-9">
            <h5 className='bg-primary p-2 text-center'>Update Product <button onClick={() => window.history.back()} className='btn btn-secondary text-light'>Back</button></h5>
            <div className="mb-3">
              <form onSubmit={postData}>
                <div className="mb-3">
                  <label>Name<span className='text-danger'>*</span></label>
                  <input type="text" name="name" onChange={getInputData} placeholder='Product Name' value={data.name} className='form-control mt-1' />
                  {show ? <p className='text-danger text-capitalize py-2'>{errorMessage.name}</p> : ""}
                </div>
                <div className="row">
                  <div className="col-lg-3 col-md-6 mb-3">
                    <label>Maincategory<span className='text-danger'>*</span></label>
                    <select name="maincategory" value={data.maincategory} onChange={getInputData} className='form-select'>
                      {
                        maincategory.map((item, index) => {
                          return <option key={index}>{item.name}</option>
                        })
                      }
                    </select>
                  </div>
                  <div className="col-lg-3 col-md-6 mb-3">
                    <label>Subcategory<span className='text-danger'>*</span></label>
                    <select name="subcategory" value={data.subcategory} onChange={getInputData} className='form-select'>
                      {
                        subcategory.map((item, index) => {
                          return <option key={index}>{item.name}</option>
                        })
                      }
                    </select>
                  </div>
                  <div className="col-lg-3 col-md-6 mb-3">
                    <label>Brand<span className='text-danger'>*</span></label>
                    <select name="brand" value={data.brand} onChange={getInputData} className='form-select'>
                      {
                        brand.map((item, index) => {
                          return <option key={index}>{item.name}</option>
                        })
                      }
                    </select>
                  </div>
                  <div className="col-lg-3 col-md-6 mb-3">
                    <label>Stock<span className='text-danger'>*</span></label>
                    <select name="stock" value={data.stock} onChange={getInputData} className='form-select'>
                      <option>In Stock</option>
                      <option>Out Of Stock</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Color<span className='text-danger'>*</span></label>
                    <input type="text" name="color" value={data.color} onChange={getInputData} placeholder='Product Color' className='form-control mt-1' />
                    {show ? <p className='text-danger text-capitalize py-2'>{errorMessage.color}</p> : ""}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Size<span className='text-danger'>*</span></label>
                    <input type="text" name="size" value={data.size} onChange={getInputData} placeholder='Product Size' className='form-control mt-1' />
                    {show ? <p className='text-danger text-capitalize py-2'>{errorMessage.size}</p> : ""}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Base Price<span className='text-danger'>*</span></label>
                    <input type="number" name="baseprice" value={data.baseprice} onChange={getInputData} placeholder='Product Base Price' className='form-control mt-1' />
                    {show ? <p className='text-danger text-capitalize py-2'>{errorMessage.baseprice}</p> : ""}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Discount<span className='text-danger'>*</span></label>
                    <input type="number" name="discount" value={data.discount} onChange={getInputData} placeholder='Discount on Product' className='form-control mt-1' />
                    {show ? <p className='text-danger text-capitalize py-2'>{errorMessage.discount}</p> : ""}
                  </div>
                </div>
                <div className="mb-3 border">
                  <label>Description</label>
                  <Editor
                    editorState={description}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={(editorState) => setDescription(editorState)}
                  />
                </div>
                <div className="mb-3">
                  <label>Product Pics</label>
                  <input type="file" name="pic" onChange={getInputFile} multiple className='form-control' />
                </div>
                <div className="mb-3">
                  <button type="submit" className='btn btn-primary w-100'>Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
