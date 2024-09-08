import { Box, Card, CardContent, CardHeader } from '@mui/material'
import { BarChart } from '@mui/x-charts'

function DashBoardChart({ workspaceCountMonth }) {
  const counts = workspaceCountMonth.map(item => item.count)
  return (
    <Box sx={{ mt:'20px' }}>
      <Card>
        <CardHeader title='NEW WORKSPACES' />
        <CardContent>
          <BarChart
            xAxis={[{ scaleType: 'band', label:'Month', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
            series={[{ data: counts, color:'#2196f3', borderRadius:'5px', barWidthRatio: 0.3 }]}
            height={300}
          />
        </CardContent>
      </Card>
    </Box>
  )
}

export default DashBoardChart