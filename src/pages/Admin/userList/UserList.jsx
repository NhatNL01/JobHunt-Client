import './userList.scss'
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { DeleteOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { userRows as rows } from '../../dummyData';


const UserList = () => {

  const [data, setData] = useState(rows)

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id))
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'user', headerName: 'Username', width: 200, renderCell: (params) => {
        return (
          <div className='userListField'>
            <img src={params.row.avatar} alt="avatar" />
            {params.row.username}
          </div>
        )
      }
    },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'status',
      headerName: 'Status',
      width: 90,
    },
    {
      field: 'transaction',
      headerName: 'Transaction Volume',
      width: 160
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/${params.row.id}`}>
              <button className="editButton ">Edit</button>
            </Link>
            <DeleteOutline className='deleteButton' onClick={() => handleDelete(params.row.id)} />
          </>
        )
      }
    }
  ];

  return (
    <div className='userListPage'>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={13}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  )
}

export default UserList