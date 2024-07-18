import AppBar from '~/components/AppBar/AppBar'
import { Box, CircularProgress, Container } from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getUser } from '~/apis'
import { UserDataContext } from '~/Contexts/UserContext'
import Cookies from 'js-cookie'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '~/redux/actions/userAction'

function AppBarOnlyLayout() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  // const data = MocDataUserAPI
  useEffect(() => {

    getUser()
      .then(data => {
        const action = setUser(data)
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
    <Container disableGutters maxWidth={false}
      sx={{
        background:(theme) => (theme.palette.mode === 'dark' ? theme.trello.backgroundDark : theme.trello.backgroundLight),
        height:'100vh'
      }}
    >


      <AppBar />
      <Outlet />

    </Container>
  )
}

export default AppBarOnlyLayout