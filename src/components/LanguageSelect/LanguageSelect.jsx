import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import i18n from '~/translation/i18'
import GTranslateIcon from '@mui/icons-material/GTranslate'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLanguageAction } from '~/redux/actions/languageAction'
import { useTranslation } from 'react-i18next'

function LanguageSelect() {
  const dispatch = useDispatch()
  const {language} = useSelector(state => state.language)

  const [open, setOpen] = useState(false)
  const {t} = useTranslation()
  const handleLanguageChange = (e) => {
    const value = e.target.value
    i18n.changeLanguage(value)
    const action = setLanguageAction(value)
    dispatch(action)
    setOpen(false)
  }

  const handleClick = () => {
    setOpen(!open) // Toggle mở/đóng Select khi click vào FormControl
  }


  return (
    <FormControl onClick={handleClick} sx={{ m: 1, minWidth: 138, display:['none', 'block'] }} size="small">
      <InputLabel
        id="language-select"
        sx={{
          color:(theme) => theme.palette.text.primary,
          '&.Mui-focused':{
            color : (theme) => theme.palette.text.primary
          }
        }}
      >
        {t('language')}
      </InputLabel>

      <Select
        labelId="language-select"
        id="slect-change-lange"
        value={language}
        label="language"
        onChange={handleLanguageChange}
        sx={{
          color:'',
          '.MuiOutlinedInput-notchedOutline':{ borderColor:'' },
          '&:hover .MuiOutlinedInput-notchedOutline':{ borderColor:'' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline':{ borderColor:'' },
          '.MuiSvgIcon-root': { color:'' }
        }}
        open={open}
        onClose={handleClick}
      >

        <MenuItem value={'en'}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        EngLish <GTranslateIcon />
          </Box>
        </MenuItem>

        <MenuItem value={'vi'}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        Việt Nam <GTranslateIcon />
          </Box>
        </MenuItem>

      </Select>
    </FormControl>
  )

}

export default LanguageSelect
