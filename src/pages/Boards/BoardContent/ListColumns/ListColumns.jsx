import React from 'react'
import Box from '@mui/material/Box'
import Column from './Column/Column'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

function ListColumns({ columns }) {

  

  return (
    <Box sx={{
      bgcolor:'inherit',
      width: '100%',
      height: '100%',
      overflowX:'auto',
      overflowY:'hidden',
      display:'flex',
      '&::-webkit-scrollbar-track' :{ m:2 }
    }}>

      {/* box column */}
      {columns?.map( column => <Column key={column._id} column={column}/>)}


      <Box sx={{
        minWidth: '200px',
        maxWidth: '200px',
        mx: 2,
        borderRadius: '6px',
        height: 'fit-content',
        bgcolor: '#ffffff3d'
      }}>
        <Button 
          sx={{
            color:'white',
            width: '100%',
            justifyContent: 'flex-start',
            pl: 2.5,
            py: 1
          }}
          startIcon={<AddIcon />}
          >Add new column
        </Button>
      </Box>
    </Box>
  )
}

export default ListColumns