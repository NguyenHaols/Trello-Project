import { Box, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

function UserManagerMent() {
  const rows = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'MUI X', col2: 'is awesome' },
    { id: 3, col1: 'Material UI', col2: 'is amazing' },
    { id: 4, col1: 'MUI', col2: '' },
    { id: 5, col1: 'Joy UI', col2: 'is awesome' },
    { id: 6, col1: 'MUI Base', col2: 'is amazing' }
  ]

  const columns = [
    { field: 'id', hide: true },
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 }
  ]
  return (
    <Box>
      <Box>
        <Typography fontWeight='700' variant='h5'>Users</Typography>
      </Box>
      <Box>
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </Box>
  )
}

export default UserManagerMent