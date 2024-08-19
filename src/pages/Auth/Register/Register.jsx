import { Box, Button, useTheme } from '@mui/material'
import { ReactComponent as trelloIcon } from '~/assets/trello.svg'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import googlePng from '~/assets/google.png'
import fbPng from '~/assets/facebook.png'
import SvgIcon from '@mui/material/SvgIcon'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { registerApi } from '~/apis'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { useFormik } from 'formik'


function Register() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')
  const theme = useTheme()
  const textColor = theme.palette.text.primary
  const mainColor = theme.palette.primary.main

  const registerFormik = useFormik({
    initialValues: {
      email: '',
      fullName: '',
      password:''
    },
    validationSchema: Yup.object({
      fullName: Yup.string().transform(value => value.toLowerCase()).min(5, 'Minimum 5 characters').max(30, 'Maximum 30 characters').required('Required!'),
      email: Yup.string().transform(value => value.toLowerCase()).min(5, 'Minimum 5 characters').max(30, 'Maximum 30 characters').required('Required!'),
      password: Yup.string().min(6, 'Minimum 6 characters').max(30, 'Maximum 30 characters').required('Required!'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required!')
    }),
    onSubmit: (values, { setSubmitting }) => {
      try {
        const user = {
          'email' : values.email,
          'username': values.fullName,
          'password' : values.password
        }
        registerApi(user)
          .then(data => {
            if (data._id) {
              navigate('/auth/login')
              toast.success('Register success')
            }
          })
      } catch (error) {
        console.log(error)
      } finally {
        setSubmitting(false)
      }

    }
  })


  return (
    <Box flex='1' display='flex' justifyContent='center' alignItems='center'>
      <Box sx={{
        display:'flex',
        padding:'32px 40px',
        justifyContent:'space-around',
        flexDirection:'column',
        alignItems:'center',
        boxShadow: ['unset', '0px 4px 10px rgba(0, 0, 0, 0.2)'],
        width:'80%',
        height:'90%'
      }}>
        <Box>
          <Box sx={{ display:'flex' }}>
            <SvgIcon component={trelloIcon} inheritViewBox sx={{ color:(theme) => theme.palette.mode === 'light' ? mainColor : textColor, width:'32px', height:'42px' }} />
            <Typography variant='h4'fontWeight='700' color={(theme) => theme.palette.mode === 'light' ? mainColor : textColor}>ItWorks</Typography>
          </Box>
          <Typography variant='subtitle2' color={(theme) => theme.palette.text.primary} textAlign={'center'}>Register to continue</Typography>
        </Box>
        <form onSubmit={registerFormik.handleSubmit} style={{ display:'flex', flexDirection:'column', width:'100%' }}>
          <Typography variant='caption' >Your email</Typography>
          <TextField name='email' id="email" variant="outlined" type='email'
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            sx={{
              '& input':{ padding:'8px' },
              '& label':{ top:'-8px' }

            }} />
          {registerFormik.errors.email && registerFormik.touched.email && (
            <Typography variant='caption' color='error' >
              {registerFormik.errors.email}
            </Typography>
          )}
          <Typography variant='caption' sx={{ marginTop:'10px' }}>Your full name</Typography>
          <TextField name='fullName' id="fullName" variant="outlined"
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            sx={{

              '& input':{ padding:'8px' },
              '& label':{ top:'-8px' }

            }} />
          {registerFormik.errors.fullName && registerFormik.touched.fullName && (
            <Typography variant='caption' color='error' >
              {registerFormik.errors.fullName}
            </Typography>
          )}
          <Typography variant='caption' sx={{ marginTop:'10px' }}>Your password</Typography>
          <TextField name='password' id="password" variant="outlined" type="password" autoComplete="current-password"
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            sx={{

              '& input':{ padding:'8px' },
              '& label':{ top:'-8px' }

            }} />
          {registerFormik.errors.password && registerFormik.touched.password && (
            <Typography variant='caption' color='error' >
              {registerFormik.errors.password}
            </Typography>
          )}
          <Typography variant='caption' sx={{ marginTop:'10px' }}>Confirm password</Typography>
          <TextField name='confirmPassword' id="confirmPassword" variant="outlined" type="password" autoComplete="current-password"
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            sx={{

              '& input':{ padding:'8px' },
              '& label':{ top:'-8px' }

            }} />
          {registerFormik.errors.confirmPassword && registerFormik.touched.confirmPassword && (
            <Typography variant='caption' color='error' >
              {registerFormik.errors.confirmPassword}
            </Typography>
          )}

          <Button type='submit' sx={{ marginTop:'15px', color:'white', bgcolor:'primary.main', '&:hover':{ bgcolor:'primary.dark' } }}>Register</Button>
        </form>
        <Box sx={{ width:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center' }}>
          <Typography variant='subtitle2' color={(theme) => theme.palette.text.primary}>Register with:</Typography>
          <Button sx={{ marginTop:'10px', width:'100%', border:'1px solid #ccc', '&:hover':{ bgcolor:'#091E4224' } }}>
            <img src={googlePng} width='24px' style={{ marginRight:'15px' }} />
            <Typography variant='subtitle2' color={textColor}>Google</Typography>
          </Button>
          <Button sx={{ marginTop:'10px', width:'100%', border:'1px solid #ccc', '&:hover':{ bgcolor:'#091E4224' } }}>
            <img src={fbPng} width='24px' style={{ marginRight:'15px' }} />
            <Typography variant='subtitle2' color={textColor}>Facebook</Typography>
          </Button>
        </Box>
        <Box display='flex' width='100%'>
          <Button sx={{ border:'1px solid #ccc', width:'100%' }}><Link to='/auth/login' style={{ textDecoration:'none', color:textColor, width:'100%' }}>I aready have an account!</Link></Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Register