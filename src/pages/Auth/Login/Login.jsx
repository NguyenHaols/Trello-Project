import { Box, Button } from '@mui/material'
import { ReactComponent as trelloIcon } from '~/assets/trello.svg'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import googlePng from '~/assets/google.png'
import fbPng from '~/assets/facebook.png'
import SvgIcon from '@mui/material/SvgIcon'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { loginApi } from '~/apis'
import { useTheme } from '@emotion/react'


function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const theme = useTheme()
  const textColor = theme.palette.text.primary
  const mainColor = theme.palette.primary.main
  const handleLogin = (e) => {
    e.preventDefault()
    const user = {
      email: email,
      password: password
    }
    loginApi(user)
      .then((data) => {
        if (data.user._id) {
          navigate('/boards')
        } else {
          setErrorMessage('Sorry, your email or password was incorrect')
        }
      })
      .catch((error) => {
        console.log(error)
        const err = error.response.data.message.split(' ').slice(1).join(' ')
        setErrorMessage(err)
      })
  }

  return (
    <Box flex='1' display='flex' justifyContent='center' alignItems='center'
      >
      <Box
        sx={{
          display: 'flex',
          padding: '32px 40px',
          justifyContent: 'space-around',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          width: '80%',
          height: '80%'
        }}
      >
        <Box>
          <Box sx={{ display: 'flex' }} >
            <SvgIcon
              component={trelloIcon}
              inheritViewBox
              sx={{ color:(theme) => theme.palette.mode === 'light' ? mainColor : textColor, width: '32px', height: '42px' }}
            />
            <Typography variant='h4' fontWeight='700' color={(theme) => theme.palette.mode === 'light' ? mainColor : textColor}>
              ItWorks
            </Typography>
          </Box>
          <Typography
            variant='subtitle2'
            color={(theme) => theme.palette.mode === 'light' ? mainColor : textColor}
            textAlign={'center'}
          >
            Log in to continue
          </Typography>
        </Box>
        <form
          style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
        >
          <TextField
            id='outlined-basic'
            label='Your email'
            variant='outlined'
            type='email'
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            sx={{
              '& input': { padding: '8px' },
              '& label': { top: '-8px' }
            }}
          />
          <TextField
            id='outlined-basic'
            label='Your password'
            variant='outlined'
            type='password'
            autoComplete='current-password'
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            sx={{
              marginTop: '20px',
              '& input': { padding: '8px' },
              '& label': { top: '-8px' }
            }}
          />
          {errorMessage && (
            <Typography variant='caption' color='error' marginTop='5px'>
              {errorMessage}
            </Typography>
          )}
          <Button
            type='submit'
            onClick={handleLogin}
            sx={{
              marginTop: '15px',
              color: 'white',
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' }
            }}
          >
            Login
          </Button>
        </form>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <Typography
            variant='subtitle2'
            color={(theme) => theme.palette.text.primary}
          >
            Login with:
          </Typography>
          <Button
            sx={{
              marginTop: '10px',
              width: '100%',
              border: '1px solid #ccc',
              '&:hover': { bgcolor: '#091E4224' }
            }}
          >
            <img src={googlePng} width='24px' style={{ marginRight: '15px' }} />
            <Typography variant='subtitle2' color={textColor}>
              Google
            </Typography>
          </Button>
          <Button
            sx={{
              marginTop: '10px',
              width: '100%',
              border: '1px solid #ccc',
              '&:hover': { bgcolor: '#091E4224' }
            }}
          >
            <img src={fbPng} width='24px' style={{ marginRight: '15px' }} />
            <Typography variant='subtitle2' color={textColor}>
              Facebook
            </Typography>
          </Button>
        </Box>
        <Box display='flex' width='100%'>
          <Button
            sx={{ border: '1px solid #ccc', marginRight: '10px', width: '50%' }}
          >
            <Link
              to='/auth/forgot'
              style={{
                textDecoration: 'none',
                color: textColor,
                width: '100%'
              }}
            >
              Can&apos;t login
            </Link>
          </Button>
          <Button sx={{ border: '1px solid #ccc', width: '50%' }}>
            <Link
              to='/auth/register'
              style={{
                textDecoration: 'none',
                color: textColor,
                width: '100%'
              }}
            >
              Create an account
            </Link>
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Login
