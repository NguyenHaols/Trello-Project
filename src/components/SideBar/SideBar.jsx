import { Box} from '@mui/material'
import Menu from './Menu/Menu'
import Workspace from './Menu/Workspace'
import { Routes, Route, Link } from 'react-router-dom'


function SideBar() {

  return (
    <Box className='sideBar'
      sx={{
        width:'25%',
        height:'100vh',
        overflowY: 'auto',
        padding: '0 16px'
      }}
    >
      <Menu />

      <Workspace/>
      <Workspace/>
      

    </Box>
  )
}

export default SideBar