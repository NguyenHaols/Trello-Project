import { useTheme } from '@emotion/react'
import { Avatar, Box, Button, Card, CardContent, CardMedia, CircularProgress, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import { width } from '@mui/system'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllWorkspaceApi } from '~/apis'
import apng from '~/assets/facebook.png'

function WorkspaceAdmin() {
  const [loading, setIsloading] = useState(true)
  const [workspaces, setWorkspaces] = useState([])
  const [searchValue, setSearchValue] = useState(null)
  const [conditionSearch, setConditionSearch] = useState('title')
  const navigate = useNavigate()
  const theme = useTheme()
  const mainColor = theme.palette.primary.main
  const textColor = theme.palette.text.secondary
  const bgColor = theme.palette.primary[700]

  const handleNavigateWorkspaceDetail = (workspaceId) => {
    navigate(workspaceId)
  }

  const handleSearchWorkspace = () => {
    if (searchValue) {
      const filteredWorkspaces = workspaces.filter(workspace => {
        if (conditionSearch === 'id') {
          return workspace._id.toLowerCase().includes(searchValue.toLowerCase())
        }
        if (conditionSearch === 'title') {
          return workspace.title.toLowerCase().includes(searchValue.toLowerCase())
        }
        return false
      })
      setWorkspaces(filteredWorkspaces)
    } else {
      getAllWorkspaceApi()
        .then(res => {
          setWorkspaces(res)
        })
    }
  }

  useEffect(() => {
    getAllWorkspaceApi()
      .then(res => {
        setWorkspaces(res)
        setIsloading(false)
      })
  }, [])

  if (loading) {
    return (
      <Box sx={{ height:'100vh', display: 'flex', justifyContent:'center', alignItems:'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ mb:'20px' }}>
        <Typography fontWeight='700' variant='h5'>Workspaces</Typography>
      </Box>
      <Box sx={{display:'flex', justifyContent:'flex-end', mb:'20px'}}>
        <Box>
          <TextField size='small' placeholder='Search' onChange={(e) => setSearchValue(e.target.value)} />
          <Select size='small' value={conditionSearch} onChange={(e) => setConditionSearch(e.target.value)} sx={{ml:'10px', minWidth:'80px'}}>
            <MenuItem value='id'>Id</MenuItem>
            <MenuItem value='title'>Title</MenuItem>
          </Select>
          <Button onClick={handleSearchWorkspace} sx={{bgcolor:mainColor, color:textColor, ml:'10px', '&:hover':{bgcolor:bgColor}}}>Search</Button>
        </Box>
      </Box>
      <Grid container spacing={3} >
        {workspaces.map(w =>
          (
            <Grid onClick={() => handleNavigateWorkspaceDetail(w._id)} key={w._id} item xs={12} sm={6} md={3}>
              <Card sx={{ height:'300px', width:'100%', borderRadius:'16px', cursor:'pointer' }}>
                {w.avatar ? (
                  <CardMedia height='80%' component="img" image={w.avatar} sx={{ '&:hover' : { opacity:0.9 } }} />
                ) : (
                  <Box
                    height='80%'
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    sx={{ backgroundColor: '#f0f0f0', borderRadius: '16px' }}
                  >
                    <Avatar sx={{ width: '50%', height: '50%', fontSize: '3rem' }}>
                      {w.title.charAt(0).toUpperCase()}
                    </Avatar>
                  </Box>
                )}
                <CardContent sx={{ height:'20%' }}>
                  <Typography fontWeight='700'> {w._id} </Typography>
                  <Typography fontWeight='700'> {w.title} </Typography>
                  {/* <Typography textOverflow='ellipsis' whiteSpace='nowrap' overflow='hidden'> {w.description} </Typography> */}
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </Box>
  )
}

export default WorkspaceAdmin