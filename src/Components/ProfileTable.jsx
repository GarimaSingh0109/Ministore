import React from 'react'
import { Link } from 'react-router-dom'
export default function ProfileTable({ user, heading, buttonText }) {
    return (
        <>
            <h5 className='bg-primary p-2 text-center'>{heading}</h5>
            <table className='table table-bordered'>
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
                        <th>Email</th>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <th>Phone</th>
                        <td>{user.phone}</td>
                    </tr>
                    <tr>
                        <th>Address</th>
                        <td>{user.address}</td>
                    </tr>
                    <tr>
                        <th>Pin</th>
                        <td>{user.pin}</td>
                    </tr>
                    <tr>
                        <th>City</th>
                        <td>{user.city}</td>
                    </tr>
                    <tr>
                        <th>State</th>
                        <td>{user.state}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}><Link to="/profile/update" className='btn btn-primary w-100'>{buttonText}</Link></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
