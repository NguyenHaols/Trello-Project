import React from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'

function Profiles() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box >

      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding:0 }}
          aria-controls={open ? 'account-menu-Profiles' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{ width: 30, height: 32 }}
            alt='Avatar'
            src='https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/277170307_1034966347092287_3015904123988480602_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeE7gDVDAN7dkQlwXX3tlo-hKKwPlxXQm-YorA-XFdCb5iY8wgEkB7jgZcY6wX4EP3wRFCBG9oTn-6IMfpyPzw_O&_nc_ohc=ImRJwlN5tXMAX8QkW7X&_nc_ht=scontent.fhan14-5.fna&oh=00_AfAJ_XUzAq_Q8yrbVKvE2r3pZcH1vgmreu88Qgnb9kYTrg&oe=65EE9484'
          />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu-Profiles"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-Profiles'
        }}
      >

        <MenuItem >
          <Avatar sx={{width:28, height:28, mr:2 }} /> Profile
        </MenuItem>
        <MenuItem >
          <Avatar sx={{width:28, height:28, mr:2 }}/> My account
        </MenuItem>
        <Divider />
        <MenuItem >
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>

      </Menu>
    </Box>
  )
}

export default Profiles