import { Box, Button, Typography } from '@mui/material'
import { useOutletContext, useParams } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star'
import BoardCard from '../DashBoardContent/BoardCard/BoardCard'
import Members from './Members/Member'
import TitleAllBoard from './Title/TitleAllBoard'
import TitleStarred from './Title/TitleStarred'
import TitleMember from './Title/TitleMember'
import TitleSetting from './Title/TitleSetting'
import LockIcon from '@mui/icons-material/Lock'
import PublicIcon from '@mui/icons-material/Public'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditNoteIcon from '@mui/icons-material/EditNote'

function WorkspaceContent() {
  const { id } = useParams()
  const [data] = useOutletContext()
  const cloneData = { ...data }
  const workspaces = cloneData.workspaces
  const workspace = workspaces.filter(w => (
    w._id === id
  ))
  const currentUserId = cloneData._id
  const ownerWorkspace = currentUserId === workspace[0].ownerId
  const getStarredBoard = () => {
    const starredBoards = []
    cloneData.starredBoard.forEach(id => {
      workspaces.forEach(w => {
        if (w && w.boards) {
          const board = w.boards.filter(board => (
            board && board._id === id
          ))
          if (board && board.length > 0) {
            starredBoards.push(...board)
          }
        }
      })
    })
    return starredBoards
  }
  const starredBoards = getStarredBoard()


  return (
    <Box sx={{ paddingLeft:'20px',paddingBottom:'80px' }}>

      {/* Description workspace */}
      <Box sx={{ marginBottom:'40px', borderBottom:'1px solid #ccc', paddingBottom:'30px' }}>
        <Box sx={{ display:'flex' }}>
          <Box sx={{
            width: '60px',
            height: '60px',
            backgroundImage: workspace[0].avatar ? `url(${workspace[0].avatar})` : 'linear-gradient(#c9372c,#fea362)',
            borderRadius:'4px',
            color:'white',
            backgroundSize:'cover',
            backgroundPosition:'center',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            marginRight:'20px'

          }}> <Typography variant='h4' fontWeight='900'>{workspace[0].avatar ? '' : workspace[0].title[0]}</Typography>
          </Box>
          <Box>
            <Typography variant='h6' display='flex' alignItems='center' height='50%'color='white' >
              {workspace[0].title}
              <EditNoteIcon sx={{
                marginLeft:'20px',
                color:'white',
                cursor:'pointer',
                '&:hover':{ backgroundColor:(theme) => theme.trello.btnBackgroundHover }
              }}/>
            </Typography>
            <Box display='flex' height='50%' alignItems='center'>
              {workspace[0].type === 'Public' ?
                <>
                  <PublicIcon sx={{ width:'18px', height:'22px', marginRight:'5px', color:'	#22bb33' }}/>
                  <Typography color='	#22bb33'>Public</Typography>
                </> :
                <>
                  <LockIcon sx={{ width:'18px', height:'22px', marginRight:'5px', color:'	#ba3f42' }}/>
                  <Typography color='	#ba3f42'>Private</Typography>
                </>
              }
            </Box>
          </Box>
        </Box>
        <Box marginTop='10px'>
          <Typography color='#ccc' variant='subtitle2'>{workspace[0].description}</Typography>
        </Box>
      </Box>

      {/* starred board  */}
      {starredBoards.length ?
        <>
          <TitleStarred />
          <Box sx={{
            display:'flex',
            flexWrap:'wrap',
            justifyContent:'space-between'
          }}>
            {starredBoards.map(board => (
              <BoardCard key={board._id} data={board} />
            ))}

          </Box>
        </>
        : <></>
      }

      {/* all boards in this workspace */}
      {workspace.length ?
        <>
          <TitleAllBoard />
          <Box sx={{
            display:'flex',
            flexWrap:'wrap',
            justifyContent: 'flex-start',
            marginBottom:'20px'

          }}>
            {workspace[0].boards.map(b => (
              <BoardCard key={b._id} data={b} />
            ))}
          </Box>

        </>
        :
        <>
          <Box sx={{
            display:'flex',
            justifyContent:'left',
            alignItems:'center',
            color:'white'
          }}>
            <StarIcon sx={{ marginRight:'10px', color:'#e2b203' }}></StarIcon>
            <Typography variant='h6' fontWeight={500}>Create some board to use</Typography>
          </Box>
        </>
      }

      {/* Member in this workspace */}
      <TitleMember />
      {workspace[0].members.map(member => (
        <Members key={member._id} member={member} ownerId={workspace[0].OwnerId} currentUserId={currentUserId} />
      ))}


      {/* Setting in this workspace*/}
      {ownerWorkspace &&
        <>
          <TitleSetting />
          <Box sx={{ marginTop:'15px' }}>
            <Typography variant='h7' color='white' >Workspace visibility :</Typography>
            <Box>
              {workspace[0].type === 'Private' ?
                <Box sx={{ display:'flex', justifyContent:'space-between' }}>
                  <Typography variant='subtitle2' color='#ccc' display='flex' marginTop='5px'>
                    <LockIcon sx={{ width:'18px', height:'22px', marginRight:'5px' }}/>
                Private - This Workspace is private.It&apos;s not indexed or visible to those outside the Workspace.
                  </Typography>

                  <Button sx={{
                    width:'115px',
                    minWidth:'115px',
                    height:'32px',
                    background:(theme) => theme.trello.btnBackground,
                    color:'white',
                    '&:hover':{ backgroundColor:(theme) => theme.trello.btnBackgroundHover }
                  }}>Change</Button>

                </Box> :
                <Box sx={{ display:'flex', justifyContent:'space-between' }}>
                  <Typography variant='subtitle2' color='#ccc' display='flex' marginTop='5px'>
                    <PublicIcon sx={{ width:'18px', height:'22px', marginRight:'5px' }}/>
                Public - This Workspace is public. It&apos;s visible to anyone with the link or invited.
                  </Typography>
                  <Button sx={{
                    width:'115px',
                    minWidth:'115px',
                    height:'32px',
                    background:(theme) => theme.trello.btnBackground,
                    color:'white',
                    '&:hover':{ backgroundColor:(theme) => theme.trello.btnBackgroundHover }
                  }}>Change</Button>
                </Box>
              }

            </Box>
          </Box>
          <Box sx={{ marginTop:'15px' }}>
            <Typography variant='h7' color='white' >Workspace destroy :</Typography>
            <Typography sx={{
              cursor:'pointer',
              '&:hover':{ color:'#bb2124' }
            }} variant='subtitle2' color='#ccc' display='flex' marginTop='5px'>
              <DeleteOutlineIcon sx={{ width:'18px', height:'22px', marginRight:'5px' }}/>
          Delete this workspace ?
            </Typography>
          </Box>
        </>
      }

    </Box>
  )
}

export default WorkspaceContent