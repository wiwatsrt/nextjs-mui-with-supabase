import React, { ReactChild } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
// Mui
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
// Icons
import DashboardIcon from '@mui/icons-material/DashboardOutlined'
import PeopleIcon from '@mui/icons-material/PeopleOutlined'
import BusinessIcon from '@mui/icons-material/BusinessOutlined'

interface listMenuProps {
  href: string
  icon: ReactChild
  text: string
}

const Menu = ({ href, icon, text }: listMenuProps) => {
  const router = useRouter()

  return (
    <Link href={href} passHref>
      <ListItemButton
        component="a"
        disableTouchRipple
        key={text}
        selected={router.pathname.startsWith(href)}
      >
        <ListItemIcon sx={{ color: 'inherit' }}>{icon}</ListItemIcon>
        <ListItemText
          primary={text}
          sx={{
            color: 'whitesmoke',
          }}
        />
      </ListItemButton>
    </Link>
  )
}

const SidebarMenu = (): JSX.Element => {
  return (
    <List>
      <Menu href="/dashboard" icon={<DashboardIcon />} text="Dashboard" />
      <Menu href="/companies" icon={<BusinessIcon />} text="Companies" />
      <Menu href="/users" icon={<PeopleIcon />} text="Users" />
    </List>
  )
}

export default SidebarMenu
