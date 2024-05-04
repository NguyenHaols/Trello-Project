import { Box, Typography } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'

function TitleSetting() {
  return (
    <Box id='board' sx={{
      display:'flex',
      justifyContent:'left',
      alignItems:'center',
      color:(theme)=> theme.palette.text.primary,
      marginTop:'40px'
    }}>
      <SettingsIcon sx={{ marginRight:'10px', color:(theme)=> theme.palette.text.primary }}></SettingsIcon>
      <Typography variant='h6' fontWeight={500}>SETTINGS</Typography>
    </Box>
  )
}

export default TitleSetting