import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { deleteProduct, getProduct } from "../../../Store/ActionCreators/ProductActionCreators"
import { DataGrid } from '@mui/x-data-grid';
export default function Product() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 170 },
    { field: 'maincategory', headerName: 'Maincategory', width: 120 },
    { field: 'subcategory', headerName: 'Subcategory', width: 120 },
    { field: 'brand', headerName: 'Brand', width: 100 },
    { field: 'color', headerName: 'Color', width: 80 },
    { field: 'size', headerName: 'Size', width: 50 },
    { field: 'baseprice', headerName: 'baseprice', width: 120, renderCell: ({ row }) => <p className='text-dark'>&#8377;{row.baseprice}</p> },
    { field: 'discount', headerName: 'discount', width: 100, renderCell: ({ row }) => <p className='text-dark'>{row.discount}%</p> },
    { field: 'finalprice', headerName: 'finalprice', width: 120, renderCell: ({ row }) => <p className='text-dark'>&#8377;{row.finalprice}</p> },
    { field: 'stock', headerName: 'stock', width: 100 },
    {
      field: 'edit',
      headerName: 'Edit',
      sortable: false,
      width: 70,
      renderCell: ({ row }) => <Link to={`/admin/product/update/${row.id}`} className='btn'><i className='fa fa-edit'></i></Link>
    },
    {
      field: 'delete',
      headerName: 'Delete',
      sortable: false,
      width: 70,
      renderCell: ({ row }) => <button className='btn' onClick={() => deleteItem(row.id)}><i className='fa fa-trash'></i></button>
    },
    {
      field: 'pic', headerName: 'pic', width: 500, renderCell: ({ row }) => <div>
        {
          row.pic?.map((p, i) => {
            return <a key={i} href={`/images/${p}`} target='_blank' rel='noreferrer'>
              <img src={`/images/${p}`} height={50} width={50} alt="" />
            </a>
          })
        }
      </div>
    }
  ]
  let [data, setData] = useState([])
  let dispatch = useDispatch()
  let ProductStateData = useSelector((state) => state.ProductStateData)

  function deleteItem(id) {
    if (window.confirm("Are You Sure to Delete this Item :  ")) {
      dispatch(deleteProduct({ id: id }))
      getAPIData()
    }
  }
  function getAPIData() {
    dispatch(getProduct())
    if (ProductStateData.length) {
      setData(ProductStateData)
    }
  }
  useEffect(() => {
    getAPIData()
  }, [ProductStateData.length])
  return (
    <section id="company-services" className="padding-large">
      <div className='container-fluid my-2'>
        <div className="row">
          <div className="col-md-3"><Sidebar /></div>
          <div className="col-md-9">
            <h5 className='bg-primary p-2 text-center'>Product <Link to="/admin/product/create" className='btn btn-secondary'><i className='fa fa-plus text-light'></i></Link></h5>
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
