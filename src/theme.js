// import { teal, deepOrange, cyan, orange } from '@mui/material/colors'
import { BorderColor } from '@mui/icons-material'
import { blue, common, cyan, deepOrange, grey, orange, teal } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '68px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`

// eslint-disable-next-line no-undef

const theme = extendTheme({
  trello:{
    appBarHight : APP_BAR_HEIGHT,
    boardBarHight : BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    COLUMN_HEADER_HEIGHT : '50px',
    COLUMN_FOOTER_HEIGHT : '65px',
    // backgroundLight : 'radial-gradient(circle at 10% 20%, rgb(0, 102, 161) 0%, rgb(0, 68, 108) 100%)',
    backgroundLight : 'white',
    backgroundDark: 'linear-gradient(109.6deg, rgb(20, 30, 48) 11.2%, rgb(36, 59, 85) 91.1%)',
    btnBackground: '#ffffff3d',
    btnBackgroundHover:'#9393933d',
    iconColor:'#fff',
    mainTextColor:'#fff'
  },
  colorSchemes: {
    light: {
      palette: {
        primary:grey,
        secondary:blue,
        text: {
          primary:grey[800]
        }
      }
    },
    dark: {
      palette: {
        text: {
          primary:grey[50]
        }
      }
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform:'none',
          borderWidth:'0.5px',
          '&:hover':{
            borderWidth:'0.5px'
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            fontSize:'0.875rem',
            '& fieldset':{
              borderWidth : '0.5px !important',
            },
            '&:hover fieldset':{
              borderColor:'white',
              borderWidth : '1px !important'
            },
            '&.Mui-focused fieldset':{
              borderColor: '#ccc !important',
              borderWidth : '1px !important',
            }
          }
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body:{
          '*::-webkit-scrollbar':{
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb':{
            backgroundColor:'#bdc3c7',
            borderRadius: '8px'
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          // color: theme.palette.primary.main,
          fontSize:'0.875rem'
        })
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-body1':{fontSize:'0.875rem'}
        }
      }
    }


  }

})

export default theme
