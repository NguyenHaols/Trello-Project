import Button from '@mui/material/Button'
import SvgIcon from '@mui/material/SvgIcon'
import { Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import { useState } from 'react'
import { ReactComponent as trelloIcon } from '~/assets/trello.svg'
import { Link } from 'react-router-dom'
import style from '~/CSS/CSSGlobal.module.scss'

function Menu() {
  const [activeButton, setAtiveButton] = useState('home')

  const handleButtonClick = (btnName) => {
    setAtiveButton(btnName)
  }
  return (
    <>
      <Link className={style['a-none']} to='/board'>
        <Button
          onClick={ () => handleButtonClick('board')}
          sx={{
            color:'white',
            width: '100%',
            display:'flex',
            marginBottom:'10px',
            justifyContent:'left',
            bgcolor: activeButton === 'board' ? 'primary.main' : 'transparent',
            border:'none',
            '&:hover':{ bgcolor:'primary.main' }
          }}

        >
          <SvgIcon component={trelloIcon} inheritViewBox sx={{ color:'white' }} />
          <Typography sx={{ marginLeft:'10px' }}>  Board </Typography>

        </Button>
      </Link>

      <Link className={style['a-none']} to='/home'>
        <Button
          onClick={() => handleButtonClick('home')}
          sx={{
            color:'white',
            width: '100%',
            display:'flex',
            justifyContent:'left',
            bgcolor: activeButton === 'home' ? 'primary.main' : 'transparent',
            border:'none',
            '&:hover':{ bgcolor:'primary.main' }

          }}
        >
          <HomeIcon />
          <Typography sx={{ marginLeft:'10px' }}>  Home </Typography>
        </Button>
      </Link>
    </>
  )
}

export default Menu