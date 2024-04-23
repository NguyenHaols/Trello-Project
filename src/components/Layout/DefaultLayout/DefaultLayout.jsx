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


function DefaultLayout() {
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const data = user
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  // const data = MocDataUserAPI
  useEffect(() => {
    const token = Cookies.get('accessToken')
    if (token) {
      getUser()
        .then(data => {
          const action = setUser(data)
          dispatch(action)
          setIsLoading(false)
        })
    } else {
      navigate('/auth/login')
    }
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
      <AppBar data={data} />
      <Box className='Container' sx={{
        width: '100%',
        height:'100%',
        display:'flex',
        justifyContent:'center',
        background:(theme) => (theme.palette.mode === 'dark' ? theme.trello.backgroundDark : theme.trello.backgroundLight)


      }}>
        <Box sx={{
          width: '80%',
          height:'100%',
          display:'flex',
          justifyContent:'center',
          paddingTop: '40px'

        }}>
          <SideBar />
          <Box className='content' sx={{
            width:'75%'
          }}>
            <Outlet context={[data]}/>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default DefaultLayout