import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Select, TextField, Typography } from '@mui/material'
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


function Workspace( { data, currentUserId } ) {
  // console.log('🚀 ~ Workspace ~ data:', data)
  const ownerWorkspace = currentUserId === data.ownerId

  const { activeBtn, setActiveBtn } = useContext(ActiveContextBtn)
  const [open, setOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  const [boardTitle, setBoardTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('Public')
  const [boardImage, setBoardImage] = useState('')
  const [ImageFile, setImageFile] = useState('')

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

  const handleSubmitCreateBoard = () => {
    const image = {
      image:ImageFile
    }
    const workspaceId = data._id
    const ownerId = data.ownerId
    const newboard = {
      workspaceId: workspaceId,
      ownerId: ownerId,
      title: boardTitle.trim(),
      description: description.trim(),
      type:type,
    }
    uploadImageAPI(image)
      .then(data => {
        setBoardImage(data.data.url)
      })
    if (boardImage) {
      newboard.avatar = boardImage
    }
    
    createNewBoardAPI(newboard)
      .then(res => {

        toast.success('Table created successfully')
        handleClose()
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
    <>
      <MenuList>
        <Button
          onClick={handleButtonClick}
          endIcon={<ExpandMoreIcon sx={{ position:'absolute', right:0, bottom:'25%' }}/>}
          sx={{
            display:'flex',
            color:(theme) => theme.palette.text.primary,
            justifyContent:'left',
            bgcolor: (theme) => activeBtn === data._id ? theme.trello.btnBackground : 'transparent',
            width:{ md:'100%', xs:'0' },
            '&:hover':{
              bgcolor:(theme) => theme.palette.primary[300]
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
          <Typography sx={{ display:{ xs:'none', md:'block' }, marginLeft:'10px', color:(theme) => theme.palette.text.primary }}> {data.title} </Typography>
        </Button>

        {activeBtn === data._id &&
          <Box>

            {ownerWorkspace && (
              <>
                <MenuItem onClick={handleOpen}>
                  <ListItemIcon >
                    <AddBoxIcon sx={{ color:(theme) => theme.palette.text.primary }} />
                  </ListItemIcon>
                  <ListItemText sx={{ color:(theme) => theme.palette.text.primary }}>New board</ListItemText>
                </MenuItem>
                <Dialog sx={{ margin:'0 auto', '& .MuiPaper-root':{ width:'50%' } }} open={open} onClose={handleClose}>
                  <DialogTitle sx={{ color:(theme)=> theme.palette.text.primary }}>CREATED BOARD</DialogTitle>
                  <DialogContent sx={{ display:'flex', flexDirection:'column' }}>
                    <TextField onChange={(e) => {setBoardTitle(e.target.value)}} sx={{ margin:'5px 0' }} size='small' id="outlined-basic" value={boardTitle} label="Board title" variant="outlined" />
                    <TextField onChange={(e) => {setDescription(e.target.value)}} sx={{ margin:'5px 0' }} multiline maxRows={4} size='large' id="outlined-basic" label="Description" variant="outlined" />
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
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                      sx={{bgcolor:(theme)=> theme.palette.primary}}
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
                    <Button sx={{color:(theme) => theme.palette.text.primary,'&:hover':{bgcolor:(theme)=>theme.palette.primary[300]}}} onClick={handleClose}>Cancel</Button>
                    <Button sx={{color:(theme) => theme.palette.text.primary,'&:hover':{bgcolor:(theme)=>theme.palette.primary[300]}}} onClick={handleSubmitCreateBoard}>Create</Button>
                  </DialogActions>
                </Dialog>
              </>
            )}

            <Link to={`workspace/${data._id}`} style={{ textDecoration:'none' }}>
              <MenuItem >
                <ListItemIcon >
                  <SvgIcon component={trelloIcon} inheritViewBox sx={{ color:(theme) => theme.palette.text.primary }} />
                </ListItemIcon>
                <ListItemText sx={{ color:(theme) => theme.palette.text.primary }}>Boards</ListItemText>
              </MenuItem>
            </Link>

            <Link to={`workspace/${data._id}`} style={{ textDecoration:'none' }}>
              <MenuItem>
                <ListItemIcon >
                  <PeopleIcon sx={{ color:(theme) => theme.palette.text.primary }}/>
                </ListItemIcon>
                <ListItemText sx={{ color:(theme) => theme.palette.text.primary }}>Members</ListItemText>
              </MenuItem>
            </Link>

            {ownerWorkspace && (
              <Link to={`workspace/${data._id}`} style={{ textDecoration:'none' }}>
                <MenuItem>
                  <ListItemIcon >
                    <SettingsIcon sx={{ color:(theme) => theme.palette.text.primary }}/>
                  </ListItemIcon>
                  <ListItemText sx={{ color:(theme) => theme.palette.text.primary }}>Settings</ListItemText>
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