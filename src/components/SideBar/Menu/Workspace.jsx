import { Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Select, TextField, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import MenuList from '@mui/material/MenuList'
import Button from '@mui/material/Button'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SvgIcon from '@mui/material/SvgIcon'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import PeopleIcon from '@mui/icons-material/People'
import SettingsIcon from '@mui/icons-material/Settings'
import AddBoxIcon from '@mui/icons-material/AddBox'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles'
import { ReactComponent as trelloIcon } from '~/assets/trello.svg'
import { ActiveContextBtn } from '~/Contexts/Context'
import { Link } from 'react-router-dom'
import { createNewBoardAPI, uploadImageAPI } from '~/apis'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { addBoardToWorkspace } from '~/redux/actions/userAction'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { t } from 'i18next'

function Workspace( { data, currentUserId } ) {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const ownerWorkspace = currentUserId === data.ownerId
  const { activeBtn, setActiveBtn } = useContext(ActiveContextBtn)
  const [open, setOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [boardTitle, setBoardTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('Public')
  const [boardImage, setBoardImage] = useState('')
  const [ImageFile, setImageFile] = useState('')
  const [loading, setLoading] = useState(false)

  const handleButtonClick = () => {
    activeBtn === data._id ? setActiveBtn(null)
      : setActiveBtn(data._id)
  }

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
      const workspaceId = data._id
      const ownerId = data.ownerId
      const newboard = {
        workspaceId: workspaceId,
        ownerId: ownerId,
        title: values.boardTitle,
        description: values.description,
        type:type
      }
      uploadImageAPI(image)
        .then(data => {
          setBoardImage(data.data.url)
          if (data.data.url) {
            newboard.avatar = data.data.url
          }
        })
        .finally(() => {
          createNewBoardAPI(newboard)
            .then(res => {
              toast.success(`${t('board_created_successfully')}`)
              const action = addBoardToWorkspace(data._id, res)
              dispatch(action)
              handleClose()
              setLoading(false)

              // clear input
              setSelectedImage(null)
              setBoardImage(null)
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

  // const handleSubmitCreateBoard = () => {
  //   setLoading(true)
  //   const image = {
  //     image:ImageFile
  //   }
  //   const workspaceId = data._id
  //   const ownerId = data.ownerId
  //   const newboard = {
  //     workspaceId: workspaceId,
  //     ownerId: ownerId,
  //     title: boardTitle,
  //     description: description,
  //     type:type
  //   }
  //   uploadImageAPI(image)
  //     .then(data => {
  //       setBoardImage(data.data.url)
  //       if (data.data.url) {
  //         newboard.avatar = data.data.url
  //       }
  //     })
  //     .finally(() => {
  //       createNewBoardAPI(newboard)
  //         .then(res => {
  //           toast.success('Board created successfully')
  //           const action = addBoardToWorkspace(data._id, res)
  //           dispatch(action)
  //           handleClose()
  //           setLoading(false)

  //           // clear input
  //           setSelectedImage(null)
  //           setBoardImage(null)
  //           setImageFile(null)
  //         })
  //         .catch(error => {
  //           setLoading(false)
  //           const message = error.response.data.message.split(':')
  //           setErrorMessage(message[1])
  //           toast.error('Board create failure')
  //         })

  //       setErrorMessage('')
  //     })

  // }

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
      <MenuList>
        <Button
          onClick={handleButtonClick}
          endIcon={<ExpandMoreIcon sx={{ position:'absolute', right:0, bottom:'25%' }}/>}
          sx={{
            display:'flex',
            color:(theme) => theme.palette.text.primary,
            justifyContent:'left',
            bgcolor: (theme) => activeBtn === data._id ? '#ccc' : 'transparent',
            width:{ md:'100%', xs:'100%' },
            '&:hover':{
              bgcolor:(theme) => '#ccc'
            }
          }}
        >
          <Box sx={{
            width: '24px',
            height: '24px',
            backgroundImage: data.avatar ? `url(${data.avatar})` : 'linear-gradient(#c9372c,#fea362)',
            borderRadius:'4px',
            color:'white',
            backgroundSize:'cover',
            backgroundPosition:'center'

          }}> {data.avatar ? '' : data.title[0]} </Box>
          <Typography sx={{ display: 'block', marginLeft:'10px', color:(theme) => theme.palette.text.primary }}> {data.title} </Typography>
        </Button>

        {activeBtn === data._id &&
          <Box>

            {ownerWorkspace && (
              <>
                <MenuItem onClick={handleOpen}>
                  <ListItemIcon >
                    <AddBoxIcon sx={{ color:'#2196f3' }} />
                  </ListItemIcon>
                  <ListItemText sx={{ color:(theme) => theme.palette.text.primary }}>{t('new_board')}</ListItemText>
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
                  <form onSubmit={boardFormik.handleSubmit}>
                    <DialogTitle sx={{ color:(theme) => theme.palette.text.primary }}> {t('new_board')} </DialogTitle>
                    <DialogContent sx={{ display:'flex', flexDirection:'column' }}>
                      <TextField name='boardTitle' onChange={boardFormik.handleChange} onBlur={boardFormik.handleBlur} sx={{ margin:'5px 0' }} size='small' label={t('board_title')} autoComplete='off' />
                      {boardFormik.errors.boardTitle && boardFormik.touched.boardTitle && (
                        <Typography variant='caption' color='error' marginTop='5px' >
                          {boardFormik.errors.boardTitle}
                        </Typography>
                      )}
                      <TextField name='description' onChange={boardFormik.handleChange} onBlur={boardFormik.handleBlur} sx={{ margin:'5px 0' }} multiline maxRows={4} size='large' label={t('description')} autoComplete='off'/>
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
                      <Button sx={{ color:(theme) => theme.palette.text.primary, '&:hover':{ bgcolor:(theme) => theme.palette.primary[300] } }} onClick={handleClose}>{t('cancel')}</Button>
                      <Button sx={{ color:(theme) => theme.palette.text.primary, '&:hover':{ bgcolor:(theme) => theme.palette.primary[300] } }} type='submit' >{t('create')}</Button>
                    </DialogActions>
                  </form>
                </Dialog>
              </>
            )}

            <Link to={`workspace/${data._id}/boards`} style={{ textDecoration:'none' }}>
              <MenuItem >
                <ListItemIcon >
                  <SvgIcon component={trelloIcon} inheritViewBox sx={{ color:'#2196f3' }} />
                </ListItemIcon>
                <ListItemText sx={{ color:(theme) => theme.palette.text.primary }}> {t('boards')} </ListItemText>
              </MenuItem>
            </Link>

            <Link to={`workspace/${data._id}/members`} style={{ textDecoration:'none' }}>
              <MenuItem>
                <ListItemIcon >
                  <PeopleIcon sx={{ color:'#2196f3' }}/>
                </ListItemIcon>
                <ListItemText sx={{ color:(theme) => theme.palette.text.primary }}> {t('members')} </ListItemText>
              </MenuItem>
            </Link>

            {ownerWorkspace && (
              <Link to={`workspace/${data._id}/settings`} style={{ textDecoration:'none' }}>
                <MenuItem>
                  <ListItemIcon >
                    <SettingsIcon sx={{ color:'#2196f3' }}/>
                  </ListItemIcon>
                  <ListItemText sx={{ color:(theme) => theme.palette.text.primary }}> {t('settings')} </ListItemText>
                </MenuItem>
              </Link>
            )}
          </Box>
        }


      </MenuList>

    </>
  )
}


export default Workspace