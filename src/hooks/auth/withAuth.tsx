import React, { ElementType, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from './authContext'

export const withAuth = (WrappedComponent: ElementType) => {
  const Wrapper = (props: never) => {
    const router = useRouter()
    const { authUser, isLoading } = useAuth()

    useEffect(() => {
      if (!authUser && !isLoading) {
        router.push('/login')
      }
    }, [authUser, isLoading, router])

    if (authUser && !isLoading) {
      return <WrappedComponent {...props} />
    } else {
      return null
    }
  }

  return Wrapper
}
