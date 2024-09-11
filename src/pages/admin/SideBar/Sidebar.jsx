import { Box, List, ListItemButton, ListItemIcon, ListItemText, SvgIcon, Typography } from '@mui/material'
import { useState } from 'react'
import { ReactComponent as trelloIcon } from '~/assets/trello.svg'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import GroupIcon from '@mui/icons-material/Group'
import { useTheme } from '@emotion/react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import FlagIcon from '@mui/icons-material/Flag'
import { useLocation, useNavigate } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person'

function SideBar() {
  const location = useLocation()
  const path = location.pathname.split('/').pop()
  const [activeBtn, setActiveBtn] = useState(path)
  const theme = useTheme()
  const navigate = useNavigate()
  const mainColor = theme.palette.primary.main
  const bgColor = theme.palette.primary
  
  const handleUpdateActiveBtn = (name) => {
    setActiveBtn(name)
    navigate(`${name.toLowerCase()}`)
  }
  return (
    <Box sx={{height:'100vh', p:'0 20px 20px 20px' }}>
      <Box sx={{ display:'flex', alignItems:'center', height:'72px' }}>
        <SvgIcon component={trelloIcon} inheritViewBox sx={{ color:'#2196f3', mr:'15px' }} />
        <Typography variant="span" sx={{ fontSize:'1.2rem', fontWeight:'bold', color:'#2196f3' }}> ItWorks</Typography>
      </Box>
      <List>
        <ListItemButton
          onClick={ () => handleUpdateActiveBtn('dashboard')}
          sx={{
            color: activeBtn === 'dashboard' ? mainColor : 'unset',
            bgcolor: activeBtn === 'dashboard' ? bgColor[50] : 'unset',
            borderRadius:'5px'
          }}
        >
          <ListItemIcon>
            <LeaderboardIcon sx={{
              color: activeBtn === 'dashboard' ? mainColor : 'unset'
            }} />
          </ListItemIcon>
          <ListItemText > <Typography fontWeight='700'>Dashboard </Typography></ListItemText>
        </ListItemButton>

        <ListItemButton
          onClick={ () => handleUpdateActiveBtn('user')}
          sx={{
            color: activeBtn === 'user' ? mainColor : 'unset',
            bgcolor: activeBtn === 'user' ? bgColor[50] : 'unset',
            borderRadius:'5px'
          }}
        >
          <ListItemIcon>
            <GroupIcon sx={{
              color: activeBtn === 'user' ? mainColor : 'unset'
            }} />
          </ListItemIcon>
          <ListItemText > <Typography fontWeight='700'>User </Typography></ListItemText>
        </ListItemButton>

        <ListItemButton
          onClick={ () => handleUpdateActiveBtn('workspace')}
          sx={{
            color: activeBtn === 'workspace' ? mainColor : 'unset',
            bgcolor: activeBtn === 'workspace' ? bgColor[50] : 'unset',
            borderRadius:'5px'
          }}
        >
          <ListItemIcon>
            <DashboardIcon sx={{
              color: activeBtn === 'workspace' ? mainColor : 'unset'
            }} />
          </ListItemIcon>
          <ListItemText > <Typography fontWeight='700'>Workspace </Typography></ListItemText>
        </ListItemButton>

        <ListItemButton
          onClick={ () => handleUpdateActiveBtn('report')}
          sx={{
            color: activeBtn === 'report' ? mainColor : 'unset',
            bgcolor: activeBtn === 'report' ? bgColor[50] : 'unset',
            borderRadius:'5px'
          }}
        >
          <ListItemIcon>
            <FlagIcon sx={{
              color: activeBtn === 'report' ? mainColor : 'unset'
            }} />
          </ListItemIcon>
          <ListItemText > <Typography fontWeight='700'>Report </Typography></ListItemText>
        </ListItemButton>

        <ListItemButton
          onClick={ () => handleUpdateActiveBtn('profile')}
          sx={{
            color: activeBtn === 'profile' ? mainColor : 'unset',
            bgcolor: activeBtn === 'profile' ? bgColor[50] : 'unset',
            borderRadius:'5px'
          }}
        >
          <ListItemIcon>
            <PersonIcon sx={{
              color: activeBtn === 'profile' ? mainColor : 'unset'
            }} />
          </ListItemIcon>
          <ListItemText > <Typography fontWeight='700'>My profile </Typography></ListItemText>
        </ListItemButton>
      </List>
    </Box>
  )
}

export default SideBar