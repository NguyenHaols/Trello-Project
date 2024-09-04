import Button from '@mui/material/Button'
import SvgIcon from '@mui/material/SvgIcon'
import { Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import { useContext, useState } from 'react'
import { ReactComponent as trelloIcon } from '~/assets/trello.svg'
import { Link } from 'react-router-dom'
import style from '~/CSS/CSSGlobal.module.scss'
import { ActiveContextBtn } from '~/Contexts/Context'
import { useTranslation } from 'react-i18next'

function Menu() {
  const {activeBtn, setActiveBtn} = useContext(ActiveContextBtn)
  const { t } = useTranslation()
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
            bgcolor: (theme) => activeBtn === 'board' ? '#ccc' : 'transparent',
            border:'none',
            '&:hover':{ bgcolor:(theme) => '#ccc'}
          }}

        >
          <SvgIcon component={trelloIcon} inheritViewBox sx={{ color:'#2196f3' }} />
          <Typography sx={{ marginLeft:'10px' }}>  {t('boards')} </Typography>

        </Button>
      </Link>

        {/* Chức năng new feed */}
      {/* <Link className={style['a-none']} to='/home'>
        <Button
          onClick={() => handleButtonClick('home')}
          sx={{
            color:(theme) => theme.palette.text.primary,
            width: '100%',
            display:'flex',
            justifyContent:'left',
            bgcolor: (theme) => activeBtn === 'home' ? '#ccc' : 'transparent',
            borderBottom:'none',
            '&:hover':{ bgcolor:(theme) => '#ccc'}

          }}
        >
          <HomeIcon sx={{color:'#f73378'}}/>
          <Typography sx={{ marginLeft:'10px' }}>  Home </Typography>
        </Button>
      </Link> */}
    </>
  )
}

export default Menu