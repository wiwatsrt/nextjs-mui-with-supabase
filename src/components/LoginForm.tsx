import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/auth/authContext'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SignInWithEmailAndPassword, SignInWithMagicLink } from '@/validations'
// Mui
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Alert, { AlertColor } from '@mui/material/Alert'

type ViewType =
  | 'sign_in'
  | 'sign_up'
  | 'forgotten_password'
  | 'magic_link'
  | 'update_password'

interface AlertMessageInput {
  type?: AlertColor
  message?: string
}

interface ShowMessageProps {
  alertMessage: AlertMessageInput
}

const ShowMessage = ({ alertMessage }: ShowMessageProps) => {
  return (
    <Alert
      sx={{
        marginBottom: 0.5,
      }}
      severity={alertMessage?.type}
    >
      {alertMessage?.message}
    </Alert>
  )
}

interface SignInWithEmailProps {
  setAuthView: React.Dispatch<React.SetStateAction<ViewType>>
  redirectTo?: string
}

interface LoginInput {
  email: string
  password?: string
}

const SignInWithEmail = ({ redirectTo, setAuthView }: SignInWithEmailProps) => {
  const router = useRouter()
  const { signIn } = useAuth()
  const [alertMessage, setAlertMessage] = useState<AlertMessageInput>()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: yupResolver(SignInWithEmailAndPassword) })

  const onSubmit: SubmitHandler<LoginInput> = async ({ email, password }) => {
    try {
      const { error } = await signIn({ email, password })

      if (error) {
        throw error
      }

      router.push(redirectTo || '/dashboard')
    } catch (error) {
      console.log(error)
      setAlertMessage({
        type: 'error',
        message: 'Oops. Something went wrong. Please try again later.',
      })
    }
  }

  return (
    <>
      {alertMessage && <ShowMessage alertMessage={alertMessage} />}
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          {...register('email', { required: true })}
          autoComplete="email"
          autoFocus
          fullWidth
          error={!!errors.email?.message}
          helperText={errors.email?.message}
          id="email"
          label="Email Address"
          name="email"
          required
        />
        <TextField
          {...register('password')}
          autoComplete="current-password"
          fullWidth
          error={!!errors.password?.message}
          helperText={errors.password?.message}
          id="password"
          type="password"
          label="Password"
          name="password"
          required
        />

        <Button
          variant="contained"
          type="submit"
          size="medium"
          fullWidth
          disabled={isSubmitting}
          sx={{
            mt: 2,
          }}
        >
          Login
        </Button>

        <Box
          sx={{
            paddingTop: 0.5,
            textAlign: 'center',
          }}
        >
          <Button
            fullWidth
            onClick={() => {
              setAuthView('magic_link')
            }}
            sx={{
              fontSize: 12,
            }}
          >
            Or sign in with magic link.
          </Button>
        </Box>
      </Box>
    </>
  )
}

interface MagicLinkProps {
  setAuthView: React.Dispatch<React.SetStateAction<ViewType>>
  redirectTo: string
}

interface MagicLinkInput {
  email: string
}

const MagicLink = ({ setAuthView, redirectTo }: MagicLinkProps) => {
  const { signIn } = useAuth()
  const [alertMessage, setAlertMessage] = useState<AlertMessageInput>()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MagicLinkInput>({
    resolver: yupResolver(SignInWithMagicLink),
  })

  const onSubmit: SubmitHandler<MagicLinkInput> = async ({ email }) => {
    try {
      const { error } = await signIn({
        email,
        options: {
          redirectTo: redirectTo,
        },
      })

      if (error) {
        throw error
      }

      setAlertMessage({
        type: 'success',
        message: 'Check your inbox and click the link to complete login',
      })
    } catch (error) {
      setAlertMessage({
        type: 'error',
        message: 'Oops. Something went wrong. Please try again later.',
      })
    }
  }

  return (
    <>
      {alertMessage && <ShowMessage alertMessage={alertMessage} />}
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          {...register('email', { required: true })}
          autoComplete="email"
          autoFocus
          fullWidth
          error={!!errors.email?.message}
          helperText={errors.email?.message}
          id="email"
          label="Email Address"
          name="email"
          required
        />

        <Button
          variant="contained"
          type="submit"
          size="medium"
          fullWidth
          disabled={isSubmitting}
          sx={{
            mt: 2,
          }}
        >
          Send magic link
        </Button>

        <Box
          sx={{
            paddingTop: 0.5,
            textAlign: 'center',
          }}
        >
          <Button
            fullWidth
            onClick={() => {
              setAuthView('sign_in')
            }}
            sx={{
              fontSize: 12,
            }}
          >
            Or sign in with magic link.
          </Button>
        </Box>
      </Box>
    </>
  )
}

interface LoginFormProps {
  redirectTo: string
  enableMagicLink?: boolean
  view?: ViewType
}

export const LoginForm = ({
  redirectTo,
  view = 'sign_in',
}: LoginFormProps): JSX.Element | null => {
  const router = useRouter()
  const { authUser, isLoading } = useAuth()
  const [authView, setAuthView] = useState<ViewType>(view)

  useEffect(() => {
    if (authUser && !isLoading) {
      router.push(redirectTo || '/dashboard')
    }
  }, [router, authUser, isLoading, redirectTo])

  switch (authView) {
    case 'sign_in':
      return (
        <>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              color: (theme) => theme.palette.grey[900],
              textAlign: 'center',
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
            gutterBottom
          >
            Login
          </Typography>

          <SignInWithEmail setAuthView={setAuthView} redirectTo={redirectTo} />
        </>
      )
    case 'magic_link':
      return (
        <>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              color: (theme) => theme.palette.grey[900],
              textAlign: 'center',
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
            gutterBottom
          >
            Login
          </Typography>
          <MagicLink setAuthView={setAuthView} redirectTo={redirectTo} />
        </>
      )
    default:
      return null
  }
}

export default LoginForm
