import { useColorScheme } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import Box from '@mui/material/Box'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  const handleClick = () => {
    setOpen(!open) // Toggle mở/đóng Select khi click vào FormControl
  }

  const handleChange = (event) => {
    const selectedMode = event.target.value
    setMode(selectedMode)
  }

  return (
    <FormControl onClick={handleClick} sx={{ m: 1, minWidth: 110, display:['none', 'block'] }} size="small">
      <InputLabel
        id="lable-dark-light-mode"
        sx={{
          color:(theme) => theme.palette.text.primary,
          '&.Mui-focused':{
            color : (theme) => theme.palette.text.primary
          }
        }}
      >
        {t('mode')}
      </InputLabel>

      <Select
        labelId="lable-dark-light-mode"
        id="dark-light-mode"
        value={mode}
        label="mode"
        onChange={handleChange}
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

        <MenuItem value={'light'}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {t('light')} <LightModeIcon />
          </Box>
        </MenuItem>

        <MenuItem value={'dark'}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {t('dark')} <DarkModeIcon />
          </Box>
        </MenuItem>

        <MenuItem value={'system'}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {t('system')} <SettingsBrightnessIcon />
          </Box>
        </MenuItem>

      </Select>
    </FormControl>
  )

}

export default ModeSelect
