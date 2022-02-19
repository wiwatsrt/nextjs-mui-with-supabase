import Avatar, { AvatarProps } from '@mui/material/Avatar'
import { stringToColor } from '../../../utils/helpers'

interface ProfileAvatarProps extends AvatarProps {
  name: string
}

export const ProfileAvatar = ({ sx, name, ...rest }: ProfileAvatarProps) => {
  return (
    <Avatar
      {...rest}
      sx={{
        bgcolor: stringToColor(name),
        ...sx,
      }}
    >
      {initialName(name)}
    </Avatar>
  )
}

const initialName = (name: string) => {
  if (!name) return null

  const [firstName, lastName] = name.split(' ')

  if (firstName && lastName) {
    name = `${firstName.charAt(0)}${lastName.charAt(0)}`
  } else {
    name = firstName.charAt(0)
  }

  return name
}

export default ProfileAvatar
