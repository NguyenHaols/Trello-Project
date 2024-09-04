import { Box, Typography } from '@mui/material'
import GroupsIcon from '@mui/icons-material/Groups'
import { useTranslation } from 'react-i18next'

function TitleMember() {
  const {t} = useTranslation()
  return (
    <Box sx={{
      display:'flex',
      justifyContent:'left',
      alignItems:'center',
      color:(theme)=> theme.palette.text.primary,
      marginTop:'40px'
    }}>
      <GroupsIcon sx={{ marginRight:'10px', color:(theme)=> theme.palette.text.primary }}></GroupsIcon>
      <Typography variant='h6' fontWeight={500} textTransform='uppercase' > {t('members')} </Typography>
    </Box>
  )
}

export default TitleMember