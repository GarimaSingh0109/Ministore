import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { deleteContactUs, getContactUs } from "../../../Store/ActionCreators/ContactUsActionCreators"

import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
export default function AdminContactUs() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'name', headerName: 'Name', width: 120 },
    { field: 'email', headerName: 'Email', width: 210 },
    { field: 'phone', headerName: 'Phone', width: 100 },
    { field: 'subject', headerName: 'Subject', width: 150 },
    { field: 'message', headerName: 'Message', width: 150 },
    { field: 'date', headerName: 'Date', width: 100, renderCell: ({ row }) => <span className='text-dark'>{new Date(row.date).toLocaleDateString()}</span> },
    { field: 'active', headerName: 'active', width: 70 },
    {
      field: 'view',
      headerName: 'View',
      sortable: false,
      width: 50,
      renderCell: ({ row }) => <Link to={`/admin/contactus/show/${row.id}`} className='btn'><i className='fa fa-eye'></i></Link>
    },
    {
      field: 'delete',
      headerName: 'Delete',
      sortable: false,
      width: 70,
      renderCell: ({ row }) => {
        if (!row.active)
          return <button className='btn' onClick={() => deleteItem(row.id)}><i className='fa fa-trash'></i></button>
      }
    },
  ]

  let [data, setData] = useState([])
  let dispatch = useDispatch()
  let ContactUsStateData = useSelector((state) => state.ContactUsStateData)

  function deleteItem(id) {
    if (window.confirm("Are You Sure to Delete this Item :  ")) {
      dispatch(deleteContactUs({ id: id }))
      getAPIData()
    }
  }
  function getAPIData() {
    dispatch(getContactUs())
    if (ContactUsStateData.length) {
      setData(ContactUsStateData)
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
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
