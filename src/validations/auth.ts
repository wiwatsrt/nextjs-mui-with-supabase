import * as yup from 'yup'

const email = yup
  .string()
  .lowercase()
  .email()
  .trim()
  .required('Email is a required field')

const password = yup
  .string()
  .required('Password is a required field')
  .min(6, 'Password must be at least 6 characters')

export const SignInWithEmailAndPassword = yup.object().shape({
  email,
  password,
})

export const SignInWithMagicLink = yup.object().shape({
  email,
})

export const ChangePassword = yup.object().shape({
  password,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

export const UpdateAccount = yup.object().shape({
  displayName: yup.string(),
  email: yup.string().email(),
})
