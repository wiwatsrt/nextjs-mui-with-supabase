import React, { useEffect } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
// Mui
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useAuth, withAuth } from '@/hooks/auth'
import { supabase } from '@/libs/supabase/client'
import AccountSettingsLayout from '@/components/settings/account/AccountSettingsLayout'
import { AppLayout } from '@/components/Layouts'
import FormSection from '@/components/FormSection'

interface SettingAccountInput {
  displayName: string
  email: string
}

const Account = () => {
  const { authUser } = useAuth()

  const schema = yup.object().shape({
    displayName: yup.string(),
    email: yup.string().email(),
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SettingAccountInput>({ resolver: yupResolver(schema) })

  useEffect(() => {
    if (authUser) {
      setValue('displayName', authUser.user_metadata?.display_name ?? '')
      setValue('email', authUser.email ?? '')
    }
  }, [authUser, setValue])

  const onSubmit: SubmitHandler<SettingAccountInput> = ({ displayName }) => {
    supabase.auth
      .update({
        data: {
          display_name: displayName,
        },
      })
      .then(() => {
        toast.success('Successfully updated!')
      })
  }

  return (
    <AppLayout title="Account Settings" pageHeader="Settings">
      {authUser && (
        <>
          <AppLayout.SectionTitle
            title="Account Settings"
            description="Update your account's settings."
          />
          <AccountSettingsLayout>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <FormSection>
                <TextField
                  type="email"
                  label="Email"
                  disabled
                  error={!!errors.email?.message}
                  helperText={errors.email?.message}
                  {...register('email')}
                />
                <TextField
                  type="text"
                  label="Display Name"
                  error={!!errors.displayName?.message}
                  helperText={errors.displayName?.message}
                  {...register('displayName')}
                />
                <Box>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    Save
                  </Button>
                </Box>
              </FormSection>
            </Box>
          </AccountSettingsLayout>
        </>
      )}
    </AppLayout>
  )
}

export default withAuth(Account)
