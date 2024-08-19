import { Avatar, Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles'
import { useState } from 'react'
import { updateUser, uploadImageAPI } from '~/apis'
import { toast } from 'react-toastify'
import { updateUser as updateUserAction } from '~/redux/actions/userAction'
import { Link } from 'react-router-dom'

function UserProfile() {

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
      return toast.error('Phone number is not valid')
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
            toast.success('Update user successfully')
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
      <Box sx={{
        margin:'60px auto',
        boxShadow: ['unset', '0px 4px 10px rgba(0, 0, 0, 0.2)'],
        padding:'18px 30px'
      }}>
        <Box sx={{ borderBottom:'1px solid #ccc', paddingBottom:'20px' }}>
          <Typography variant='h6'>MY PROFILE</Typography>
          <Typography>Manage profile information </Typography>
        </Box>
        <Box sx={{ display:'flex', padding:'20px 0 ' }}>
          <Box sx={{ flex:'2' }}>
            <Box sx={{ display:'flex', alignItems:'center', padding:'20px 0' }}>
              <Typography sx={{ flex:'1', textAlign:'right', paddingRight:'15px' }}>Name</Typography>
              <TextField onChange={(e) => {setName(e.target.value)}} sx={{ flex:'6' }} id="outlined-basic" size='small' variant="outlined" value={name}/>
            </Box>
            <Box sx={{ display:'flex', alignItems:'center', padding:'20px 0' }}>
              <Typography sx={{ flex:'1', textAlign:'right', paddingRight:'15px' }}>Email</Typography>
              <TextField sx={{ flex:'6' }} id="outlined-basic" size='small' variant="outlined" value={user.email} InputProps={{ readOnly: true }} />
            </Box>
            <Box sx={{ display:'flex', alignItems:'center', padding:'20px 0' }}>
              <Typography sx={{ flex:'1', textAlign:'right', paddingRight:'15px' }}>Phone Number</Typography>
              <TextField onChange={(e) => {setPhoneNumber(e.target.value)}} sx={{ flex:'6' }} id="outlined-basic" size='small' label={user.phoneNumber ? '' :'Enter your phone'} variant="outlined" value={phoneNumber}/>
            </Box>
            <Box sx={{ display:'flex', alignItems:'center', padding:'20px 0' }}>
              <Typography sx={{ flex:'1', textAlign:'right', paddingRight:'15px' }}>Joining Date:</Typography>
              <Typography sx={{ flex:'6', textAlign:'left', paddingRight:'15px' }}>{formattedDate}</Typography>
            </Box>
            <Box sx={{ display:'flex', alignItems:'center', padding:'20px 0' }}>
              <Typography sx={{ flex:'1', textAlign:'right', paddingRight:'15px' }}>Password:</Typography>
              <Typography sx={{ flex:'6', textAlign:'left', paddingRight:'15px' }}> <Link to='/profile/changePassword'>Change password</Link> </Typography>
            </Box>
          </Box>
          <Box sx={{ display:'flex', flex:'1', flexDirection:'column', alignItems:'center', boxShadow: ['unset', '0px 4px 10px rgba(0, 0, 0, 0.1)'], padding:'20px 0', marginLeft:'20px' }}>
            <Box>
              <Avatar sx={{ width:'100px', height:'100px' }} src={selectedImage} />
            </Box>
            <Typography sx={{ padding:'20px 0' }}>
                Maximum file size is 1 MB
              <br/>
                Format: .JPEG, .PNG
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
                        Upload image
                <VisuallyHiddenInput type="file" accept='image/*' onChange={handleImageChange} />
              </Button>
            </Box>
          </Box>
        </Box>
        {errorMessage && (
          <Typography color='error'> {errorMessage}</Typography>
        )}
        <Button onClick={handleSubmitUpdateUser} sx={{ bgcolor:(theme) => theme.palette.primary[500], color:'white', width:'100px', '&:hover':{ bgcolor:(theme) => theme.palette.primary[800] } }}>
            Update
        </Button>
      </Box>
    </Container>
  )
}

export default UserProfile