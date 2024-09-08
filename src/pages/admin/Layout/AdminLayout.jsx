import { Box, CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import SideBar from '../SideBar/Sidebar'
import Header from '../Header/Header'

function AdminLayOut() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const admin = localStorage.getItem('accessToken')
    if (!admin) {
      navigate('/admin/auth/login')
    } else {
      setIsLoading(false)
    }
  })

  if (isLoading) {
    return (
      <Box sx={{ height:'100vh', display: 'flex', justifyContent:'center', alignItems:'center' }}>
        <CircularProgress />
      </Box>
    )
  }
  return (
    <Box sx={{display:'flex'}}>
      <Box sx={{width:'20vw'}}><SideBar  /></Box>
      <Box sx={{width:'80vw', p:'8px 40px', bgcolor:'#f9fafb'}}>
        {/* header */}
        <Header />
        {/* mainContent */}
        <Outlet />
      </Box>

    </Box>
  )
}

export default AdminLayOut