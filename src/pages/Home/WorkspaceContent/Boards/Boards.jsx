import { useOutletContext } from 'react-router-dom'
import TitleStarred from '../Title/TitleStarred'
import { Box, Typography } from '@mui/material'
import BoardCard from '../../DashBoardContent/BoardCard/BoardCard'
import TitleAllBoard from '../Title/TitleAllBoard'
import StarIcon from '@mui/icons-material/Star'

function Boards() {
  const { workspace, starredBoards } = useOutletContext()
  return (
    <>

      {starredBoards.length ? (
        <>
          <TitleStarred />
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap'
            }}
          >
            {starredBoards.map((board) => (
              <BoardCard key={board._id} data={board} />
            ))}
          </Box>
        </>
      ) : (
        <></>
      )}

      {workspace[0].boards.length ? (
        <>
          <TitleAllBoard />
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              marginBottom: '20px'
            }}
          >
            {workspace[0].boards.map((b) => (
              <BoardCard key={b._id} data={b} />
            ))}
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'left',
              alignItems: 'center',
              color: 'white'
            }}
          >
            <StarIcon sx={{ marginRight: '10px', color: '#e2b203' }}></StarIcon>
            <Typography
              color={(theme) => theme.palette.text.primary}
              variant='h6'
              fontWeight={500}
            >
              Create some board to use
            </Typography>
          </Box>
        </>
      )}

    </>
  )
}

export default Boards