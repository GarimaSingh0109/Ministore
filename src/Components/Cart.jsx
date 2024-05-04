import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { deleteCart, getCart, updateCart } from "../Store/ActionCreators/CartActionCreators"
export default function Cart() {
    let [cart, setCart] = useState([])
    let [subtotal, setSubtotal] = useState(0)
    let [shipping, setShipping] = useState(0)
    let [total, setTotal] = useState(0)

    let navigate = useNavigate()

    let dispatch = useDispatch()
    let CartStateData = useSelector((state) => state.CartStateData)

    function deleteRecord(id) {
        if (window.confirm("Are Your Sure to Delete that Item")) {
            dispatch(deleteCart({ id: id }))
            getAPIData()
            if (cart.length === 1)
                setCart([])
        }
    }

    function updateRecord(id, option) {
        let item = cart.find((x) => x.id === id)
        let index = cart.findIndex((x) => x.id === id)
        if (item.qty === 1 && option === "DEC")
            return
        else if (option === "DEC") {
            item.qty = item.qty - 1
            item.total = item.total - item.price
        }
        else {
            item.qty = item.qty + 1
            item.total = item.total + item.price
        }

        dispatch(updateCart({ ...item }))
        getAPIData()
        cart[index] = item
        setCart(cart)
    }
    function getAPIData() {
        dispatch(getCart())
        if (CartStateData.length) {
            let data = CartStateData.filter((x) => x.userid === localStorage.getItem("userid"))
            setCart(data)
            let subtotal = 0
            let shipping = 0
            let total = 0
            for (let item of data) {
                subtotal = subtotal + item.total
            }
            if (subtotal > 0 && subtotal < 1000)
                shipping = 150

            total = subtotal + shipping

            setSubtotal(subtotal)
            setShipping(shipping)
            setTotal(total)
        }
    }
    useEffect(() => {
        getAPIData()
    }, [CartStateData.length])
    return (
        <>
            <div className="container-fluid my-5">
                <div style={{ height: 50 }} />
                <h5 className='bg-primary text-center p-2'>Cart Section</h5>
                {
                    cart.length ?
                        <>
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
                                            <th></th>
                                            <th>QTY</th>
                                            <th></th>
                                            <th>Total</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cart.map((item, index) => {
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
                                                    <td><button className='btn btn-primary' onClick={()=>updateRecord(item.id,"DEC")}><i className='fa fa-minus'></i></button></td>
                                                    <td>{item.qty}</td>
                                                    <td><button className='btn btn-primary' onClick={()=>updateRecord(item.id,"INC")}><i className='fa fa-plus'></i></button></td>
                                                    <td>&#8377;{item.total}</td>
                                                    <td><button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='fa fa-trash'></i></button></td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="row">
                                <div className="col-md-6"></div>
                                <div className="col-md-6">
                                    <table className='table table-bordered'>
                                        <tbody>
                                            <tr>
                                                <th>Subtotal</th>
                                                <td>&#8377;{subtotal}</td>
                                            </tr>
                                            <tr>
                                                <th>Shipping</th>
                                                <td>&#8377;{shipping}</td>
                                            </tr>
                                            <tr>
                                                <th>Total</th>
                                                <td>&#8377;{total}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}><Link to="/checkout" className='btn btn-primary w-100'>Checkout</Link></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </> :
                        <div className='text-center'>
                            <p>No Items in Cart</p>
                            <Link to="/shop" className='btn btn-primary'>Shop Now</Link>
                        </div>
                }
            </div>
        </>
    )
}
