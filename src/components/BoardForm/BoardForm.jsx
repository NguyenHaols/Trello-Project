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
import { createNewWorkspaceAPI, updateBoardDetailsAPI, uploadImageAPI } from '~/apis'
import { addWorkspaceAction } from '~/redux/actions/userAction'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { setBoardAction } from '~/redux/actions/boardAction'
import { useTranslation } from 'react-i18next'

function BoardForm(props) {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [boardTitle, setWorkspaceTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('Public')
  const [workspaceImage, setWorkspaceImage] = useState('')
  const [ImageFile, setImageFile] = useState('')
  const { closeBoardForm, openBoardForm, boardForm, board } = props
  const { t } = useTranslation()

  const boardTitleValue = board.title
  const boardDescription = board.description
  const boardFormik = useFormik({
    initialValues: {
      boardTitle:boardTitleValue,
      description:boardDescription
    },
    validationSchema: Yup.object({
      boardTitle: Yup.string().min(4, 'Minimum 4 characters').max(30, 'Maximum 30 characters').required('Requiured!'),
      description: Yup.string().min(4, 'Minimum 4 characters').max(150, 'Maximum 150 characters').required('Requiured!')
    }),
    onSubmit:(values, { setSubmitting }) => {
      setLoading(true)
      const image = {
        image:ImageFile
      }
      const newBoard = {
        title: values.boardTitle,
        description: values.description,
        type:type
      }
      uploadImageAPI(image)
        .then(data => {
          setWorkspaceImage(data.data.url)
          if (data.data.url) {
            newBoard.avatar = data.data.url
          }
        })
        .finally(() => {
          updateBoardDetailsAPI(board._id, newBoard)
            .then(res => {
              toast.success('Update board successfully')
              const newBoard = {...board, ...res}
              const action = setBoardAction(newBoard)
              dispatch(action)
              closeBoardForm
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
          setSubmitting(false)
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
    <Box>
      <Dialog sx={{ margin:'40px auto', '& .MuiPaper-root':{ width:'50%' } }} open={Boolean(boardForm)} onClose={closeBoardForm}>
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
          <DialogTitle sx={{ color:(theme) => theme.palette.text.primary }}>UPDATE BOARD </DialogTitle>
          <DialogContent sx={{ display:'flex', flexDirection:'column' }}>
            <TextField name='boardTitle' onChange={boardFormik.handleChange} onBlur={boardFormik.handleBlur} sx={{ margin:'5px 0' }} size='small' label="Board title" variant="outlined" value={boardFormik.values.boardTitle} />
            {boardFormik.errors.boardTitle && boardFormik.touched.boardTitle && (
              <Typography variant='caption' color='error' marginTop='5px' >
                {boardFormik.errors.boardTitle}
              </Typography>
            )}
            <TextField name='description' onChange={boardFormik.handleChange} onBlur={boardFormik.handleBlur} sx={{ margin:'5px 0' }} multiline maxRows={4} size='large' label="Description" variant="outlined" value={boardFormik.values.description}/>
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
                          Board background
              <VisuallyHiddenInput type="file" accept='image/*' onChange={handleImageChange} />
            </Button>
            {selectedImage && (
              <Box sx={{ marginTop:'10px' }}>
                <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%' }} />
              </Box>
            )}

          </DialogContent>
          <DialogActions >
            <Button sx={{ color:(theme) => theme.palette.text.primary, '&:hover':{ bgcolor:(theme) => theme.palette.primary[300] } }} onClick={closeBoardForm}>Cancel</Button>
            <Button sx={{ color:(theme) => theme.palette.text.primary, '&:hover':{ bgcolor:(theme) => theme.palette.primary[300] } }} type='submit'>Update</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  )
}

export default BoardForm