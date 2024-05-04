import { Avatar, AvatarGroup, Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, InputAdornment, MenuItem, Popover, Select, TextField, Tooltip, Typography } from '@mui/material'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PeopleIcon from '@mui/icons-material/People'
import NotesIcon from '@mui/icons-material/Notes'
import CommentIcon from '@mui/icons-material/Comment'
import SendIcon from '@mui/icons-material/Send'
import AssignmentIcon from '@mui/icons-material/Assignment'
import { useDispatch, useSelector } from 'react-redux'
import { addCommentAPI, addMemberCardAPI, addTaskCardAPI, deleteCardAPI, updateCardAPI, updateTaskCardAPI } from '~/apis'
import { useRef, useState } from 'react'
import { addCommentAction, addMemberCardAction, addTaskCardAction, removeCardAction, updateDeadlineCardAction, updateDescriptionCardAction, updateStatusCardAction, updateTaskListCardAction } from '~/redux/actions/boardAction'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function CardDetail({ board, card, open, handleClose }) {
  const dispath = useDispatch()
  const user = useSelector(state => state.user)
  const date = new Date(card.deadline)
  const dayIndex = date.getDay()
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday']
  const day = days[dayIndex]
  const formattedDate = `${day} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  const oldBoard = { ...board }
  const currentBoard = useRef(oldBoard)
  const ownerBoard = currentBoard.current.ownerId === user._id
  const [cmtContent, setCmtContent] = useState('')
  const [memberEmail, setMemberEmail] = useState('')
  const [popoverInfo, setPopoverInfo] = useState(null)
  const [statusCard, setStatusCard] = useState('Still Good')
  const [description, setDescription] = useState('')
  const [selectedDate, setSelectedDate] = useState(date)
  const [task, setTask] = useState('')
  const confirmDeleteCard = useConfirm()
  const dispatch = useDispatch()

  const handleClick = (event, popoverType) => {
    setPopoverInfo({ anchorEl: event.currentTarget, type: popoverType })
  }

  const handleClosePopover = () => {
    setPopoverInfo(null)
  }

  const handleUpdateCardDeadlineSubmit = () => {
    const data = {
      _id: card._id,
      deadline : selectedDate
    }
    updateCardAPI(data)
      .then(res => {
        setDescription('')
        toast.success('Update successfully')
        handleClosePopover()
        const action = updateDeadlineCardAction(res._id, res.deadline)
        dispath(action)
      })
      .catch(error => {
        toast.error('some thing wrong!')
      })
  }

  const handleDeleteCardSubmit = () => {
    confirmDeleteCard({
      content:'Are you sure you want to delete this card ?',
      title: 'Delete Column ?',
      // confirmationText:'Confirm',  đã là mặc định ở main.jsx
      // cancellationText:'Cancel'  đã là mặc định ở main.jsx
      dialogProps:{ maxWidth:'xs', sx:{ zIndex:5000 } }
    })
      .then( () => {
        const data = {
          _id : card._id
        }
        deleteCardAPI(data)
          .then(res => {
            toast.success('Delete successfully')
            const action = removeCardAction(card._id)
            dispatch(action)
          })
      })
      .catch(() => {})
  }

  const handleCommentSubmit = () => {
    const data = {
      cardId : card._id,
      user : {
        _id : user._id,
        email: user.email,
        username: user.username,
        avatar: user.avatar
      },
      content: cmtContent
    }
    addCommentAPI(data)
      .then(res => {
        const cardId = card._id
        const comment = res
        const action = addCommentAction(cardId, comment)
        dispath(action)
        setCmtContent('')
      })
  }

  const handleMemberSubmit = () => {
    const data = {
      cardId : card._id,
      email : memberEmail
    }
    addMemberCardAPI(data)
      .then(res => {
        const newUser = res.members[res.members.length-1]
        const action = addMemberCardAction(card._id, newUser)
        toast.success('Add member successfully')
        dispath(action)
        handleClosePopover()
      })
      .catch(error => {
        const mesage = error.response.data.message
        toast.error(mesage)
      })
  }

  const handleAddTaskSubmit = () => {
    const data = {
      cardId: card._id,
      newTask : {
        taskName: task,
        taskStatus: false
      }
    }
    addTaskCardAPI(data)
      .then( () => {
        const action = addTaskCardAction(data)
        console.log('🚀 ~ .then ~ action:', action)
        dispatch(action)
        handleClosePopover()
        setTask('')
      })
  }

  const handleTaskList = (taskName, taskStatus) => {
    const data = {
      cardId: card._id,
      taskName : taskName,
      taskStatus: !taskStatus
    }
    updateTaskCardAPI(data)
      .then(res => {
        const action = updateTaskListCardAction(card._id, taskName, taskStatus)
        dispatch(action)
      })
  }

  const handleUpdateCardDescriptionSubmit = () => {
    const data = {
      _id: card._id,
      description : description
    }
    updateCardAPI(data)
      .then(res => {
        setDescription('')
        toast.success('Update successfully')
        const action = updateDescriptionCardAction(res._id, res.description)
        dispath(action)
        handleClosePopover()
      })
      .catch(error => {
        toast.error('some thing wrong!')
      })
  }

  const handleUpdateCardStatusSubmit = () => {
    const data = {
      _id: card._id,
      status : statusCard
    }
    updateCardAPI(data)
      .then(res => {
        toast.success('Update successfully')
        const action = updateStatusCardAction(res._id, res.status)
        dispath(action)
      })
      .catch(error => {
        toast.error('some thing wrong!')
      })
  }

  const handleEmpty = () => {
    if (!('members' in card)) {
      card.members = []
    }
    if (!('tasks' in card)) {
      card.tasks = []
    }
    if (!('comments' in card)) {
      card.comments = []
    }
  }
  handleEmpty()

  const setStatusColor = () => {
    if (card.status === 'Still Good') {
      return '#99cc33'
    } else if (card.status === 'Coming Up') {
      return '#ffcc00'
    } else if (card.status === 'Over Time') {
      return '#cc3300'
    } else {
      return '#99cc33'
    }
  }


  return (
    <Dialog sx={{ zIndex:1000, margin:'0 auto', '& .MuiPaper-root':{ minWidth:'700px' } }} open={open} onClose={handleClose}>
      <Box>
        <DialogTitle> {card.title} </DialogTitle>
        <DialogContent sx={{ display:'flex' }}>
          <Box sx={{ flex:'8', paddingRight:'15px' }}>

            <Box sx={{ marginBottom:'30px' }}>
              <Box sx={{ display:'flex', alignItems:'center', paddingBottom:'5px' }}>
                <PeopleIcon sx={{ marginRight:'4px' }} />
                <Typography>JOINED MEMBERS</Typography>
              </Box>
              <Box sx={{ display:'flex' }}>
                {card.members.map( member => {
                  return (
                    <Box key={member._id} sx={{ display:'flex' }}>
                      <Tooltip title={member.username} sx={{ marginRight:'5px', cursor:'pointer' }} PopperProps={{ style: { zIndex: 2000 } }}>
                        <Avatar alt={member.username} src={member.avatar} />
                      </Tooltip>
                    </Box>
                  )
                })}
              </Box>


            </Box>

            <Box sx={{ display:'flex', marginBottom:'30px' }}>
              <Box sx={{ marginRight:'20px' }}>
                <Box sx={{ display:'flex', alignItems:'center', paddingBottom:'5px' }}>
                  <HourglassBottomIcon sx={{ marginRight:'2px' }} />
                  <Typography>STATUS TASK</Typography>
                </Box>
                <Box sx={{ bgcolor:setStatusColor(), maxWidth:'100px', textAlign:'center', color:'white', borderRadius:'4px' }}>{card.status}</Box>
              </Box>
              <Box>
                <Box sx={{ display:'flex', alignItems:'center', paddingBottom:'5px' }}>
                  <AccessTimeIcon sx={{ marginRight:'2px', color:'red' }} />
                  <Typography color='red'>DEADLINE</Typography>
                </Box>
                <Box sx={{ border:'1px solid #ccc', borderRadius:'4px', minWidth:'100px', textAlign:'center', padding:'0 5px' }}> {formattedDate} </Box>
              </Box>
            </Box>

            <Box sx={{ marginBottom:'30px' }}>
              <Box sx={{ display:'flex', alignItems:'center', paddingBottom:'5px' }}>
                <NotesIcon sx={{ marginRight:'4px' }} />
                <Typography>DESCRIPTION</Typography>
              </Box>
              <Box sx={{ whiteSpace:'pre-line' ,paddingLeft:'25px' }}>
                {card.description}
              </Box>
            </Box>

            <Box sx={{ marginBottom:'30px' }}>
              <Box sx={{ display:'flex', alignItems:'center', paddingBottom:'5px' }}>
                <AssignmentIcon sx={{ marginRight:'4px', color:(theme) => theme.palette.primary[500] }} />
                <Typography>TASK LIST</Typography>
              </Box>
              {card.tasks.map((task, index) => {
                return (
                  <Box key={index} sx={{ display:'flex', alignItems:'center' }}>
                    <Checkbox onChange={(event) => handleTaskList(task.taskName, task.taskStatus, event)} checked={task.taskStatus} sx={{ color:'#ccc' }} />
                    <Typography> {task.taskName} </Typography>
                  </Box>
                )
              })}

            </Box>
            <Box>
              <Box sx={{ display:'flex', alignItems:'center', paddingBottom:'15px' }}>
                <CommentIcon sx={{ marginRight:'10px' }} />
                <Typography>COMMENTS</Typography>
              </Box>
              <Box sx={{ display:'flex', marginBottom:'20px' }}>
                <Avatar src={user.avatar} sx={{ marginRight:'8px' }} />
                <TextField
                  value={cmtContent}
                  placeholder='Type your comment'
                  onChange={(e) => setCmtContent(e.target.value)}
                  sx={{ width:'100%' }}
                  InputProps={{
                    endAdornment:(
                      <InputAdornment position="end">
                        <SendIcon onClick={handleCommentSubmit} sx={{ color:(theme) => theme.palette.primary[500], cursor:'pointer', '&:hover':{ 'color':(theme) => theme.palette.primary[800] } }} ></SendIcon>
                      </InputAdornment>
                    )
                  }}
                  size='small'
                />
              </Box>
              <Box>
                {card.comments.map(comment => {
                  const date = new Date(comment.createdAt)
                  const formattedDate = `${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}  ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                  return (
                    <Box key={comment._id} sx={{ display:'flex', marginBottom:'15px' }}>
                      <Avatar src={comment.user.avatar} sx={{ marginRight:'8px' }} />
                      <Box>
                        <Typography sx={{ display:'flex', alignItems:'center' }} >
                          <strong > {comment.user.username} </strong>
                          <span style={{ marginLeft:'10px', fontSize:'12px', fontStyle:'italic' }}> {formattedDate} </span>
                        </Typography>
                        <Typography> {comment.content} </Typography>
                      </Box>
                    </Box>
                  )
                })}
              </Box>
            </Box>
          </Box>
          {ownerBoard && (
            <Box sx={{ flex:'2' }}>
              EDIT CARD

              <Box id='add-members' onClick={(event) => handleClick(event, 'add-members')} sx={{ backgroundColor:(theme) => theme.palette.primary[500], marginBottom:'10px', padding:'5px 5px', color:'white', borderRadius:'4px', '&:hover': { bgcolor:(theme) => theme.palette.primary[800] } }}>
                <Box sx={{ cursor:'pointer' }}>Add Members</Box>
                <Popover
                  sx={{
                    '& .MuiPopover-paper': {
                      minWidth:'300px',
                      boxShadow: '0px 2px 4px rgba(0,0,0,0.3)'
                    }
                  }}
                  open={Boolean(popoverInfo && popoverInfo.type === 'add-members')}
                  anchorEl={popoverInfo?.anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  onClose={handleClosePopover}
                  container={() => document.getElementById('add-members')}
                >
                  <Box onClick={(event) => event.stopPropagation()}>
                    <Box sx={{ display:'flex', justifyContent:'center', padding:'15px 0' }} >
                      <Typography sx={{ flex:'8', textAlign:'center' }}>Members</Typography>
                      <CloseIcon onClick={handleClosePopover} sx={{ flex:'2', cursor:'pointer', borderRadius:'50%', '&:hover':{ color:'#ccc' } }}/>
                    </Box>
                    <Box sx={{ display:'flex', justifyContent:'center', padding:'15px 0' }}>
                      <TextField onChange={(e) => setMemberEmail(e.target.value)} value={memberEmail} placeholder='Enter email' size='small'/>
                      <Button onClick={handleMemberSubmit} sx={{ marginLeft:'5px', color:'white', bgcolor:(theme) => theme.palette.primary[500], '&:hover':{ bgcolor:(theme) => theme.palette.primary[800] } }}>
                        Add
                      </Button>
                    </Box>
                  </Box>
                </Popover>
              </Box>

              <Box id='status-task' onClick={(event) => handleClick(event, 'status-task')} sx={{ backgroundColor:(theme) => theme.palette.primary[500], marginBottom:'10px', padding:'5px 5px', color:'white', borderRadius:'4px', '&:hover': { bgcolor:(theme) => theme.palette.primary[800], cursor:'pointer' } }}>
                <Box sx={{ cursor:'pointer' }}>Status Task</Box>
                <Popover
                  sx={{
                    '& .MuiPopover-paper': {
                      minWidth:'300px',
                      boxShadow: '0px 2px 4px rgba(0,0,0,0.3)'
                    }
                  }}
                  open={Boolean(popoverInfo && popoverInfo.type === 'status-task')}
                  anchorEl={popoverInfo?.anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  onClose={handleClosePopover}
                  container={() => document.getElementById('status-task')}
                  disableAutoFocus
                >
                  <Box onClick={(event) => event.stopPropagation()}>
                    <Box sx={{ display:'flex', justifyContent:'center', padding:'15px 0' }} >
                      <Typography sx={{ flex:'8', textAlign:'center' }}>Update Status</Typography>
                      <CloseIcon onClick={handleClosePopover} sx={{ flex:'2', cursor:'pointer', borderRadius:'50%', '&:hover':{ color:'#ccc' } }}/>
                    </Box>
                    <Box sx={{ display:'flex', justifyContent:'center', padding:'15px 20px' }}>
                      <select

                        onChange={(e) => setStatusCard(e.target.value)}
                        size='small'
                        id="status-select"
                        value={statusCard}
                        style={{ flex:'8' }}
                      >
                        <option style={{ fontSize:'18px' }} value={'Still Good'}>
                          Still Good
                        </option>
                        <option style={{ fontSize:'18px' }} value={'Coming Up'}>
                          Coming Up
                        </option>
                        <option style={{ fontSize:'18px' }} value={'Over Time'}>
                          Over Time
                        </option>
                      </select>
                      <Button onClick={handleUpdateCardStatusSubmit} sx={{ flex:'2', marginLeft:'5px', color:'white', bgcolor:(theme) => theme.palette.primary[500], '&:hover':{ bgcolor:(theme) => theme.palette.primary[800] } }}>
                        Update
                      </Button>
                    </Box>
                  </Box>
                </Popover>
              </Box>
              <Box id='deadline-card' onClick={(event) => handleClick(event, 'deadline-card')} sx={{ backgroundColor:(theme) => theme.palette.primary[500], marginBottom:'10px', padding:'5px 5px', color:'white', borderRadius:'4px', '&:hover': { bgcolor:(theme) => theme.palette.primary[800], cursor:'pointer' } }}>
                <Box sx={{ cursor:'pointer' }}>Deadline</Box>
                <Popover
                  sx={{
                    '& .MuiPopover-paper': {
                      minWidth:'300px',
                      boxShadow: '0px 2px 4px rgba(0,0,0,0.3)'
                    }
                  }}
                  open={Boolean(popoverInfo && popoverInfo.type === 'deadline-card')}
                  anchorEl={popoverInfo?.anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  onClose={handleClosePopover}
                  container={() => document.getElementById('deadline-card')}
                  disableAutoFocus
                >
                  <Box onClick={(event) => event.stopPropagation()}>
                    <Box sx={{ display:'flex', justifyContent:'center', padding:'15px 0' }} >
                      <Typography sx={{ flex:'8', textAlign:'center' }}>Update deadline</Typography>
                      <CloseIcon onClick={handleClosePopover} sx={{ flex:'2', cursor:'pointer', borderRadius:'50%', '&:hover':{ color:'#ccc' } }}/>
                    </Box>
                    <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', padding:'15px 20px', height:'280px' }}>
                      <Datepicker selected={selectedDate} inline onChange={data => setSelectedDate(data)} popperPlacement='bottom-start'/>
                      <Button onClick={handleUpdateCardDeadlineSubmit} sx={{ flex:'2', marginLeft:'5px', color:'white', bgcolor:(theme) => theme.palette.primary[500], '&:hover':{ bgcolor:(theme) => theme.palette.primary[800] } }}>
                        Update
                      </Button>
                    </Box>
                  </Box>
                </Popover>
              </Box>
              <Box id='description-card' onClick={(event) => handleClick(event, 'description-card')} sx={{ backgroundColor:(theme) => theme.palette.primary[500], marginBottom:'10px', padding:'5px 5px', color:'white', borderRadius:'4px', '&:hover': { bgcolor:(theme) => theme.palette.primary[800], cursor:'pointer' } }}>
                <Box sx={{ cursor:'pointer' }}>Description</Box>
                <Popover
                  sx={{
                    '& .MuiPopover-paper': {
                      minWidth:'300px',
                      boxShadow: '0px 2px 4px rgba(0,0,0,0.3)'
                    }
                  }}
                  open={Boolean(popoverInfo && popoverInfo.type === 'description-card')}
                  anchorEl={popoverInfo?.anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  onClose={handleClosePopover}
                  container={() => document.getElementById('description-card')}
                  disableAutoFocus
                >
                  <Box onClick={(event) => event.stopPropagation()}>
                    <Box sx={{ display:'flex', justifyContent:'center', padding:'15px 0' }} >
                      <Typography sx={{ flex:'8', textAlign:'center' }}>Update description</Typography>
                      <CloseIcon onClick={handleClosePopover} sx={{ flex:'2', cursor:'pointer', borderRadius:'50%', '&:hover':{ color:'#ccc' } }}/>
                    </Box>
                    <Box sx={{ display:'flex', justifyContent:'center', padding:'15px 20px' }}>
                      <TextField multiline rows={3} onChange={(e) => setDescription(e.target.value)} size='small' value={description}/>
                      <Button onClick={handleUpdateCardDescriptionSubmit} sx={{ flex:'2', marginLeft:'5px', color:'white', bgcolor:(theme) => theme.palette.primary[500], '&:hover':{ bgcolor:(theme) => theme.palette.primary[800] } }}>
                        Update
                      </Button>
                    </Box>
                  </Box>
                </Popover>
              </Box>
              <Box id='taskList-card' onClick={(event) => handleClick(event, 'taskList-card')} sx={{ backgroundColor:(theme) => theme.palette.primary[500], marginBottom:'10px', padding:'5px 5px', color:'white', borderRadius:'4px', '&:hover': { bgcolor:(theme) => theme.palette.primary[800], cursor:'pointer' } }}>
                <Box sx={{ cursor:'pointer' }}>Add Task</Box>
                <Popover
                  sx={{
                    '& .MuiPopover-paper': {
                      minWidth:'300px',
                      boxShadow: '0px 2px 4px rgba(0,0,0,0.3)'
                    }
                  }}
                  open={Boolean(popoverInfo && popoverInfo.type === 'taskList-card')}
                  anchorEl={popoverInfo?.anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  onClose={handleClosePopover}
                  container={() => document.getElementById('taskList-card')}
                  disableAutoFocus
                >
                  <Box onClick={(event) => event.stopPropagation()}>
                    <Box sx={{ display:'flex', justifyContent:'center', padding:'15px 0' }} >
                      <Typography sx={{ flex:'8', textAlign:'center' }}>Add task</Typography>
                      <CloseIcon onClick={handleClosePopover} sx={{ flex:'2', cursor:'pointer', borderRadius:'50%', '&:hover':{ color:'#ccc' } }}/>
                    </Box>
                    <Box sx={{ display:'flex', justifyContent:'center', padding:'15px 20px' }}>
                      <TextField onChange={(e) => setTask(e.target.value)} size='small' value={task}/>
                      <Button onClick={handleAddTaskSubmit} sx={{ flex:'2', marginLeft:'5px', color:'white', bgcolor:(theme) => theme.palette.primary[500], '&:hover':{ bgcolor:(theme) => theme.palette.primary[800] } }}>
                        Add
                      </Button>
                    </Box>
                  </Box>
                </Popover>
              </Box>
              <Box onClick={handleDeleteCardSubmit} sx={{ backgroundColor:(theme) => theme.palette.primary[500], marginBottom:'10px', padding:'5px 5px', color:'white', borderRadius:'4px', '&:hover': { bgcolor:(theme) => theme.palette.primary[800], cursor:'pointer' } }}>
              Delete Card
              </Box>
            </Box>
          )}
        </DialogContent>
      </Box>
    </Dialog>
  )
}

export default CardDetail