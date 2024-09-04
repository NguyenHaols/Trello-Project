import { Box, Typography } from '@mui/material'
import { ReactComponent as trelloIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import { useTranslation } from 'react-i18next'

function TitleAllBoard() {
  const {t} = useTranslation()
  return (
    <Box sx={{
      display:'flex',
      justifyContent:'left',
      alignItems:'center',
      color:(theme) => theme.palette.primary,
      margin:'40px 0 10px 0'
    }}>
      <SvgIcon component={trelloIcon} inheritViewBox sx={{ color:(theme)=> theme.palette.text.primary, marginRight:'10px' }} />
      <Typography variant='h6' fontWeight={500}> {t('all_boards')} </Typography>
    </Box>
  )
}

export default TitleAllBoard