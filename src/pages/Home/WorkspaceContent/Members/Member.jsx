import { Box, Button, Typography } from '@mui/material'


function Members({ ownerId, currentUserId, member }) {

  return (
    <Box key={member._id} sx={{
      display:'flex',
      alignItems:'center',
      borderBottom:'1px solid #ccc',
      padding:'15px 0'
    }}>

      <Box
        sx={{
          backgroundImage: member.avatar ? `url(${member.avatar})` : 'linear-gradient(#c9372c,#fea362)',
          width:'30px',
          height:'30px',
          marginRight:'15px',
          borderRadius:'16px',
          backgroundSize:'cover',
          backgroundPosition:'center',
          color:'white', 
          textAlign:'center',
          lineHeight:'30px'
        }}

      >
        {member.avatar ? '' : member.username[0]}
      </Box>
      <Box sx={{
        flex:'1'
      }}>
        <Typography variant='strong' fontWeight='bold' color={(theme) => theme.trello.mainTextColor} > {member.username} </Typography>
        <Typography color={(theme) => theme.trello.mainTextColor}>{member.email}</Typography>
      </Box>
      <Box sx={{
        flex:'1'
      }}>
        <Button sx={{
          width:'115px',
          height:'32px',
          background:(theme) => theme.trello.btnBackground,
          color:'white',
          float:'right',
          '&:hover':{ backgroundColor:(theme) => theme.trello.btnBackgroundHover }
        }}> {member._id === currentUserId ? 'Leave' : 'Remove'} </Button>
      </Box>
    </Box>
  )
}

export default Members