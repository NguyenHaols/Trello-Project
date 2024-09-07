import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import { Box, Button, Dialog, DialogContent } from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import AttachmentIcon from '@mui/icons-material/Attachment'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import CardDetail from './CardDetail/CardDetail'
import AssignmentIcon from '@mui/icons-material/Assignment'
import { useTranslation } from 'react-i18next'

function CardItem({ board, card, handleClickOpenDialog, handleCloseDialog }) {
  const [openDialog, setOpenDialog] = useState(false)
  const { t } = useTranslation()
 
  const setStatusColor = () => {
    if (card.status === 'Doing') {
      return '#99cc33'
    } else if (card.status === 'Reject') {
      return '#ffcc00'
    } else if (card.status === 'Over Time') {
      return '#cc3300'
    } else if (card.status === 'Done') {
      return '#ccc'
    }
    else {
      return '#99cc33'
    }
  }
 
  const handleClick = () => {
    setOpenDialog(true)
    handleClickOpenDialog()
  }

  const handleClose = () => {
    setOpenDialog(false)
    handleCloseDialog()
  }
  const {
    attributes, listeners, setNodeRef, transform, transition, isDragging
  } = useSortable({
    id: card._id,
    data:{ ...card }
  })

  const dndKitCardStyle = {
    touchAction:'none',
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : undefined,
    border: isDragging ? '1px solid #1565c0' : undefined
  }


  const shouldShowCardActions = () => {
    return !!card?.members?.length || !!card?.comments?.length || !!card?.tasks?.length
  }

  return (

    <>
      <Card
        onClick={handleClick}
        ref={setNodeRef}
        style={dndKitCardStyle}
        {...attributes}
        {...listeners}
        sx={{
          cursor: 'pointer',
          boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
          overflow: 'unset',
          display: card?.FE_PlacehoderCard ? 'none' : 'block',
          border:'1px solid transparent',
          '&:hover':{ borderColor:(theme) => theme.palette.primary.main }
        }}>

        {card?.cover &&
          <CardMedia
            sx={{ height: 140 }}
            image={card?.cover}
          />
        }

        <CardContent sx={{ display:'flex',justifyContent:'space-between' ,p:1.5, '&:last-child':{ p:1.5 } }}>
          <Typography > {card?.title} </Typography>
          <Box sx={{bgcolor:setStatusColor(),color:'white',padding:'5px',width:'110px',textAlign:'center',borderRadius:'6px'}}>
            {t(`${card.status}`)}
          </Box>
        </CardContent>
        {shouldShowCardActions() &&
          <CardActions sx={{ p:'0 4px 8px 4px' }}>
            {!!card?.members?.length &&
            <Button size="small" startIcon={<GroupIcon/>}>{card?.members.length}</Button>
            }
            {!!card?.comments?.length &&
           <Button size="small" startIcon={<QuestionAnswerIcon/>}>{card?.comments.length}</Button>
            }
            {!!card?.tasks?.length &&
            <Button size="small" startIcon={<AssignmentIcon/>}>{card?.tasks.length}</Button>
            }
          </CardActions>
        }
      </Card>
      <CardDetail board={board} card={card} open={openDialog} handleClose={handleClose} />

    </>

  )
}

export default CardItem