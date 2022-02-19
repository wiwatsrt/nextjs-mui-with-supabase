import React from 'react'
import { Container, Typography } from '@mui/material'

const Home = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
      component="main"
    >
      <Typography
        variant="h1"
        sx={{
          color: 'primary.main',
        }}
      >
        สวัสดี Next.js
      </Typography>
    </Container>
  )
}

export default Home
