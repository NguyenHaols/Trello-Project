import { Box, Button } from '@mui/material'
import { ReactComponent as trelloIcon } from '~/assets/trello.svg'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import googlePng from '~/assets/google.png'
import fbPng from '~/assets/facebook.png'
import SvgIcon from '@mui/material/SvgIcon'
import { Link } from 'react-router-dom'
import { sendEmailAPI } from '~/apis'
import { useState } from 'react'

function Forgot() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const handleSendEmail = () => {
    sendEmailAPI({ email:email })
      .then(res => {
        console.log(res)
      })
    setMessage('Access your email to get link recover password')
  }
  return (
    <Box flex='1' display='flex' justifyContent='center' alignItems='center'>
      <Box sx={{
        display:'flex',
        padding:'32px 40px',
        justifyContent:'space-around',
        flexDirection:'column',
        alignItems:'center',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        width:'80%',
        height:'80%'
      }}>
        <Box>
          <Box sx={{ display:'flex' }}>
            <SvgIcon component={trelloIcon} inheritViewBox sx={{ color:'primary.main', width:'32px', height:'42px' }} />
            <Typography variant='h4'fontWeight='700' color='#44546f'>Trello</Typography>
          </Box>
          <Typography textAlign='center' variant='subtitle2' color={(theme) => theme.palette.text.primary} >Can&apos;t login</Typography>
        </Box>
        <form style={{ display:'flex', flexDirection:'column', width:'100%' }}>
          <TextField onChange={(e) => setEmail(e.target.value)} id="outlined-basic" label="Your email" variant="outlined" type='email' sx={{
            '& input':{ padding:'8px' },
            '& label':{ top:'-8px' }

          }} />
          {message && (
            <Typography color='green'> {message} </Typography>
          )}
          <Button onClick={handleSendEmail} value={email} sx={{ marginTop:'15px', color:'white', bgcolor:'primary.main', '&:hover':{ bgcolor:'primary.dark' } }}>Send recover link</Button>
        </form>

        <Box display='flex' width='100%'>
          <Button sx={{ border:'1px solid #ccc', marginRight:'10px', width:'100%' }}><Link to='/auth/login' style={{ textDecoration:'none', color:'#0C66E4', width:'100%' }}>Return to login</Link></Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Forgot