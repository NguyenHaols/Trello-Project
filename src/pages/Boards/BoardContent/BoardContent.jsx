import React from 'react'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'



function BoardContent({board}) {
  
  return (
    <Box sx={{
      width:'100%',
      height: (theme) => theme.trello.boardContentHeight,
      bgcolor:(theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1565c0'),
      p:'10px 0'
    }}>
      {/* Box container column*/}
      <ListColumns columns={board?.columns} />
      
      
    </Box>
  )

}

export default BoardContent
