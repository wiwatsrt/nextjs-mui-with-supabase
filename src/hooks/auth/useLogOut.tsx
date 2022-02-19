import { useMutation, useQueryClient } from 'react-query'
import { supabase } from '@/libs/supabase/client'

const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    throw new Error('Oops. Something went wrong. Please try again later.')
  }
}

export const useLogOut = () => {
  const queryClient = useQueryClient()

  return useMutation(() => logout(), {
    onSuccess: () => {
      queryClient.removeQueries()
    },
  })
}
