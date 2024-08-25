import { Avatar, Box, IconButton, Typography } from '@mui/material'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'
import { useTheme } from '@emotion/react'
import { useConfirm } from 'material-ui-confirm'
import { removeMemberCardAction, updateTaskCardAssignAction, updateTaskListCardAction } from '~/redux/actions/boardAction'
import { useDispatch } from 'react-redux'
import { removeMemberCardAPI, updateTaskAssignCardAPI } from '~/apis'
import { toast } from 'react-toastify'
import CheckIcon from '@mui/icons-material/Check'

function MemberAssign({ task,taskId, userAssignId, member, card }) {
  const theme = useTheme()
  const dispatch = useDispatch()

  const isUserAssign = userAssignId && (userAssignId === member._id)

  const updateTaskCard = () => {

    const data = {
      taskId: taskId,
      cardId: card._id,
      userId: member._id
    }
    updateTaskAssignCardAPI(data)
      .then(() => {
        const action = updateTaskCardAssignAction(card._id, taskId, member._id)
        dispatch(action)
      })
      .catch(error => {
        console.error('Error updating task card assignment:', error)
        toast.error('Failed to update task assignment.')
      })
  }

  return (
    <Box
      key={member._id}
      onClick={updateTaskCard} 
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: '4px 8px', cursor: 'pointer', '&:hover': { bgcolor: '#ccc' } }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={member.avatar} />
        <Typography sx={{ paddingLeft: '10px' }}>{member.email}</Typography>
      </Box>
      {isUserAssign && <CheckIcon />}
    </Box>
  )
}

export default MemberAssign