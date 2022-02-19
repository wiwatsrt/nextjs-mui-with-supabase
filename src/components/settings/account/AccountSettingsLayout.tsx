import React, { ReactNode } from 'react'
import { styled } from '@mui/system'
import { useRouter } from 'next/router'
import Link from 'next/link'
// MUI
import Box from '@mui/material/Box'
import Button, { ButtonProps } from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'

interface LinkTabProps {
  href: string
  label: string
}

const ButtonLink = styled(Button)<ButtonProps>(() => ({
  disableRipple: true,
  borderRadius: 0,
  fontSize: '0.875rem',
  '&:hover': {
    backgroundColor: 'transparent',
  },
  '&.MuiButton-textPrimary': {
    borderBottom: '2px solid',
  },
}))

const LinkTab = ({ href, label }: LinkTabProps) => {
  const router = useRouter()
  const color = router.pathname === href ? 'primary' : 'inherit'

  return (
    <Link href={href} scroll={false} passHref>
      <ButtonLink color={color}>{label}</ButtonLink>
    </Link>
  )
}

interface AccountSettingsLayoutProps {
  children: ReactNode
}

export const AccountSettingsLayout = ({
  children,
}: AccountSettingsLayoutProps): JSX.Element => {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          boxShadow: 'inset 0 -2px 0 #e5e7eb',
          marginBottom: '24px',
          border: '1px soild',
          color: 'rgb(107, 119, 140)',
        }}
      >
        <Stack direction="row" spacing={2}>
          <LinkTab label="Profile" href="/settings/profile" />
          <LinkTab label="Account" href="/settings/account" />
          <LinkTab label="Password" href="/settings/password" />
        </Stack>
      </Box>
      <Paper
        elevation={0}
        sx={{
          p: 2,
        }}
      >
        {children}
      </Paper>
    </>
  )
}

export default AccountSettingsLayout
