import { Box, Button, TextField } from '@mui/material'
import TitleMember from '../Title/TitleMember'
import Members from './Member'
import { addMemberAPI } from '~/apis'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import socket from '~/socket/socket'
import { addMemberAction } from '~/redux/actions/memberAction'
import { useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function MemberPage() {
  const {members, workspace, ownerWorkspace, currentUserId, user} = useOutletContext()
  const [emailInvite, setEmailInvite] = useState('')
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const handleInviteSubmit = () => {
    if (ownerWorkspace) {
      const data = {
        email: emailInvite,
        workspaceId: workspace[0]._id
      }
      addMemberAPI(data)
        .then((data) => {
          const newMember = data.user
          const action = addMemberAction(newMember)
          dispatch(action)
          toast.success('Add member successfully')
          setEmailInvite('')
          socket.emit('invite', {
            inviterId : user._id,
            emailInvite,
            workspaceId : workspace[0]._id
          })
        })
        .catch((err) => {
          toast.error(`Fail to invite ${emailInvite}`)
        })
    }
  }
  return (
    <>
      <TitleMember />
      {members.map(member => (
        <Members key={member._id} workspace={workspace[0]} member={member} ownerId={workspace[0].OwnerId} currentUserId={currentUserId} />
      ))}
      {ownerWorkspace && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'right',
            padding: '20px 0',
            pr:['10px', '0']
          }}
        >
          <Box>
            <TextField
              onChange={(e) => {
                setEmailInvite(e.target.value)
              }}
              value={emailInvite}
              sx={{ marginRight: '10px', width: '300px', pl:['15px', '0'] }}
              size='small'
              placeholder={t('enter_email_to_invite')}
            />
          </Box>
          <Button
            onClick={handleInviteSubmit}
            sx={{
              minWidth: '115px',
              height: '32px',
              color: 'white',
              bgcolor: (theme) => theme.palette.primary[500],
              '&:hover': { bgcolor: (theme) => theme.palette.primary[800] }
            }}
          >
            {t('invite')}
          </Button>
        </Box>
      )}
    </>
  )
}

export default MemberPage