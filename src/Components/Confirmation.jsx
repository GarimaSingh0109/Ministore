import React from 'react'
import { Link } from 'react-router-dom'

export default function Confirmation() {
  return (
    <div className='container-fluid my-5 text-center'>
      <div style={{height:100}}/>
      <h1>Thank You!</h1>
      <h2>Your Order Has Been Placed!</h2>
      <h3>Now You Can Track Your Order in Profile Page!</h3>
      <Link to="/shop" className='btn btn-primary'>Shop More</Link>
    </div>
  )
}
