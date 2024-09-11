import { Avatar, Box, Button, Card, CircularProgress, TextField, Typography } from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { deleteReportAPI, getAllReportAPI, updateUser } from '~/apis'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import { toast } from 'react-toastify'

function Report() {
  const [loading, setIsloading] = useState(true)
  const [allReport, setAllReport] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 6 })


  const handleRemove = (id) => {
    deleteReportAPI({_id:id})
      .then(() => {
        toast.success('Delete success')
        const newReportsState = allReport.filter(report => (report._id !== id))
        setAllReport(newReportsState)
      })
  }

  useEffect(() => {
    getAllReportAPI()
      .then(res => {
        setAllReport(res.data)
        setIsloading(false)
      })
  }, [])


  const rows = allReport.map(report => {
    const joinedDate = new Date(report.createdAt)
    return {
      id: report._id,
      email: report.email,
      title: report.title,
      description: report.description,
      createdAt: `${joinedDate.getDay()}/${joinedDate.getMonth()}/${joinedDate.getFullYear()}`
    }
  })


  const columns = [
    { field: 'id', hide: true, align:'center', headerAlign:'center' },
    { field: 'email', headerName: 'Email', flex:1.5, headerAlign:'center' },
    { field: 'title', headerName: 'Title', flex:1.5, headerAlign:'center' },
    { field: 'description', headerName: 'Description', flex:2, align:'center', editable:true, headerAlign:'center' },
    { field: 'createdAt', headerName: 'Report date', align:'center', flex:1, headerAlign:'center' },
    { field: 'col6', headerName: 'Options', flex:1, type:'actions', headerAlign:'center', getActions: (params, index) => [
      <GridActionsCellItem
        key={index}
        icon={<Button color="primary">Delete</Button>}
        label="Update"
        onClick={() => handleRemove(params.id)}
      />
    ] }
  ]

  if (loading) {
    return (
      <Box sx={{ height:'100vh', display: 'flex', justifyContent:'center', alignItems:'center' }}>
        <CircularProgress />
      </Box>
    )
  }
  return (
    <Box>
      <Box sx={{ mb:'20px' }}>
        <Typography fontWeight='700' variant='h5'>Report</Typography>
      </Box>

      <Card sx={{ borderRadius:'16px' }}>
        <DataGrid sx={{ borderRadius:'16px', overflow:'hidden' }} rows={rows} pagination paginationModel={paginationModel} onPaginationModelChange={(newModel) => setPaginationModel(newModel)} columns={columns} pageSize={7} rowHeight={70}/>
      </Card>
    </Box>
  )
}

export default Report