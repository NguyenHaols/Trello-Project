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

function AppBar() {
  const user = useSelector(state => state.user)
  const workspaces = user?.workspaces
  const [searchValue, setSearchValue] = useState('')
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
        <AppsIcon sx={{ color:(theme) => theme.palette.primary, cursor:'pointer' }}/>
        <Link className={style['a-none']} to='/'>
          <Box sx={{ display:'flex', alignItems:'center', gap:0.5 }}>
            <SvgIcon component={trelloIcon} inheritViewBox sx={{ color:(theme) => theme.palette.text.primary }} />
            <Typography variant="span" sx={{ fontSize:'1.2rem', fontWeight:'bold', color:(theme) => theme.palette.text.primary }}>ItWorks</Typography>
          </Box>
        </Link>
        <Box sx={{
          display: { xs:'none', md:'flex' }, gap:1 }}>
          <Workspaces workspaces={workspaces} />
          <Recent />
          <Starred />
          <Templates />
          <Button
            sx={{
              color:(theme) => theme.palette.text.primary,
              border:'none',
              '&:hover':{ border:'none',
                bgcolor:(theme) => theme.palette.primary[300]
              }
            }}
            variant="outlined" startIcon={<LibraryAddIcon/>}>Create
          </Button>
        </Box>
      </Box>

      <Box sx={{ display:'flex', alignItems:'center', gap:2 }}>
        <TextField
          id="outlined-search"
          label="Search"
          type="text"
          size="small"
          value = {searchValue}
          onChange = {(e) => setSearchValue(e.target.value)}
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
                  onClick={() => setSearchValue('')}
                />
              </InputAdornment>
            )
          }}
          sx={{
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
