import React from 'react'
import { styled } from '@mui/material/styles'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputBase, { InputBaseProps } from '@mui/material/InputBase'

interface InputProps extends InputBaseProps {
  label?: string
  helperText?: string
}

const CustomInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: 4,
  },
  '& .MuiInputBase-input': {
    borderRadius: 5,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '8px 12px',
    '&:focus': {
      border: `1px solid ${theme.palette.primary.main}`,
      outline: `1px solid ${theme.palette.primary.main}`,
    },
  },
}))

const CustomLabel = styled('label')(({ theme }) => ({
  color: theme.palette.grey['700'],
  fontWeight: 500,
  fontSize: '.875rem',
}))

const Input = React.forwardRef((props: InputProps, ref) => {
  const { id, label, error, helperText, ...other } = props

  return (
    <FormControl variant="standard" margin="none">
      <CustomLabel htmlFor={id}>{label}</CustomLabel>
      <CustomInput id={id} ref={ref} error={error} {...other} />
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </FormControl>
  )
})

Input.displayName = 'Input'

export default Input
