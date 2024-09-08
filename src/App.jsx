import Board from '~/pages/Boards/Boards'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import DefaultLayout from './components/Layout/DefaultLayout/DefaultLayout'
import DashBoardContent from './pages/Home/DashBoardContent/DashBoardContent'
import WorkspaceContent from './pages/Home/WorkspaceContent/WorkspaceContent'
import Auth from './pages/Auth/Auth'
import Login from './pages/Auth/Login/Login'
import Register from './pages/Auth/Register/Register'
import RecoverPassword from './pages/Auth/RecoverPassword/RecoverPassword'
import Forgot from './pages/Auth/Forgot/Forgot'
import AppBarOnlyLayout from './components/Layout/AppBarOnlyLayout/AppBarOnlyLayout'
import Settings from './pages/Home/WorkspaceContent/Settings/Settings'
import UserProfile from './pages/User/UserProfile/UserProfile'
import ChangePassword from './pages/User/ChangePassword/ChangePassword'
import ErrorPage from './pages/Error/ErrorPage'
import Auth20 from './pages/Auth/auth20/Auth20'
import MemberPage from './pages/Home/WorkspaceContent/Members/MemberPage'
import Boards from './pages/Home/WorkspaceContent/Boards/Boards'
import { Box } from '@mui/material'
import AuthAdmin from './pages/admin/Auth/AuthAdmin'
import LoginAdmin from './pages/admin/Auth/Login/LoginAdmin'
import { Navigate } from 'react-router-dom'
import AdminLayOut from './pages/admin/Layout/AdminLayout'
import DashBoard from './pages/admin/Dashboard/DashBoard'
import UserManagerMent from './pages/admin/UserManagerment/UserManagerment'

function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element: <DefaultLayout/>,
      children: [
        {
          path:'',
          element: <DashBoardContent/>
        },
        {
          path:'boards',
          element: <DashBoardContent/>
        },
        {
          path:'workspace/:id',
          element:<WorkspaceContent />,
          errorElement: <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center' }}> You are no longer a member of this workspace </Box>,
          children: [
            {
              path:'boards',
              element: <Boards />
            },
            {
              path:'members',
              element: <MemberPage />
            },
            {
              path:'settings',
              element: <Settings />
            }
          ]
        }
      ],
      errorElement: <ErrorPage />
    },
    {
      path:'board/:id',
      element:<AppBarOnlyLayout/>,
      children:[
        {
          path:'',
          element:<Board/>
        }
      ],
      errorElement: <ErrorPage />
    },
    {
      path:'profile',
      element:<AppBarOnlyLayout/>,
      children:[
        {
          path:'',
          element:<UserProfile/>
        },
        {
          path:'changePassword',
          element:<ChangePassword/>
        }
      ],
      errorElement: <ErrorPage />
    },
    {
      path:'auth',
      element:<Auth/>,
      children:[
        {
          path:'',
          element:<Login/>
        },
        {
          path:'login',
          element:<Login/>
        },
        {
          path:'register',
          element:<Register />
        },
        {
          path:'forgot',
          element:<Forgot />
        },
        {
          path:'recover/:token',
          element: <RecoverPassword/>
        },
        {
          path:'login-success/:token',
          element: <Auth20 />
        }
      ]
    },
    {
      path:'admin',
      element: <AdminLayOut />,
      children:[
        {
          path:'',
          element: <Navigate to='dashboard' replace />
        },
        {
          path:'dashboard',
          element: <DashBoard />
        },
        {
          path:'user',
          element: <UserManagerMent />
        },
        {
          path:'workspace',
          element: <div> user </div>
        },
        {
          path:'report',
          element: <div> user </div>
        }
      ]
    },
    {
      path:'admin/auth',
      element:<AuthAdmin/>,
      children: [
        {
          path: '',
          element: <Navigate to='login' replace />
        },
        {
          path: 'login',
          element: <LoginAdmin />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
