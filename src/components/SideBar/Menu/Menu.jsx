import Button from '@mui/material/Button'
import SvgIcon from '@mui/material/SvgIcon'
import { Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import { useContext, useState } from 'react'
import { ReactComponent as trelloIcon } from '~/assets/trello.svg'
import { Link } from 'react-router-dom'
import style from '~/CSS/CSSGlobal.module.scss'
import { ActiveContextBtn } from '~/Contexts/Context'

function Menu() {
  const {activeBtn, setActiveBtn} = useContext(ActiveContextBtn)

  const handleButtonClick = (btnName) => {
    setActiveBtn(btnName)
  }
  return (
    <>
      <Link className={style['a-none']} to='/boards'>
        <Button
          onClick={ () => handleButtonClick('board')}
          sx={{
            color:(theme) => theme.palette.text.primary,
            width: '100%',
            display:'flex',
            marginBottom:'10px',
            justifyContent:'left',
            bgcolor: (theme) => activeBtn === 'board' ? theme.trello.btnBackground : 'transparent',
            border:'none',
            '&:hover':{ bgcolor:(theme) => theme.palette.primary[300]}
          }}

        >
          <SvgIcon component={trelloIcon} inheritViewBox sx={{ color:(theme) => theme.palette.text.primary }} />
          <Typography sx={{ marginLeft:'10px' }}>  Boards </Typography>

        </Button>
      </Link>

      <Link className={style['a-none']} to='/home'>
        <Button
          onClick={() => handleButtonClick('home')}
          sx={{
            color:(theme) => theme.palette.text.primary,
            width: '100%',
            display:'flex',
            justifyContent:'left',
            bgcolor: (theme) => activeBtn === 'home' ? theme.trello.btnBackground : 'transparent',
            borderBottom:'none',
            '&:hover':{ bgcolor:(theme) => theme.palette.primary[300]}

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