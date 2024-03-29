import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'


function Workspaces({ workspaces }) {
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
      <Button
        sx={{ color:'white' }}
        id="basic-button-workspaces"
        aria-controls={open ? 'basic-menu-workspaces' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<ExpandMoreIcon/>}
      >
        Dashboard
      </Button>
      <Menu
        sx={{ top:'12px' }}
        id="basic-menu-workspaces"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-workspaces'
        }}
      >
        <MenuItem>
          <Typography variant="body2" color="text.secondary">Các không gian làm việc của bạn</Typography>
        </MenuItem>
        {workspaces.map(workspace => (
          <Box key={workspace._id}>
            <MenuItem>
              <ListItemIcon>
                <Box sx={{ width:'40px', marginRight:'10px', height:'40px', backgroundImage:'linear-gradient(#c9372c,#fea362)', borderRadius:'4px', color:'white', textAlign:'center', lineHeight:'40px' }}> {workspace.title[0]} </Box>
              </ListItemIcon>
              <ListItemText>
                <Typography variant='body2' fontWeight='450'>{workspace.title}</Typography>
              </ListItemText>
            </MenuItem>
          </Box>
        ))}

      </Menu>
    </Box>
  )
}

export default Workspaces