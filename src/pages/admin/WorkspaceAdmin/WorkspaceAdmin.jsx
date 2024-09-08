import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import apng from '~/assets/facebook.png'

function WorkspaceAdmin() {
  return (
    <Box>
      <Box sx={{ mb:'20px' }}>
        <Typography fontWeight='700' variant='h5'>Workspaces</Typography>
      </Box>
      <Grid container spacing={3} >
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height:'300px', width:'100%', borderRadius:'16px', cursor:'pointer' }}>
            <CardMedia height='80%' component="img" image='https://free.minimals.cc/assets/images/product/product-1.webp' sx={{ '&:hover' : { opacity:0.9 } }} />
            <CardContent>
              <Typography fontWeight='700'> Công ty Product NĐH </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height:'300px', width:'100%', borderRadius:'16px', cursor:'pointer' }}>
            <CardMedia height='80%' component="img" image='https://free.minimals.cc/assets/images/product/product-1.webp' sx={{ '&:hover' : { opacity:0.9 } }} />
            <CardContent>
              <Typography fontWeight='700'> Công ty Product NĐH </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height:'300px', width:'100%', borderRadius:'16px', cursor:'pointer' }}>
            <CardMedia height='80%' component="img" image='https://free.minimals.cc/assets/images/product/product-1.webp' sx={{ '&:hover' : { opacity:0.9 } }} />
            <CardContent>
              <Typography fontWeight='700'> Công ty Product NĐH </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height:'300px', width:'100%', borderRadius:'16px', cursor:'pointer' }}>
            <CardMedia height='80%' component="img" image='https://free.minimals.cc/assets/images/product/product-1.webp' sx={{ '&:hover' : { opacity:0.9 } }} />
            <CardContent>
              <Typography fontWeight='700'> Công ty Product NĐH </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height:'300px', width:'100%', borderRadius:'16px', cursor:'pointer' }}>
            <CardMedia height='80%' component="img" image='https://free.minimals.cc/assets/images/product/product-1.webp' sx={{ '&:hover' : { opacity:0.9 } }} />
            <CardContent>
              <Typography fontWeight='700'> Công ty Product NĐH </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default WorkspaceAdmin