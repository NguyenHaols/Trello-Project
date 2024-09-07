import React, { useContext, useRef, useState } from 'react'
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
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'


function Column({ board, column, createNewCard, deleteColumn }) {
  const oldBoard = { ...board }
  const currentBoard = useRef(oldBoard)
  const [openNewCardForm, setopenNewCardForm] = useState(false)
  const toggleOpenNewCardForm = () => setopenNewCardForm(!openNewCardForm)
  const [newCardTitle, setNewCardTitle] = useState('')
  const user = useSelector(state => state.user)
  const ownerBoard = currentBoard.current.ownerId === user._id
  const {t} = useTranslation()

  const [openDialog, setOpenDialog] = useState(false)
  const handleClickOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const addNewCard = () => {
    if (!newCardTitle) {
      toast.error(`${t('please_enter_card_title')}`)
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
      content:t('are_you_sure_you_want_to_delete_this_column'),
      title: t('delete_column'),
      confirmationText:t('confirm'),
      cancellationText:t('cancel'),
      dialogProps:{ maxWidth:'xs' }
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
    data:{ ...column },
    disabled:openDialog
  })

  const dndKitColumnStyle = {
    // touchAction:'none',
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
    <Box

      ref={setNodeRef}
      style={dndKitColumnStyle}
      {...attributes}
    >

      <Box
        {...listeners}
        sx={{
          minWidth:'300px',
          maxWidth:'300px',
          bgcolor:(theme) => (theme.palette.mode === 'dark' ? '#333643' : theme.palette.secondary[300]),
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
          {ownerBoard && (
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
                  <ListItemText> {t('add_new_card')} </ListItemText>
                </MenuItem>
                {/* <MenuItem>
                <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem> */}
                {/* <MenuItem>
                <ListItemIcon><ContentCopyIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem> */}
                {/* <MenuItem>
                <ListItemIcon><ContentPasteIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem> */}
                <Divider />
                {/* <MenuItem >
                <ListItemIcon> <Cloud fontSize="small" /> </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem> */}
                <MenuItem onClick={handleDeleteColumn} sx={{
                  '&:hover': {
                    color: 'warning.dark',
                    '& .delete-forever-Icon':{
                      color: 'warning.dark'
                    }
                  }
                }}>
                  <ListItemIcon> <DeleteOutlineIcon className='delete-forever-Icon' fontSize="small" /> </ListItemIcon>
                  <ListItemText>{t('remove_this_column')}</ListItemText>
                </MenuItem>

              </Menu>
            </Box>
          )}
        </Box>

        {/* List card*/}
        <ListCards
          board={board}
          handleClickOpenDialog={handleClickOpenDialog}
          handleCloseDialog={handleCloseDialog}
          cards={orderedCards}/>

        {/* column footer */}
        <Box sx={{
          height:(theme) => theme.COLUMN_FOOTER_HEIGHT,
          p:2
        }}>
          {ownerBoard ? (
            !openNewCardForm
              ? <Box sx={{
                display:'flex',
                height:'100%',
                alignItems:'center',
                justifyContent:'space-between'
              }}>
                <Button startIcon={<AddIcon/>} onClick={toggleOpenNewCardForm}>{t('add_new_card')}</Button>
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

          ) : null}

        </Box>

      </Box>
    </Box>
  )
}

export default Column