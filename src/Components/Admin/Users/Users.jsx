import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'

import { DataGrid } from '@mui/x-data-grid';
export default function Users() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 220 },
    { field: 'phone', headerName: 'Phone', width: 100 },
    { field: 'username', headerName: 'UserName', width: 100 },
    { field: 'role', headerName: 'Role', width: 70 },
    {
      field: 'delete',
      headerName: 'Delete',
      sortable: false,
      width: 150,
      renderCell: ({ row }) => <button className='btn' onClick={() => deleteItem(row.id)}><i className='fa fa-trash'></i></button>
    },
  ]

  let [data, setData] = useState([])

  async function deleteItem(id) {
    if (window.confirm("Are You Sure to Delete this Item :  ")) {
      let response = await fetch("/user/" + id, {
        method: "delete",
        headers: {
          'content-type': "application/json"
        }
      })
      response = await response.json()
      getAPIData()
    }
  }
  async function getAPIData() {
    let response = await fetch("/user", {
      method: "get",
      headers: {
        'content-type': "application/json"
      }
    })
    response = await response.json()
    if (response.length) {
      setData(response.reverse())
    }
  }
  useEffect(() => {
    getAPIData()
  }, [])
  return (
    <section id="company-services" className="padding-large">
      <div className='container-fluid my-2'>
        <div className="row">
          <div className="col-md-3"><Sidebar /></div>
          <div className="col-md-9">
            <h5 className='bg-primary p-2 text-center'>Users</h5>
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
