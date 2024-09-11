import { Avatar, Box, IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material'
import { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { setUser } from '~/redux/actions/userAction'
import { useDispatch } from 'react-redux'

function Header({user}) {
  const [avatarMenuEl, setAvatarMenuEl] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleOpenAvatarMenu = (e) => {
    setAvatarMenuEl(e.currentTarget)
  }

  const handleCloseAvatarMenu = () => {
    setAvatarMenuEl(null)
  }

  const handleLogOut = () => {
    const action = setUser(null)
    dispatch(action)
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    localStorage.removeItem('accessToken')
    navigate('/admin/auth/login')
  }
  return (
    <Box sx={{ display:'flex', justifyContent:'flex-end', alignItems:'center', height:'72px', width:'100%' }}>
      <Typography mr='10px' fontWeight='700'> Hi ! Admin {user.username} </Typography>
      <IconButton onClick={(e) => handleOpenAvatarMenu(e)}><Avatar src={user.avatar}/></IconButton>
      <Menu
        anchorEl={avatarMenuEl}
        open={Boolean(avatarMenuEl)}
        onClose={handleCloseAvatarMenu}
        anchorOrigin={{
          vertical:'bottom',
          horizontal:'left'
        }}
        sx={{ width:'200px' }}
      >
        <MenuItem onClick={() => navigate('profile') }>
          <ListItemIcon><PersonIcon /></ListItemIcon>
          Profile
        </MenuItem>

        <MenuItem onClick={() => handleLogOut()} >
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          Log out</MenuItem>
      </Menu>
    </Box>
  )
}

export default Header