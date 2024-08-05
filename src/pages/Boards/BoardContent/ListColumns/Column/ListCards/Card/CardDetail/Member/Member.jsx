import { Avatar, Box, IconButton, Typography } from '@mui/material'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'
import { useTheme } from '@emotion/react'
import { useConfirm } from 'material-ui-confirm'
import { removeMemberCardAction } from '~/redux/actions/boardAction'
import { useDispatch } from 'react-redux'
import { removeMemberCardAPI } from '~/apis'
import { toast } from 'react-toastify'

function Member({ member, card }) {
  const theme = useTheme()
  const mainColor = theme.palette.primary.main
  const removeMemberConfirm = useConfirm()
  const dispatch = useDispatch()
  const handleRemoveMember = (memberId) => {
    removeMemberConfirm({
      title:'Remove member',
      content:'Are you sure you want to remove this member',
      dialogProps: {
        sx:{ zIndex:1500 }
      }
    })
      .then(() => {
        const data = {
          cardId: card._id,
          userId: memberId
        }
        removeMemberCardAPI(data)
          .then(() => {
            const action = removeMemberCardAction(card._id, memberId)
            dispatch(action)
            toast.success('Remove member success')
          })
      })
      .catch(() => {})
  }
  return (
    <Box key={member.id} sx={{ display:'flex', alignItems:'center', justifyContent:'space-between', p:'8px 0' }}>
      <Box sx={{ display:'flex', alignItems:'center' }}>
        <Avatar src={member.avatar} ></Avatar>
        <Typography sx={{ paddingLeft:'10px' }}>{member.email}</Typography>
      </Box>
      <IconButton onClick={() => {handleRemoveMember(member._id)}}> <CancelPresentationIcon sx={{ color:mainColor }} /> </IconButton>
    </Box>
  )
}

export default Member