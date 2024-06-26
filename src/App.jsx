import Board from '~/pages/Boards/Boards'
import {RouterProvider,createBrowserRouter } from 'react-router-dom'
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
          element:<WorkspaceContent />
        }
      ]
    },
    {
      path:'board/:id',
      element:<AppBarOnlyLayout/>,
      children:[
        {
          path:'',
          element:<Board/>
        }
      ]
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
      ]
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
          path:'recover',
          element: <RecoverPassword/>
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
