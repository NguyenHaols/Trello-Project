import { Box, Typography } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'

function TitleSetting() {
  return (
    <Box id='board' sx={{
      display:'flex',
      justifyContent:'left',
      alignItems:'center',
      color:'white',
      marginTop:'40px'
    }}>
      <SettingsIcon sx={{ marginRight:'10px', color:'white' }}></SettingsIcon>
      <Typography variant='h6' fontWeight={500}>SETTINGS</Typography>
    </Box>
  )
}

export default TitleSetting