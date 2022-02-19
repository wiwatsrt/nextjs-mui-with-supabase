import React from 'react'
import { AppLayout } from '@/components/Layouts'
import { withAuth } from '@/hooks/auth/withAuth'
import Typography from '@mui/material/Typography'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DashboardProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Dashboard = (props: DashboardProps) => {
  return (
    <AppLayout title="Dashboard">
      <Typography variant="h5" component="h3">
        Dashboard
      </Typography>
    </AppLayout>
  )
}

export default withAuth(Dashboard)
