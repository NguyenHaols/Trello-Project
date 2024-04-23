import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/utils/formatters'

function BoardBar({ board }) {

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
        <Tooltip title={board?.description}>
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
        </Tooltip>
        <Tooltip title={board?.type}>
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
        </Tooltip>
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
          icon={<AddToDriveIcon />} label="add to star board" clickable
        />

        {/* <Chip
          sx={{
            color:(theme)=> theme.palette.text.primary,
            backgroundColor:'transparent',
            border:'none',
            paddingX:'5px',
            borderRadius:'4px',
            '.MuiSvgIcon-root': {
              color:(theme)=> theme.palette.text.primary
            },
            '&:hover':{
              bgcolor:(theme)=> theme.palette.primary[300]
            }
          }}
          icon={<BoltIcon />} label="Automation" clickable
        /> */}

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
          icon={<FilterListIcon />} label="Filters" clickable
        />
      </Box>

      <Box sx={{ display:{ xs:'none', md:'flex' }, alignItems:'center', gap:2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon/>}
          sx={{
            color:(theme) => theme.palette.text.primary,
            borderColor:'none',
            '&:hover':{ borderColor:'none' }
          }}
        >
            Invite
        </Button>

        <AvatarGroup
          sx={{
            '& .MuiAvatar-root':{
              width:34, height:34, fontSize: 12, color:'white'
            }
          }}
          max={4}
          total={24} >
          <Tooltip title="Nguyễn Hào">
            <Avatar alt="Nguyễn Hào" src='' />
          </Tooltip>
          <Tooltip title="Nguyễn Hào">
            <Avatar alt="Nguyễn Hào" src='' />
          </Tooltip>
          <Tooltip title="Nguyễn Hào">
            <Avatar alt="Nguyễn Hào" src='' />
          </Tooltip>
          <Tooltip title="Nguyễn Hào">
            <Avatar alt="Nguyễn Hào" src='' />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>

  )
}

export default BoardBar
