import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import PushPinIcon from '@mui/icons-material/PushPin'
import { capitalizeFirstLetter } from '~/utils/formatters'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { addStarreddAPI, deleteBoardAPI, removeStarreddAPI } from '~/apis'
import { toast } from 'react-toastify'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'
import { useConfirm } from 'material-ui-confirm'
import { Button, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import EditIcon from '@mui/icons-material/Edit'
import BoardForm from '~/components/BoardForm/BoardForm'
import { useTranslation } from 'react-i18next'

function BoardBar({ board }) {
  const navigate = useNavigate()
  const deleteBoardConfirm = useConfirm()
  const user = useSelector(state => state.user)
  const currentBoard = { ...board }
  const ownerBoard = user._id === currentBoard.ownerId
  const [boardForm, setBoardForm] = useState(null)
  const {t} = useTranslation()
  const checkStaredBoard = () => {
    return user.starredBoard.includes(board._id)
  }
  const [starredBoolean, setStarredBoolean] = useState(checkStaredBoard)
  const [more, setMore] = useState(null)

  const handleOpenMore = (e) => {
    setMore(e.currentTarget)
  }

  const handleOpenBoardForm = (e) => {
    setBoardForm(e.currentTarget)
    // setMore(null)
  }

  const handleCloseBoardForm = () => {
    setBoardForm(null)
  }

  const handleCloseMore = () => {
    setMore(null)
  }

  const handleStarredBoard = () => {
    const data = {
      userId: user._id,
      starredBoardId: board._id
    }
    if (starredBoolean) {
      // neu dang ghim
      removeStarreddAPI(data)
        .then(() => {
          setStarredBoolean(false)
          toast.success('Remove starred successfully')
        })
    } else {
      // chua ghim
      addStarreddAPI(data)
        .then(() => {
          setStarredBoolean(true)
          toast.success('Add starred successfully')
        })
    }
  }

  const handleSubmitDeleteBoard = () => {
    deleteBoardConfirm({
      title:'Delete board',
      content:'Are you sure you want to delete this board ?'
    })
      .then(() => {
        deleteBoardAPI({ boardId:currentBoard._id })
          .then(() => {
            navigate('/boards')
            toast.success('Delete board successfully')
          })
      })
      .catch(() => {})

  }
  return (
    <Box px={2} sx={{
      width:'100%',
      height: (theme) => theme.trello.boardBarHight,
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between',
      gap: 2,
      overflow:'hidden',
      background: (theme) => (theme.palette.mode === 'dark' ? theme.trello.backgroundDark : theme.trello.backgroundLight)

    }}>

      <Box sx={{ display:'flex', alignItems:'center', gap:2 }}>
        <Chip
          sx={{
            color:(theme) => theme.palette.text.primary,
            backgroundColor:'transparent',
            border:'none',
            paddingX:'5px',
            borderRadius:'4px',
            '.MuiSvgIcon-root': {
              color:(theme) => theme.palette.text.primary
            },
            '&:hover':{
              bgcolor:(theme) => theme.palette.primary[300]
            }
          }}
          icon={<DashboardIcon />} label={board?.title} clickable={true}
        />
        <Chip
          sx={{
            color:(theme) => theme.palette.text.primary,
            backgroundColor:'transparent',
            border:'none',
            paddingX:'5px',
            borderRadius:'4px',
            '.MuiSvgIcon-root': {
              color:(theme) => theme.palette.text.primary
            },
            '&:hover':{
              bgcolor:(theme) => theme.palette.primary[300]
            }
          }}
          icon={<VpnLockIcon />} label={capitalizeFirstLetter(board?.type)} clickable={true}
        />
        <Chip
          onClick={handleStarredBoard}
          sx={{
            color:(theme) => theme.palette.text.primary,
            backgroundColor:'transparent',
            border:'none',
            paddingX:'5px',
            borderRadius:'4px',
            '.MuiSvgIcon-root': {
              color:(theme) => theme.palette.text.primary
            },
            '&:hover':{
              bgcolor:(theme) => theme.palette.primary[300]
            }
          }}
          icon={<PushPinIcon />} label={starredBoolean ? t('un_starred_board') : t('starred_board')} clickable={true}
        />

        {/* <Chip
          sx={{
            color:(theme) => theme.palette.text.primary,
            backgroundColor:'transparent',
            border:'none',
            paddingX:'5px',
            borderRadius:'4px',
            '.MuiSvgIcon-root': {
              color:(theme) => theme.palette.text.primary
            },
            '&:hover':{
              bgcolor:(theme) => theme.palette.primary[300]
            }
          }}
          icon={<FilterListIcon />} label="Filters" clickable={true}
        /> */}
      </Box>

      {ownerBoard && (
        <Box sx={{ display:{ xs:'none', md:'flex' }, alignItems:'center', gap:2 }}>
          <IconButton
            variant="outlined"
            sx={{
              color:(theme) => theme.palette.text.primary
            }}
            onClick={handleOpenMore}
          >
            <MoreHorizIcon />
          </IconButton>
          <Menu
            onClose={handleCloseMore}
            anchorEl={more}
            open={Boolean(more)}
          >
            <MenuItem onClick={handleOpenBoardForm}>
              <Box
                sx={{
                  color:(theme) => theme.palette.text.primary,
                  display:'flex'
                }}
              >
                <EditIcon sx={{ mr:'5px' }} />
                <Typography> {t('update')} </Typography>
              </Box>
            </MenuItem>
            <BoardForm closeBoardForm={handleCloseBoardForm} openBoardForm={handleOpenBoardForm} boardForm={boardForm} board={board} />
            <MenuItem onClick={handleCloseMore}>
              <Box
                onClick={handleSubmitDeleteBoard}
                sx={{
                  color:(theme) => theme.palette.text.primary,
                  display:'flex'
                }}
                icon={<DeleteIcon />} label="Delete board" clickable={true}
              >
                <DeleteIcon sx={{ mr:'5px' }} />
                <Typography> {t('delete_board')} </Typography>
              </Box>
            </MenuItem>
          </Menu>

        </Box>
      )}

    </Box>

  )
}

export default BoardBar
