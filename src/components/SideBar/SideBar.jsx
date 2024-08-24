import { Box, IconButton, Typography } from '@mui/material'
import Menu from './Menu/Menu'
import Workspace from './Menu/Workspace'
import { useState } from 'react'
import { ActiveContextBtn } from '~/Contexts/Context'
import { useSelector } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close'
import { useTheme } from '@emotion/react'

function SideBar({sideBarMobileClose, isSideBarMobileOpen}) {
  const [activeBtn, setActiveBtn] = useState('board')
  const user = useSelector(state => state.user)
  const data = user
  const currentUserId = data._id
  const workspaces = [...data.workspaces]
  const theme = useTheme()
  const textColor = theme.palette.text.primary
  const mainColor = theme.palette.primary.main
  return (
    <ActiveContextBtn.Provider value={{ activeBtn, setActiveBtn }}>

      <Box className='sideBar'
        sx={{
          width:['100%', '25%'],
          height:['100vh','85vh'],
          padding: ['16px 16px', '0 16px'],
          position:['fixed', 'sticky'],
          top:['0', '100px'],
          left:{ xs:'0' },
          overflow:'auto',
          zIndex:['1000', '0'],
          bgcolor:['white', 'unset'],
          display:[`${isSideBarMobileOpen? 'block' : 'none'}`, 'block'],
        }}
      >
        <Box sx={{
          display:['block', 'none'],
          textAlign:'right'
        }}>
          <IconButton onClick={sideBarMobileClose}>
            <CloseIcon sx={{fontSize:'32px'}} />
          </IconButton>
        </Box>
        <Menu />
        {workspaces.length ?
          <>
            {workspaces.map(workspace =>
              (<Workspace key={workspace._id} data={workspace} currentUserId={currentUserId} />)
            )}
          </>
          :
          <></>
        }

      </Box>
    </ActiveContextBtn.Provider>


  )
}

export default SideBar