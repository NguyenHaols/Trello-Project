import { Box, Button } from '@mui/material'
import { ReactComponent as trelloIcon } from '~/assets/trello.svg'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import SvgIcon from '@mui/material/SvgIcon'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useTheme } from '@emotion/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { recoverPasswordAPI } from '~/apis'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'


function RecoverPassword() {
  const [message, setMessage] = useState('')
  const theme = useTheme()
  const navigate = useNavigate()
  const textColor = theme.palette.text.primary
  const mainColor = theme.palette.primary.main
  const {t} = useTranslation()
  const recoverFormik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      password: Yup.string().min(6, 'Minimum 6 characters').max(30, 'Maximum 30 characters').required('Required!'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required!')
    }),
    onSubmit: (values, { setSubmitting }) => {
      const token = window.location.pathname.split('/').pop()
      const newPassword = values.confirmPassword
      const data = {
        newPassword: newPassword,
        token: token
      }
      try {
        recoverPasswordAPI(data)
          .then(data => {
            if (data.success) {
              navigate('/auth/login')
              toast.success(`${t('update_password_success')}`)
            }
          })
      } catch (error) {
        console.log(error)
      }
      finally {
        setSubmitting(false)
      }
    }
  })

  return (
    <Box flex='1' display='flex' justifyContent='center' alignItems='center'>
      <Box sx={{
        display: 'flex',
        padding: '32px 40px',
        justifyContent: 'space-around',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        width: '80%',
        height: '80%'
      }}>
        <Box>
          <Box sx={{ display: 'flex' }}>
            <SvgIcon component={trelloIcon} inheritViewBox sx={{ color: (theme) => theme.palette.mode === 'light' ? mainColor : textColor, width: '32px', height: '42px' }} />
            <Typography variant='h4' fontWeight='700' color={(theme) => theme.palette.mode === 'light' ? mainColor : textColor}>
              ItWorks
            </Typography>
          </Box>
          <Typography textAlign='center' variant='subtitle2' color={(theme) => theme.palette.text.primary} >New password</Typography>
        </Box>
        <form style={{ display: 'flex', flexDirection: 'column', width: '100%' }} onSubmit={recoverFormik.handleSubmit}>
          <TextField name='password' onChange={recoverFormik.handleChange} onBlur={recoverFormik.handleBlur} id="password" label="New password" variant="outlined" type='password' sx={{
            '& input': { padding: '8px' },
            '& label': { top: '-8px' }
          }} />
          {recoverFormik.errors.password && recoverFormik.touched.password && (
            <Typography variant='caption' color='error' marginTop='5px' >
              {recoverFormik.errors.password}
            </Typography>
          )}
          <TextField name='confirmPassword' onChange={recoverFormik.handleChange} onBlur={recoverFormik.handleBlur} id="confirmPassword" label="Confirm password" variant="outlined" type='password' sx={{
            '& input': { padding: '8px' },
            '& label': { top: '-8px' },
            marginTop:'20px'
          }} />
          {recoverFormik.errors.confirmPassword && recoverFormik.touched.confirmPassword && (
            <Typography variant='caption' color='error' marginTop='5px'>
              {recoverFormik.errors.confirmPassword}
            </Typography>
          )}
          {message && (
            <Typography color='#22bb33' marginTop='5px'> {message} </Typography>
          )}
          <Button type="submit" sx={{ marginTop: '15px', color: 'white', bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}>Update password</Button>
        </form>

        <Box display='flex' width='100%'>
          <Button sx={{ border: '1px solid #ccc', marginRight: '10px', width: '100%' }}><Link to='/auth/login' style={{ textDecoration: 'none', color: textColor, width: '100%' }}>
            Return to login</Link>
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default RecoverPassword