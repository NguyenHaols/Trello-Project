import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Check from '@mui/icons-material/Check'
import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'


function Starred() {
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const { t } = useTranslation()

  const handleClick = (event) => {
    setAnchorEl((prev) => (prev ? null : event.currentTarget))
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleNavigateToBoard = (id) => {
    navigate(`/board/${id}`)
  }
  const starredBoards = user.workspaces.flatMap(
    workspace => {
      if (!('boards' in workspace)) {
        workspace.boards = []
      }
      return (
        workspace?.boards.filter(
          board => user.starredBoard.includes(board._id))
      )
    }
  )


  return (
    <Box >
      <Button
        sx={{ color:(theme) => theme.palette.text.primary,
          '&:hover':{
            bgcolor:(theme) => theme.palette.primary[300]
          }
        }}
        id="basic-button-workspaces"
        aria-controls={open ? 'basic-menu-workspaces' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<ExpandMoreIcon/>}
      >
        {t('starred')}
      </Button>
      <Menu
        sx={{
          top:'12px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          '& .MuiPaper-root': { minWidth:'250px' }
        }}
        id="basic-menu-workspaces"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-workspaces'
        }}
      >
        <MenuItem>
          <Typography variant="body2" color="" textTransform='lowercase'> {t('your_starred_board2')} </Typography>
        </MenuItem>
        {starredBoards.map(board =>
          (
            <Box onClick={() => handleNavigateToBoard(board._id)} key={board._id}>
              <MenuItem>
                <ListItemIcon>
                  <Box sx={{ width:'40px', backgroundSize:'cover', marginRight:'10px', height:'40px', backgroundImage: board?.avatar ? `url(${board.avatar})`:'linear-gradient(#c9372c,#fea362)', borderRadius:'4px', color:'white', textAlign:'center', lineHeight:'40px' }}>
                    {board.avatar ? '' : board.title[0]}
                  </Box>
                </ListItemIcon>
                <ListItemText>
                  <Typography variant='body2' fontWeight='450'> {board.title} </Typography>
                </ListItemText>
              </MenuItem>
            </Box>
          )
        )}


      </Menu>
    </Box>
  )
}

export default Starred