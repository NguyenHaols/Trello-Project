import Board from '~/pages/Boards/Boards'
import {RouterProvider,createBrowserRouter } from 'react-router-dom'
import DefaultLayout from './components/Layout/DefaultLayout/DefaultLayout'
import DashBoardContent from './pages/Home/DashBoardContent/DashBoardContent'
import HomeContent from './pages/Home/HomeContent/HomeContent'
import WorkspaceContent from './pages/Home/WorkspaceContent/WorkspaceContent'
import Auth from './pages/Auth/Auth'
import Login from './pages/Auth/Login/Login'
import Register from './pages/Auth/Register/Register'
import Forgot from './pages/Auth/Forgot/Forgot'
import AppBarOnlyLayout from './components/Layout/AppBarOnlyLayout/AppBarOnlyLayout'

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
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
