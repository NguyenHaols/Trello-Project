import React from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import HelpIcon from '@mui/icons-material/Help'
import Cookies from 'js-cookie'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

function Profiles() {
  const user = useSelector(state => state.user)
  const data = user
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const { t } = useTranslation()

  const handleClick = (event) => {
    setAnchorEl((prev) => (prev ? null : event.currentTarget))
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleNavigationLogOut = () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    localStorage.removeItem('accessToken')
    navigate('/auth/login')
  }

  return (
    <Box >

      <Tooltip title={data.username}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding:0 }}
          aria-controls={open ? 'account-menu-Profiles' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{ width: 36, height: 36 }}
            alt={data.username}
            src={data.avatar}
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
        sx={{
          '& .MuiPaper-root' : {top:'59px !important'}
        }}
      >

        <MenuItem onClick={() => {navigate('/profile')}}>
          <Avatar src={data.avatar} sx={{width:28, height:28, mr:2 }} /> {t('profile')}
        </MenuItem>
        <Divider />
        <MenuItem >
          <ListItemIcon>
            <HelpIcon fontSize="small" />
          </ListItemIcon>
          {t('help')}
        </MenuItem>
        <MenuItem >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          {t('settings')}
        </MenuItem>
        <MenuItem onClick={handleNavigationLogOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t('log_out')}
        </MenuItem>

      </Menu>
    </Box>
  )
}

export default Profiles