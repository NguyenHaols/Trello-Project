import { Box, Button } from '@mui/material'
import { ReactComponent as loginLeft } from '~/assets/loginLeft.svg'
import { ReactComponent as loginRight } from '~/assets/loginRight.svg'
import { ReactComponent as trelloIcon } from '~/assets/trello.svg'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import googlePng from '~/assets/google.png'
import SvgIcon from '@mui/material/SvgIcon'
import { Link, Outlet } from 'react-router-dom'

function Auth() {
  return (
    <Box display='flex' height='100vh'
      sx={{
        background: ((theme) => (theme.palette.mode === 'dark' ? theme.trello.backgroundDark : theme.trello.backgroundLight))
      }}
    >
      <Box flex='1' sx={{
        display:{ xs:'none', md:'flex' },
        flexDirection:'column',
        justifyContent:'flex-end' }}
      >
        <SvgIcon sx={{
          width:'100%',
          height:'70%'
        }} component={loginLeft} inheritViewBox></SvgIcon>
      </Box>
      <Outlet />
      <Box flex='1' sx={{
        display:{ xs:'none', md:'flex' },
        flexDirection:'column',
        justifyContent:'flex-end' }}
      >
        <SvgIcon sx={{
          width:'100%',
          height:'70%'
        }} component={loginRight} inheritViewBox></SvgIcon>
      </Box>
    </Box>
  )
}

export default Auth