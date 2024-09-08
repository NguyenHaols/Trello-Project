import { Avatar, Box, Button, Card, Typography } from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import { useState } from 'react'

function UserManagerMent() {
  const [userSelected, setUserSelected] = useState(null)
 
  const handleRowClick = (params) => {
    setUserSelected(params)
  }

  const handleRemove = (id) => {
    // console.log('Remove row with id:', id);
  }

  const rows = [
    { id: 13213123123211, col1: 'Nguyễn Hào', col2: 'nguyenhaocu0@gmail.com', col3: '0852455166', col4: '20/12/2024', col5: true },
    { id: 132131231232112, col1: 'Nguyễn Hào', col2: 'nguyenhaocu0@gmail.com', col3: '0852455166', col4: '20/12/2024', col5: true },
    { id: 132131231232113, col1: 'Nguyễn Hào', col2: 'nguyenhaocu0@gmail.com', col3: '0852455166', col4: '20/12/2024', col5: true },
    { id: 132131231232114, col1: 'Nguyễn Hào', col2: 'nguyenhaocu0@gmail.com', col3: '0852455166', col4: '20/12/2024', col5: true },
    { id: 132131231232115, col1: 'Nguyễn Hào', col2: 'nguyenhaocu0@gmail.com', col3: '0852455166', col4: '20/12/2024', col5: true },
    { id: 132131231232116, col1: 'Nguyễn Hào', col2: 'nguyenhaocu0@gmail.com', col3: '0852455166', col4: '20/12/2024', col5: true }

  ]

  const columns = [
    { field: 'id', hide: true, align:'center', headerAlign:'center' },
    { field: 'col1', headerName: 'Username',align:'center', flex:2, headerAlign:'center', editable:true, renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ mr: 1 }}>{params.row.col1.charAt(0)}</Avatar> {/* Avatar từ chữ cái đầu tiên */}
        {params.row.col1}
      </Box>
    ) },
    { field: 'col2', headerName: 'Email', flex:2, editable:true, headerAlign:'center' },
    { field: 'col3', headerName: 'Phone number', flex:1,align:'center', editable:true, headerAlign:'center' },
    { field: 'col4', headerName: 'Joined date',align:'center', flex:1, headerAlign:'center' },
    { field: 'col5', headerName: 'Active', flex:1,align:'center', editable:true, headerAlign:'center' },
    { field: 'col6', headerName: 'Options', flex:2, type:'actions', headerAlign:'center', getActions: (params, index) => [
      <GridActionsCellItem
        key={index}
        icon={<Button color="primary">Update</Button>}
        label="Update"
        onClick={() => handleRowClick(params.row)}
      />,
      <GridActionsCellItem
        key={index}
        icon={<Button color="error">Remove</Button>}
        label="Remove"
        onClick={() => handleRemove(params.row.id)}
      />
    ] }
  ]


  return (
    <Box>
      <Box sx={{ mb:'20px' }}>
        <Typography fontWeight='700' variant='h5'>Users</Typography>
      </Box>
      <Card sx={{ borderRadius:'16px' }}>
        <DataGrid sx={{ borderRadius:'16px', overflow:'hidden' }} rows={rows} columns={columns} pageSizeOptions={7} pageSize={7} rowHeight={70} onRowClick={handleRowClick}/>
      </Card>
    </Box>
  )
}

export default UserManagerMent