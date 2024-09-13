import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField, Typography } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import { createNewBoardAPI, uploadImageAPI } from '~/apis'
import { toast } from 'react-toastify'
import { addBoardToWorkspace } from '~/redux/actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles'
import { useTheme } from '@emotion/react'
import { useTranslation } from 'react-i18next'

function NewBoardBtn({ workspace }) {
  const [loading, setLoading] = useState(false)
  const [ImageFile, setImageFile] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [type, setType] = useState('Public')
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const ownerWorkspace = user._id === workspace.ownerId
  const theme = useTheme()
  const textColor = theme.palette.text.primary
  const mainColor = theme.palette.primary.main
  const secondaryColor = theme.palette.secondary.main
  const { t } = useTranslation()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const boardFormik = useFormik({
    initialValues: {
      boardTitle:'',
      description:''
    },
    validationSchema: Yup.object({
      boardTitle: Yup.string().min(4, t('minimum_4_characters')).max(30, t('maximum_30_characters')).required(t('requiured')),
      description: Yup.string().min(4, t('minimum_4_characters')).max(300, t('maximum_300_characters')).required(t('requiured'))
    }),
    onSubmit:(values, { setSubmitting }) => {
      setLoading(true)
      const image = {
        image:ImageFile
      }
      const workspaceId = workspace._id
      const ownerId = workspace.ownerId
      const newboard = {
        workspaceId: workspaceId,
        ownerId: ownerId,
        title: values.boardTitle,
        description: values.description,
        type:type
      }
      uploadImageAPI(image)
        .then(data => {
          if (data.data.url) {
            newboard.avatar = data.data.url
          }
        })
        .finally(() => {
          createNewBoardAPI(newboard)
            .then(res => {
              toast.success(`${t('board_created_successfully')}`)
              const action = addBoardToWorkspace(workspace._id, res)
              dispatch(action)
              handleClose()
              setLoading(false)

              // clear input
              setSelectedImage(null)
              setImageFile(null)
            })
            .catch(error => {
              setLoading(false)
              const message = error.response.data.message.split(':')
              setErrorMessage(message[1])
              toast.error(`${t('board_created_failure')}`)
            })
          setSubmitting(false)
          setErrorMessage('')
        })
    }
  })

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
    <>
      {ownerWorkspace && (
        <Box sx={{
          minWidth: '200px',
          maxHeight:'120px',
          width: { xs:'96%', md:'23%' },
          margin:'10px 2% 15px 0',

        }}>
          <Box sx={{
            height:'120px',
            bgcolor:'#f8f8f8',
            borderRadius:'4px',
            cursor:'pointer',
            '&:hover': {
              bgcolor:'#ccc'
            }
          }} onClick={handleOpen}>
            <Box sx={{
              height:'100%',
              display:'flex',
              alignItems:'center',
              justifyContent:'center'
            }}>
              <AddBoxIcon sx={{ color:'#2196f3', m:'0 5px' }} />
              <Typography sx={{ color:'black' }} textTransform='uppercase'> {t('new_board')} </Typography>
            </Box>
          </Box>
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
            <form onSubmit={boardFormik.handleSubmit}>
              <DialogTitle sx={{ color:(theme) => theme.palette.text.primary }}> {t('new_board')} </DialogTitle>
              <DialogContent sx={{ display:'flex', flexDirection:'column' }}>
                <TextField name='boardTitle' onChange={boardFormik.handleChange} onBlur={boardFormik.handleBlur} sx={{ margin:'5px 0' }} size='small' id="outlined-basic" label={t('board_title')} variant="outlined" />
                {boardFormik.errors.boardTitle && boardFormik.touched.boardTitle && (
                  <Typography variant='caption' color='error' marginTop='5px' >
                    {boardFormik.errors.boardTitle}
                  </Typography>
                )}
                <TextField name='description' onChange={boardFormik.handleChange} onBlur={boardFormik.handleBlur} sx={{ margin:'5px 0' }} multiline maxRows={4} size='large' id="outlined-basic" label={t('description')} variant="outlined" />
                {boardFormik.errors.description && boardFormik.touched.description && (
                  <Typography variant='caption' color='error' marginTop='5px' >
                    {boardFormik.errors.description}
                  </Typography>
                )}
                <Select
                  size='small'
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={type}
                  onChange={(e) => {setType(e.target.value)}}
                  sx={{ margin:'10px 0' }}
                >
                  <MenuItem value={'Public'}>
                          {t('public')}
                  </MenuItem>
                  <MenuItem value={'Private'}>
                          {t('private')}
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
                          {t('Upload_background_image')}
                  <VisuallyHiddenInput type="file" accept='image/*' onChange={handleImageChange} />
                </Button>
                {selectedImage && (
                  <Box sx={{ marginTop:'10px' }}>
                    <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%' }} />
                  </Box>
                )}

              </DialogContent>
              <DialogActions >
                <Button sx={{ color:(theme) => theme.palette.text.primary, '&:hover':{ bgcolor:(theme) => theme.palette.primary[300] } }} onClick={handleClose}> {t('cancel')} </Button>
                <Button sx={{ color:(theme) => theme.palette.text.primary, '&:hover':{ bgcolor:(theme) => theme.palette.primary[300] } }} type='submit' >{t('create')}</Button>
              </DialogActions>
            </form>
          </Dialog>
        </Box>
      )}
    </>
  )
}

export default NewBoardBtn