import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getCheckout, updateCheckout } from "../../../Store/ActionCreators/CheckoutActionCreators"

import { useNavigate, useParams } from 'react-router-dom';
export default function ShowCheckout() {
  let [data, setData] = useState([])
  let [user, setUser] = useState({})
  let [orderstatus, setOrderstatus] = useState("")
  let [paymentstatus, setPaymentstatus] = useState("")
  let { id } = useParams()

  let navigate = useNavigate()
  let dispatch = useDispatch()
  let CheckoutStateData = useSelector((state) => state.CheckoutStateData)

  function updateItem() {
    dispatch(updateCheckout({ ...data, orderstatus: orderstatus,paymentstatus:paymentstatus }))
    setData((old) => {
      return {
        ...old,
        orderstatus: orderstatus,
        paymentstatus:paymentstatus
      }
    })
  }
  async function getAPIData() {
    dispatch(getCheckout())
    if (CheckoutStateData.length) {
      let item = CheckoutStateData.find((x) => x.id === id)
      setData(item)
      setOrderstatus(item.orderstatus)
      setPaymentstatus(item.paymentstatus)
      let response = await fetch("/user/" + item.userid, {
        method: "get",
        headers: {
          "content-type": "application/json"
        }
      })
      response = await response.json()
      setUser(response)
    }
  }
  useEffect(() => {
    getAPIData()
  }, [CheckoutStateData.length])
  return (
    <section id="company-services" className="padding-large">
      <div className='container-fluid my-2'>
        <div className="row">
          <div className="col-md-3"><Sidebar /></div>
          <div className="col-md-9">
            <h5 className='bg-primary p-2 text-center'>Checkout</h5>
            <table className='table table-bordered'>
              <tbody>
                <tr>
                  <th>ID</th>
                  <td>{data.id}</td>
                </tr>
                <tr>
                  <th>User</th>
                  <td>
                    Name     : {user.name}<br />
                    Email    : {user.email}<br />
                    Phone    : {user.phone}<br />
                    Address  : {user.address}<br />
                    {user.pin},{user.city},{user.state}
                  </td>
                </tr>
                <tr>
                  <th>Order Status</th>
                  <td>{data.orderstatus}
                    {
                      data.orderstatus !== "Delivered" ?
                        <select className='form-select mt-3' onChange={(e) => setOrderstatus(e.target.value)} name='orderstatus' value={orderstatus}>
                          <option>Order is Placed</option>
                          <option>Order is Packed</option>
                          <option>Ready to Ship</option>
                          <option>Shipped</option>
                          <option>Order in Transit</option>
                          <option>Order is Reached at the Final Delivery Station</option>
                          <option>Out For Delivery</option>
                          <option>Delivered</option>
                        </select> : ""
                    }
                  </td>
                </tr>
                <tr>
                  <th>Paymnet Mode</th>
                  <td>{data.paymentmode}</td>
                </tr>
                <tr>
                  <th>Payment Status</th>
                  <td>{data.paymentstatus}
                    {
                      data.paymentstatus === "Pending" ?
                        <select className='form-select mt-3' onChange={(e) => setPaymentstatus(e.target.value)} name='paymentstatus' value={paymentstatus}>
                          <option>Pending</option>
                          <option>Done</option>
                        </select> : ""
                    }

                  </td>
                </tr>
                <tr>
                  <th>Subtotal</th>
                  <td>&#8377;{data.subtotal}</td>
                </tr>
                <tr>
                  <th>Shipping</th>
                  <td>&#8377;{data.shipping}</td>
                </tr>
                <tr>
                  <th>Total</th>
                  <td>&#8377;{data.total}</td>
                </tr>
                <tr>
                  <th>RPPID</th>
                  <td>{data.rppid}</td>
                </tr>
                <tr>
                  <th>Date</th>
                  <td>{new Date(data.date).toLocaleString()}</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    {data.orderstatus !== "Delivered" || data.paymentstatus === "Pending" ?
                      <button className='btn btn-primary w-100' onClick={updateItem}>Update</button> : ""}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="table-responsive">
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th>Pic</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th>QTY</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data?.products?.map((item, index) => {
                      return <tr key={index}>
                        <td>
                          <a href={`/images/${item.pic}`} target='_blank' rel='noreferrer'>
                            <img src={`/images/${item.pic}`} height={50} width={50} alt="" />
                          </a>
                        </td>
                        <td>{item.name}</td>
                        <td>{item.brand}</td>
                        <td>{item.color}</td>
                        <td>{item.size}</td>
                        <td>&#8377;{item.price}</td>
                        <td>{item.qty}</td>
                        <td>&#8377;{item.total}</td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
