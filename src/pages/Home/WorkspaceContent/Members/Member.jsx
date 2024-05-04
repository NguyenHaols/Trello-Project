import { Box, Button, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { removeMemberAPI } from '~/apis'
import { removeMemberAction } from '~/redux/actions/userAction'


function Members({ workspace, currentUserId, member }) {
  const currentWorkspace = workspace
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleRemoveSubmit = () => {
    if ( currentUserId === member._id || currentUserId === currentWorkspace.ownerId ) {
      const data = {
        workspaceId: currentWorkspace._id,
        email : member.email
      }
      removeMemberAPI(data)
        .then( data => {
          toast.success('Remove member successfully')
          const action = removeMemberAction(workspace._id, member._id)
          if (currentUserId === member._id) {
            navigate('/')
          }
          dispatch(action)
        })
    } else {
      toast.error('you don\'t have permission to delete')
    }
  }

  return (
    <Box key={member._id} sx={{
      display:'flex',
      alignItems:'center',
      borderBottom:'1px solid #ccc',
      padding:'15px 0'
    }}>

      <Box
        sx={{
          backgroundImage: member.avatar ? `url(${member.avatar})` : 'linear-gradient(#c9372c,#fea362)',
          width:'30px',
          height:'30px',
          marginRight:'15px',
          borderRadius:'16px',
          backgroundSize:'cover',
          backgroundPosition:'center',
          color:'white',
          textAlign:'center',
          lineHeight:'30px'
        }}

      >
        {member.avatar ? '' : member.username[0]}
      </Box>
      <Box sx={{
        flex:'1'
      }}>
        <Typography variant='strong' fontWeight='bold' color={(theme) => theme.palette.text.primary} > {member.username} </Typography>
        <Typography color={(theme) => theme.palette.text.primary}>{member.email}</Typography>
      </Box>
      <Box sx={{
        flex:'1'
      }}>
        <Button onClick={handleRemoveSubmit} sx={{
          width:'115px',
          height:'32px',
          background:(theme) => theme.palette.primary[500],
          color:'white',
          float:'right',
          '&:hover':{ backgroundColor:(theme) => theme.palette.primary[800] }
        }}> {member._id === currentUserId ? 'Leave' : 'Remove'} </Button>
      </Box>
    </Box>
  )
}

export default Members