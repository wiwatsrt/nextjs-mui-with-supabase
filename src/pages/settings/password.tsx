import React from 'react'
import toast from 'react-hot-toast'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AppLayout } from '@/components/Layouts'
import { supabase } from '@/libs/supabase/client'
import { useAuth, withAuth } from '@/hooks/auth'
import { yupResolver } from '@hookform/resolvers/yup'
import AccountSettingsLayout from '@/components/settings/account/AccountSettingsLayout'
import FormSection from '@/components/FormSection'
import { Input } from '@/components/ui'
import { ChangePassword } from '@/validations/auth'
// Mui
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

interface PasswordInput {
  username: string
  password: string
  confirmPassword: string
}

const SettingPassword = () => {
  const { authUser } = useAuth()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordInput>({ resolver: yupResolver(ChangePassword) })

  const onSubmit: SubmitHandler<PasswordInput> = async ({ password }) => {
    try {
      const { error } = await supabase.auth.update({
        password,
      })

      if (error) {
        throw new Error(error.message)
      }

      toast.success('Your password has been updated')
      reset()
    } catch (error) {
      toast.error('Oops. Something went wrong. Please try again later.')
    }
  }

  return (
    <AppLayout title="Password Settings" pageHeader="Settings">
      <AppLayout.SectionTitle
        title="Password Settings"
        description="Update your password."
      />
      <AccountSettingsLayout>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormSection>
            <Input
              autoComplete="username"
              type="email"
              label="Email"
              value={authUser?.email}
              error={!!errors.username?.message}
              helperText={errors.username?.message}
              {...register('username')}
              disabled
            />
            <Input
              autoComplete="new-password"
              type="password"
              label="New Password"
              error={!!errors.password?.message}
              helperText={errors.password?.message}
              {...register('password')}
            />
            <Input
              autoComplete="new-password"
              type="password"
              label="Confirm New Password"
              error={!!errors.confirmPassword?.message}
              helperText={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
            <Box>
              <Button disabled={isSubmitting} type="submit" variant="contained">
                Save
              </Button>
            </Box>
          </FormSection>
        </Box>
      </AccountSettingsLayout>
    </AppLayout>
  )
}

export default withAuth(SettingPassword)
