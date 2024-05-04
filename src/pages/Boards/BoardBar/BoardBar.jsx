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

function BoardBar({ board }) {
  const navigate = useNavigate()
  const deleteBoardConfirm = useConfirm()
  const user = useSelector(state => state.user)
  const currentBoard = { ...board }
  const ownerBoard = user._id === currentBoard.ownerId
  const checkStaredBoard = () => {
    return user.starredBoard.includes(board._id)
  }
  const [starredBoolean, setStarredBoolean] = useState(checkStaredBoard)
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
          icon={<DashboardIcon />} label={board?.title} clickable
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
          icon={<VpnLockIcon />} label={capitalizeFirstLetter(board?.type)} clickable
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
          icon={<PushPinIcon />} label={starredBoolean ? 'Unstarred Board' : 'Star Board'} clickable
        />

        {ownerBoard && (
          <Chip
            onClick={handleSubmitDeleteBoard}
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
            icon={<DeleteIcon />} label="Delete board" clickable
          />
        )}

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
          icon={<FilterListIcon />} label="Filters" clickable
        /> */}
      </Box>

      {/* <Box sx={{ display:{ xs:'none', md:'flex' }, alignItems:'center', gap:2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon/>}
          sx={{
            color:(theme) => 'white',
            bgcolor:(theme) => theme.palette.primary[500],
            '&:hover':{ bgcolor:(theme) => theme.palette.primary[800] }
          }}
        >
            Invite
        </Button>


      </Box> */}
    </Box>

  )
}

export default BoardBar
