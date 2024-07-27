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
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

function Login() {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const theme = useTheme()
  const textColor = theme.palette.text.primary
  const mainColor = theme.palette.primary.main
  const formikHandleChange = (e) => {
    loginFormik.handleChange(e)
    setErrorMessage('')
  }
  const handleLogin = (values, { setSubmitting }) => {
    const user = {
      email: values.email,
      password: values.password
    }
    loginApi(user)
      .then((data) => {
        if (data.user._id) {
          navigate('/boards')
          toast.success('Login successful')
        } else {
          setErrorMessage('Sorry, your email or password was incorrect')
        }
      })
      .catch((error) => {
        const err = error.response.data.message
        setErrorMessage(err)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const loginFormik = useFormik({
    initialValues:{
      email:'',
      password:''
    },
    validationSchema: Yup.object({
      email: Yup.string().min(2, 'Minimum 2 characters').max(30, 'Maximum 30 characters').required('Required!'),
      password: Yup.string().min(6, 'Minimum 6 characters').max(15, 'Maximum 15 characters').required('Required!')
    }),
    onSubmit: handleLogin
  })

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
          onSubmit={loginFormik.handleSubmit}
        >
          <TextField
            name='email'
            id='outlined-basic'
            label='Your email'
            variant='outlined'
            type='email'
            value={loginFormik.values.email}
            onChange={formikHandleChange}
            onBlur={loginFormik.handleBlur}
            sx={{
              '& input': { padding: '8px' },
              '& label': { top: '-8px' }
            }}
          />
          {loginFormik.errors.email && loginFormik.touched.email && (
            <Typography variant='caption' color='error' marginTop='5px'>
              {loginFormik.errors.email}
            </Typography>
          )}
          <TextField
            name='password'
            id='outlined-basic'
            label='Your password'
            variant='outlined'
            type='password'
            autoComplete='current-password'
            value={loginFormik.values.password}
            onChange={formikHandleChange}
            onBlur={loginFormik.handleBlur}
            sx={{
              marginTop: '20px',
              '& input': { padding: '8px' },
              '& label': { top: '-8px' }
            }}
          />
          {loginFormik.errors.password && loginFormik.touched.password && (
            <Typography variant='caption' color='error' marginTop='5px'>
              {loginFormik.errors.password}
            </Typography>
          )}
          {errorMessage && (
            <Typography variant='caption' color='error' marginTop='5px'>
              {errorMessage}
            </Typography>
          )}
          <Button
            type='submit'
            disabled={loginFormik.isSubmitting}
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
