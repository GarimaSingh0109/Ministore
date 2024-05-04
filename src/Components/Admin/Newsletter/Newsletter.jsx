import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { deleteNewsletter, getNewsletter } from "../../../Store/ActionCreators/NewsletterActionCreators"

import { DataGrid } from '@mui/x-data-grid';
export default function Newsletter() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'email', headerName: 'Email', width: 250 },
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
  let NewsletterStateData = useSelector((state) => state.NewsletterStateData)

  function deleteItem(id) {
    if (window.confirm("Are You Sure to Delete this Item :  ")) {
      dispatch(deleteNewsletter({ id: id }))
      getAPIData()
    }
  }
  function getAPIData() {
    dispatch(getNewsletter())
    if (NewsletterStateData.length) {
      setData(NewsletterStateData)
    }
  }
  useEffect(() => {
    getAPIData()
  }, [NewsletterStateData.length])
  return (
    <section id="company-services" className="padding-large">
      <div className='container-fluid my-2'>
        <div className="row">
          <div className="col-md-3"><Sidebar /></div>
          <div className="col-md-9">
            <h5 className='bg-primary p-2 text-center'>Newsletter</h5>
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
