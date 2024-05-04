import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getCheckout } from "../../../Store/ActionCreators/CheckoutActionCreators"

import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
export default function AdminCheckout() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'userid', headerName: 'Userid', width: 60 },
    { field: 'orderstatus', headerName: 'Order Status', width: 200 },
    { field: 'paymentmode', headerName: 'Payment Mode', width: 100 },
    { field: 'paymentstatus', headerName: 'Payment Status', width: 100 },
    { field: 'subtotal', headerName: 'Subtotal', width: 80, renderCell: ({ row }) => <span>&#8377;{row.subtotal}</span> },
    { field: 'shipping', headerName: 'Shipping', width: 80, renderCell: ({ row }) => <span>&#8377;{row.shipping}</span> },
    { field: 'total', headerName: 'Total', width: 80, renderCell: ({ row }) => <span>&#8377;{row.total}</span> },
    { field: 'date', headerName: 'Date', width: 100, renderCell: ({ row }) => <span className='text-dark'>{new Date(row.date).toLocaleDateString()}</span> },
    {
      field: 'view',
      headerName: 'View',
      sortable: false,
      width: 50,
      renderCell: ({ row }) => <Link to={`/admin/Checkout/show/${row.id}`} className='btn'><i className='fa fa-eye'></i></Link>
    }
  ]

  let [data, setData] = useState([])
  let dispatch = useDispatch()
  let CheckoutStateData = useSelector((state) => state.CheckoutStateData)


  function getAPIData() {
    dispatch(getCheckout())
    if (CheckoutStateData.length) {
      setData(CheckoutStateData)
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
