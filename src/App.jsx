import Board from '~/pages/Boards/Boards'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import DefaultLayout from './components/Layout/DefaultLayout/DefaultLayout'
import DashBoardContent from './pages/Home/DashBoardContent/DashBoardContent'
import HomeContent from './pages/Home/HomeContent/HomeContent'
import WorkspaceContent from './pages/Home/WorkspaceContent/WorkspaceContent'
import Auth from './pages/Auth/Auth'
import Login from './pages/Auth/Login/Login'
import Register from './pages/Auth/Register/Register'
import RecoverPassword from './pages/Auth/RecoverPassword/RecoverPassword'
import Forgot from './pages/Auth/Forgot/Forgot'
import AppBarOnlyLayout from './components/Layout/AppBarOnlyLayout/AppBarOnlyLayout'
import Members from './pages/Home/WorkspaceContent/Members/Member'
import Settings from './pages/Home/WorkspaceContent/Settings/Settings'
import UserProfile from './pages/User/UserProfile/UserProfile'
import ChangePassword from './pages/User/ChangePassword/ChangePassword'
import ErrorPage from './pages/Error/ErrorPage'
import Auth20 from './pages/Auth/auth20/Auth20'

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
          path:'home',
          element: <HomeContent/>
        },
        {
          path:'workspace/:id',
          element:<WorkspaceContent />,
          errorElement: <ErrorPage />
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
    }
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
