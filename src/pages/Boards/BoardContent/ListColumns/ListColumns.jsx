import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import Box from '@mui/material/Box'
import Column from './Column/Column'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useSelector } from 'react-redux'

function ListColumns({ board, columns, createNewColumn, createNewCard, deleteColumn }) {

  const [openNewColumnForm, setopenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setopenNewColumnForm(!openNewColumnForm)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const user = useSelector(state=> state.user)
  const ownerBoard = board.ownerId === user._id

  // tim hieu react hook cho form co nhieu input
  const addNewColumn = () => {
    if (!newColumnTitle) {
      toast.error('Please enter column title')
      return
    }

    // tìm hiểu Redux global store, Redux state để đưa dữ liệu board ra ngoài thì có thể gọi luôn api ở đây
    // Tìm hiểu interceptors để trả lỗi 1 cách clean từ api trả về
    // call api
    const newColumnData = {
      title: newColumnTitle
    }
    createNewColumn(newColumnData)

    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }

  return (
    <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        paddingTop:'20px',
        bgcolor:'inherit',
        width: '100%',
        height: '100%',
        overflowX:'auto',
        overflowY:'hidden',
        display:'flex',
        '&::-webkit-scrollbar-track' :{ m:2 }
      }}>

        {/* box column */}
        {columns?.map( column => <Column key={column._id} board={board} column={column} createNewCard={createNewCard} deleteColumn={deleteColumn} />)}
        {ownerBoard ?
          (!openNewColumnForm
            ? <Box onClick={toggleOpenNewColumnForm} sx={{
              minWidth: '250px',
              maxWidth: '250px',
              mx: 2,
              borderRadius: '6px',
              height: 'fit-content',
              bgcolor: (theme) => theme.palette.mode === 'dark' ? theme.palette.primary[800] : '#ccc'
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

            : <Box sx={{
              minWidth:'250px',
              maxWidth:'250px',
              mx:2,
              p:1,
              borderRadius:'6px',
              height:'fit-content',
              bgcolor: '#ccc',
              display:'flex',
              flexDirection:'column',
              gap:'1'
            }}>
              <TextField
                label="Enter column title"
                type="text"
                size="small"
                variant='outlined'
                autoFocus
                value = {newColumnTitle}
                onChange = {(e) => setNewColumnTitle(e.target.value)}
                sx={{
                  '& label':{ color:'white' },
                  '& input':{ color:'white' },
                  '& label.Mui-focused':{ color:'white' },
                  '& .MuiOutlinedInput-root':{
                    '& fieldset' : {
                      borderColor:'white'
                    },
                    '&:hover fieldset' : {
                      borderColor:'white'
                    },
                    '&.Mui-focused fieldset' : {
                      borderColor:'white'
                    }
                  }
                }} />
              <Box sx={{ display:'flex', alignItems:'center', gap:1, marginTop:1 }}>
                <Button variant='contained' size='small' onClick={addNewColumn}
                  sx={{
                    boxShadow:'none',
                    border:'0.5px solid',
                    borderColor: (theme) => theme.palette.primary.main,
                    '&:hover': { bgcolor: (theme) => theme.palette.primary.main }
                  }}
                >
                  Add Column
                </Button>
                <CloseIcon
                  sx={{
                    height:'30px',
                    fontSize:'small',
                    color:'white',
                    cursor:'pointer',
                    '&:hover': {
                      color: (theme) => theme.palette.warning.light
                    },
                    '&.MuiSvgIcon-root': {
                      height:'30px',
                      width: '20px'
                    }

                  }}
                  onClick={() => toggleOpenNewColumnForm()}
                />
              </Box>
            </Box>
          )
          : null
        }

      </Box>
    </SortableContext>
  )
}

export default ListColumns