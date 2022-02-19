import React, { ReactNode } from 'react'
import Stack from '@mui/material/Stack'

interface FormSectionProps {
  children: ReactNode
}

const FormSection = ({ children }: FormSectionProps): JSX.Element => {
  return <Stack spacing={2}>{children}</Stack>
}

export default FormSection
