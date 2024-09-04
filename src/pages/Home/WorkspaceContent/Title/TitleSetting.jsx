import { Box, Typography } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import { useTranslation } from 'react-i18next'

function TitleSetting() {
  const {t} = useTranslation()
  return (
    <Box id='board' sx={{
      display:'flex',
      justifyContent:'left',
      alignItems:'center',
      color:(theme)=> theme.palette.text.primary,
      marginTop:'40px'
    }}>
      <SettingsIcon sx={{ marginRight:'10px', color:(theme)=> theme.palette.text.primary }}></SettingsIcon>
      <Typography variant='h6' fontWeight={500} textTransform='uppercase'> {t('settings')} </Typography>
    </Box>
  )
}

export default TitleSetting