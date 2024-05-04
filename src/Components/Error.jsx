import React from 'react'
import { Link } from 'react-router-dom'

export default function Error() {
    return (
        <div className='container'>
            <div style={{ height: 100 }} />
            <div className='my-5 text-center card p-5 col-6 m-auto'>
                <p className='text-dark'>404! Page Not Found!!! or You Are UnAuthorised to Access This Page</p>
                <Link to="/" className='btn btn-primary'>Home</Link>
                <p className='text-dark mt-5'>If You Have An Account Please Login</p>
                <Link to="/login" className='btn btn-primary'>Login</Link>
            </div>
        </div>
    )
}
