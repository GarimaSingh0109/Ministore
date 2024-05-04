import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { deleteTestimonial, getTestimonial } from "../../../Store/ActionCreators/TestimonialActionCreators"
import { DataGrid } from '@mui/x-data-grid';
export default function Testimonial() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 110 },
    { field: 'message', headerName: 'Message', width: 250 },
    { field: 'star', headerName: 'Star', width: 50 },
    {
      field: 'pic', headerName: 'pic', width: 70, renderCell: ({ row }) => <a href={`/images/${row.pic}`} rel='noreferrer'>
        <img src={`/images/${row.pic}`} height={50} width={50} alt="" />
      </a>
    },
    {
      field: 'edit',
      headerName: 'Edit',
      sortable: false,
      width: 70,
      renderCell: ({ row }) => <Link to={`/admin/testimonial/update/${row.id}`} className='btn'><i className='fa fa-edit'></i></Link>
    },
    {
      field: 'delete',
      headerName: 'Delete',
      sortable: false,
      width: 70,
      renderCell: ({ row }) => <button className='btn' onClick={() => deleteItem(row.id)}><i className='fa fa-trash'></i></button>
    }
  ]
  let [data, setData] = useState([])
  let dispatch = useDispatch()
  let TestimonialStateData = useSelector((state) => state.TestimonialStateData)

  function deleteItem(id) {
    if (window.confirm("Are You Sure to Delete this Item :  ")) {
      dispatch(deleteTestimonial({ id: id }))
      getAPIData()
    }
  }
  function getAPIData() {
    dispatch(getTestimonial())
    if (TestimonialStateData.length) {
      setData(TestimonialStateData)
    }
  }
  useEffect(() => {
    getAPIData()
  }, [TestimonialStateData.length])
  return (
    <section id="company-services" className="padding-large">
      <div className='container-fluid my-2'>
        <div className="row">
          <div className="col-md-3"><Sidebar /></div>
          <div className="col-md-9">
            <h5 className='bg-primary p-2 text-center'>Testimonial <Link to="/admin/testimonial/create" className='btn btn-secondary'><i className='fa fa-plus text-light'></i></Link></h5>
            <div className="table-responsive">
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
      </div>
    </section>
  )
}
