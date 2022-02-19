import React, { MouseEventHandler, ReactNode } from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'

interface NavbarProps {
  drawerWidth: number
  children: ReactNode
  onDrawerToggle: MouseEventHandler<HTMLButtonElement>
}

const Navbar = ({
  children,
  drawerWidth,
  onDrawerToggle,
}: NavbarProps): JSX.Element => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        color="inherit"
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          borderBottom: 1,
          borderColor: (theme) => theme.palette.grey['200'],
        }}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {children}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
