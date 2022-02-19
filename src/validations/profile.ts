import * as yup from 'yup'

export const UpdateProfile = yup.object().shape({
  full_name: yup.string(),
  first_name: yup.string(),
  last_name: yup.string(),
  email: yup.string().email(),
  department: yup.string(),
  job_title: yup.string(),
  phone: yup.string(),
})
