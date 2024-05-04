import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
    return (
        <div className="list-group">
            <Link to="/admin" className="list-group-item list-group-item-action bg-primary mb-1" aria-current="true">
                <i className='fa fa-home fs-3'></i><span className='float-end'>Home</span>
            </Link>
            <Link to="/admin/user" className="list-group-item list-group-item-action bg-primary mb-1"><i className='fa fa-users fs-3'></i><span className='float-end'>Users</span></Link>
            <Link to="/admin/maincategory" className="list-group-item list-group-item-action bg-primary mb-1"><i className='fa fa-list fs-3'></i><span className='float-end'>Maincategories</span></Link>
            <Link to="/admin/subcategory" className="list-group-item list-group-item-action bg-primary mb-1"><i className='fa fa-table fs-3'></i><span className='float-end'>Subcategories</span></Link>
            <Link to="/admin/brand" className="list-group-item list-group-item-action bg-primary mb-1"><i className='fa fa-copyright fs-3'></i><span className='float-end'>Brands</span></Link>
            <Link to="/admin/product" className="list-group-item list-group-item-action bg-primary mb-1"><i className='fa fa-product-hunt fs-3'></i><span className='float-end'>Products</span></Link>
            <Link to="/admin/testimonial" className="list-group-item list-group-item-action bg-primary mb-1"><i className='fa fa-star fs-3'></i><span className='float-end'>Testimonials</span></Link>
            <Link to="/admin/newsletter" className="list-group-item list-group-item-action bg-primary mb-1"><i className='fa fa-envelope fs-3'></i><span className='float-end'>Newsletters</span></Link>
            <Link to="/admin/contactus" className="list-group-item list-group-item-action bg-primary mb-1"><i className='fa fa-phone fs-3'></i><span className='float-end'>Contactus</span></Link>
            <Link to="/admin/checkout" className="list-group-item list-group-item-action bg-primary mb-1"><i className='fa fa-shopping-bag fs-3'></i><span className='float-end'>Checkouts</span></Link>
        </div>
    )
}
