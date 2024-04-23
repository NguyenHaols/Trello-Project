import { Box, Typography } from '@mui/material'
import { ReactComponent as trelloIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'

function TitleAllBoard() {
  return (
    <Box sx={{
      display:'flex',
      justifyContent:'left',
      alignItems:'center',
      color:(theme) => theme.palette.primary,
      margin:'40px 0 10px 0'
    }}>
      <SvgIcon component={trelloIcon} inheritViewBox sx={{ color:'white', marginRight:'10px' }} />
      <Typography variant='h6' fontWeight={500}>ALL BOARDS</Typography>
    </Box>
  )
}

export default TitleAllBoard