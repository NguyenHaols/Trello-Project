import { Box, Button, Typography } from '@mui/material'
import AttachmentIcon from '@mui/icons-material/Attachment'
import { useTheme } from '@emotion/react'
import { useConfirm } from 'material-ui-confirm'
import { removeAttachCardAPI } from '~/apis'
import { toast } from 'react-toastify'
import { removeAttachCardAction } from '~/redux/actions/boardAction'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

function Attachment({ ownerBoard, attach, card }) {
  const theme = useTheme()
  const dispath = useDispatch()
  const textColor = theme.palette.text.primary
  const mainColor = theme.palette.primary.main
  const addedDate = new Date(attach.addedAt)
  const removeAttachConfirm = useConfirm()
  const {t} = useTranslation()

  const deleteAttach = (e) => {
    e.preventDefault()
    removeAttachConfirm({
      title:'Remove attach',
      content:'Are you sure you want to remove this attach',
      dialogProps:{ maxWidth:'xs', sx:{ zIndex:5000 } }
    })
      .then(() => {
        const data = {
          cardId: card._id,
          attachId: attach._id
        }
        removeAttachCardAPI(data)
          .then(res => {
            toast.success('Remove attach success')
            const action = removeAttachCardAction(card._id, attach._id)
            dispath(action)
          })
      })
      .catch(() => {})
  }

  return (
    <Box sx={{ paddingLeft:'25px' }}>
      <Button sx={{
        width:'100%',
        height:'84px'
      }}>
        <a href={attach.url} style={{ display:'flex', width:'100%', height:'100%', textDecoration:'none' }}>
          <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center', flex:1, height:'100%', bgcolor:'#ccc', mr:'15px' }}> <b style={{ fontSize:'16px', color:textColor }}>{attach.fileExtension}</b> </Box>
          <Box sx={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-evenly',
            flex:3
          }}>
            <Box sx={{ display:'flex', alignItems:'center' }}>
              {/* <Typography variant='h7' fontWeight='800' color={textColor} width='70px' pr='5px' textAlign='left'>File Name</Typography> */}
              <Typography variant='h7' fontWeight='800' color={textColor} overflow='hidden' textOverflow='ellipsis'>{attach.filename}</Typography>
            </Box>
            <Box sx={{ display:'flex', alignItems:'center' }}>
              <Typography fontStyle='italic' variant='h7' fontWeight='800' color={textColor} width='75px' pr='5px' textAlign='left'> {t('added_at')} </Typography>
              <Typography fontStyle='italic' variant='h7' fontWeight='800' color={textColor}>: {`${addedDate.getDay()}-${addedDate.getMonth()}-${addedDate.getFullYear()}`}</Typography>
            </Box>
            {ownerBoard && (
              <Box sx={{ textAlign:'left' }}>
                <Button onClick={deleteAttach} sx={{ fontWeight:'800', color:mainColor, p:'0' }}> {t('delete')} </Button>
              </Box>
            )}
          </Box>

        </a>
      </Button>
    </Box>
  )
}

export default Attachment