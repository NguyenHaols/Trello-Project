import { Box, Typography, Avatar, Button, Card } from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import { useState } from 'react'

function WorkspaceDetail() {

  const handleRowClick = (params) => {
  }

  const handleRemove = (id) => {
    // console.log('Remove row with id:', id);
  }

  const rows = [
    { id: 1, col1: 'Product It', col2: 'Cùng nhau phát triển', col3: 'Public', col4: '20/12/2024', col5: true }
  ]

  const columns = [
    { field: 'id', hide: true, align:'center', headerAlign:'center' },
    { field: 'col1', headerName: 'title', align:'center', flex:2, headerAlign:'center', editable:true },
    { field: 'col2', headerName: 'Description', flex:2, editable:true, headerAlign:'center' },
    { field: 'col3', headerName: 'Type', flex:1, align:'center', editable:true, headerAlign:'center' },
    { field: 'col4', headerName: 'Joined date', align:'center', flex:1, headerAlign:'center' },
    { field: 'col5', headerName: 'Options', flex:2, type:'actions', headerAlign:'center', getActions: (params, index) => [
      <GridActionsCellItem
        key={index}
        icon={<Button color="primary">Update</Button>}
        label="Update"
        onClick={() => handleRowClick(params.row)}
      />,
      <GridActionsCellItem
        key={index}
        icon={<Button color="error">Delete</Button>}
        label="Remove"
        onClick={() => handleRemove(params.row.id)}
      />
    ] }
  ]
  return (
    <Box>
      <Box>
        <Box sx={{ mb:'20px' }}>
          <Typography fontWeight='700' variant='h5'>Workspaces</Typography>
        </Box>
        <Card sx={{ borderRadius:'16px' }}>
          <DataGrid sx={{ borderRadius:'16px', overflow:'hidden' }} rows={rows} columns={columns} pageSizeOptions={7} pageSize={7} rowHeight={70} hideFooter onRowClick={handleRowClick}/>
        </Card>
      </Box>

      <Box sx={{mt:'40px'}}>
        <Box sx={{ mb:'20px' }}>
          <Typography fontWeight='700' variant='h5'>Members</Typography>
        </Box>
        <Card sx={{ borderRadius:'16px' }}>
          <DataGrid sx={{ borderRadius:'16px', overflow:'hidden' }} rows={rows} columns={columns} pageSizeOptions={7} pageSize={7} rowHeight={70} onRowClick={handleRowClick}/>
        </Card>
      </Box>

    </Box>
  )
}

export default WorkspaceDetail