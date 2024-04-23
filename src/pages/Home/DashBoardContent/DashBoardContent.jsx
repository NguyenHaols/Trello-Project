import { Box, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import BoardCard from './BoardCard/BoardCard'
import Workspace from './Workspace/Workspace'
import LaptopMacIcon from '@mui/icons-material/LaptopMac'
import { Link, useOutletContext } from 'react-router-dom'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'

function DashBoardContent() {
  const [data] = useOutletContext()
  const cloneData = { ...data }
  const workspaces = cloneData.workspaces


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
    <Box sx={{ paddingLeft:'20px' }}>

      {/* Starred board */}
      {starredBoards.length ?
        <>
          <Box sx={{
            display:'flex',
            justifyContent:'left',
            alignItems:'center',
            color:(theme) => theme.palette.primary
          }}>
            <StarIcon sx={{ marginRight:'10px', color:'#e2b203' }}></StarIcon>
            <Typography variant='h6' fontWeight={500}>YOUR STARRED BOARD</Typography>
          </Box>
          <Box sx={{
            display:'flex',
            flexWrap:'wrap'
          }}>
            {starredBoards.map(board => (
              <BoardCard key={board._id} data={board}>

              </BoardCard>
            ))}

          </Box>
        </>
        : <></>
      }

      {/* Your Workspace */}
      {workspaces.length ?
        <>
          <Box sx={{
            display:'flex',
            justifyContent:'left',
            alignItems:'center',
            color:(theme) => theme.palette.primary,
            margin:'40px 0 10px 0'
          }}>
            <LaptopMacIcon sx={{ marginRight:'10px', color:'#e2b203' }}></LaptopMacIcon>
            <Typography variant='h6' fontWeight={500}>YOUR WORKSPACES</Typography>
          </Box>
          {workspaces && workspaces.map(workspace => (
            <Fragment key={workspace._id}>
              <Workspace key={workspace._id} data={workspace}/>

              <Box sx={{
                display:'flex',
                flexWrap:'wrap',
                justifyContent: 'flex-start',
                marginBottom:'20px'
              }}>
                {workspace && workspace.boards.map(board => (
                  <BoardCard key={board._id} data={board} />
                ))}

              </Box>
            </Fragment>
          ))}
        </> :
        <>
          <Box sx={{
            display:'flex',
            justifyContent:'left',
            alignItems:'center',
            color:(theme) => theme.palette.primary
          }}>
            <StarIcon sx={{ marginRight:'10px', color:'#e2b203' }}></StarIcon>
            <Typography variant='h6' fontWeight={500}>Create some workspace or join some to work</Typography>
          </Box>
        </>
      }


    </Box>
  )
}

export default DashBoardContent