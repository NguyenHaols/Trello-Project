import React, { useState } from 'react'
import Tooltip from '@mui/material/Tooltip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import AddCardIcon from '@mui/icons-material/AddCard'
import { Button } from '@mui/material'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ListCards from './ListCards/ListCards'
import AddIcon from '@mui/icons-material/Add'
import { mapOrder } from '~/utils/sorts'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField'
// import theme from '~/theme'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'


function Column({ column, createNewCard, deleteColumn }) {

  const [openNewCardForm, setopenNewCardForm] = useState(false)
  const toggleOpenNewCardForm = () => setopenNewCardForm(!openNewCardForm)
  const [newCardTitle, setNewCardTitle] = useState('')

  // tim hieu react hook cho form co nhieu input
  const addNewCard = () => {
    if (!newCardTitle) {
      toast.error('Please enter card title')
      return
    }

    // tìm hiểu Redux global store, Redux state để đưa dữ liệu board ra ngoài thì có thể gọi luôn api ở đây
    // Tìm hiểu interceptors để trả lỗi 1 cách clean từ api trả về
    // call api
    const newCardData = {
      title: newCardTitle,
      columnId: column._id
    }
    createNewCard(newCardData)

    toggleOpenNewCardForm()
    setNewCardTitle('')
  }
  const confirmDeleteColumn = useConfirm()
  const handleDeleteColumn = () => {
    confirmDeleteColumn({
      description:'Are you sure you want to delete this column ?',
      title: 'Delete Column ?'
      // confirmationText:'Confirm',  đã là mặc định ở main.jsx
      // cancellationText:'Cancel'  đã là mặc định ở main.jsx
      // dialogProps:{ maxWidth:'xs' } đã là mặc định ở main.jsx
    })
      .then( () => {
        deleteColumn(column._id)
      })
      .catch(() => {})

  }

  const {
    attributes, listeners, setNodeRef, transform, transition, isDragging
  } = useSortable({
    id: column._id,
    data:{ ...column }
  })

  const dndKitColumnStyle = {
    touchAction:'none',
    transform: CSS.Translate.toString(transform),
    transition,
    height:'100%',
    opacity: isDragging ? 0.5 : undefined

  }

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  // Card sau khi được sắp xếp ở boardContent
  const orderedCards = column.cards

  return (
    <div
      ref={setNodeRef}
      style={dndKitColumnStyle}
      {...attributes}
    >

      <Box
        {...listeners}
        sx={{
          minWidth:'300px',
          maxWidth:'300px',
          bgcolor:(theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
          ml:2,
          borderRadius:'6px',
          height:'fit-content',
          maxHeight:(theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}>
        {/* column header */}
        <Box sx={{
          height:(theme) => theme.COLUMN_HEADER_HEIGHT,
          p:2,
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
        }}>
          <Typography sx={{
            fontSize:'1rem',
            fontWeight:'Bold',
            cursor:'pointer'
          }}>{column.title}</Typography>
          <Box >
            <Tooltip title="More options">
              <ExpandMoreIcon
                sx={{ color:'text.primary', cursor:'pointer' }}
                id="basic-column-dropdown"
                aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id="basic-menu-column-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-column-dropdown'
              }}
            >
              <MenuItem onClick={toggleOpenNewCardForm}
                sx={{
                  '&:hover': {
                    color: 'success.light',
                    '& .add-card-Icon':{
                      color: 'success.light'
                    }
                  }
                }}>
                <ListItemIcon><AddCardIcon className='add-card-Icon' fontSize="small" /></ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCopyIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentPasteIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem >
                <ListItemIcon> <Cloud fontSize="small" /> </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleDeleteColumn} sx={{
                '&:hover': {
                  color: 'warning.dark',
                  '& .delete-forever-Icon':{
                    color: 'warning.dark'
                  }
                }
              }}>
                <ListItemIcon> <DeleteOutlineIcon className='delete-forever-Icon' fontSize="small" /> </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>

            </Menu>
          </Box>
        </Box>

        {/* List card*/}
        <ListCards cards={orderedCards}/>

        {/* column footer */}
        <Box sx={{
          height:(theme) => theme.COLUMN_FOOTER_HEIGHT,
          p:2
        }}>
          {!openNewCardForm
            ? <Box sx={{
              display:'flex',
              height:'100%',
              alignItems:'center',
              justifyContent:'space-between'
            }}>
              <Button startIcon={<AddIcon/>} onClick={toggleOpenNewCardForm}>Add new card</Button>
              <Tooltip title="Drag to move">
                <DragHandleIcon sx={{ cursor:'pointer', color:'primary.main' }}/>
              </Tooltip>
            </Box>
            : <Box sx={{
              display:'flex',
              height:'100%',
              alignItems:'center',
              gap:1

            }}>
              <TextField
                label="Enter card title"
                type="text"
                size="small"
                variant="outlined"
                autoFocus
                data-no-dnd = "true"
                value = {newCardTitle}
                onChange = {(e) => setNewCardTitle(e.target.value)}
                sx={{
                  '& label':{ color:'text.primary' },
                  '& input':{
                    color:(theme) => theme.palette.primary.main,
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : 'white')
                  },
                  '& label.Mui-focused':{ color:(theme) => theme.palette.main },
                  '& .MuiOutlinedInput-root':{
                    '& fieldset' : {
                      borderColor:(theme) => theme.palette.primary.main
                    },
                    '&:hover fieldset' : {
                      borderColor:(theme) => theme.palette.primary.main
                    },
                    '&.Mui-focused fieldset' : {
                      borderColor:(theme) => theme.palette.primary.main
                    },
                    '& .MuiOutLinedInput-input' : {
                      borderRadius:1
                    }
                  }
                }} />
              <Box sx={{ display:'flex', alignItems:'center', gap:1 }}>
                <Button variant='contained' size='small' onClick={addNewCard}
                  sx={{
                    boxShadow:'none',
                    border:'0.5px solid',
                    borderColor: (theme) => theme.palette.primary.main,
                    '&:hover': { bgcolor: (theme) => theme.palette.primary.main }
                  }}
                >
                Add
                </Button>
                <CloseIcon
                  sx={{
                    color:(theme) => theme.palette.warning.light,
                    cursor:'pointer'

                  }}
                  onClick={() => toggleOpenNewCardForm()}
                />
              </Box>
            </Box>
          }

        </Box>

      </Box>
    </div>
  )
}

export default Column