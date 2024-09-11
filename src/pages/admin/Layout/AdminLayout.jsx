import { Box, CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import SideBar from '../SideBar/Sidebar'
import Header from '../Header/Header'
import { useSelector } from 'react-redux'

function AdminLayOut() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const user = useSelector(state => state.user)

  useEffect(() => {
    if (user.roleId != '66136281a82158d0e227adcf') {
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
    <Box sx={{ display:'flex' }}>
      <Box sx={{ width:'20vw' }}><SideBar /></Box>
      <Box sx={{ width:'80vw', p:'8px 40px', bgcolor:'#f9fafb' }}>
        {/* header */}
        <Header user={user} />
        {/* mainContent */}
        <Outlet />
      </Box>

    </Box>
  )
}

export default AdminLayOut