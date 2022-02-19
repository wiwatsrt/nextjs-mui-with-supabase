import React, { ReactNode } from 'react'
import Head from 'next/head'
import AccountMenu from './AccountMenu'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import SidebarMenu from './SidebarMenu'
// MUI
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'

interface AppLayoutProps {
  children?: ReactNode
  pageHeader?: string
  title?: string
  disablePadding?: boolean
}

const drawerWidth = 280
const appName = process.env.NEXT_PUBLIC_APP_NAME

export const AppLayout = ({
  children,
  pageHeader,
  title,
  disablePadding,
}: AppLayoutProps): JSX.Element => {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar drawerWidth={drawerWidth} onDrawerToggle={handleDrawerToggle}>
        <Box sx={{ flexGrow: 1 }}>
          {pageHeader && <Typography variant="h6">{pageHeader}</Typography>}
        </Box>
        <AccountMenu />
      </Navbar>
      <Box sx={{ display: 'flex' }}>
        <Sidebar
          headerTitle={appName}
          drawerWidth={drawerWidth}
          isMobileOpen={mobileOpen}
          onDrawerToggle={handleDrawerToggle}
        >
          <SidebarMenu />
        </Sidebar>
        <Box
          component="main"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            p: !disablePadding ? 3 : 0,
            backgroundColor: 'grey.100',
            minHeight: '100vh',
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </>
  )
}

interface sectionTitleProps {
  title: string
  description?: string
  toolbar?: JSX.Element
}

const SectionTitle = ({ title, description, toolbar }: sectionTitleProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        marginBottom: 3,
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="h3">
          {title}
        </Typography>
        {description && (
          <Typography variant="subtitle2">{description}</Typography>
        )}
      </Box>
      {toolbar}
    </Box>
  )
}

AppLayout.SectionTitle = SectionTitle
