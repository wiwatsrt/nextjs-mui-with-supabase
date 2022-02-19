import React, { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useAuth, withAuth } from '@/hooks/auth'
import { supabase } from '@/libs/supabase/client'
import { AppLayout } from '@/components/Layouts'
import AccountSettingsLayout from '@/components/settings/account/AccountSettingsLayout'
import FormSection from '@/components/FormSection'
import { Input } from '@/components/ui'
import { UpdateAccount } from '@/validations'
// Mui
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

interface SettingAccountInput {
  displayName: string
  email: string
}

const Account = () => {
  const { authUser } = useAuth()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SettingAccountInput>({ resolver: yupResolver(UpdateAccount) })

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
                <Input
                  disabled
                  error={!!errors.email?.message}
                  helperText={errors.email?.message}
                  label="Email"
                  type="email"
                  {...register('email')}
                />
                <Input
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
