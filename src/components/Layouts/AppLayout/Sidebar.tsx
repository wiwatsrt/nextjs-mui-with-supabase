import React, { MouseEventHandler, ReactNode } from 'react'
import { createTheme, ThemeProvider, Theme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

interface SidebarProps {
  children: ReactNode
  drawerWidth: number
  headerTitle?: string
  isMobileOpen: boolean
  onDrawerToggle: MouseEventHandler<HTMLButtonElement>
}

const Sidebar = ({
  headerTitle = 'App Name',
  children,
  drawerWidth,
  isMobileOpen,
  onDrawerToggle,
}: SidebarProps): JSX.Element => {
  const drawerContent = (
    <div>
      <Toolbar
        sx={{
          backgroundColor: (theme) => theme.palette.grey[900],
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
          }}
        >
          {headerTitle}
        </Typography>
      </Toolbar>
      {children}
    </div>
  )

  return (
    <ThemeProvider
      theme={(theme: Theme) =>
        createTheme({
          ...theme,
          palette: {
            mode: 'dark',
            background: {
              paper: theme.palette.grey[800],
            },
          },
          components: {
            MuiPaper: {
              styleOverrides: {
                root: {
                  '& .MuiToolbar-root': {
                    backgroundColor: theme.palette.grey[900],
                  },
                },
              },
            },
            MuiList: {
              styleOverrides: {
                root: {
                  paddingRight: '8px',
                  paddingLeft: '8px',
                },
              },
            },
            MuiListItemButton: {
              styleOverrides: {
                gutters: false,
                root: {
                  marginBottom: theme.spacing(0.8),
                  padding: theme.spacing(0.75, 1),
                  borderRadius: theme.shape.borderRadius,
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.grey[900],
                    '&:hover': {
                      backgroundColor: theme.palette.grey[900],
                    },
                  },
                  '&:hover': {
                    backgroundColor: theme.palette.grey[700],
                  },
                },
              },
            },
            MuiListItemIcon: {
              styleOverrides: {
                root: {
                  minWidth: '40px',
                },
              },
            },
            MuiListItemText: {
              styleOverrides: {
                root: {
                  '& .MuiTypography-body1': {
                    fontSize: '0.875rem',
                  },
                },
              },
            },
          },
        })
      }
    >
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={isMobileOpen}
          onClose={onDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundImage: 'none',
            },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>
    </ThemeProvider>
  )
}
export default Sidebar
