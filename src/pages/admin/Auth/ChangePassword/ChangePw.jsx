import { Avatar, Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { updatePasswordAPI } from '~/apis'
import { useTranslation } from 'react-i18next'
function ChangePw() {
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { t } = useTranslation()

  const handleUpdatePassword = () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage('New password and confirm password not match')
    } else {
      setErrorMessage('')
      const data = {
        email : user.email,
        password : password,
        newPassword : newPassword
      }
      updatePasswordAPI(data)
        .then(data => {
          toast.success(`${t('update_successfully')}`)
        })
        .catch(err => {
          const message = err.response.data.message
          const messageFromValidate = err.response.data.message.split(':')
          toast.error(messageFromValidate[1] ? messageFromValidate[1] : message)
        })
    }
  }

  const handleBackToProfile = () => {
    navigate('/admin/profile')
  }

  return (
    <Container>

      <Box sx={{ borderBottom:'1px solid #ccc', paddingBottom:'20px' }}>
        <Typography variant='h6' textTransform='uppercase'> {t('change_password')} </Typography>
        <Typography> {t('manage_profile_infomation')} </Typography>
      </Box>
      <Box sx={{ display:'flex', padding:'20px 0 ' }}>
        <Box sx={{ flex:'2' }}>
          <Box sx={{ display:'flex', alignItems:'center', padding:'20px 0' }}>
            <Typography sx={{ flex:'2', textAlign:'left', paddingRight:'15px' }}> {t('current_password')} </Typography>
            <TextField onChange={(e) => {setPassword(e.target.value)}} sx={{ flex:'6' }} size='small' variant="outlined" type='password' value={password}/>
          </Box>
          <Box sx={{ display:'flex', alignItems:'center', padding:'20px 0' }}>
            <Typography sx={{ flex:'2', textAlign:'left', paddingRight:'15px' }}>{t('new_password')}</Typography>
            <TextField onChange={(e) => {setNewPassword(e.target.value)}} sx={{ flex:'6' }} size='small' variant="outlined" type='password' value={newPassword}/>
          </Box>
          <Box sx={{ display:'flex', alignItems:'center', padding:'20px 0' }}>
            <Typography sx={{ flex:'2', textAlign:'left', paddingRight:'15px' }}>{t('confirm_password')}</Typography>
            <TextField onChange={(e) => {setConfirmPassword(e.target.value)}} sx={{ flex:'6' }} size='small' variant="outlined" type='password' value={confirmPassword}/>
          </Box>

        </Box>

      </Box>
      {errorMessage && (
        <Typography marginBottom='15px' color='error'> {errorMessage}</Typography>
      )}
      <Button onClick={handleUpdatePassword} sx={{ bgcolor:(theme) => theme.palette.primary[500], color:'white', width:'100px', '&:hover':{ bgcolor:(theme) => theme.palette.primary[800] } }}>
        {t('update')}
      </Button>
      <Button onClick={handleBackToProfile} sx={{ bgcolor:(theme) => theme.palette.primary[500], color:'white', marginLeft:'30px', '&:hover':{ bgcolor:(theme) => theme.palette.primary[800] } }}>
        {t('back_to_profile')}
      </Button>
    </Container>
  )
}

export default ChangePw