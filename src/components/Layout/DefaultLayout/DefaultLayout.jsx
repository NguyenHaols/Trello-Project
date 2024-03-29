import { Box } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import SideBar from '~/components/SideBar/SideBar'
import { MocDataUserAPI } from '~/apis/mock-data'
import { Outlet } from 'react-router-dom'
function DefaultLayout() {
console.log('🚀 ~ MocDataUserAPI:', MocDataUserAPI)
  const data = MocDataUserAPI
  return (
    <Box >
      <AppBar data={data} />
      <Box className='Container' sx={{
        width: '100%',
        height:'100%',
        display:'flex',
        justifyContent:'center',
        bgcolor:(theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1565c0')

      }}>
        <Box sx={{
          width: '80%',
          height:'100%',
          display:'flex',
          justifyContent:'center',
          paddingTop: '40px',
          bgcolor:(theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1565c0')
        }}>
          <SideBar />
          <Box className='content' sx={{
            width:'75%',
            height:'200vh'
          }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default DefaultLayout