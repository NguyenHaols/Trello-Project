import { useTheme } from '@emotion/react'
import { Box, Typography, Avatar, Button, Card, CircularProgress, TextField } from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import { useConfirm } from 'material-ui-confirm'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addMemberAPI, deleteWorkspaceAPI, getMembersByWorkspaceIdAPI, getWorkspaceByIdAPI, removeMemberAPI, updateWorkspaceAPI } from '~/apis'

function WorkspaceDetail() {
  const { id } = useParams()
  const [loading, setIsloading] = useState(true)
  const [workspace, setWorkspace] = useState({})
  const [members, setMembers] = useState([])
  const [emailMember, setEmailMember] = useState(null)
  const deleteWorkspaceConfirm = useConfirm()
  const navigate = useNavigate()
  const theme = useTheme()
  const mainColor = theme.palette.primary.main
  const textColor = theme.palette.text.secondary
  const bgColor = theme.palette.primary[700]

  const handleUpdateWorkspace = (params) => {
    const newData = {
      _id: workspace._id,
      title: params.col1,
      description: params.col2,
      type: params.col3
    }
    updateWorkspaceAPI(newData)
      .then(res => {
        toast.success('Update workspace success')
        setWorkspace(res)
      })
  }

  const handleDeleteWorkspace = () => {
    deleteWorkspaceConfirm({
      title: 'Delete workspace',
      content: 'Are you sure you want to delete this workspace ?'
    })
      .then(() => {
        deleteWorkspaceAPI({ _id:workspace._id })
        setWorkspace({})
        navigate('/admin/workspace')
      })
      .catch(() => {})
  }

  const handleRemoveMember = (row) => {
    const data = {
      workspaceId: workspace._id,
      email : row.email
    }
    removeMemberAPI(data)
      .then(() => {
        const newMembers = members.filter(member => (member._id !== row.id))
        setMembers(newMembers)
        toast.success('Remove member success')
      })
  }

  const handleAddMember = () => {
    const data = {
      workspaceId: workspace._id,
      email: emailMember
    }
    addMemberAPI(data)
      .then(res => {
        const updateMembers = [...members, res.user]
        setMembers(updateMembers)
      })
      .catch((e) => {
        toast.error(e.response.data.message)
      })
  }

  useEffect(() => {
    getWorkspaceByIdAPI({ workspaceId:id })
      .then(res => {
        setWorkspace(res.data)
        setIsloading(false)
      })

    getMembersByWorkspaceIdAPI(id)
      .then(res => {
        setMembers(res)
      })

  }, [id])

  const createdAt = new Date(workspace.createdAt)
  const workspaceTableData = {
    rows : [
      { id: workspace._id, col1: workspace.title, col2: workspace.description, col3: workspace.type, col4: `${createdAt.getDay()}/${createdAt.getMonth()}/${createdAt.getFullYear()}`, col5: true }
    ],
    columns : [
      { field: 'id', hide: true, align:'center', headerAlign:'center' },
      { field: 'col1', headerName: 'Title', align:'center', flex:2, headerAlign:'center', editable:true },
      { field: 'col2', headerName: 'Description', flex:2, align:'center', editable:true, headerAlign:'center' },
      { field: 'col3', headerName: 'Type', flex:1, align:'center', editable:true, headerAlign:'center' },
      { field: 'col4', headerName: 'Created At', align:'center', flex:1, headerAlign:'center' },
      { field: 'col5', headerName: 'Options', flex:2, type:'actions', headerAlign:'center', getActions: (params, index) => [
        <GridActionsCellItem
          key={index}
          icon={<Button color="primary">Update</Button>}
          label="Update"
          onClick={() => handleUpdateWorkspace(params.row)}
        />,
        <GridActionsCellItem
          key={index}
          icon={<Button color="error">Delete</Button>}
          label="Remove"
          onClick={() => handleDeleteWorkspace()}
        />
      ] }
    ]
  }

  const membersTableData = {
    rows : members.map(member => {
      const joinedDate = new Date(member.createdAt)
      return {
        id: member._id,
        avatar: member.avatar,
        username: member.username,
        email: member.email,
        phoneNumber: member.phoneNumber,
        createdAt: `${joinedDate.getDay()}/${joinedDate.getMonth()}/${joinedDate.getFullYear()}`
      }
    }),
    columns : [
      { field: 'id', hide: true, align:'center', headerAlign:'center' },
      { field: 'username', headerName: 'Username', align:'center', flex:1.5, headerAlign:'center', editable:true, renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ mr: 1 }} src={params.row.avatar} alt={params.row.username}>
            {/* {!params.row.avatar && params.row.username.charAt(0)} */}
          </Avatar>
          {params.row.username}
        </Box>
      ) },
      { field: 'email', headerName: 'Email', flex:2, align:'center', headerAlign:'center' },
      { field: 'phoneNumber', headerName: 'Phone number', flex:1, align:'center', editable:true, headerAlign:'center' },
      { field: 'createdAt', headerName: 'Joined date', align:'center', flex:1, headerAlign:'center' },
      { field: 'col5', headerName: 'Options', flex:2, type:'actions', headerAlign:'center', getActions: (params, index) => [
        <GridActionsCellItem
          key={index}
          icon={<Button color="error">Delete</Button>}
          label="Remove"
          onClick={() => handleRemoveMember(params.row)}
        />
      ] }
    ]
  }

  if (loading) {
    return (
      <Box sx={{ height:'100vh', display: 'flex', justifyContent:'center', alignItems:'center' }}>
        <CircularProgress />
      </Box>
    )
  }
  return (
    <Box>
      <Box>
        <Box sx={{ mb:'20px' }}>
          <Typography fontWeight='700' variant='h5'>Workspace</Typography>
        </Box>
        <Card sx={{ borderRadius:'16px' }}>
          <DataGrid sx={{ borderRadius:'16px', overflow:'hidden' }} rows={workspaceTableData.rows} columns={workspaceTableData.columns} pageSizeOptions={7} pageSize={7} rowHeight={70} hideFooter />
        </Card>
      </Box>

      <Box sx={{ mt:'40px' }}>
        <Box sx={{ mb:'20px' }}>
          <Typography fontWeight='700' variant='h5'>Members</Typography>
        </Box>
        <Box sx={{ display:'flex', justifyContent:'flex-end', mb:'15px' }}>
          <TextField onChange={(e) => setEmailMember(e.target.value)} size='small' placeholder='Email' />
          <Button onClick={() => handleAddMember()} sx={{ bgcolor:mainColor, color:textColor, ml:'10px', '&:hover':{ bgcolor:bgColor } }}>Add</Button>
        </Box>
        <Card sx={{ borderRadius:'16px' }}>
          <DataGrid sx={{ borderRadius:'16px', overflow:'hidden' }} rows={membersTableData.rows} columns={membersTableData.columns} pageSizeOptions={7} pageSize={7} rowHeight={70} />
        </Card>
      </Box>

    </Box>
  )
}

export default WorkspaceDetail