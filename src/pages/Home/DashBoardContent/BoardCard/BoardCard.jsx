import { Box, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea } from '@mui/material'
import { useNavigate } from 'react-router-dom'


function BoardCard({ data }) {
  // console.log('🚀 ~ BoardCard ~ data:', data)
  const navigate = useNavigate()
  const handleLinkBoard = () => {
    navigate(`/board/${data._id}`)
  }
  return (

    <Card onClick={handleLinkBoard} sx={{
      boxSizing:'border-box',
      width: { xs:'96%', md:'23%' },
      margin:'10px 2% 15px 0',
      minWidth: '200px',
      maxHeight:'120px',
      background:'transparent',
      border:'none'

    }}>
      <CardActionArea sx={{
        position:'relative'

      }}>
        <CardMedia
          component="img"
          height="120"
          image= {data.avatar ? data.avatar : 'https://res.cloudinary.com/dzltzzi3h/image/upload/v1713901212/7386aff0e12f11e9a86fb1e9505dc991_qrpl5d.jpg'}
          alt="green iguana"
        />
        <Box sx={{
          bgcolor:'#00000040',
          height:'120px',
          width:'100%',
          position:'absolute',
          top:0,
          '&:hover':{
            bgcolor:'#0000004d'
          }
        }} >
          {/* <Typography
              variant="subtitle1"
              sx={{
                position: 'absolute',
                bottom: 10,
                left: 0,
                width: '100%',
                color: 'white',
                p: 2,
                boxSizing: 'border-box',
                transition: 'background-color 0.3s ease',
              }}
            >
            {data.title}
            </Typography> */}
          <Typography
            variant="subtitle1"
            fontWeight='bold'
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              color: 'white',
              p: 2,
              boxSizing: 'border-box',
              transition: 'background-color 0.3s ease'

            }}
          >
            {data.title}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
    // </Box>
  )
}

export default BoardCard