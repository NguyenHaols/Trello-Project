import { Box, Typography } from '@mui/material'
import GroupsIcon from '@mui/icons-material/Groups'

function TitleMember() {
  return (
    <Box sx={{
      display:'flex',
      justifyContent:'left',
      alignItems:'center',
      color:(theme)=> theme.palette.text.primary,
      marginTop:'40px'
    }}>
      <GroupsIcon sx={{ marginRight:'10px', color:(theme)=> theme.palette.text.primary }}></GroupsIcon>
      <Typography variant='h6' fontWeight={500}>MEMBERS</Typography>
    </Box>
  )
}

export default TitleMember