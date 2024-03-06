import Box from '@mui/material/Box'

function BoardContent() {
  return (
    <Box sx={{
      backgroundColor:'primary.light',
      width:'100%',
      height: (theme) => `calc(100vh - ${theme.trello.appBarHight} - ${theme.trello.boardBarHight})`,
      display:'flex',
      alignItems:'center'
    }}>
            Board Content
    </Box>
  )
}

export default BoardContent
