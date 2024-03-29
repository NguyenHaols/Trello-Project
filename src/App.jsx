import Board from '~/pages/Boards/_id'
import {RouterProvider,createBrowserRouter } from 'react-router-dom'
import DefaultLayout from './components/Layout/DefaultLayout/DefaultLayout'
import DashBoardContent from './pages/Home/DashBoardContent/DashBoardContent'
import HomeContent from './pages/Home/HomeContent/HomeContent'

function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element: <DefaultLayout/>,
      children: [
        {
          path:'board',
          element: <DashBoardContent/>
        },
        {
          path:'home',
          element: <HomeContent/>
        }
      ]
    },
    {
      path:'board/:id',
      element:<Board/>
    }
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
