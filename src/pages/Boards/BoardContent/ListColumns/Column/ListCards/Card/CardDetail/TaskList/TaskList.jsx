import { Avatar, Box, Button, Checkbox, IconButton, Popover, TextField, Tooltip, Typography } from '@mui/material'
import MemberAssign from '../Member/MemberAssign'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { removeTaskCardAPI, updateTaskAssignCardAPI, updateTaskCardAPI, updateTaskTimeCardAPI } from '~/apis'
import { removeTaskCardAction, updateTaskCardAssignAction, updateTaskDeadlineCardAction, updateTaskListCardAction } from '~/redux/actions/boardAction'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { useConfirm } from 'material-ui-confirm'
import Datepicker from 'react-datepicker'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

function TaskList({ task, isMembersInCard, ownerBoard, card }) {
  const dispatch = useDispatch()
  const [userTaskEl, setUserTaskEl] = useState(null)
  const [timeTaskEl, setTimeTaskEl] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [usernameFilter, setUsernameFilter] = useState('')
  const confirmDeleteTask = useConfirm()
  const { t } = useTranslation()

  const handleTaskList = (taskId, taskStatus) => {

    if ( !(isMembersInCard || ownerBoard)) {
      return toast.info(`${t('you_dont_have_permission_to_check_task')}`)
    }

    const data = {
      cardId: card._id,
      taskId : taskId,
      taskStatus: !taskStatus
    }
    updateTaskCardAPI(data)
      .then(res => {
        const action = updateTaskListCardAction(card._id, taskId, taskStatus)
        dispatch(action)
      })
  }

  const handlePopOverUserTask = (e) => {
    setUserTaskEl(e.currentTarget)
  }

  const handleCloseUserTask = () => {
    setUserTaskEl(null)
  }

  const handlePopOverTimeTask = (e) => {
    setTimeTaskEl(e.currentTarget)
  }

  const handleCloseTimeTask = () => {
    setTimeTaskEl(null)
  }

  const getUserAssign = (userId) => {
    return card.members.find(member => member._id.toString() === userId)
  }

  const filterMemberAssign = card.members.filter(member => {

    if (member.email.toLowerCase().includes(usernameFilter.toLowerCase())) {
      return member
    }
  })

  const updateRemoveAssignTask = (taskId, taskStatus) => {
    const data = {
      taskId,
      taskStatus,
      cardId: card._id,
      userId: null
    }
    updateTaskAssignCardAPI(data)
      .then(() => {
        const action = updateTaskCardAssignAction(card._id, taskId, '')
        dispatch(action)
        // console.log(card.tasks)
      })
  }

  const handleRemoveTask = (cardId, taskId) => {
    const data = {
      cardId,
      taskId
    }
    confirmDeleteTask({
      title: t('delete_task'),
      content:t('are_you_sure_you_want_to_delete_this_task'),
      confirmationText:t('confirm'),
      cancellationText:t('cancel'),
      dialogProps: {
        sx:{ zIndex:1500 }
      }
    })
      .then(() => {
        removeTaskCardAPI(data)
          .then(res => {
            const action = removeTaskCardAction(cardId, taskId)
            dispatch(action)
          })
      })
  }

  const handleCaculateColorTimeTask = (deadline) => {
    const date = new Date(deadline)
    const dateNow = new Date()

    return date.getTime() < dateNow.getTime() ? '#cc3300' : '#99cc33'
  }

  const handleUpdateTaskTime = (taskId) => {
    const data = {
      cardId: card._id,
      taskId: taskId,
      deadline: selectedDate
    }
    updateTaskTimeCardAPI(data)
      .then((res) => {
        const action = updateTaskDeadlineCardAction(card._id, taskId, selectedDate)
        dispatch(action)
        handleCloseTimeTask()
        toast.success(`${t('update_deadline_task_success')}`)
      })
  }

  const handleRemoveTaskTime = (taskId) => {
    const data = {
      cardId: card._id,
      taskId: taskId,
      deadline: null
    }
    updateTaskTimeCardAPI(data)
      .then((res) => {
        const action = updateTaskDeadlineCardAction(card._id, taskId, null)
        dispatch(action)
        handleCloseTimeTask()
        toast.success(`${t('remove_deadline_task_success')}`)
      })
  }

  return (
    <Box key={task._id} sx={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
      <Box >
        <Checkbox onChange={(event) => handleTaskList(task._id, task.taskStatus, event)} checked={task.taskStatus} sx={{ color:'#ccc' }} />
      </Box>
      <Box sx={{ display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%' }}>
        <Typography> {task.taskName} </Typography>
        {(isMembersInCard || ownerBoard) && (
          <Box sx={{ display:'flex', alignItems:'center' }}>
            <>
              {task?.deadline ? (
                <Box sx={{ '&:hover': { opacity:.8 }, cursor:'pointer' }} aria-describedby='timeTaskEl' onClick={(e) => {handlePopOverTimeTask(e)}}>
                  {task?.deadline
                    ?
                    (<Box sx={{ display:'flex', justifyContent:'center', alignItems:'center', color:'white', p:'5px 10px', minWidth:'68px', height:'24px', bgcolor:handleCaculateColorTimeTask(task.deadline), borderRadius:'14px' }}>
                      <AccessTimeIcon sx={{ mr:'5px', fontSize:'16px' }}/>
                      <Typography> {new Date(task.deadline).toLocaleDateString('vi', { day:'2-digit', month:'2-digit' })} </Typography>
                    </Box>)
                    :
                    (<AccessTimeIcon />)}
                </Box>
              ) : (
                <IconButton aria-describedby='timeTaskEl' onClick={(e) => {handlePopOverTimeTask(e)}}>
                  {task?.deadline
                    ?
                    (<Box sx={{ display:'flex', justifyContent:'center', alignItems:'center', p:'5px 10px', minWidth:'68px', height:'24px', bgcolor:handleCaculateColorTimeTask(task.deadline), borderRadius:'14px' }}>
                      <AccessTimeIcon sx={{ mr:'5px', fontSize:'16px' }}/>
                      <Typography> {new Date(task.deadline).toLocaleDateString('vi', { day:'2-digit', month:'2-digit' })} </Typography>
                    </Box>)
                    :
                    (<AccessTimeIcon />)}
                </IconButton>

              )}

              <Popover id='timeTaskEl' open={Boolean(timeTaskEl)} anchorEl={timeTaskEl} onClose={handleCloseTimeTask}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                sx={{
                  zIndex:1300,
                  '& .MuiPopover-paper' : {
                    boxShadow:'0px 4px 10px rgba(0, 0, 0, 0.2)'
                  }
                }}
              >
                <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <Typography sx={{ ml:'10%', width:'90%', textAlign:'center' }}> {t('change_deadline')} </Typography>
                  <IconButton onClick={handleCloseTimeTask}> <CloseIcon /> </IconButton>
                </Box>
                <Box sx={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'25px 30px' }}>
                  <Datepicker selected={task?.deadline} inline onChange={data => setSelectedDate(data)} popperPlacement='bottom-start'/>
                  <Button onClick={ () => handleUpdateTaskTime(task._id)} onChange={(data) => {setSelectedDate(data)}} sx={{ flex:'2', mt:'15px', marginLeft:'5px', color:'white', width:'100%', bgcolor:(theme) => theme.palette.primary[500], '&:hover':{ bgcolor:(theme) => theme.palette.primary[800] } }}>
                    {t('update')}
                  </Button>
                  <Button onClick={() => {handleRemoveTaskTime(task._id)}} sx={{ flex:'2', mt:'15px', marginLeft:'5px', color:'white', width:'100%', bgcolor:(theme) => theme.palette.primary[500], '&:hover':{ bgcolor:(theme) => theme.palette.primary[800] } }}>
                    {t('remove')}
                  </Button>
                </Box>
              </Popover>
            </>
            <>
              <IconButton aria-describedby='userTaskEl' onClick={(e) => {handlePopOverUserTask(e)}}>
                {getUserAssign(task.userId) ? <> <Avatar src={getUserAssign(task.userId).avatar} sx={{ width:'24px', height:'24px' }} /> </> : <PersonAddIcon />}
              </IconButton>
              <Popover id='userTaskEl' open={Boolean(userTaskEl)} anchorEl={userTaskEl} onClose={handleCloseUserTask}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                sx={{
                  zIndex:1300,
                  '& .MuiPopover-paper' : {
                    boxShadow:'0px 4px 10px rgba(0, 0, 0, 0.2)'
                  }
                }}
              >
                <Box sx={{
                  width:'304px', height:'270px'
                }}>
                  <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <Typography sx={{ ml:'10%', width:'90%', textAlign:'center' }}> {t('assign')} </Typography>
                    <IconButton onClick={handleCloseUserTask}> <CloseIcon /> </IconButton>
                  </Box>
                  <Box sx={{ p:'10px 10px' }}>
                    <Box>
                      <TextField placeholder={t('enter_email')} onChange={(e) => {setUsernameFilter(e.target.value)}} size='small' sx={{ width:'100%', pb:'10px' }}/>
                    </Box>
                    <Box sx={{ textAlign:'center' }}><Typography variant='caption'> {t('card_members')} </Typography></Box>
                    <Box sx={{ minHeight:'90px', overflow:'auto' }}>
                      {filterMemberAssign.map((member, index) => {
                        return (
                          <MemberAssign key={index} card={card} task={task} taskId={task._id} member={member} userAssignId={task.userId} />
                        )
                      })}
                    </Box>
                    <Box>
                      <Button onClick={() => {updateRemoveAssignTask(task._id, task.taskStatus)}} sx={{ width:'100%', bgcolor:(theme) => theme.palette.primary.main, color:'white', mt:'10px', '&:hover':{ bgcolor:(theme) => theme.palette.primary[700] } }}> {t('remove_member')} </Button>
                    </Box>
                  </Box>
                </Box>
              </Popover>
            </>
            <>
              <IconButton onClick={() => {handleRemoveTask(card._id, task._id)}}>
                <CloseIcon />
              </IconButton>
            </>
          </Box>
        )}
      </Box>


    </Box>
  )
}

export default TaskList