import { useContext, useEffect, useState } from 'react'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import Box from '@mui/material/Box'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as trelloIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profiles from './Menus/Profiles'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { Link, useNavigate, useParams } from 'react-router-dom'
import style from '~/CSS/CSSGlobal.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import WorkspaceForm from './workspaceForm/WorkspaceForm'
import { Avatar, Dialog, DialogContent, IconButton, Popover, Popper } from '@mui/material'
import { useTheme } from '@emotion/react'
import { getNotifiAPI, getUser } from '~/apis'
import { formatDistanceToNow } from 'date-fns'
import { toast } from 'react-toastify'
import socket from '~/socket/socket'
import { setUser } from '~/redux/actions/userAction'
import MenuIcon from '@mui/icons-material/Menu';

function AppBar({sideBarMobileActive}) {
  const user = useSelector(state => state.user)
  const workspaces = user?.workspaces
  const [searchValue, setSearchValue] = useState('')
  const [open, setOpen] = useState(null)
  const [searchResults, setSearchResults] = useState(user.workspaces.flatMap(workspace => workspace.boards))
  const [notificationEl, setNotificationEl] = useState(null)
  const [notifications, setNotifications] = useState(null)
  const [activeNotification, setActiveNotification] = useState(false)
  const openNotification = Boolean(notificationEl)
  const idNotification = openNotification ? 'Notification-popover' : undefined
  const navigate = useNavigate()
  const allBoards = user.workspaces.flatMap(workspace => workspace.boards)
  const theme = useTheme()
  const textColor = theme.palette.text.primary
  const mainColor = theme.palette.primary.main
  const dispatch = useDispatch()

  const handleClickNotificationEl = (e) => {
    setActiveNotification(false)
    if (notificationEl) {
      setNotificationEl(null)
    } else {
      setNotificationEl(e.currentTarget)
    }
  }

  const handleCloseNotificationEl = (e) => {
    setNotificationEl(null)
  }

  const handleOpenSearch = (event) => {
    setOpen(open ? null : event.currentTarget)
  }

  const handleCloseSearch = (event) => {
    setOpen(null)
    setSearchValue('')
  }

  const handleSearchResult = (e) => {
    let value = e.target.value
    setSearchValue(value)
    if (!value) {
      return setSearchResults(allBoards)
    }
    const filteredResults = allBoards.filter(board =>
      board.title.toLowerCase().includes(value.toLowerCase())
    )
    setSearchResults(filteredResults)
  }
  const params = useParams()
  const handleNavigateToBoard = (id) => {
    if (params) {
      const newBoardPath = `/board/${id}`
      window.location.href = newBoardPath
    } else {
      navigate(`board/${id}`)
    }
  }

  const handleNavigateWorkspace = (id) => {
    navigate(`workspace/${id}/boards`)
  }

  useEffect(() => {
    socket.on('connection', () => {
      console.log('Connected to server')
    })


    socket.on('disconnect', () => {
      console.log('Disconnect from server')
    })

    socket.on('invited-Notification', (data) => {
      console.log('data')
      toast.success(data.message)
      getUser()
        .then(data => {
          const action = setUser(data)
          dispatch(action)
        })
        .catch(() => {
          navigate('/auth/login')
        })
    })

    socket.on('remove-Nofication', (data) => {
      toast.info(data.message)
      getUser()
        .then(data => {
          const action = setUser(data)
          dispatch(action)
        })
        .catch(() => {
          navigate('/auth/login')
        })
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('invited-Notification')
      socket.off('remove-Nofication')
    }
  })

  useEffect(() => {
    const data = {
      receiverId:user._id
    }
    getNotifiAPI(data)
      .then(res => {
        if (res.data.length > 0) {
          setNotifications(res.data)
        }
      })
  }, [user])

  return (

    <Box px={2} sx={{
      background:(theme) => (theme.palette.mode === 'dark' ? theme.trello.backgroundDark : theme.trello.backgroundLight),
      width:'100%',
      height: (theme) => theme.trello.appBarHight,
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between',
      gap: 2,
      overflow:'hidden',
      position: 'sticky',
      top:0,
      zIndex:10,
      borderBottom: '1px solid hsla(218, 54%, 19.6%, 0.16)'
    }}>


      <Box sx={{ display:'flex', alignItems:'center', gap:2 }}>
        <AppsIcon sx={{ color:'#2196f3', cursor:'pointer', display:['none', 'block'] }}/>
        <MenuIcon onClick={sideBarMobileActive} sx={{ color:'#2196f3', cursor:'pointer', display:['block', 'none'] }}/>
        <Link className={style['a-none']} to='/'>
          <Box sx={{ display:'flex', alignItems:'center', gap:0.5 }}>
            <SvgIcon component={trelloIcon} inheritViewBox sx={{ color:'#2196f3' }} />
            <Typography variant="span" sx={{ fontSize:'1.2rem', fontWeight:'bold', color:'#2196f3' }}>ItWorks</Typography>
          </Box>
        </Link>
        <Box sx={{
          display: { xs:'none', md:'flex' }, gap:1 }}>
          <Workspaces workspaces={workspaces} />
          <Recent />
          <Starred />
          {/* <Templates /> */}
          {/* <Button
            sx={{
              color:'white',
              bgcolor:(theme) => theme.palette.primary[500],
              border:'none',
              '&:hover':{ border:'none',
                bgcolor:(theme) => theme.palette.primary[800]
              }
            }}
            variant="outlined" startIcon={<LibraryAddIcon/>}> Create
          </Button> */}
          <WorkspaceForm />

        </Box>
      </Box>

      <Box sx={{ display:'flex', alignItems:'center', gap:2 }}>
        <Box onClick={handleOpenSearch}>
          <TextField
            id="outlined-search"
            label="Search"
            type="text"
            size="small"
            autoComplete='off'
            value = {searchValue}
            onChange = {handleSearchResult}
            InputProps={{
              startAdornment:(
                <InputAdornment position="start">
                  <SearchIcon sx={{color:(theme) => theme.palette.text.primary }} />
                </InputAdornment>
              ),
              endAdornment:(
                <InputAdornment position="end">
                  <CloseIcon
                    sx={{fontSize:'small', color:searchValue? (theme) => theme.palette.text.primary: 'transparent', cursor:'pointer' }}
                    onClick={handleCloseSearch}
                  />
                </InputAdornment>
              )
            }}
            sx={{
              display:['none', 'block'],
              position:'relative',
              minWidth: 120,
              maxWidth: 180,
              '& label':{ color:(theme) => theme.palette.text.primary },
              '& input':{ color:(theme) => theme.palette.text.primary },
              '& label.Mui-focused':{ color:(theme) => theme.palette.text.primary },
              '& MuiFormLabel-root':{
                'outline': 'none'
              },
              '& .MuiOutlinedInput-root':{
                '& fieldset' : {
                  borderColor:{ color:(theme) => theme.palette.text.primary }
                },
                '&:hover fieldset' : {
                  borderColor:{ color:(theme) => theme.palette.text.primary }
                },
                '&.Mui-focused fieldset' : {
                  borderColor:{ color:(theme) => theme.palette.text.primary }
                },
                'outline': 'none'
              }
            }} />
          <Popper open={Boolean(open)} anchorEl={open}>
            <Box sx={{
              backgroundColor:(theme) => theme.palette.mode === 'dark' ? '#333' : '#fff',
              width:'180px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              padding:'10px',
              maxHeight:'170px',
              overflow:'hidden'
            }}>
              {searchResults.map(board => (
                <Box onClick={() => handleNavigateToBoard(board._id)} key={board._id} sx={{ display:'flex', alignItems:'center', margin:'10px 0 5px 0', cursor:'pointer' }} >
                  <Box sx={{ width:'40px', marginRight:'10px', height:'40px', backgroundSize:'cover', backgroundImage: board.avatar ? `url(${board.avatar})`: 'linear-gradient(#c9372c,#fea362)', borderRadius:'4px', color:'white', textAlign:'center', lineHeight:'40px' }}>
                    { board.avatar ? '' : board.title[0]}
                  </Box>
                  <Box >
                    <Typography variant='body2' fontWeight='450'>{board.title}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Popper>
        </Box>

        <ModeSelect />
        <Tooltip title="Notification">
          <IconButton aria-describedby={idNotification} onClick={handleClickNotificationEl}>
            <Badge color="warning" invisible={!activeNotification} variant="dot" sx={{ cursor:'pointer' }}>
              <NotificationsNoneIcon sx={{ color:(theme) => theme.palette.text.primary }} />
            </Badge>
          </IconButton>
        </Tooltip>
        <Popover
          id={idNotification}
          open={openNotification}
          anchorEl={notificationEl}
          onClose={handleCloseNotificationEl}
          PaperProps={{
            sx: {
              overflow: 'visible', // Đảm bảo overflow của Popover là visible để shadow hiển thị
              borderRadius: '8px', // Đảm bảo border-radius của Popover đồng bộ với Box
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', // Đảm bảo shadow hiển thị đúng
              marginTop:'42px'
            }
          }}
        >
          <Box sx={{ width:'400px', minHeight:'330px', maxHeight:'78vh', borderRadius:'8px', overflow:'auto', p:'20px 10px 10px 10px' }}>
            <Box>
              <Typography variant='h5' sx={{ borderBottom:'1px solid #ccc', pb:'10px' }}>Notifications</Typography>
            </Box>
            {notifications && notifications.map(noti => {
              return (
                <Button onClick={() => {handleNavigateWorkspace(noti.workspaceId)}} key={noti._id} sx={{
                  width:'100%',
                  display:'Block',
                  p:'10px 0',
                  color:(theme) => theme.palette.text.primary,
                  '&:hover':{
                    bgcolor: 'var(--mui-palette-action-hover)'
                  } }}>
                  <Box sx={{ display:'block' }}>
                    <Typography sx={{ textAlign: 'right', width: '100%', pr:'10px', color:mainColor }}>
                      {formatDistanceToNow(new Date(noti.createdAt), { addSuffix: true }).replace('about', '')}
                    </Typography></Box>
                  <Box sx={{ display:'flex', alignItems:'center', textAlign:'left', pl:'5px', width:'100%' }}>
                    <Avatar src={noti?.senderInfo?.avatar}/>
                    <Typography sx={{ pl:'10px' }}>{noti.content} by <b>{noti.senderInfo.username}</b> </Typography>
                  </Box>
                </Button>
              )
            })}

          </Box>
        </Popover>
        <Tooltip title="Help">
          <IconButton><HelpOutlineIcon sx={{ cursor:'pointer' }}/></IconButton>
        </Tooltip>
        <Profiles />
      </Box>

    </Box>

  )
}


export default AppBar
