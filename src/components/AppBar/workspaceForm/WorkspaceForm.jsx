import { Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Select, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import { createNewWorkspaceAPI, uploadImageAPI } from '~/apis'
import { addWorkspaceAction } from '~/redux/actions/userAction'

function WorkspaceForm() {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [workspaceTitle, setWorkspaceTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('Public')
  const [workspaceImage, setWorkspaceImage] = useState('')
  const [ImageFile, setImageFile] = useState('')
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

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

  const handleSubmitCreateBoard = () => {
    setLoading(true)
    const image = {
      image:ImageFile
    }
    const newWorkspace = {
      ownerId: user._id,
      title: workspaceTitle,
      description: description,
      type:type
    }
    uploadImageAPI(image)
      .then(data => {
        setWorkspaceImage(data.data.url)
        if (data.data.url) {
          newWorkspace.avatar = data.data.url
        }
      })
      .finally(() => {
        createNewWorkspaceAPI(newWorkspace)
          .then(res => {
            toast.success('Workspace created successfully')
            const action = addWorkspaceAction(res)
            dispatch(action)
            handleClose()
            setLoading(false)

            // clear input
            setSelectedImage(null)
            setWorkspaceImage(null)
            setImageFile(null)
          })
          .catch(error => {
            setLoading(false)
            const message = error.response.data.message.split(':')
            setErrorMessage(message[1])
            toast.error('Workspace create failure')
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
    <Box>
      <MenuItem onClick={handleOpen} sx={{
        borderRadius:'4px',
        color:'white',
        bgcolor:(theme) => theme.palette.primary[500],
        border:'none',
        '&:hover':{ border:'none',
          bgcolor:(theme) => theme.palette.primary[800]
        }
      }}>
        <ListItemIcon >
          <LibraryAddIcon sx={{ color:'white' }} />
        </ListItemIcon>
        <ListItemText sx={{ color:'white' }}>Create</ListItemText>
      </MenuItem>
      <Dialog sx={{ margin:'0 auto', '& .MuiPaper-root':{ width:'50%' } }} open={open} onClose={handleClose}>
        {loading && (
          <Box sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999
          }}>
            <CircularProgress sx={{ color:'2196f3' }} />
          </Box>
        )}
        <DialogTitle sx={{ color:(theme) => theme.palette.text.primary }}>CREATE WORKSPACE</DialogTitle>
        <DialogContent sx={{ display:'flex', flexDirection:'column' }}>
          <TextField onChange={(e) => {setWorkspaceTitle(e.target.value)}} sx={{ margin:'5px 0' }} size='small' label="Workspace title" variant="outlined" />
          <TextField onChange={(e) => {setDescription(e.target.value)}} sx={{ margin:'5px 0' }} multiline maxRows={4} size='large' label="Description" variant="outlined" />
          <Select
            size='small'
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={type}
            onChange={(e) => {setType(e.target.value)}}
            sx={{ margin:'10px 0' }}
          >
            <MenuItem value={'Public'}>
                        Public
            </MenuItem>
            <MenuItem value={'Private'}>
                        Private
            </MenuItem>
          </Select>
          {errorMessage && (
            <Typography color='error'>{errorMessage}</Typography>
          )}
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{ bgcolor:(theme) => theme.palette.primary }}
          >
                        Upload background image
            <VisuallyHiddenInput type="file" accept='image/*' onChange={handleImageChange} />
          </Button>
          {selectedImage && (
            <Box sx={{ marginTop:'10px' }}>
              <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%' }} />
            </Box>
          )}

        </DialogContent>
        <DialogActions >
          <Button sx={{ color:(theme) => theme.palette.text.primary, '&:hover':{ bgcolor:(theme) => theme.palette.primary[300] } }} onClick={handleClose}>Cancel</Button>
          <Button sx={{ color:(theme) => theme.palette.text.primary, '&:hover':{ bgcolor:(theme) => theme.palette.primary[300] } }} onClick={handleSubmitCreateBoard}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default WorkspaceForm