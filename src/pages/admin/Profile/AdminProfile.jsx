import { Avatar, Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles'
import { useState } from 'react'
import { updateUser, uploadImageAPI } from '~/apis'
import { toast } from 'react-toastify'
import { updateUser as updateUserAction } from '~/redux/actions/userAction'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function AdminProfile() {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const date = new Date(user.createdAt)
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  const [ImageFile, setImageFile] = useState('')
  const [selectedImage, setSelectedImage] = useState(user.avatar)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState(user.username)
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber)
  const [errorMessage, setErrorMessage] = useState(null)
  const { t } = useTranslation()

  const handleImageChange = (e) => {
    const file = e.target.files[0] // Lấy ra file ảnh đầu tiên từ event
    if (file) {
      const reader = new FileReader() // Tạo một FileReader object
      reader.onloadend = () => {
        setSelectedImage(reader.result)
      }
      reader.readAsDataURL(file) // Đọc file ảnh dưới dạng base64
      setImageFile(file)
    }
  }

  const handleSubmitUpdateUser = () => {
    if (!/^\d+$/.test(phoneNumber)|| phoneNumber.length > 11) {
      return toast.error(`${t('phone_number_is_not_valid')}`)
    }
    setLoading(true)
    const image = {
      image:ImageFile
    }
    const newInfor = {
      email : user.email,
      username : name,
      phoneNumber: phoneNumber,
      avatar : selectedImage
    }
    uploadImageAPI(image)
      .then(data => {
        setSelectedImage(data.data.url)
        if (data.data.url) {
          newInfor.avatar = data.data.url
        }

      })
      .finally(() => {
        updateUser(newInfor)
          .then(res => {
            toast.success(`${t('update_successfully')}`)
            const action = updateUserAction(res)
            dispatch(action)
            setLoading(false)
            setImageFile('')
          })
          .catch(error => {
            setLoading(false)
            const message = error.response.data.message.split(':')
            setErrorMessage(message[1])
          })
        setErrorMessage('')
      })

  }

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
  })


  return (
    <Container>
      {loading && (
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999
          }}
        >
          <CircularProgress />
        </Box>
      )}

      <Box sx={{ borderBottom:'1px solid #ccc', paddingBottom:'20px' }}>
        <Typography variant='h6' textTransform='uppercase'> {t('my_profile')} </Typography>
        <Typography> {t('manage_profile_infomation')} </Typography>
      </Box>
      <Box sx={{ display:'flex', padding:'20px 0 ' }}>
        <Box sx={{ flex:'2' }}>
          <Box sx={{ display:'flex', alignItems:'center', padding:'20px 0' }}>
            <Typography sx={{ flex:'1', textAlign:'right', paddingRight:'15px' }}> {t('name')} </Typography>
            <TextField onChange={(e) => {setName(e.target.value)}} sx={{ flex:'6' }} id="outlined-basic" size='small' variant="outlined" value={name}/>
          </Box>
          <Box sx={{ display:'flex', alignItems:'center', padding:'20px 0' }}>
            <Typography sx={{ flex:'1', textAlign:'right', paddingRight:'15px' }}>Email</Typography>
            <TextField sx={{ flex:'6' }} id="outlined-basic" size='small' variant="outlined" value={user.email} InputProps={{ readOnly: true }} />
          </Box>
          <Box sx={{ display:'flex', alignItems:'center', padding:'20px 0' }}>
            <Typography sx={{ flex:'1', textAlign:'right', paddingRight:'15px' }}> {t('phone_number')} </Typography>
            <TextField onChange={(e) => {setPhoneNumber(e.target.value)}} sx={{ flex:'6' }} id="outlined-basic" size='small' label={user.phoneNumber ? '' :'Enter your phone'} variant="outlined" value={phoneNumber}/>
          </Box>
          <Box sx={{ display:'flex', alignItems:'center', padding:'20px 0' }}>
            <Typography sx={{ flex:'1', textAlign:'right', paddingRight:'15px' }}> {t('joined_date')} </Typography>
            <Typography sx={{ flex:'6', textAlign:'left', paddingRight:'15px' }}>{formattedDate}</Typography>
          </Box>
          <Box sx={{ display:'flex', alignItems:'center', padding:'20px 0' }}>
            <Typography sx={{ flex:'1', textAlign:'right', paddingRight:'15px' }}> {t('password')} </Typography>
            <Typography sx={{ flex:'6', textAlign:'left', paddingRight:'15px' }}> <Link to='/admin/changePassword'> {t('change_password')} </Link> </Typography>
          </Box>
        </Box>
        <Box sx={{ display:'flex', flex:'1', flexDirection:'column', alignItems:'center', boxShadow: ['unset', '0px 4px 10px rgba(0, 0, 0, 0.1)'], padding:'20px 0', marginLeft:'20px' }}>
          <Box>
            <Avatar sx={{ width:'100px', height:'100px' }} src={selectedImage} />
          </Box>
          <Typography sx={{ padding:'20px 0' }}>
            {t('maximum_file_size_is_1_MB')}
            <br/>
            {t('formatJPEGPNG')}
          </Typography>
          <Box>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{ bgcolor:(theme) => theme.palette.primary }}
            >
              {t('upload_image')}
              <VisuallyHiddenInput type="file" accept='image/*' onChange={handleImageChange} />
            </Button>
          </Box>
        </Box>
      </Box>
      {errorMessage && (
        <Typography color='error'> {errorMessage}</Typography>
      )}
      <Button onClick={handleSubmitUpdateUser} sx={{ bgcolor:(theme) => theme.palette.primary[500], color:'white', width:'100px', '&:hover':{ bgcolor:(theme) => theme.palette.primary[800] } }}>
        {t('update')}
      </Button>
    </Container>
  )
}

export default AdminProfile