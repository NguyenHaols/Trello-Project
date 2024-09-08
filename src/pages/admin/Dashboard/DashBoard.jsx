import { Box, CircularProgress } from '@mui/material'
import DashBoardItems from './DashBoardItems.jsx/DashBoardItems'
import DashBoardChart from './DashBoardChart/DashBoardChart'
import { useEffect, useState } from 'react'
import { getActivityPercentOnMonthApi, getCountOnMonthApi, getUserPercentOnMonthApi, getWorkspacePercentOnMonthApi } from '~/apis'

function DashBoard() {
  const [workspaceItemData, setWorkspaceItemData] = useState(null)
  const [userItemData, setUserItemData] = useState(null)
  const [activityItemData, setactivityItemData] = useState(null)
  const [workspaceCountMonth, setWorkspaceCountMonth] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [workspaceResponse, userResponse, activityResponse, countOnMonthResponse] = await Promise.all([
          getWorkspacePercentOnMonthApi(),
          getUserPercentOnMonthApi(),
          getActivityPercentOnMonthApi(),
          getCountOnMonthApi()
        ])

        setWorkspaceItemData(workspaceResponse.data)
        setUserItemData(userResponse.data)
        setactivityItemData(activityResponse.data)
        setWorkspaceCountMonth(countOnMonthResponse.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <Box sx={{ height:'100vh', display: 'flex', justifyContent:'center', alignItems:'center' }}>
        <CircularProgress />
      </Box>
    )
  }
  return (
    <Box >
      <DashBoardItems workspaceItemData={workspaceItemData} userItemData={userItemData} activityItemData={activityItemData} />
      <DashBoardChart workspaceCountMonth={workspaceCountMonth} />
    </Box>
  )
}

export default DashBoard