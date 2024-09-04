import { Box, Button, Typography } from '@mui/material'
import { useConfirm } from 'material-ui-confirm'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getUser, removeMemberAPI } from '~/apis'
import { removeMemberAction } from '~/redux/actions/memberAction'
import { setUser } from '~/redux/actions/userAction'
import socket from '~/socket/socket'


function Members({ workspace, currentUserId, member }) {
  const currentWorkspace = workspace
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const leaveConfirm = useConfirm()
  const { t } = useTranslation()

  const handleRemoveSubmit = () => {
    if ( currentUserId === member._id || currentUserId === currentWorkspace.ownerId ) {
      const data = {
        workspaceId: currentWorkspace._id,
        email : member.email
      }
      leaveConfirm({
        title:'Remove from workspace',
        content: 'Are you sure ?'
      })
        .then(() => {
          removeMemberAPI(data)
            .then( data => {
              toast.success('Remove member successfully')
              const action = removeMemberAction(member._id)
              socket.emit('removeMember', {
                senderId: currentUserId,
                emailRemove : member.email,
                workspaceId: currentWorkspace._id
              })
              if (currentUserId === member._id) {
                getUser()
                  .then(data => {
                    const action = setUser(data)
                    dispatch(action)
                  })
                navigate('/')
              }
              dispatch(action)
            })
        })
        .catch(() => {})
    }
    else {
      toast.error('you don\'t have permission to delete')
    }

  }

  return (
    <Box key={member._id} sx={{
      display:'flex',
      alignItems:'center',
      borderBottom:'1px solid #ccc',
      padding:'15px 0px',
      pr:['10px', '0']
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
        <Typography variant='strong' fontWeight='bold' color={(theme) => theme.palette.text.primary} > {member.username} {currentWorkspace.ownerId === member._id ? `(${t('admin')})` : ''} </Typography>
        <Typography color={(theme) => theme.palette.text.primary}>{member.email}</Typography>
      </Box>
      <Box sx={{
        flex:'1'
      }}>
        {(currentUserId === currentWorkspace.ownerId || member._id === currentUserId) && (
          <Button onClick={handleRemoveSubmit} sx={{
            width:'115px',
            height:'32px',
            background:(theme) => theme.palette.primary[500],
            color:'white',
            float:'right',
            '&:hover':{ backgroundColor:(theme) => theme.palette.primary[800] }
          }}> 
            {member._id === currentUserId ? t('leave') : t('remove')}
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default Members