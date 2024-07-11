import { Box, Typography, Button } from '@mui/material'
import { ReactComponent as trelloIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import PeopleIcon from '@mui/icons-material/People'
import SettingsIcon from '@mui/icons-material/Settings'
import { useNavigate } from 'react-router-dom'

function Workspace({ data }) {
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate(`/workspace/${data._id}`)
  }

  return (
    <Box display='flex' justifyContent='space-between' sx={{ display:{ xs:'block', md:'flex' } }}>
      <Box sx={{ display:'flex', alignItems:'center', margin:'10px 0' }}>
        <Box sx={{
          width: '32px',
          height: '32px',
          backgroundImage:  data.avatar ? `url(${data.avatar})` : 'linear-gradient(#c9372c,#fea362)',
          borderRadius:'4px',
          color:'white',
          textAlign:'center',
          lineHeight:'32px',
          marginRight:'10px',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}> {data.avatar ? '' : data.title[0]} </Box>
        <Typography variant='body3' fontWeight='bold'>{data.title}</Typography>
      </Box>
      <Box sx={{ display:'flex', flexWrap:'wrap', justifyContent:'space-between' }}>
        <Button onClick={handleNavigate} sx={{ width:{ xs:'47%', md:'auto' }, display:'flex', justifyContent:'left', alignItems:'center', marginTop:'10px', bgcolor:(theme) => theme.palette.primary[500], padding:'5px 10px', margin:'0 10px 10px 0', '&:hover':{ bgcolor:(theme) => theme.palette.primary[800] } }} >
          <SvgIcon component={trelloIcon} inheritViewBox sx={{ color:(theme) => 'white' }} />
          <Typography variant='body2' sx={{ marginLeft:'10px', color:(theme) => 'white' }}>  Boards </Typography>
        </Button>
        <Button onClick={handleNavigate} sx={{ width:{ xs:'47%', md:'auto' }, display:'flex', justifyContent:'left', alignItems:'center', marginTop:'10px', bgcolor:(theme) => theme.palette.primary[500], padding:'5px 10px', margin:'0 10px 10px 0', '&:hover':{ bgcolor:(theme) => theme.palette.primary[800] } }} >
          <PeopleIcon inheritViewBox sx={{ color:(theme) => 'white' }} />
          <Typography variant='body2' sx={{ marginLeft:'10px', color:(theme) => 'white' }}> Members{/* ({data.members.length}) */} </Typography>
        </Button>
        <Button onClick={handleNavigate} sx={{ width:{ xs:'47%', md:'auto' }, display:'flex', justifyContent:'left', alignItems:'center', marginTop:'10px', bgcolor:(theme) => theme.palette.primary[500], padding:'5px 10px', margin:'0 10px 10px 0', '&:hover':{ bgcolor:(theme) => theme.palette.primary[800] } }} >
          <SettingsIcon inheritViewBox sx={{ color:(theme) => 'white' }} />
          <Typography variant='body2' sx={{ marginLeft:'10px', color:(theme) => 'white' }}>  Settings </Typography>
        </Button>
      </Box>
    </Box>
  )
}

export default Workspace