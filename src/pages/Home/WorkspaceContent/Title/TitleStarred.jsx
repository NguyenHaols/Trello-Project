import { Box, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import { useTranslation } from 'react-i18next'


function TitleStarred() {
  const {t} = useTranslation()
  return (
    <Box id='board' sx={{
      display:'flex',
      justifyContent:'left',
      alignItems:'center',
      color:(theme)=> theme.palette.text.primary
    }}>
      <StarIcon sx={{ marginRight:'10px', color:'#e2b203' }}></StarIcon>
      <Typography variant='h6' fontWeight={500}> {t('your_starred_board')} </Typography>
    </Box>
  )
}

export default TitleStarred