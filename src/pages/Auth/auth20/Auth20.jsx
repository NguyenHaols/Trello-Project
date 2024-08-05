import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function Auth20() {
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    const token = window.location.pathname.split('/').pop()
    if (token) {
      localStorage.setItem('accessToken', token)
      navigate('/')
    } else {
      navigate('/auth/login')
    }
  }, [location, navigate])
  return (
    <>
        Đang xác thực
    </>
  )
}

export default Auth20