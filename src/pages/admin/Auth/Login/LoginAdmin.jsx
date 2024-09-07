import { Box, Button, IconButton } from '@mui/material'
import { ReactComponent as trelloIcon } from '~/assets/trello.svg'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import googlePng from '~/assets/google.png'
import fbPng from '~/assets/facebook.png'
import SvgIcon from '@mui/material/SvgIcon'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { loginAdminApi } from '~/apis'
import { useTheme } from '@emotion/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { API_ROOT } from '~/utils/constants'
import Cookies from 'js-cookie'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useTranslation } from 'react-i18next'

function LoginAdmin() {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { t } = useTranslation()
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
    loginAdminApi(user)
      .then((data) => {
        if (data.user._id) {
          localStorage.setItem('accessTokenAdmin', data.accessToken)
          navigate('/admin/')
          toast.success(`${t('login_successful')}`)
        } else {
          setErrorMessage(`${t('sorry,_your_email_or_password_was_incorrect')}`)
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
      email: Yup.string().min(2, t('minimum_2_characters')).max(30, t('maximum_30_characters')).required(t('requiured')),
      password: Yup.string().min(6, t('minimum_6_characters')).max(15, t('maximum_15_characters')).required(t('requiured'))
    }),
    onSubmit: handleLogin
  })

  const handleAuth = (name) => {
    window.location.href = `${API_ROOT}/v1/auth/${name}`
  }

  return (
    <Box flex='1' display='flex' justifyContent='center' alignItems='center'
    >
      <Box
        sx={{
          display: 'flex',
          padding: '32px 40px',
          justifyContent: 'space-evenly',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: ['unset', '0px 4px 10px rgba(0, 0, 0, 0.2)'],
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
            ADMINISTRATOR
          </Typography>
        </Box>
        <form
          style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
          onSubmit={loginFormik.handleSubmit}
        >
          <Typography variant='caption'>Your email</Typography>
          <TextField
            name='email'
            id='outlined-basic'
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
          <Typography variant='caption' sx={{ marginTop:'20px' }}>Your password</Typography>
          <TextField
            name='password'
            id='outlined-basic'
            variant='outlined'
            type={showPassword ? 'text' : 'password'}
            autoComplete='current-password'
            value={loginFormik.values.password}
            onChange={formikHandleChange}
            onBlur={loginFormik.handleBlur}
            sx={{
              '& input': { padding: '8px' },
              '& label': { top: '-8px' }
            }}
            InputProps={{
              endAdornment: (
                <Box>
                  {showPassword ? (
                    <IconButton onClick={() => {setShowPassword(false)}}> <RemoveRedEyeIcon /> </IconButton>
                  ) : (
                    <IconButton onClick={() => {setShowPassword(true)}}> <VisibilityOffIcon /> </IconButton>
                  )}
                </Box>
              )
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

      </Box>
    </Box>
  )
}

export default LoginAdmin