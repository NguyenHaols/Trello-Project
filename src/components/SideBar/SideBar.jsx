import { Box } from '@mui/material'
import Menu from './Menu/Menu'
import Workspace from './Menu/Workspace'
import { useState } from 'react'
import { ActiveContextBtn } from '~/Contexts/Context'
import { useSelector } from 'react-redux'


function SideBar() {
  const [activeBtn, setActiveBtn] = useState('board')
  const user = useSelector(state => state.user)
  const data = user
  const currentUserId = data._id 
  const workspaces = [...data.workspaces]
  return (
    <ActiveContextBtn.Provider value={{ activeBtn, setActiveBtn }}>

      <Box className='sideBar'
        sx={{
          width:'25%',
          height:'85vh',
          padding: '0 16px',
          position:'sticky',
          top:'100px',
          overflow:'hidden'
        }}
      >
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