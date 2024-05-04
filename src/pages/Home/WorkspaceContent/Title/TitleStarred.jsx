import { Box, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'


function TitleStarred() {
  return (
    <Box id='board' sx={{
      display:'flex',
      justifyContent:'left',
      alignItems:'center',
      color:(theme)=> theme.palette.text.primary
    }}>
      <StarIcon sx={{ marginRight:'10px', color:'#e2b203' }}></StarIcon>
      <Typography variant='h6' fontWeight={500}>YOUR STARRED BOARDS</Typography>
    </Box>
  )
}

export default TitleStarred