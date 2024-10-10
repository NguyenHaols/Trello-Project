
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUser } from '~/apis'

export const UserDataContext = createContext(null)
