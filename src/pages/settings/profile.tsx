import React, { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useAuth, withAuth } from '@/hooks/auth'
import { useProfile, useUpdateProfile } from '@/hooks/queries'
import { AppLayout } from '@/components/Layouts'
import AccountSettingsLayout from '@/components/settings/account/AccountSettingsLayout'
import FormSection from '@/components/FormSection'
import { Input } from '@/components/ui'
import { UpdateProfile } from '@/validations'
import { Profile } from '@/types'
// Mui
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const ProfileSetting = (): JSX.Element => {
  const { authUser } = useAuth()
  const mutation = useUpdateProfile()
  const { data: person, isFetched } = useProfile(authUser?.id ?? '')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Profile>({
    resolver: yupResolver(UpdateProfile),
  })

  const updateProfile: SubmitHandler<Profile> = async (data) => {
    try {
      await mutation.mutateAsync({
        ...data,
        updated_at: new Date(),
      })
      toast.success('Successfully updated!')
    } catch (error) {
      toast.error('Oops. Something went wrong. Please try again later.')
    }
  }

  useEffect(() => {
    if (person) {
      setValue('id', person.id ?? '')
      setValue('full_name', person.full_name ?? '')
      setValue('email', person.email ?? '')
      setValue('department', person.department ?? '')
      setValue('job_title', person.job_title ?? '')
      setValue('phone', person.phone ?? '')
    }
  }, [person])

  return (
    <AppLayout title="Profile Information" pageHeader="Settings">
      {isFetched && (
        <>
          <AppLayout.SectionTitle
            title="Profile Information"
            description="Update your profile information and email address."
          />
          <AccountSettingsLayout>
            <Box
              component="form"
              onSubmit={handleSubmit(updateProfile)}
              noValidate
            >
              <FormSection>
                <Input
                  id="full-name"
                  label="Full name"
                  {...register('full_name')}
                  autoComplete="name"
                  error={!!errors.full_name?.message}
                  helperText={errors.full_name?.message}
                />
                <Input
                  id="email"
                  label="Email"
                  type="email"
                  {...register('email')}
                  error={!!errors.email?.message}
                  helperText={errors.email?.message}
                />
                <Input
                  id="department"
                  label="Department"
                  type="text"
                  {...register('department')}
                  error={!!errors.department?.message}
                  helperText={errors.department?.message}
                />
                <Input
                  id="job-title"
                  label="Job Title"
                  type="text"
                  {...register('job_title')}
                  error={!!errors.job_title?.message}
                  helperText={errors.job_title?.message}
                />
                <Input
                  id="phone"
                  label="Phone"
                  type="tel"
                  {...register('phone')}
                  error={!!errors.phone?.message}
                  helperText={errors.phone?.message}
                />
                <Box>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
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

export default withAuth(ProfileSetting)
