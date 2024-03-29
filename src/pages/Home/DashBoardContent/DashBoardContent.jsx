import { Box, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import BoardCard from './BoardCard/BoardCard'
function DashBoardContent() {
  return (
    <Box sx={{ paddingLeft:'20px' }}>

      {/* Starred board */}
      <Box sx={{
        display:'flex',
        justifyContent:'left',
        alignItems:'center',
        color:'white'
      }}>
        <StarIcon sx={{ marginRight:'10px', color:'#e2b203' }}></StarIcon>
        <Typography variant='body3' fontWeight={500}>YOUR STARRED BOARD</Typography>
      </Box>
      <Box sx={{
        display:'flex',
        flexWrap:'wrap',
        justifyContent:'left'
      }}>
        <BoardCard/>
        <BoardCard/>
        <BoardCard/>
        <BoardCard/>
      </Box>

      {/* Your Workspace */}
      <Box sx={{
        display:'flex',
        justifyContent:'left',
        alignItems:'center',
        color:'white'
      }}>
        <Typography variant='h6' fontWeight={500}>YOUR WORKSPACE</Typography>
      </Box>
    </Box>
  )
}

export default DashBoardContent