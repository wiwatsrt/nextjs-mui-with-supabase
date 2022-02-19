import React, { ReactNode } from 'react'
// Mui
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'

interface AuthLayoutProps {
  children?: ReactNode
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Box
      sx={{
        bgcolor: (theme) => theme.palette.grey[900],
        display: 'flex',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          sx={{
            p: 2,
          }}
        >
          {children}
        </Paper>
      </Container>
    </Box>
  )
}
