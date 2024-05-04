import React from 'react'
import Box from '@mui/material/Box'
import CardItem from './Card/Card'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'


function ListCards({ board, cards, handleClickOpenDialog, handleCloseDialog }) {
  return (
    <SortableContext items={cards?.map(c => c._id)} strategy={verticalListSortingStrategy}>

      <Box sx={{
        p: '0 5px 5px 5px',
        m:'0 5px',
        display:'flex',
        flexDirection:'column',
        gap: 1,
        overflowX:'hidden',
        overflowY:'auto',
        maxHeight: (theme) => `calc(
              ${theme.trello.boardContentHeight} - 
              ${theme.spacing(6)} -
              ${theme.trello.COLUMN_HEADER_HEIGHT} -
              ${theme.trello.COLUMN_FOOTER_HEIGHT}
            )`,
        '&::-webkit-scrollbar-thumb':{
          backgroundColor:'#ced0da',
          borderRadius: '8px'
        },
        '&::-webkit-scrollbar-thumb:hover':{
          backgroundColor:'#bfc2df',
          borderRadius: '8px'
        }
      }}>

        {/* card */}
        {cards?.map(card =>
          <CardItem  key={card._id} board={board} card={card} handleClickOpenDialog={handleClickOpenDialog} handleCloseDialog={handleCloseDialog}/>
        )}


      </Box>

    </SortableContext>
  )
}

export default ListCards