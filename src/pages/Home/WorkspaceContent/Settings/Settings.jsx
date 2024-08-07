import { Box, Button, Typography } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import PublicIcon from '@mui/icons-material/Public'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import TitleSetting from '../Title/TitleSetting'
import { deleteWorkspaceAPI } from '~/apis'
import { removeWorkspaceAction } from '~/redux/actions/userAction'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'
import { useNavigate } from 'react-router-dom'


function Settings({ workspace }) {
  const dispatch = useDispatch()
  const confirmDeleteWorkspace = useConfirm()
  const navigate = useNavigate()
  const handleDeleteWorkspace = () => {


    confirmDeleteWorkspace({
      title:'Delete workspace',
      content:'Are you sure you want to delete this workspace ?'
    })
      .then( () => {
        navigate('/')
        deleteWorkspaceAPI({ _id:workspace._id })
          .then( () => {
            const action = removeWorkspaceAction(workspace._id)
            dispatch(action)
            toast.success('Delete successfully')
          } )
      })
      .catch( () => {})

  }
  return (
    <>
      <TitleSetting />
      {/* <Box sx={{ marginTop:'15px' }}>
        <Typography variant='h7' color={(theme) => theme.palette.text.primary} >Workspace visibility :</Typography>
        <Box>
          {workspace.type === 'Private' ?
            <Box sx={{ display:'flex', justifyContent:'space-between' }}>
              <Typography variant='subtitle2' color={(theme) => theme.palette.text.primary} display='flex' marginTop='5px'>
                <LockIcon sx={{ width:'18px', height:'22px', marginRight:'5px' }}/>
                Private - This Workspace is private.It&apos;s not indexed or visible to those outside the Workspace.
              </Typography>

              <Button sx={{
                width:'115px',
                minWidth:'115px',
                height:'32px',
                background:(theme) => theme.trello.btnBackground,
                color:(theme) => theme.palette.text.primary,
                '&:hover':{ backgroundColor:(theme) => theme.trello.btnBackgroundHover }
              }}>Change</Button>

            </Box> :
            <Box sx={{ display:'flex', justifyContent:'space-between' }}>
              <Typography variant='subtitle2' color={(theme) => theme.palette.text.primary} display='flex' marginTop='5px'>
                <PublicIcon sx={{ width:'18px', height:'22px', marginRight:'5px' }}/>
                Public - This Workspace is public. It&apos;s visible to anyone with the link or invited.
              </Typography>
              <Button sx={{
                width:'115px',
                minWidth:'115px',
                height:'32px',
                background:(theme) => theme.palette.primary[500],
                color:'white',
                '&:hover':{ backgroundColor:(theme) => theme.palette.primary[800] }
              }}>Change</Button>
            </Box>
          }

        </Box>
      </Box> */}
      <Box sx={{ marginTop:'15px' }}>
        <Typography variant='h7' color={(theme) => theme.palette.text.primary} >Workspace destroy </Typography>
        <Typography onClick={handleDeleteWorkspace} sx={{
          cursor:'pointer',
          '&:hover':{ color:'#bb2124' }
        }} variant='subtitle2' color={(theme) => theme.palette.text.primary} display='flex' marginTop='5px'>
          <DeleteOutlineIcon sx={{ width:'18px', height:'22px', marginRight:'5px' }}/>
          Delete this workspace ?
        </Typography>
      </Box>
    </>
  )
}

export default Settings