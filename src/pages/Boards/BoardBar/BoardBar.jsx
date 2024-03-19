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
      backgroundColor:(theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1565c0'),
      
    }}>
      <Box sx={{ display:'flex', alignItems:'center', gap:2 }}>
        <Tooltip title={board?.description}>
          <Chip
            sx={{
              color:'white',
              backgroundColor:'transparent',
              border:'none',
              paddingX:'5px',
              borderRadius:'4px',
              '.MuiSvgIcon-root': {
                color:'white'
              },
              '&:hover':{
                bgcolor:'primary.50'
              }
            }}
            icon={<DashboardIcon />} label={board?.title} clickable
          />
        </Tooltip>
        <Tooltip title={board?.type}>
          <Chip
            sx={{
              color:'white',
              backgroundColor:'transparent',
              border:'none',
              paddingX:'5px',
              borderRadius:'4px',
              '.MuiSvgIcon-root': {
                color:'white'
              },
              '&:hover':{
                bgcolor:'primary.50'
              }
            }}
            icon={<VpnLockIcon />} label={capitalizeFirstLetter(board?.type)} clickable
          />
        </Tooltip>
        <Chip
          sx={{
            color:'white',
            backgroundColor:'transparent',
            border:'none',
            paddingX:'5px',
            borderRadius:'4px',
            '.MuiSvgIcon-root': {
              color:'white'
            },
            '&:hover':{
              bgcolor:'primary.50'
            }
          }}
          icon={<AddToDriveIcon />} label="Add to Drive" clickable
        />

        <Chip
          sx={{
            color:'white',
            backgroundColor:'transparent',
            border:'none',
            paddingX:'5px',
            borderRadius:'4px',
            '.MuiSvgIcon-root': {
              color:'white'
            },
            '&:hover':{
              bgcolor:'primary.50'
            }
          }}
          icon={<BoltIcon />} label="Automation" clickable
        />

        <Chip
          sx={{
            color:'white',
            backgroundColor:'transparent',
            border:'none',
            paddingX:'5px',
            borderRadius:'4px',
            '.MuiSvgIcon-root': {
              color:'white'
            },
            '&:hover':{
              bgcolor:'primary.50'
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
            color:'white',
            borderColor:'white',
            '&:hover':{ borderColor:'white' }
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
            <Avatar alt="Nguyễn Hào" src="https://scontent.fhan14-6.fna.fbcdn.net/v/t39.30808-6/427972302_1429969754258609_1637866898577767070_n.jpg?stp=cp6_dst-jpg&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHDgi2TyUaUU8H5SIQRtYqb4Ou99ZEDMbTg6731kQMxtCMbW3ExF8NFEaWluo1H9NhjxfPqGkkhnSBVjMpShRpi&_nc_ohc=dfO7fe_lmMMAX8TMsh8&_nc_ht=scontent.fhan14-6.fna&oh=00_AfAlDyKZGhg9Mflp0YHFSMSxzcbEw3bcvtpQvWQgxheupg&oe=65EEE036" />
          </Tooltip>
          <Tooltip title="Nguyễn Hào">
            <Avatar alt="Nguyễn Hào" src="https://scontent.fhan14-6.fna.fbcdn.net/v/t39.30808-6/427972302_1429969754258609_1637866898577767070_n.jpg?stp=cp6_dst-jpg&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHDgi2TyUaUU8H5SIQRtYqb4Ou99ZEDMbTg6731kQMxtCMbW3ExF8NFEaWluo1H9NhjxfPqGkkhnSBVjMpShRpi&_nc_ohc=dfO7fe_lmMMAX8TMsh8&_nc_ht=scontent.fhan14-6.fna&oh=00_AfAlDyKZGhg9Mflp0YHFSMSxzcbEw3bcvtpQvWQgxheupg&oe=65EEE036" />
          </Tooltip>
          <Tooltip title="Nguyễn Hào">
            <Avatar alt="Nguyễn Hào" src="https://scontent.fhan14-6.fna.fbcdn.net/v/t39.30808-6/427972302_1429969754258609_1637866898577767070_n.jpg?stp=cp6_dst-jpg&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHDgi2TyUaUU8H5SIQRtYqb4Ou99ZEDMbTg6731kQMxtCMbW3ExF8NFEaWluo1H9NhjxfPqGkkhnSBVjMpShRpi&_nc_ohc=dfO7fe_lmMMAX8TMsh8&_nc_ht=scontent.fhan14-6.fna&oh=00_AfAlDyKZGhg9Mflp0YHFSMSxzcbEw3bcvtpQvWQgxheupg&oe=65EEE036" />
          </Tooltip>
          <Tooltip title="Nguyễn Hào">
            <Avatar alt="Nguyễn Hào" src="https://scontent.fhan14-6.fna.fbcdn.net/v/t39.30808-6/427972302_1429969754258609_1637866898577767070_n.jpg?stp=cp6_dst-jpg&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHDgi2TyUaUU8H5SIQRtYqb4Ou99ZEDMbTg6731kQMxtCMbW3ExF8NFEaWluo1H9NhjxfPqGkkhnSBVjMpShRpi&_nc_ohc=dfO7fe_lmMMAX8TMsh8&_nc_ht=scontent.fhan14-6.fna&oh=00_AfAlDyKZGhg9Mflp0YHFSMSxzcbEw3bcvtpQvWQgxheupg&oe=65EEE036" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>

  )
}

export default BoardBar
