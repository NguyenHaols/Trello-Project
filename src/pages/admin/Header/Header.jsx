import { Avatar, Box, IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material'
import { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'

function Header() {
  const [avatarMenuEl, setAvatarMenuEl] = useState(null)

  const handleOpenAvatarMenu = (e) => {
    setAvatarMenuEl(e.currentTarget)
  }

  const handleCloseAvatarMenu = () => {
    setAvatarMenuEl(null)
  }
  return (
    <Box sx={{ display:'flex', justifyContent:'flex-end', alignItems:'center', height:'72px', width:'100%' }}>
      <Typography mr='10px' fontWeight='700'> Hi ! Admin Nguyễn Hào </Typography>
      <IconButton onClick={(e) => handleOpenAvatarMenu(e)}><Avatar /></IconButton>
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
        <MenuItem>
          <ListItemIcon><PersonIcon /></ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          Log out</MenuItem>
      </Menu>
    </Box>
  )
}

export default Header