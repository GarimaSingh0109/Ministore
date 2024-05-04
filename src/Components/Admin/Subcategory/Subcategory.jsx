import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { deleteSubcategory, getSubcategory } from "../../../Store/ActionCreators/SubcategoryActionCreators"

import { DataGrid } from '@mui/x-data-grid';
export default function Subcategory() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 250 },
    {
      field: 'edit',
      headerName: 'Edit',
      sortable: false,
      width: 150,
      renderCell: ({ row }) => <Link to={`/admin/subcategory/update/${row.id}`} className='btn'><i className='fa fa-edit'></i></Link>
    },
    {
      field: 'delete',
      headerName: 'Delete',
      sortable: false,
      width: 150,
      renderCell: ({ row }) => <button className='btn' onClick={() => deleteItem(row.id)}><i className='fa fa-trash'></i></button>
    },
  ]

  let [data, setData] = useState([])
  let dispatch = useDispatch()
  let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData)

  function deleteItem(id) {
    if (window.confirm("Are You Sure to Delete this Item :  ")) {
      dispatch(deleteSubcategory({ id: id }))
      getAPIData()
    }
  }
  function getAPIData() {
    dispatch(getSubcategory())
    if (SubcategoryStateData.length) {
      setData(SubcategoryStateData)
    }
  }
  useEffect(() => {
    getAPIData()
  }, [SubcategoryStateData.length])
  return (
    <section id="company-services" className="padding-large">
      <div className='container-fluid my-2'>
        <div className="row">
          <div className="col-md-3"><Sidebar /></div>
          <div className="col-md-9">
            <h5 className='bg-primary p-2 text-center'>Subcategory <Link to="/admin/subcategory/create" className='btn btn-secondary'><i className='fa fa-plus text-light'></i></Link></h5>
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
