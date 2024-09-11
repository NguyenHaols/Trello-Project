import { Avatar, Box, Button, Card, CircularProgress, TextField, Typography } from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { getAllUserApi, updateUser } from '~/apis'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import { toast } from 'react-toastify'

function UserManagerMent() {
  const [userSelected, setUserSelected] = useState(null)
  const [loading, setIsloading] = useState(true)
  const [allUsers, setAllUsers] = useState(null)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 6 })

  const handleRowClick = (params) => {
    setUserSelected(params)
  }

  // const handleRemove = (id) => {
  //   // console.log('Remove row with id:', id);
  // }

  useEffect(() => {
    getAllUserApi()
      .then(res => {
        setAllUsers(res)
        setIsloading(false)
      })
  }, [])

  const handleUpdateUser = (user) => {
    const { id, createdAt, ...resData } = user
    resData._destroy = !resData._destroy
    updateUser(resData)
      .then(res => {
        const newAllUserData = allUsers.map(user => (
          user._id === res._id ? { ...user, ...res } : user
        ))
        setAllUsers(newAllUserData)
        toast.success('Update success')
      })
      .catch(err => {
        toast.error('Update failed')
      })
  }

  const rows = allUsers ? allUsers.map(user => {
    const joinedDate = new Date(user.createdAt)
    return {
      id: user._id,
      avatar: user.avatar,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      createdAt: `${joinedDate.getDay()}/${joinedDate.getMonth()}/${joinedDate.getFullYear()}`,
      _destroy: !user._destroy
    }
  }) : []


  const columns = [
    { field: 'id', hide: true, align:'center', headerAlign:'center' },
    { field: 'username', headerName: 'Username', align:'center', flex:1.5, headerAlign:'center', editable:true, renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ mr: 1 }} src={params.row.avatar} alt={params.row.username}>
          {!params.row.avatar && params.row.username.charAt(0)}
        </Avatar>
        {params.row.username}
      </Box>
    ) },
    { field: 'email', headerName: 'Email', flex:2, headerAlign:'center' },
    { field: 'phoneNumber', headerName: 'Phone number', flex:1, align:'center', editable:true, headerAlign:'center' },
    { field: 'createdAt', headerName: 'Joined date', align:'center', flex:1, headerAlign:'center' },
    { field: '_destroy', headerName: 'Active', flex:1, align:'center', editable:true, headerAlign:'center' },
    { field: 'col6', headerName: 'Options', flex:1, type:'actions', headerAlign:'center', getActions: (params, index) => [
      <GridActionsCellItem
        key={index}
        icon={<Button color="primary">Update</Button>}
        label="Update"
        onClick={() => handleUpdateUser(params.row)}
      />
      // <GridActionsCellItem
      //   key={index}
      //   icon={<Button color="error">Remove</Button>}
      //   label="Remove"
      //   onClick={() => handleRemove(params.row.id)}
      // />
    ] }
  ]

  if (loading) {
    return (
      <Box sx={{ height:'100vh', display: 'flex', justifyContent:'center', alignItems:'center' }}>
        <CircularProgress />
      </Box>
    )
  }
  return (
    <Box>
      <Box sx={{ mb:'20px' }}>
        <Typography fontWeight='700' variant='h5'>Users</Typography>
      </Box>
      
      <Card sx={{ borderRadius:'16px' }}>
        <DataGrid sx={{ borderRadius:'16px', overflow:'hidden' }} rows={rows} pagination paginationModel={paginationModel} onPaginationModelChange={(newModel) => setPaginationModel(newModel)} columns={columns} pageSize={7} rowHeight={70} onRowClick={handleRowClick}/>
      </Card>
    </Box>
  )
}

export default UserManagerMent