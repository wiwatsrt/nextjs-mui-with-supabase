import React, { MouseEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { ProfileAvatar } from '@/components/ui'
import { useAuth, useLogOut } from '@/hooks/auth'
// Mui
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
// Mui Icons
import LogoutIcon from '@mui/icons-material/Logout'
import NotificationsIcon from '@mui/icons-material/Notifications'

const AccountMenu = () => {
  const { authUser, isLoading } = useAuth()
  const { mutateAsync: logoutMutationAsync, isSuccess } = useLogOut()
  const router = useRouter()

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClickSignOut = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault()

    try {
      await logoutMutationAsync()
      if (isSuccess) {
        router.push('/login')
      }
    } catch (error) {
      throw new Error('SignOut Error')
    }
  }

  return (
    <>
      {!isLoading && (
        <>
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
          </Stack>
          <IconButton onClick={handleClick} size="small">
            <ProfileAvatar
              name={authUser?.user_metadata?.display_name}
              sx={{
                width: 35,
                height: 35,
                fontSize: '0.875rem',
              }}
            />
          </IconButton>
          <Menu
            PaperProps={{ elevation: 0, variant: 'outlined' }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClickSignOut}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </>
      )}
    </>
  )
}

export default AccountMenu
