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
import { Outlet, useOutletContext, useParams } from 'react-router-dom'
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
import MemberPage from './Members/MemberPage'
import { useConfirm } from 'material-ui-confirm'


function WorkspaceContent() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [data] = useOutletContext()
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
        setType(workspace[0].type)
        setEditWorkspace(false)
        dispatch(action)
      })

    workspaceFormik.resetForm({
      values: {
        workspaceTitle: workspace[0].title || '',
        description: workspace[0].description || ''
      }
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

  const updateConfirm = useConfirm()
  const handleSubmitUpdate = () => {
    console.log("first")
    updateConfirm({
      title: 'Update workspace',
      content: 'Are you sure you want to update ?'
    })
      .then(() => {
        workspaceFormik.handleSubmit()
      })
      .catch(() => {

      })
  }

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
                  onClick={() => {handleSubmitUpdate()}}
                >
                  Update
                </Button>
              </Box>
            </form>
          </Box>
        )}
      </Box>

      {/* starred board  */}

      {/* all boards in this workspace */}


      {/* Member in this workspace */}
      {/* <MemberPage members={members} workspace={workspace} ownerWorkspace={ownerWorkspace} currentUserId={currentUserId} user={user} /> */}
      <Outlet context={{ members, workspace, ownerWorkspace, currentUserId, user, starredBoards }} />

      {/* Setting in this workspace*/}
      {/* <Settings workspace={workspace[0]} ownerWorkspace={ownerWorkspace} /> */}

    </Box>
  )
}

export default WorkspaceContent
