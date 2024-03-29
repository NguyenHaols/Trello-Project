import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import MenuList from '@mui/material/MenuList'
import Button from '@mui/material/Button'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SvgIcon from '@mui/material/SvgIcon'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import PeopleIcon from '@mui/icons-material/People'
import SettingsIcon from '@mui/icons-material/Settings'
import { ReactComponent as trelloIcon } from '~/assets/trello.svg'


function Workspace() {
  const [activeButton, setAtiveButton] = useState(false)
  const handleButtonClick = () => {
    setAtiveButton(!activeButton)
  }
  return (
    <>
      <MenuList>
        <Button
          onClick={handleButtonClick}
          endIcon={<ExpandMoreIcon sx={{ position:'absolute', right:0, bottom:'25%' }}/>}
          sx={{ 
            display:'flex', 
            color:'white', 
            justifyContent:'left', 
            bgcolor: activeButton ? 'primary.main' : 'transparent', 
            width:'100%',
            '&:hover':{
              bgcolor:'primary.main'
            }
          }}
        >
          <Box sx={{
            width: '24px',
            height: '24px',
            backgroundImage: 'linear-gradient(#c9372c,#fea362)',
            borderRadius:'4px',
            color:'white'

          }}> F </Box>
          <Typography sx={{ marginLeft:'10px', color:'white' }}> FE workspace </Typography>
        </Button>

        {activeButton &&
          <Box>
            <MenuItem>
              <ListItemIcon sx={{ marginLeft:'20%' }}>
                <SvgIcon component={trelloIcon} inheritViewBox sx={{ color:'white' }} />
              </ListItemIcon>
              <ListItemText sx={{ color:'white' }}>Board</ListItemText>
            </MenuItem>

            <MenuItem>
              <ListItemIcon sx={{ marginLeft:'20%' }}>
                <PeopleIcon sx={{ color:'white' }}/>
              </ListItemIcon>
              <ListItemText sx={{ color:'white' }}>Members</ListItemText>
            </MenuItem>

            <MenuItem>
              <ListItemIcon sx={{ marginLeft:'20%' }}>
                <SettingsIcon sx={{ color:'white' }}/>
              </ListItemIcon>
              <ListItemText sx={{ color:'white' }}>Settings</ListItemText>
            </MenuItem>
          </Box>
        }


      </MenuList>

    </>
  )
}

export default Workspace