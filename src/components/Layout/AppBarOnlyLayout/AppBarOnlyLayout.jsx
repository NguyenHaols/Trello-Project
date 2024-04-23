import AppBar from '~/components/AppBar/AppBar'
import { Box, CircularProgress, Container } from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getUser } from '~/apis'
import { UserDataContext } from '~/Contexts/UserContext'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'

function AppBarOnlyLayout() {
  const navigate = useNavigate()
  const userData = useSelector(state => state.user)
  console.log('🚀 ~ AppBarOnlyLayout ~ userData:', userData)
  // const [userData, setUserData] = useState(null)
  // const data = MocDataUserAPI
  const data = userData
  // useEffect(() => {
  //   const token = Cookies.get('accessToken')
  //   if (token) {
  //     getUser(token)
  //       .then(data => {
  //         setUserData(data)
  //       })
  //   }
  // }, [])

  if (!data) {
    return (
      <Box sx={{ height:'100vh', display: 'flex', justifyContent:'center', alignItems:'center' }}>
        <CircularProgress />
      </Box>
    )
  }
  return (
    <Container disableGutters maxWidth={false} sx={{ height:(theme) => theme.trello.BOARD_CONTENT_HEIGHT }}>

      <AppBar />
      <Outlet />

    </Container>
  )
}

export default AppBarOnlyLayout