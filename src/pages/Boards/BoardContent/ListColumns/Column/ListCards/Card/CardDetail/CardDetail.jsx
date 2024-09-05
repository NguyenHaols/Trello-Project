import { Avatar, AvatarGroup, Box, Button, Checkbox, colors, Dialog, DialogContent, DialogTitle, IconButton, InputAdornment, LinearProgress, Menu, MenuItem, Popover, Select, TextField, Tooltip, Typography } from '@mui/material'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PeopleIcon from '@mui/icons-material/People'
import NotesIcon from '@mui/icons-material/Notes'
import CommentIcon from '@mui/icons-material/Comment'
import SendIcon from '@mui/icons-material/Send'
import AssignmentIcon from '@mui/icons-material/Assignment'
import { useDispatch, useSelector } from 'react-redux'
import { addAttachCardAPI, addCommentAPI, addMemberCardAPI, addTaskCardAPI, deleteCardAPI, deleteCommentAPI, getMembersByWorkspaceIdAPI, removeTaskCardAPI, updateCardAPI, updateCommentAPI, updateTaskAssignCardAPI, updateTaskCardAPI, uploadFileAPI } from '~/apis'
import { useEffect, useRef, useState } from 'react'
import { addAttachCardAction, addCommentAction, addMemberCardAction, addTaskCardAction, removeCardAction, removeCommentAction, removeTaskCardAction, updateCommentAction, updateDeadlineCardAction, updateDescriptionCardAction, updateStatusCardAction, updateTaskCardAssignAction, updateTaskListCardAction } from '~/redux/actions/boardAction'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useTheme } from '@emotion/react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Member from './Member/Member'
import TaskList from './TaskList/TaskList'
import GroupIcon from '@mui/icons-material/Group'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import DeleteIcon from '@mui/icons-material/Delete'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Attachment from './Attachment/Attachment'
import { useTranslation } from 'react-i18next'


