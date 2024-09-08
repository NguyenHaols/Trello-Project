import { useTheme } from '@emotion/react'
import { Box, SvgIcon, Typography } from '@mui/material'
import { ReactComponent as trelloIcon } from '~/assets/trello.svg'
import userPng from '~/assets/user.png'
import activityPng from '~/assets/activity.png'
import report from '~/assets/report.png'


function DashBoardItems() {
  const theme = useTheme()
  return (
    <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:'24px', width:'100%' }}>
      <Box sx={{ flex:'1', width:'250px', height:'190px', bgcolor:'#cee5fe', borderRadius:'16px' }}>
        <Box sx={{ display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'center', color:'#042174', p:'24px' }}>
          <Box sx={{m:'10px 0'}} ><SvgIcon component={trelloIcon} sx={{ width:'48px', height:'48px' }} /></Box>
          <Box sx={{ textAlign:'center' }}>
            <Typography fontWeight='700' variant='h7'>NEW WORKSPACES</Typography>
            <Typography fontWeight='700'>+ 36</Typography>
          </Box>

        </Box>

      </Box>
      <Box sx={{ flex:'1', width:'250px', height:'190px', bgcolor:'#e7ceff', borderRadius:'16px' }}>
        <Box sx={{ display:'flex', justifyContent:'space-between', flexDirection:'column', alignItems:'center', color:'#8e33ff', p:'24px' }}>
          <Box sx={{m:'10px 0'}} ><img src={userPng} style={{ width:'48px', height:'48px' }} /></Box>
          <Box sx={{ textAlign:'center' }}>
            <Typography fontWeight='700' variant='h7'>NEW USERS</Typography>
            <Typography fontWeight='700'>+ 23</Typography>
          </Box>

        </Box>

      </Box>
      <Box sx={{ flex:'1', width:'250px', height:'190px', bgcolor:'#fdefc1', borderRadius:'16px' }}>
        <Box sx={{ display:'flex', justifyContent:'space-between', flexDirection:'column', alignItems:'center', color:'#7A4100', p:'24px' }}>
          <Box sx={{m:'10px 0'}} ><img src={activityPng} style={{ width:'48px', height:'48px' }} /></Box>
          <Box sx={{ textAlign:'center' }}>
            <Typography fontWeight='700' variant='h7'>NEW ACTIVITY</Typography>
            <Typography fontWeight='700'>+ 21</Typography>
          </Box>

        </Box>

      </Box>
      <Box sx={{ flex:'1', width:'250px', height:'190px', bgcolor:'#fcdecc', borderRadius:'16px' }}>
        <Box sx={{ display:'flex', justifyContent:'space-between', flexDirection:'column', alignItems:'center', color:'#7A0916', p:'24px' }}>
          <Box sx={{m:'10px 0'}} ><img src={report} style={{ width:'48px', height:'48px' }} /></Box>
          <Box sx={{ textAlign:'center' }}>
            <Typography fontWeight='700' variant='h7'>NEW REPORT</Typography>
            <Typography fontWeight='700'>+ 2</Typography>
          </Box>
        </Box>

      </Box>
    </Box>
  )
}

export default DashBoardItems