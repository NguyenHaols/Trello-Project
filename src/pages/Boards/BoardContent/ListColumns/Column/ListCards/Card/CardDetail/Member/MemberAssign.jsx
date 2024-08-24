import { Avatar, Box, IconButton, Typography } from '@mui/material'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'
import { useTheme } from '@emotion/react'
import { useConfirm } from 'material-ui-confirm'
import { removeMemberCardAction } from '~/redux/actions/boardAction'
import { useDispatch } from 'react-redux'
import { removeMemberCardAPI } from '~/apis'
import { toast } from 'react-toastify'
import CheckIcon from '@mui/icons-material/Check'

function MemberAssign({ member }) {
  const theme = useTheme()
  const mainColor = theme.palette.primary.main
  const dispatch = useDispatch()
  return (
    <Box key={member._id} onClick={(e) => {console.log('abbc')}} sx={{ display:'flex', alignItems:'center', justifyContent:'space-between', p:'4px 8px', cursor:'pointer', '&:hover':{bgcolor:'#ccc'} }}>
      <Box sx={{ display:'flex', alignItems:'center' }}>
        <Avatar src={member.avatar} ></Avatar>
        <Typography sx={{ paddingLeft:'10px' }}>{member.email}</Typography>
      </Box>
      {/* <CheckIcon /> */}
    </Box>
  )
}

export default MemberAssign