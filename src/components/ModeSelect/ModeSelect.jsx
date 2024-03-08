import { useColorScheme } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import Box from '@mui/material/Box'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    const selectedMode = event.target.value
    setMode(selectedMode)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel 
        id="lable-dark-light-mode"
        sx={{
          color:'white',
          '&.Mui-focused':{
            color : 'white'
          }
        }}
      >
        Mode
      </InputLabel>

      <Select
        labelId="lable-dark-light-mode"
        id="dark-light-mode"
        value={mode}
        label="mode"
        onChange={handleChange}
        sx={{
          color:'white',
          '.MuiOutlinedInput-notchedOutline':{borderColor:'white'},
          '&:hover .MuiOutlinedInput-notchedOutline':{borderColor:'white'},
          '&.Mui-focused .MuiOutlinedInput-notchedOutline':{borderColor:'white'},
          '.MuiSvgIcon-root': {color:'white'}

        }}
      >

        <MenuItem value={'light'}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        Light <LightModeIcon />
          </Box>
        </MenuItem>

        <MenuItem value={'dark'}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        Dark <DarkModeIcon />
          </Box>
        </MenuItem>

        <MenuItem value={'system'}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        System <SettingsBrightnessIcon />
          </Box>
        </MenuItem>

      </Select>
    </FormControl>
  )

}

export default ModeSelect
