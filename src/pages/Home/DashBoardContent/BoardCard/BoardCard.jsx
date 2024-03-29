import { Box, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea } from '@mui/material'

function BoardCard() {
  return (
    <Box sx={{
      
    }}>
      <Card sx={{
        width:'25%',
        maxWidth: 300,
        minWidth:200,
        margin:'10px 0 40px 0'
      }}>
        <CardActionArea sx={{
          position:'relative'

        }}>
          <CardMedia
            component="img"
            height="140"
            image="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/4315f9a5b3c78f696d170e9b626a44d6/e2d2752f.jpg"
            alt="green iguana"
          />
          <Box className ='123' sx={{
            bgcolor:'#00000040',
            height:'140px',
            width:'100%',
            position:'absolute',
            top:0,
            '&:hover':{
              bgcolor:'#0000004d'
            }
          }} >
            <Typography
              variant="subtitle1"
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                color: 'white',
                p: 2,
                boxSizing: 'border-box',
                transition: 'background-color 0.3s ease',
              }}
            >
            title
            </Typography>
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
            Company Overview
            </Typography>
          </Box>
        </CardActionArea>
      </Card>
    </Box>
  )
}

export default BoardCard