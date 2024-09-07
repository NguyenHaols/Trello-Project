import { Box, List, ListItemButton, ListItemIcon, ListItemText, SvgIcon, Typography } from '@mui/material'
import { useState } from 'react'
import { ReactComponent as trelloIcon } from '~/assets/trello.svg'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import GroupIcon from '@mui/icons-material/Group'
import { useTheme } from '@emotion/react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import FlagIcon from '@mui/icons-material/Flag'
import { useNavigate } from 'react-router-dom'

function SideBar() {
  const [activeBtn, setActiveBtn] = useState('Dashboard')
  const theme = useTheme()
  const navigate = useNavigate()
  const mainColor = theme.palette.primary.main
  const bgColor = theme.palette.primary

  const handleUpdateActiveBtn = (name) => {
    setActiveBtn(name)
    navigate(`${name.toLowerCase()}`)
  }
  return (
    <Box sx={{ width: '300px', height:'100vh', p:'0 20px 20px 20px' }}>
      <Box sx={{ display:'flex', alignItems:'center', height:'72px' }}>
        <SvgIcon component={trelloIcon} inheritViewBox sx={{ color:'#2196f3', mr:'15px' }} />
        <Typography variant="span" sx={{ fontSize:'1.2rem', fontWeight:'bold', color:'#2196f3' }}> ItWorks</Typography>
      </Box>
      <List>
        <ListItemButton
          onClick={ () => handleUpdateActiveBtn('Dashboard')}
          sx={{
            color: activeBtn === 'Dashboard' ? mainColor : 'unset',
            bgcolor: activeBtn === 'Dashboard' ? bgColor[50] : 'unset',
            borderRadius:'5px'
          }}
        >
          <ListItemIcon>
            <LeaderboardIcon sx={{
              color: activeBtn === 'Dashboard' ? mainColor : 'unset'
            }} />
          </ListItemIcon>
          <ListItemText > <Typography fontWeight='700'>Dashboard </Typography></ListItemText>
        </ListItemButton>

        <ListItemButton
          onClick={ () => handleUpdateActiveBtn('User')}
          sx={{
            color: activeBtn === 'User' ? mainColor : 'unset',
            bgcolor: activeBtn === 'User' ? bgColor[50] : 'unset',
            borderRadius:'5px'
          }}
        >
          <ListItemIcon>
            <GroupIcon sx={{
              color: activeBtn === 'User' ? mainColor : 'unset'
            }} />
          </ListItemIcon>
          <ListItemText > <Typography fontWeight='700'>User </Typography></ListItemText>
        </ListItemButton>

        <ListItemButton
          onClick={ () => handleUpdateActiveBtn('Workspace')}
          sx={{
            color: activeBtn === 'Workspace' ? mainColor : 'unset',
            bgcolor: activeBtn === 'Workspace' ? bgColor[50] : 'unset',
            borderRadius:'5px'
          }}
        >
          <ListItemIcon>
            <DashboardIcon sx={{
              color: activeBtn === 'Workspace' ? mainColor : 'unset'
            }} />
          </ListItemIcon>
          <ListItemText > <Typography fontWeight='700'>Workspace </Typography></ListItemText>
        </ListItemButton>

        <ListItemButton
          onClick={ () => handleUpdateActiveBtn('Report')}
          sx={{
            color: activeBtn === 'Report' ? mainColor : 'unset',
            bgcolor: activeBtn === 'Report' ? bgColor[50] : 'unset',
            borderRadius:'5px'
          }}
        >
          <ListItemIcon>
            <FlagIcon sx={{
              color: activeBtn === 'Report' ? mainColor : 'unset'
            }} />
          </ListItemIcon>
          <ListItemText > <Typography fontWeight='700'>Report </Typography></ListItemText>
        </ListItemButton>
      </List>
    </Box>
  )
}

export default SideBar