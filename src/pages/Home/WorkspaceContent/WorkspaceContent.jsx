/* eslint-disable quotes */
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled
} from '@mui/material'
import { useOutletContext, useParams } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star'
import BoardCard from '../DashBoardContent/BoardCard/BoardCard'
import Members from './Members/Member'
import TitleAllBoard from './Title/TitleAllBoard'
import TitleStarred from './Title/TitleStarred'
import TitleMember from './Title/TitleMember'
import TitleSetting from './Title/TitleSetting'
import LockIcon from '@mui/icons-material/Lock'
import PublicIcon from '@mui/icons-material/Public'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditNoteIcon from '@mui/icons-material/EditNote'
import Settings from './Settings/Settings'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useEffect, useState } from 'react'
import { addMemberAPI, getMembersByWorkspaceIdAPI, updateWorkspaceAPI, uploadImageAPI } from '~/apis'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateWorkspaceAction
} from '~/redux/actions/userAction'
import { addMemberAction, clearMemberAction, setMemberAction } from '~/redux/actions/memberAction'
import { useTheme } from '@emotion/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import socket from '~/socket/socket'


function WorkspaceContent() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [data] = useOutletContext()
  const [emailInvite, setEmailInvite] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [type, setType] = useState('Public')
  const [selectedImage, setSelectedImage] = useState(null)
  const [ImageFile, setImageFile] = useState('')
  const [workspaceImage, setworkspaceImage] = useState('')
  const [editWorkspace, setEditWorkspace] = useState(false)
  const user = useSelector(state => state.user)
  const cloneData = { ...data }
  const workspaces = cloneData.workspaces
  const workspace = workspaces.filter((w) => w._id === id)
  const currentUserId = cloneData._id
  const ownerWorkspace = currentUserId === workspace[0].ownerId
  const members = useSelector(state => state.member)
  const theme = useTheme()
  const textColor = theme.palette.text.primary
  const mainColor = theme.palette.primary.main


  const getStarredBoard = () => {
    const starredBoards = []
    cloneData.starredBoard.forEach((id) => {
      if (!('boards' in workspace[0])) {
        workspace[0].boards = []
      }
      const board = workspace[0].boards.filter(
        (board) => board && board._id === id
      )
      if (board && board.length > 0) {
        starredBoards.push(...board)
      }
    })
    return starredBoards
  }
  const starredBoards = getStarredBoard()

  const handleToggleUpdateWorkspace = () => {
    setEditWorkspace(!editWorkspace)
  }


  const handleInviteSubmit = () => {
    if (ownerWorkspace) {
      const data = {
        email: emailInvite,
        workspaceId: id
      }
      addMemberAPI(data)
        .then((data) => {
          const newMember = data.user
          const action = addMemberAction(newMember)
          dispatch(action)
          toast.success('Add member successfully')
          setEmailInvite('')
          socket.emit('invite', {
            inviterId : user._id,
            emailInvite,
            workspaceId : id
          })
        })
        .catch((err) => {
          toast.error(`Fail to invite ${emailInvite}`)
        })
    }
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

  useEffect(() => {

    getMembersByWorkspaceIdAPI(workspace[0]._id)
      .then(data => {
        const action = setMemberAction(data)
        dispatch(action)
      })

    return () => {
      const action = clearMemberAction()
      dispatch(action)
    }
  }, [workspace[0]])


  const workspaceTitle = workspace[0].title
  const workpaceDescription = workspace[0].description
  const workspaceFormik = useFormik({
    initialValues: {
      workspaceTitle:workspaceTitle,
      description:workpaceDescription
    },
    validationSchema: Yup.object({
      workspaceTitle: Yup.string().min(4, 'Minimum 4 characters').max(30, 'Maximum 30 characters').required('Requiured!'),
      description: Yup.string().min(4, 'Minimum 4 characters').max(300, 'Maximum 300 characters').required('Requiured!')
    }),
    onSubmit:(values, { setSubmitting }) => {
      const data = workspace[0]
      const image = {
        image: ImageFile
      }
      const updatedWorkspace = {
        _id: data._id,
        type: type,
        title: values.workspaceTitle,
        description: values.description
      }

      uploadImageAPI(image)
        .then((data) => {
          setworkspaceImage(data.data.url)
          if (data.data.url) {
            updatedWorkspace.avatar = data.data.url
          }
        })
        .finally(() => {
          updateWorkspaceAPI(updatedWorkspace)
            .then((res) => {
              toast.success('Update workspace successfully')
              const newUpdate = {
                ...updatedWorkspace
              }
              delete newUpdate._id
              const action = updateWorkspaceAction(data._id, newUpdate)
              dispatch(action)

              // clear input
              setSelectedImage(null)
              setworkspaceImage(null)
              setImageFile(null)
            })
            .catch((error) => {
              const message = error.response.data.message.split(':')
              setErrorMessage(message[1])
              toast.error('Update workspace failure')
            })

          setErrorMessage('')
          setSubmitting(false)
        })
    }
  })

  // console.log(workspaceFormik.initialValues)

  return (
    <Box sx={{ paddingLeft: '20px', paddingBottom: '80px' }}>
      {/* Description workspace */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '40px',
          borderBottom: '1px solid #ccc',
          paddingBottom: '30px'
        }}
      >
        <Box sx={{ flex: 7, minWidth: '400px' }}>
          <Box sx={{ display: 'flex' }}>
            <Box
              sx={{
                width: '60px',
                height: '60px',
                backgroundImage: workspace[0].avatar
                  ? `url(${workspace[0].avatar})`
                  : 'linear-gradient(#c9372c,#fea362)',
                borderRadius: '4px',
                color: 'white',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '20px'
              }}
            >
              <Typography variant='h4' fontWeight='900'>
                {workspace[0].avatar ? '' : workspace[0].title[0]}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant='h6'
                display='flex'
                alignItems='center'
                height='50%'
                color={(theme) => theme.palette.text.primary}
              >
                {workspace[0].title}
                {ownerWorkspace && (
                  <EditNoteIcon
                    onClick={handleToggleUpdateWorkspace}
                    sx={{
                      marginLeft: '20px',
                      color: (theme) => theme.palette.text.primary,
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: (theme) =>
                          theme.trello.btnBackgroundHover
                      }
                    }}
                  />
                )}
              </Typography>
              <Box display='flex' height='50%' alignItems='center'>
                {workspace[0].type === 'Public' ? (
                  <>
                    <PublicIcon
                      sx={{
                        width: '18px',
                        height: '22px',
                        marginRight: '5px',
                        color: '	#22bb33'
                      }}
                    />
                    <Typography color='	#22bb33'>Public</Typography>
                  </>
                ) : (
                  <>
                    <LockIcon
                      sx={{
                        width: '18px',
                        height: '22px',
                        marginRight: '5px',
                        color: '	#ba3f42'
                      }}
                    />
                    <Typography color='	#ba3f42'>Private</Typography>
                  </>
                )}
              </Box>
            </Box>
          </Box>
          <Box marginTop='10px'>
            <Typography
              color={(theme) => theme.palette.text.primary}
              variant='subtitle2'
            >
              {workspace[0].description}
            </Typography>
          </Box>
        </Box>
        {editWorkspace && (
          <Box sx={{ flex: 3, paddingLeft: '20px' }}>
            <form onSubmit={workspaceFormik.handleSubmit}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  width: '100%'
                }}
              >
                <TextField
                  name='workspaceTitle'
                  onChange={workspaceFormik.handleChange}
                  onBlur={workspaceFormik.handleBlur}
                  value={workspaceFormik.values.workspaceTitle}
                  sx={{ margin: '5px 0' }}
                  size='small'
                  id='outlined-basic'
                  label='Workspace title'
                  variant='outlined'
                />
                {workspaceFormik.errors.workspaceTitle && workspaceFormik.touched.workspaceTitle && (
                  <Typography variant='caption' color='error' marginTop='5px' >
                    {workspaceFormik.errors.workspaceTitle}
                  </Typography>
                )}
                <TextField
                  name='description'
                  onChange={workspaceFormik.handleChange}
                  onBlur={workspaceFormik.handleBlur}
                  value={workspaceFormik.values.description}
                  sx={{ margin: '5px 0' }}
                  multiline
                  maxRows={4}
                  size='large'
                  id='outlined-basic'
                  label='Description'
                  variant='outlined'
                />
                {workspaceFormik.errors.description && workspaceFormik.touched.description && (
                  <Typography variant='caption' color='error' marginTop='5px' >
                    {workspaceFormik.errors.description}
                  </Typography>
                )}
                <Select
                  size='small'
                  labelId='demo-select-small-label'
                  id='demo-select-small'
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value)
                  }}
                  sx={{ margin: '10px 0' }}
                >
                  <MenuItem value={'Public'}>Public</MenuItem>
                  <MenuItem value={'Private'}>Private</MenuItem>
                </Select>
                {errorMessage && (
                  <Typography color='error'>{errorMessage}</Typography>
                )}
                <Button
                  component='label'
                  role={undefined}
                  variant='contained'
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  sx={{ bgcolor: (theme) => theme.palette.primary, color:textColor }}
                >
                  Upload background image
                  <VisuallyHiddenInput
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                  />
                </Button>
                {selectedImage && (
                  <Box sx={{ marginTop: '10px' }}>
                    <img
                      src={selectedImage}
                      alt='Selected'
                      style={{ maxWidth: '100px' }}
                    />
                  </Box>
                )}
                <Button
                  sx={{
                    marginTop: '10px',
                    color: textColor,
                    bgcolor: (theme) => theme.palette.primary[500],
                    '&:hover': { bgcolor: (theme) => theme.palette.primary[800] }
                  }}
                  type='submit'
                >
                  Update
                </Button>
              </Box>
            </form>
          </Box>
        )}
      </Box>

      {/* starred board  */}
      {starredBoards.length ? (
        <>
          <TitleStarred />
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap'
            }}
          >
            {starredBoards.map((board) => (
              <BoardCard key={board._id} data={board} />
            ))}
          </Box>
        </>
      ) : (
        <></>
      )}
      {/* all boards in this workspace */}
      {workspace[0].boards.length ? (
        <>
          <TitleAllBoard />
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              marginBottom: '20px'
            }}
          >
            {workspace[0].boards.map((b) => (
              <BoardCard key={b._id} data={b} />
            ))}
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'left',
              alignItems: 'center',
              color: 'white'
            }}
          >
            <StarIcon sx={{ marginRight: '10px', color: '#e2b203' }}></StarIcon>
            <Typography
              color={(theme) => theme.palette.text.primary}
              variant='h6'
              fontWeight={500}
            >
              Create some board to use
            </Typography>
          </Box>
        </>
      )}

      {/* Member in this workspace */}
      <TitleMember />
      {members.map(member => (
        <Members key={member._id} workspace={workspace[0]} member={member} ownerId={workspace[0].OwnerId} currentUserId={currentUserId} />
      ))}
      {ownerWorkspace && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'right',
            padding: '20px 0'
          }}
        >
          <Box>
            <TextField
              onChange={(e) => {
                setEmailInvite(e.target.value)
              }}
              value={emailInvite}
              sx={{ marginRight: '10px', width: '300px' }}
              size='small'
              placeholder='Enter email to invite'
            />
          </Box>
          <Button
            onClick={handleInviteSubmit}
            sx={{
              minWidth: '115px',
              height: '32px',
              color: 'white',
              bgcolor: (theme) => theme.palette.primary[500],
              '&:hover': { bgcolor: (theme) => theme.palette.primary[800] }
            }}
          >
            Invite
          </Button>
        </Box>
      )}

      {/* Setting in this workspace*/}
      {ownerWorkspace && (
        <>
          <Settings workspace={workspace[0]} />
        </>
      )}
    </Box>
  )
}

export default WorkspaceContent
