import { Avatar, Box, Button, Checkbox, IconButton, Popover, TextField, Typography } from '@mui/material'
import MemberAssign from '../Member/MemberAssign'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { removeTaskCardAPI, updateTaskAssignCardAPI, updateTaskCardAPI } from '~/apis'
import { removeTaskCardAction, updateTaskCardAssignAction, updateTaskListCardAction } from '~/redux/actions/boardAction'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { useConfirm } from 'material-ui-confirm'


function TaskList({ task, isMembersInCard, ownerBoard,card }) {
  const dispatch = useDispatch()
  const [userTaskEl, setUserTaskEl] = useState(null)
  const [usernameFilter, setUsernameFilter] = useState('')
  const confirmDeleteTask = useConfirm()

  const handleTaskList = (taskId, taskStatus) => {
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
      title:'Delete task',
      content:'Are you sure you want to delete this task',
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
  return (
    <Box key={task._id} sx={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
      <Box >
        <Checkbox onChange={(event) => handleTaskList(task._id, task.taskStatus, event)} checked={task.taskStatus} sx={{ color:'#ccc' }} />
      </Box>
      <Box sx={{ display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%' }}>
        <Typography> {task.taskName} </Typography>
        {(isMembersInCard || ownerBoard) && (
          <Box>
            <>
              <IconButton>
                <AccessTimeIcon />
              </IconButton>
            </>
            <>
              <IconButton aria-describedby='userTaskEl' onClick={(e) => {handlePopOverUserTask(e)}}>
                {getUserAssign(task.userId) ? <> <Avatar src={getUserAssign(task.userId).avatar} sx={{ width:'24px', height:'24px' }} /> </> : <PersonAddIcon />}
              </IconButton>
              <Popover id='userTaskEl' open={Boolean(userTaskEl)} anchorEl={userTaskEl} onClose={handleCloseUserTask}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
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
                    <Typography sx={{ width:'90%', textAlign:'center' }}>Assign</Typography>
                    <IconButton onClick={handleCloseUserTask}> <CloseIcon /> </IconButton>
                  </Box>
                  <Box sx={{ p:'10px 10px' }}>
                    <Box>
                      <TextField onChange={(e) => {setUsernameFilter(e.target.value)}} size='small' sx={{ width:'100%', pb:'10px' }}/>
                    </Box>
                    <Typography>Card members</Typography>
                    <Box sx={{ minHeight:'90px', overflow:'auto' }}>
                      {filterMemberAssign.map((member, index) => {
                        return (
                          <MemberAssign key={index} card={card} task={task} taskId={task._id} member={member} userAssignId={task.userId} />
                        )
                      })}
                    </Box>
                    <Box>
                      <Button onClick={() => {updateRemoveAssignTask(task._id, task.taskStatus)}} sx={{ width:'100%', bgcolor:(theme) => theme.palette.primary.main, color:'white', mt:'10px', '&:hover':{ bgcolor:(theme) => theme.palette.primary[700] } }}>Remove member</Button>
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