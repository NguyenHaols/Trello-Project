import { Box, Button } from '@mui/material'
import { ReactComponent as trelloIcon } from '~/assets/trello.svg'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import googlePng from '~/assets/google.png'
import fbPng from '~/assets/facebook.png'
import SvgIcon from '@mui/material/SvgIcon'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { registerApi } from '~/apis'
import { toast } from 'react-toastify'


function Register() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  console.log('🚀 ~ Register ~ errorMessage:', errorMessage)
  const handleRegister = (e) => {
    e.preventDefault()
    if (!(password === confirmpassword)) {
      return setErrorMessage('Your password and confirm password is not match')
    }
    const user = {
      'email' : email,
      'password' : password,
      'username' : fullName
    }
    registerApi(user)
      .then(data => {
        if (data._id) {
          navigate('/auth/login')
          toast.success('Register success')
        }
      })
      .catch(error => {
        const err = error.response.data.message.split(' ').slice(1).join(' ')
        setErrorMessage(err)
      })
  }

  return (
    <Box flex='1' display='flex' justifyContent='center' alignItems='center'>
      <Box sx={{
        display:'flex',
        padding:'32px 40px',
        justifyContent:'space-around',
        flexDirection:'column',
        alignItems:'center',
        boxShadow:3,
        width:'80%',
        height:'80%'
      }}>
        <Box>
          <Box sx={{ display:'flex' }}>
            <SvgIcon component={trelloIcon} inheritViewBox sx={{ color:'primary.main', width:'32px', height:'42px' }} />
            <Typography variant='h4'fontWeight='700' color='#44546f'>ItWorks</Typography>
          </Box>
          <Typography variant='subtitle2' color='text.secondary' >Register to continue</Typography>
        </Box>
        <form style={{ display:'flex', flexDirection:'column', width:'100%' }}>
          <TextField id="outlined-basic" label="Your email" variant="outlined" type='email'
            onChange={(e) => {setEmail(e.target.value)}}
            sx={{
              '& input':{ padding:'8px' },
              '& label':{ top:'-8px' }

            }} />
          <TextField id="outlined-basic" label="Your full name" variant="outlined"
            onChange={(e) => {setFullName(e.target.value)}}
            sx={{
              marginTop:'20px',
              '& input':{ padding:'8px' },
              '& label':{ top:'-8px' }

            }} />
          <TextField id="outlined-basic" label="Your password" variant="outlined" type="password" autoComplete="current-password"
            onChange={(e) => {setPassword(e.target.value)}}
            sx={{
              marginTop:'20px',
              '& input':{ padding:'8px' },
              '& label':{ top:'-8px' }

            }} />
          <TextField id="outlined-basic" label="Confirm password" variant="outlined" type="password" autoComplete="current-password"
            onChange={(e) => {setConfirmPassword(e.target.value)}}
            sx={{
              marginTop:'20px',
              '& input':{ padding:'8px' },
              '& label':{ top:'-8px' }

            }} />

          {errorMessage && <Typography variant="caption" color="error" marginTop='5px'>{errorMessage}</Typography>}

          <Button onClick={handleRegister} type='submit' sx={{ marginTop:'15px', color:'white', bgcolor:'primary.main', '&:hover':{ bgcolor:'primary.dark' } }}>Register</Button>
        </form>
        <Box sx={{ width:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center' }}>
          <Typography variant='subtitle2' color='text.secondary'>Register with:</Typography>
          <Button sx={{ marginTop:'10px', width:'100%', border:'1px solid #ccc', '&:hover':{ bgcolor:'#091E4224' } }}>
            <img src={googlePng} width='24px' style={{ marginRight:'15px' }} />
            <Typography variant='subtitle2' color='black'>Google</Typography>
          </Button>
          <Button sx={{ marginTop:'10px', width:'100%', border:'1px solid #ccc', '&:hover':{ bgcolor:'#091E4224' } }}>
            <img src={fbPng} width='24px' style={{ marginRight:'15px' }} />
            <Typography variant='subtitle2' color='black'>Facebook</Typography>
          </Button>
        </Box>
        <Box display='flex' width='100%'>
          <Button sx={{ border:'1px solid #ccc', width:'100%' }}><Link to='/auth/login' style={{ textDecoration:'none', color:'#0C66E4', width:'100%' }}>I aready have an account!</Link></Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Register