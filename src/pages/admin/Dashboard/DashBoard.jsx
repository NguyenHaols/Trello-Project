import { Box, CircularProgress } from '@mui/material'
import DashBoardItems from './DashBoardItems.jsx/DashBoardItems'
import DashBoardChart from './DashBoardChart/DashBoardChart'
import { useEffect, useState } from 'react'
import { getActivityPercentOnMonthApi, getAllReportAPI, getCountOnMonthApi, getUserPercentOnMonthApi, getWorkspacePercentOnMonthApi } from '~/apis'

function DashBoard() {
  const [workspaceItemData, setWorkspaceItemData] = useState(null)
  const [userItemData, setUserItemData] = useState(null)
  const [activityItemData, setactivityItemData] = useState(null)
  const [workspaceCountMonth, setWorkspaceCountMonth] = useState(null)
  const [reports, setReports] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [workspaceResponse, userResponse, activityResponse, countOnMonthResponse, allReportResponse] = await Promise.all([
          getWorkspacePercentOnMonthApi(),
          getUserPercentOnMonthApi(),
          getActivityPercentOnMonthApi(),
          getCountOnMonthApi(),
          getAllReportAPI()
        ])

        setWorkspaceItemData(workspaceResponse.data)
        setUserItemData(userResponse.data)
        setactivityItemData(activityResponse.data)
        setWorkspaceCountMonth(countOnMonthResponse.data)
        setReports(allReportResponse.data.length)
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
      <DashBoardItems workspaceItemData={workspaceItemData} userItemData={userItemData} activityItemData={activityItemData} reports={reports} />
      <DashBoardChart workspaceCountMonth={workspaceCountMonth} />
    </Box>
  )
}

export default DashBoard