function CardDetail({ board, card, open, handleClose }) {
  const dispath = useDispatch()
  const user = useSelector(state => state.user)
  const date = new Date(card.deadline)
  const dateNow = new Date()
  const dayIndex = date.getDay()
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday']
  const day = days[dayIndex]
  const formattedDate = `${day} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  const oldBoard = { ...board }
  const currentBoard = useRef(oldBoard)
  const ownerBoard = currentBoard.current.ownerId === user._id
  const { t } = useTranslation()
  const isMembersInCard = Array.isArray(card?.members) && card?.members.some(member => member._id === user._id)
  const [cmtContent, setCmtContent] = useState('')
  const [workspaceMember, setWorkspaceMember] = useState(null)
  const [memberEmail, setMemberEmail] = useState('')
  const [popoverInfo, setPopoverInfo] = useState(null)
  const [statusCard, setStatusCard] = useState('Still Good')
  const [description, setDescription] = useState(card.description)
  const [selectedDate, setSelectedDate] = useState(date)
  const [fileAttach, setFileAttach] = useState(null)
  const [task, setTask] = useState('')
  const [menuCmtId, setMenuCmtId] = useState(null)
  const confirmDeleteCard = useConfirm()
  const dispatch = useDispatch()
  const theme = useTheme()
  const textColor = theme.palette.text.primary
  const textSecondColor = theme.palette.text.secondary
  const mainColor = theme.palette.primary.main
  const secondaryColor = theme.palette.secondary.main
  const deleteCmtConfirm = useConfirm()
  const moreHorizIconRef = useRef(null)
  const optionsCommentRef = useRef(null)
  const [commentEditing, setCommentEditing] = useState(false)
  const cmtId = useRef(menuCmtId)
  const [contentEditingCmt, setContentEditingCmt] = useState('')
  const [buttonSubmit, setButtonSubmit] = useState(true)
  const deadlineDate = new Date(selectedDate)
  const handleEditCmt = (content) => {
    setCommentEditing(true)
    handleCloseMenuCmt()
    setContentEditingCmt(content)
  }

  const handleClickOutSide = (e) => {
    if ( optionsCommentRef.current && !moreHorizIconRef.current.contains(e.target) && !optionsCommentRef.current.contains(e.target)) {
      setMenuCmtId(null)
    }
  }


  const handleOpenMenuCmt = (e, id) => {
    if (menuCmtId) {
      setMenuCmtId(null)
    } else {
      setMenuCmtId(id)
    }
    cmtId.current = id
  }

  const handleCloseMenuCmt = () => {
    setMenuCmtId(null)
  }

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
    if (dateNow.getTime() < deadlineDate.getTime()) {
      data.status = 'Good'
    }
    if (dateNow.getTime() > deadlineDate.getTime()) {
      data.status = 'Over Time'
    }
    setButtonSubmit(false)
    updateCardAPI(data)
      .then(res => {
        setButtonSubmit(true)
        toast.success(`${t('update_successfully')}`)
        handleClosePopover()
        const action = updateDeadlineCardAction(res._id, res.deadline)
        const action2 = updateStatusCardAction(res._id, res.status)
        dispath(action)
        dispath(action2)
      })
      .catch(error => {
        toast.error(`${t('some_thing_wrong')}`)
      })

  }

  const handleDeleteCardSubmit = () => {
    confirmDeleteCard({
      content:t('are_you_sure_you_want_to_delete_this_card_?'),
      title: t('delete_card'),
      confirmationText:t('confirm'),
      cancellationText:t('cancel'),
      dialogProps:{ maxWidth:'xs', sx:{ zIndex:5000 } }
    })
      .then( () => {
        const data = {
          _id : card._id
        }
        deleteCardAPI(data)
          .then(res => {
            toast.success(`${t('delete_successfully')}`)
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


  const handleAddTaskSubmit = () => {
    const data = {
      cardId: card._id,
      newTask : {
        taskName: task,
        taskStatus: false
      }
    }
    setButtonSubmit(false)
    addTaskCardAPI(data)
      .then( (res) => {
        const tasks = res.tasks
        const dataAction = {
          cardId: card._id,
          newTask: {
            ...tasks[tasks.length-1]
          }
        }
        setButtonSubmit(true)
        const action = addTaskCardAction(dataAction)
        dispatch(action)
        handleClosePopover()
        setTask('')
      })
  }


  const handleUpdateCardDescriptionSubmit = () => {
    const data = {
      _id: card._id,
      description : description
    }
    setButtonSubmit(false)
    updateCardAPI(data)
      .then(res => {
        setButtonSubmit(true)
        toast.success(`${t('update_successfully')}`)
        const action = updateDescriptionCardAction(res._id, res.description)
        dispath(action)
        handleClosePopover()
      })
      .catch(error => {
        toast.error(`${t('some_thing_wrong')}`)
      })
  }

  const handleUpdateCardStatusSubmit = () => {
    const data = {
      _id: card._id,
      status : statusCard
    }
    setButtonSubmit(false)
    updateCardAPI(data)
      .then(res => {
        setButtonSubmit(true)
        toast.success(`${t('update_successfully')}`)
        const action = updateStatusCardAction(res._id, res.status)
        dispath(action)
      })
      .catch(error => {
        toast.error(`${t('some_thing_wrong')}`)
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
    if (!('attachs' in card)) {
      card.attachs = []
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


  const handleDeleteComment = (cmtId) => {
    handleCloseMenuCmt()
    deleteCmtConfirm({
      title:'Delete comment',
      content:'Are you sure you want to delete this comment?',
      dialogProps: {
        sx:{ zIndex:1500 }
      }
    })
      .then(() => {
        deleteCommentAPI({ commentId:cmtId })
          .then(data => {
            const cardId = card._id
            const commentId = cmtId
            const action = removeCommentAction(cardId, commentId)
            dispath(action)
          })
      })
  }

  const isActivityMember = (member) => {
    return !card.members.some(cmember => (cmember?._id === member._id))
  }


  const handleUpdateComment = (cmtId, newContent) => {
    setCommentEditing(false)
    if ( !newContent ) return
    const data = {
      commentId: cmtId,
      newContent: newContent
    }
    updateCommentAPI(data)
      .then(data => {
        const action = updateCommentAction(card._id, cmtId, newContent)
        dispath(action)
      })
  }


  const percentOfCompleteTask = () => {
    let count = 0
    card.tasks.forEach(task => {
      if (task.taskStatus === true) {
        count++
      }
    })
    const percent = card.tasks.length > 0 ? (count / card.tasks.length) * 100 : 0
    return Number(percent.toFixed(0))
  }

  const checkOverTimeCard = () => {
    if (date.getTime() < dateNow.getTime()) {
      const data = {
        _id: card._id,
        status : 'Over Time'
      }
      updateCardAPI(data)
        .then(res => {
          const action = updateStatusCardAction(res._id, res.status)
          dispath(action)
        })
        .catch(error => {
          toast.error(`${t('some_thing_wrong')}`)
        })
    }
  }

  const filterActivityMembers = () => {
    if (!workspaceMember || workspaceMember.length === 0) {
      return []
    }
    return workspaceMember.filter(member =>
      !card.members.some(cardMember => cardMember._id === member._id)
    )
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFileAttach(file)
    }
  }

  const handleAddAttachment = () => {
    const formData = new FormData()
    formData.append('file', fileAttach)
    handleClosePopover()
    uploadFileAPI(formData)
      .then((res) => {
        toast.success(`${t('add_new_attach_success')}`)
        return res
      })
      .then(data => {
        const newAttach = {
          cardId: card._id,
          filename: fileAttach.name,
          publicId: data.data.publicId,
          url: data.data.url,
          fileExtension: data.data.fileExtension
        }
        addAttachCardAPI(newAttach)
          .then(res => {
            const attachs = res.attachs
            const lastAttach = attachs[attachs.length-1]
            const action = addAttachCardAction(card._id, lastAttach)
            dispatch(action)
          })
      })
  }

  useEffect(() => {
    checkOverTimeCard()

    getMembersByWorkspaceIdAPI(currentBoard.current.workspaceId)
      .then((data) => {
        setWorkspaceMember(data)
      })
  }, [])

  return (
    <Dialog sx={{ zIndex:1000, margin:'0 auto', '& .MuiPaper-root':{ minWidth:['100%', '700px'], minHeight: ['100vh', '0'] } }} open={open} onClose={handleClose}>
      <Box>
        <DialogTitle sx={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          {card.title}
          <IconButton onClick={(e) => {handleClose()}} ><CloseIcon sx={{ display:['block', 'none'] }} /> </IconButton>
        </DialogTitle>
        <DialogContent sx={{ display:'flex', overflow:'hidden', pb:'70px' }}>
          <Box sx={{ flex:'8', paddingRight:'15px' }}>

            <Box sx={{ marginBottom:'30px' }}>
              <Box sx={{ display:'flex', alignItems:'center', paddingBottom:'5px' }}>
                <PeopleIcon sx={{ marginRight:'4px', color:(theme) => theme.palette.primary[500] }} />
                <Typography textTransform='uppercase'> {t('joined_members')} </Typography>
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
              <Box sx={{ marginRight:'70px' }}>
                <Box sx={{ display:'flex', alignItems:'center', paddingBottom:'5px' }}>
                  <HourglassBottomIcon sx={{ marginRight:'2px', color:(theme) => theme.palette.primary[500] }} />
                  <Typography textTransform='uppercase' > {t('status_task')} </Typography>
                </Box>
                <Box sx={{ bgcolor:setStatusColor(), maxWidth:'100px', textAlign:'center', color:'white', borderRadius:'4px' }}>{card.status}</Box>
              </Box>
              <Box>
                <Box sx={{ display:'flex', alignItems:'center', paddingBottom:'5px' }}>
                  <AccessTimeIcon sx={{ marginRight:'2px', color:'red' }} />
                  <Typography textTransform='uppercase'> {t('deadline')} </Typography>
                </Box>
                <Box sx={{ border:'1px solid #ccc', borderRadius:'4px', minWidth:'100px', textAlign:'center', padding:'0 5px' }}> {formattedDate} </Box>
              </Box>
            </Box>

            <Box sx={{ marginBottom:'30px' }}>
              <Box sx={{ display:'flex', alignItems:'center', paddingBottom:'5px' }}>
                <NotesIcon sx={{ marginRight:'4px', color:(theme) => theme.palette.primary[500] }} />
                <Typography textTransform='uppercase'> {t('description')} </Typography>
              </Box>
              <Box sx={{ whiteSpace:'pre-line', paddingLeft:'25px' }}>
                {card.description}
              </Box>
            </Box>

            <Box sx={{ marginBottom:'30px' }}>
              <Box sx={{ display:'flex', alignItems:'center', paddingBottom:'5px' }}>
                <AssignmentIcon sx={{ marginRight:'4px', color:(theme) => theme.palette.primary[500] }} />
                <Typography textTransform='uppercase'> {t('task_list')} </Typography>
              </Box>
              <Box sx={{ display:'flex', alignItems:'center' }}>
                <Typography>{percentOfCompleteTask()}%</Typography>
                <Box sx={{ width:'100%', p:'0 10px' }}>
                  <LinearProgress variant="determinate" value={percentOfCompleteTask()} sx={{ height:'10px', borderRadius:'10px' }} />
                </Box>
              </Box>
              {card.tasks.map((task) => {
                return (
                  <TaskList key={task._id} task={task} card={card} isMembersInCard={isMembersInCard} ownerBoard={ownerBoard} />
                )
              })}
            </Box>

            {card?.attachs.length > 0 && (
              <Box sx={{ mb:'30px' }}>
                <Box sx={{ display:'flex', alignItems:'center', paddingBottom:'5px' }}>
                  <AttachmentIcon sx={{ marginRight:'4px', color:(theme) => theme.palette.primary[500] }} />
                  <Typography textTransform='uppercase'> {t('attachment')} </Typography>
                </Box>
                {card.attachs.map(attach =>
                  (<Attachment key={attach._id} ownerBoard={ownerBoard} attach={attach} card={card} />)
                )}
              </Box>
            )}

            <Box>
              <Box sx={{ display:'flex', alignItems:'center', paddingBottom:'15px' }}>
                <CommentIcon sx={{ marginRight:'10px', color:(theme) => theme.palette.primary[500] }} />
                <Typography textTransform='uppercase'> {t('comments')} </Typography>
              </Box>
              {(ownerBoard || isMembersInCard) && (
                <Box sx={{ display:'flex', marginBottom:'20px' }}>
                  <Avatar src={user.avatar} sx={{ marginRight:'8px' }} />
                  <TextField
                    value={cmtContent}
                    placeholder= {t('type_your_comment')}
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
              )}
              <Box sx={{ width:'100%' }}>
                {card.comments.map(comment => {
                  const date = new Date(comment.createdAt)
                  const formattedDate = `${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}  ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                  return (
                    <Box key={comment._id} sx={{ width:'100%', display:'flex', justifyContent: 'space-between' }} >
                      <Box sx={{ width:'100%', display:'flex', marginBottom:'15px' }}>
                        <Avatar src={comment.user.avatar} sx={{ marginRight:'8px' }} />
                        <Box sx={{ width:'100%' }}>
                          <Typography sx={{ display:'flex', alignItems:'center' }} >
                            <strong > {comment.user.username} </strong>
                            <span style={{ marginLeft:'10px', fontSize:'12px', fontStyle:'italic' }}> {formattedDate} </span>
                          </Typography>
                          { (commentEditing && cmtId.current === comment._id) ? (
                            <Box >
                              <Box >
                                <TextField
                                  value={contentEditingCmt}
                                  placeholder='Type your comment'
                                  onChange={(e) => setContentEditingCmt(e.target.value)}
                                  sx={{ width:'100%' }}
                                  // InputProps={{
                                  // endAdornment:(
                                  // <InputAdornment position="end">
                                  // <SendIcon onClick={handleCommentSubmit} sx={{ color:(theme) => theme.palette.primary[500], cursor:'pointer', '&:hover':{ 'color':(theme) => theme.palette.primary[800] } }} ></SendIcon>
                                  // </InputAdornment>
                                  // )
                                  // }}
                                  multiline
                                  size='small'
                                />
                              </Box>
                              <Box>
                                <Button onClick={() => {handleUpdateComment(cmtId.current, contentEditingCmt)}}>{t('save')} </Button>
                                <Button onClick={() => {setCommentEditing(false)}}>{t('cancel')}</Button>
                              </Box>
                            </Box>
                          ) : (<Typography> {comment.content} </Typography>)
                          }

                        </Box>
                      </Box>
                      <Box sx={{ position:'relative' }}>
                        {(!commentEditing && user._id === comment.user._id ) && (<MoreHorizIcon ref={moreHorizIconRef} onClick={(e) => handleOpenMenuCmt(e, comment._id)} sx={{ cursor:'pointer', '&:hover': { opacity:0.3 } }} />)}
                        {menuCmtId === comment._id && (
                          <Box ref={optionsCommentRef} sx={{ position:'absolute', right:'0', bottom:'-50px', minWidth:'200px', boxShadow:'0 4px 10px rgb(0,0,0,0.4)', bgcolor:mainColor, zIndex:'2', p:'10px 10px', borderRadius:'10px', color:'white' }}
                          >
                            <Box onClick={() => {handleEditCmt(comment.content)}} sx={{ p:'5px 10px', borderRadius:'5px', '&:hover':{ bgcolor:(theme) => theme.palette.primary[300] }, cursor:'pointer' }}> {t('edit')} </Box>
                            <Box onClick={() => {handleDeleteComment(comment._id)}} sx={{ p:'5px 10px', borderRadius:'5px', '&:hover':{ bgcolor:(theme) => theme.palette.primary[300] }, cursor:'pointer' }}> {t('delete')} </Box>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  )
                })}
              </Box>
            </Box>
          </Box>
          {(isMembersInCard || ownerBoard) && (
            <Box sx={{ flex:'2' }}>
              <Box sx={{ color:(theme) => theme.palette.mode =='light' ? theme.palette.primary[800] : textColor, fontWeight:'600', fontSize:'18px' }} > {t('management_card')} </Box>
              <hr></hr>
              {ownerBoard && (
                <Box id='add-members' onClick={(event) => handleClick(event, 'add-members')} sx={{ backgroundColor:(theme) => theme.palette.primary[500], marginBottom:'10px', padding:'5px 5px', color:'white', borderRadius:'4px', '&:hover': { bgcolor:(theme) => theme.palette.primary[800] } }}>
                  <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', textAlign:'center' }}> {t('members')} <GroupIcon sx={{ ml:'5px' }} /> </Box>
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
                    <Box onClick={(event) => event.stopPropagation()} sx={{ padding:'15px 15px' }}>
                      <Box sx={{ display:'flex', justifyContent:'center', padding: '10px 0' }} >
                        <Typography sx={{ flex:'8', textAlign:'center', pl:'40px' }}> {t('members')} </Typography>
                        <CloseIcon onClick={handleClosePopover} sx={{ flex:'2', cursor:'pointer', borderRadius:'50%', '&:hover':{ color:'#ccc' } }}/>
                      </Box>
                      <Box sx={{ display:'flex', justifyContent:'center', padding: '10px 0' }}>
                        <TextField sx={{ width:'100%' }} onChange={(e) => setMemberEmail(e.target.value)} value={memberEmail} placeholder={t('enter_email')} size='small'/>
                      </Box>
                      <Box>
                        <Box sx={{ textAlign:'center' }}>
                          {filterActivityMembers().length > 0 && (
                            <Typography variant='caption'> {t('activity_members')} </Typography>
                          )}
                        </Box>
                        <Box>
                          {filterActivityMembers().map(member =>
                            (<Member key={member._id} card={card} member={member} isActivityMember={isActivityMember(member)} />)
                          )}
                        </Box>
                      </Box>
                      <Box>
                        <Box sx={{ textAlign:'center', pt:'15px' }}>
                          <Typography variant='caption'> {t('joined_members')} </Typography>
                        </Box>
                        {card.members.map(member =>
                          (<Member key={member._id} member={member} card={card}/>)
                        )}
                      </Box>
                    </Box>
                  </Popover>
                </Box>
              )}


              {/* <Box id='status-task' onClick={(event) => handleClick(event, 'status-task')} sx={{ backgroundColor:(theme) => theme.palette.primary[500], marginBottom:'10px', padding:'5px 5px', color:'white', borderRadius:'4px', '&:hover': { bgcolor:(theme) => theme.palette.primary[800], cursor:'pointer' } }}>
                <Box sx={{ cursor:'pointer', textAlign:'center' }}>Status Task</Box>
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
                      <Button disabled={!buttonSubmit} onClick={handleUpdateCardStatusSubmit} sx={{ flex:'2', marginLeft:'5px', color:'white', bgcolor:(theme) => theme.palette.primary[500], '&:hover':{ bgcolor:(theme) => theme.palette.primary[800] } }}>
                        Update
                      </Button>
                    </Box>
                  </Box>
                </Popover>
              </Box> */}
              {ownerBoard && (
                <Box id='attachment-file' onClick={(event) => handleClick(event, 'attachment-file')} sx={{ backgroundColor:(theme) => theme.palette.primary[500], marginBottom:'10px', padding:'5px 5px', color:'white', borderRadius:'4px', '&:hover': { bgcolor:(theme) => theme.palette.primary[800], cursor:'pointer' } }}>
                  <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center', cursor:'pointer', textAlign:'center' }}> {t('attachment')} <AttachmentIcon sx={{ ml:'5px' }} /></Box>
                  <Popover
                    sx={{
                      '& .MuiPopover-paper': {
                        minWidth:'300px',
                        boxShadow: '0px 2px 4px rgba(0,0,0,0.3)'
                      }
                    }}
                    open={Boolean(popoverInfo && popoverInfo.type === 'attachment-file')}
                    anchorEl={popoverInfo?.anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    onClose={handleClosePopover}
                    container={() => document.getElementById('attachment-file')}
                    disableAutoFocus
                  >
                    <Box onClick={(event) => event.stopPropagation()}>
                      <Box sx={{ display:'flex', justifyContent:'center', padding:'15px 0' }} >
                        <Typography sx={{ ml:'10%', flex:'8', textAlign:'center' }}> {t('add_attachment')} </Typography>
                        <CloseIcon onClick={handleClosePopover} sx={{ flex:'2', cursor:'pointer', borderRadius:'50%', '&:hover':{ color:'#ccc' } }}/>
                      </Box>
                      <Box sx={{ display:'flex', flexDirection:'column', justifyContent:'center', padding:'15px 20px' }}>
                        <TextField type='file' onChange={handleFileChange} />
                        <Button disabled={!buttonSubmit} onClick={handleAddAttachment} sx={{ flex:'2', mt:'10px', marginLeft:'5px', color:'white', bgcolor:(theme) => theme.palette.primary[500], '&:hover':{ bgcolor:(theme) => theme.palette.primary[800] } }}>
                          {t('add')}
                        </Button>
                      </Box>
                    </Box>
                  </Popover>
                </Box>
              )}

              <Box id='deadline-card' onClick={(event) => handleClick(event, 'deadline-card')} sx={{ backgroundColor:(theme) => theme.palette.primary[500], marginBottom:'10px', padding:'5px 5px', color:'white', borderRadius:'4px', '&:hover': { bgcolor:(theme) => theme.palette.primary[800], cursor:'pointer' } }}>
                <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', textAlign:'center' }}>{t('deadline')} <AccessTimeIcon sx={{ ml:'5px' }} /> </Box>
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
                      <Typography sx={{ ml:'10%', flex:'8', textAlign:'center' }}> {t('update_deadline')} </Typography>
                      <CloseIcon onClick={handleClosePopover} sx={{ flex:'2', cursor:'pointer', borderRadius:'50%', '&:hover':{ color:'#ccc' } }}/>
                    </Box>
                    <Box sx={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'15px 20px', height:'280px' }}>
                      <Datepicker selected={selectedDate} inline onChange={data => setSelectedDate(data)} popperPlacement='bottom-start'/>
                      <Button disabled={!buttonSubmit} onClick={handleUpdateCardDeadlineSubmit} sx={{ width:'100%', m:'8px 0', flex:'2', marginLeft:'5px', color:'white', bgcolor:(theme) => theme.palette.primary[500], '&:hover':{ bgcolor:(theme) => theme.palette.primary[800] } }}>
                        {t('update')}
                      </Button>
                    </Box>
                  </Box>
                </Popover>
              </Box>
              <Box id='description-card' onClick={(event) => handleClick(event, 'description-card')} sx={{ backgroundColor:(theme) => theme.palette.primary[500], marginBottom:'10px', padding:'5px 5px', color:'white', borderRadius:'4px', '&:hover': { bgcolor:(theme) => theme.palette.primary[800], cursor:'pointer' } }}>
                <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center', cursor:'pointer', textAlign:'center' }}>{t('description')} <NotesIcon sx={{ ml:'5px' }} /> </Box>
                <Popover
                  sx={{
                    '& .MuiPopover-paper': {
                      minWidth:'430px',
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
                      <Typography sx={{ ml:'10%', flex:'8', textAlign:'center' }}> {t('update_description')} </Typography>
                      <CloseIcon onClick={handleClosePopover} sx={{ flex:'2', cursor:'pointer', borderRadius:'50%', '&:hover':{ color:'#ccc' } }}/>
                    </Box>
                    <Box sx={{ display:'flex', flexDirection:'column', justifyContent:'center', padding:'15px 20px' }}>
                      {/* {console.log(description)} */}
                      <TextField multiline rows={8} onChange={(e) => setDescription(e.target.value)} size='small' value={description}/>
                      <Button disabled={!buttonSubmit} onClick={handleUpdateCardDescriptionSubmit} sx={{ mt:'10px', flex:'2', marginLeft:'5px', color:'white', bgcolor:(theme) => theme.palette.primary[500], '&:hover':{ bgcolor:(theme) => theme.palette.primary[800] } }}>
                        {t('update')}
                      </Button>
                    </Box>
                  </Box>
                </Popover>
              </Box>
              <Box id='taskList-card' onClick={(event) => handleClick(event, 'taskList-card')} sx={{ backgroundColor:(theme) => theme.palette.primary[500], marginBottom:'10px', padding:'5px 5px', color:'white', borderRadius:'4px', '&:hover': { bgcolor:(theme) => theme.palette.primary[800], cursor:'pointer' } }}>
                <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center', cursor:'pointer', textAlign:'center' }}>{t('add_task')} <CheckBoxIcon sx={{ ml:'5px' }} /> </Box>
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
                      <Typography sx={{  ml:'10%', flex:'8', textAlign:'center' }}> {t('add_task')} </Typography>
                      <CloseIcon onClick={handleClosePopover} sx={{ flex:'2', cursor:'pointer', borderRadius:'50%', '&:hover':{ color:'#ccc' } }}/>
                    </Box>
                    <Box sx={{ display:'flex', justifyContent:'center', padding:'15px 20px' }}>
                      <TextField onChange={(e) => setTask(e.target.value)} size='small' value={task}/>
                      <Button onClick={handleAddTaskSubmit} sx={{ flex:'2', marginLeft:'5px', color:'white', bgcolor:(theme) => theme.palette.primary[500], '&:hover':{ bgcolor:(theme) => theme.palette.primary[800] } }}>
                        {t('add')}
                      </Button>
                    </Box>
                  </Box>
                </Popover>
              </Box>
              {ownerBoard && (
                <Box onClick={handleDeleteCardSubmit} sx={{ backgroundColor:(theme) => theme.palette.primary[500], display:'flex', justifyContent:'center', alignItems:'center', textAlign:'center', marginBottom:'10px', padding:'5px 5px', color:'white', borderRadius:'4px', '&:hover': { bgcolor:(theme) => theme.palette.primary[800], cursor:'pointer' } }}>
                  {t('delete_card')}
                  <DeleteIcon sx={{ ml:'5px' }} />
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
      </Box>
    </Dialog>
  )
}

export default CardDetail