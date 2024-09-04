import { Avatar, Box, IconButton, Typography } from '@mui/material'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'
import { useTheme } from '@emotion/react'
import { useConfirm } from 'material-ui-confirm'
import { addMemberCardAction, removeMemberCardAction } from '~/redux/actions/boardAction'
import { useDispatch } from 'react-redux'
import { addMemberCardAPI, removeMemberCardAPI } from '~/apis'
import { toast } from 'react-toastify'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useTranslation } from 'react-i18next'

function Member({ member, card, isActivityMember}) {
  const theme = useTheme()
  const mainColor = theme.palette.primary.main
  const removeMemberConfirm = useConfirm()
  const dispatch = useDispatch()
  const {t} = useTranslation()
  const handleRemoveMember = (memberId) => {
    removeMemberConfirm({
      title:t('delete_member'),
      content:t('are_you_sure_you_want_to_remove_this_member'),
      confirmationText:t('confirm'),
      cancellationText:t('cancel'),
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


  const handleMemberSubmit = () => {
    const data = {
      cardId : card._id,
      email : member.email
    }
    addMemberCardAPI(data)
      .then(res => {
        const newUser = res.members[res.members.length-1]
        const action = addMemberCardAction(card._id, newUser)
        toast.success('Add member successfully')
        dispatch(action)
      })
      .catch(error => {
        const mesage = error.response.data.message
        toast.error(mesage)
      })
  }
  return (
    <Box key={member.id} sx={{ display:'flex', alignItems:'center', justifyContent:'space-between', p:'8px 0' }}>
      <Box sx={{ display:'flex', alignItems:'center' }}>
        <Avatar src={member.avatar} ></Avatar>
        <Typography sx={{ paddingLeft:'10px' }}>{member.email}</Typography>
      </Box>
      {isActivityMember
        ? (<IconButton onClick={() => {handleMemberSubmit()}} >
          <AddCircleOutlineIcon sx={{ color:mainColor }} />
        </IconButton>)
        : (<IconButton onClick={() => {handleRemoveMember(member._id)}}>
          <CancelPresentationIcon sx={{ color:mainColor }} />
        </IconButton>)

      }

    </Box>
  )
}

export default Member