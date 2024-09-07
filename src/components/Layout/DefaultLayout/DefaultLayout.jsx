import { Box } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import SideBar from '~/components/SideBar/SideBar'
import { MocDataUserAPI } from '~/apis/mock-data'
import { Outlet } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { getUser } from '~/apis'
import CircularProgress from '@mui/material/CircularProgress'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '~/redux/actions/userAction'
import socket from '~/socket/socket'
import { toast } from 'react-toastify'


function DefaultLayout() {
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const data = user
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [sideBarMobile, setSideBarMobile] = useState(false)
  const userRef = useRef()
  const sideBarMobileClose = () => {
    setSideBarMobile(false)
  }
  const sideBarMobileActive = () => {
    setSideBarMobile(true)
  }
  // const data = MocDataUserAPI
  useEffect(() => {

    getUser()
      .then(data => {
        const action = setUser(data)
        userRef.current = data
        socket.emit('newUser', userRef.current?.email)
        dispatch(action)
        setIsLoading(false)
      })
      .catch(() => {
        navigate('/auth/login')
      })
  }, [])


  if (isLoading) {
    return (
      <Box sx={{ height:'100vh', display: 'flex', justifyContent:'center', alignItems:'center' }}>
        <CircularProgress />
      </Box>
    )
  }
  return (
    <Box >
      <AppBar data={data} sideBarMobileActive={sideBarMobileActive} />
      <Box className='Container' sx={{
        width: '100%',
        height:'100%',
        display:'flex',
        justifyContent:'center',
        background:(theme) => (theme.palette.mode === 'dark' ? theme.trello.backgroundDark : theme.trello.backgroundLight)


      }}>
        <Box sx={{
          width: ['100%', '80%'],
          height:'100%',
          display:'flex',
          justifyContent:'center',
          paddingTop: '40px'

        }}>
          <SideBar sideBarMobileClose={sideBarMobileClose} isSideBarMobileOpen={sideBarMobile} />
          <Box className='content' sx={{
            width:['100%', '75%']
          }}>
            <Outlet context={[data]}/>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default DefaultLayout