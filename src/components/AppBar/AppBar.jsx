import { useContext, useState } from 'react'
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
import { Link } from 'react-router-dom'
import style from '~/CSS/CSSGlobal.module.scss'
import { useSelector } from 'react-redux'
import WorkspaceForm from './workspaceForm/WorkspaceForm'
import { Dialog, DialogContent, Popover, Popper } from '@mui/material'

function AppBar() {
  const user = useSelector(state => state.user)
  const workspaces = user?.workspaces
  const [searchValue, setSearchValue] = useState('')
  const [open, setOpen] = useState(null)
  const [searchResults, setSearchResults] = useState(user.workspaces.flatMap(workspace => workspace.boards))

  const allBoards = user.workspaces.flatMap(workspace => workspace.boards)

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
        <AppsIcon sx={{ color:'#2196f3', cursor:'pointer' }}/>
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
                  <SearchIcon sx={{ color:(theme) => theme.palette.text.primary }} />
                </InputAdornment>
              ),
              endAdornment:(
                <InputAdornment position="end">
                  <CloseIcon
                    sx={{ fontSize:'small', color:searchValue? (theme) => theme.palette.text.primary: 'transparent', cursor:'pointer' }}
                    onClick={handleCloseSearch}
                  />
                </InputAdornment>
              )
            }}
            sx={{
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
              backgroundColor:(theme) => theme.palette.mode === 'dark' ? '#333' : '#fff' ,
              width:'180px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              padding:'10px',
              maxHeight:'170px',
              overflow:'hidden',
            }}>
              {searchResults.map(board => (
                <Box key={board._id} sx={{ display:'flex', alignItems:'center', margin:'10px 0 5px 0' }}>
                  <Box sx={{ width:'40px', marginRight:'10px', height:'40px', backgroundImage: board.avatar ? `url(${board.avatar})`: 'linear-gradient(#c9372c,#fea362)', borderRadius:'4px', color:'white', textAlign:'center', lineHeight:'40px' }}>
                    { board.avatar ? '' : board.title[0]}
                  </Box>
                  <Box>
                    <Typography variant='body2' fontWeight='450'>{board.title}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Popper>
        </Box>

        <ModeSelect />
        <Tooltip title="Notification">
          <Badge color="warning" variant="dot" sx={{ cursor:'pointer' }}>
            <NotificationsNoneIcon sx={{ color:(theme) => theme.palette.text.primary }} />
          </Badge>
        </Tooltip>
        <Tooltip title="Notification">
          <HelpOutlineIcon sx={{ cursor:'pointer' }}/>
        </Tooltip>
        <Profiles />
      </Box>

    </Box>

  )
}


export default AppBar
