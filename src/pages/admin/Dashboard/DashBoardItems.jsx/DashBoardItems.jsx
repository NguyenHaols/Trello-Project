import { useTheme } from '@emotion/react'
import { Box, SvgIcon, Typography } from '@mui/material'
import { ReactComponent as trelloIcon } from '~/assets/trello.svg'
import userPng from '~/assets/user.png'
import activityPng from '~/assets/activity.png'
import report from '~/assets/report.png'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'

function DashBoardItems({ workspaceItemData, userItemData, activityItemData }) {
  const theme = useTheme()
  return (
    <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:'24px', width:'100%' }}>
      <Box sx={{ flex:'1', width:'250px', height:'190px', bgcolor:'#cee5fe', borderRadius:'16px' }}>
        <Box sx={{ display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'center', color:'#042174', p:'24px' }}>
          <Box sx={{ m:'10px 0' }} ><SvgIcon component={trelloIcon} sx={{ width:'48px', height:'48px' }} /></Box>
          <Box sx={{ textAlign:'center' }}>
            <Typography fontWeight='700' variant='h7'>NEW WORKSPACES</Typography>
            <Typography fontWeight='700' m='5px 0'>+ {workspaceItemData.thisMonth}</Typography>
            <Typography fontWeight='700'>Last month total {workspaceItemData.lastMonth}</Typography>
          </Box>

        </Box>

      </Box>
      <Box sx={{ flex:'1', width:'250px', height:'190px', bgcolor:'#e7ceff', borderRadius:'16px' }}>
        <Box sx={{ display:'flex', justifyContent:'space-between', flexDirection:'column', alignItems:'center', color:'#8e33ff', p:'24px' }}>
          <Box sx={{ m:'10px 0' }} ><img src={userPng} style={{ width:'48px', height:'48px' }} /></Box>
          <Box sx={{ textAlign:'center' }}>
            <Typography fontWeight='700' variant='h7'>NEW USERS</Typography>
            <Typography fontWeight='700' m='5px 0'>+ {userItemData.thisMonth}</Typography>
            <Typography fontWeight='700'>Last month total {userItemData.lastMonth}</Typography>
          </Box>

        </Box>

      </Box>
      <Box sx={{ flex:'1', width:'250px', height:'190px', bgcolor:'#fdefc1', borderRadius:'16px' }}>
        <Box sx={{ display:'flex', justifyContent:'space-between', flexDirection:'column', alignItems:'center', color:'#7A4100', p:'24px' }}>
          <Box sx={{ m:'10px 0' }} ><img src={activityPng} style={{ width:'48px', height:'48px' }} /></Box>
          <Box sx={{ textAlign:'center' }}>
            <Typography fontWeight='700' variant='h7'>NEW ACTIVITY</Typography>
            <Typography fontWeight='700' m='5px 0'>+ {activityItemData.thisMonth}</Typography>
            <Typography fontWeight='700'>Last month total {activityItemData.lastMonth}</Typography>
          </Box>

        </Box>

      </Box>
      <Box sx={{ flex:'1', width:'250px', height:'190px', bgcolor:'#fcdecc', borderRadius:'16px' }}>
        <Box sx={{ display:'flex', justifyContent:'space-between', flexDirection:'column', alignItems:'center', color:'#7A0916', p:'24px' }}>
          <Box sx={{ m:'10px 0' }} ><img src={report} style={{ width:'48px', height:'48px' }} /></Box>
          <Box sx={{ textAlign:'center' }}>
            <Typography fontWeight='700' variant='h7'>NEW REPORT</Typography>
            <Typography fontWeight='700' m='5px 0'>+ 2</Typography>

          </Box>
        </Box>

      </Box>
    </Box>
  )
}

export default DashBoardItems