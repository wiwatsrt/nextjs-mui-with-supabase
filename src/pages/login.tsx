import React from 'react'
import Head from 'next/head'
import { AuthLayout } from '@/components/Layouts'
import LoginForm from '@/components/LoginForm'

const LoginPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Login Page</title>
      </Head>
      <AuthLayout>
        <LoginForm redirectTo="/dashboard" />
      </AuthLayout>
    </>
  )
}

export default LoginPage
