import { useMutation, useQueryClient } from 'react-query'
import { supabase } from '@/libs/supabase/client'
import { Profile } from '@/types'

const updateProfile = async (profile: Profile) => {
  const { data, error } = await supabase
    .from<Profile>('profiles')
    .update({ ...profile })
    .eq('id', profile.id)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation((profile: Profile) => updateProfile(profile), {
    onMutate: async (newProfile) => {
      // Snapshot the previous value
      const previousProfile = queryClient.getQueryData<Profile>([
        'getProfile',
        newProfile.id,
      ])
      // Optimistically update to the new value
      queryClient.setQueryData(['getProfile', newProfile.id], newProfile)
      // Return a context with the previous and new todo
      return { previousProfile, newProfile }
    },
    // If the mutation fails, use the context we returned above
    onError: (err, variables, context: any) => {
      if (context?.previousProfile) {
        queryClient.setQueryData<Profile>(
          ['getProfile', context.newProfile?.id],
          context.previousProfile
        )
      }
    },
    onSuccess: () => {
      queryClient.refetchQueries('fetchProfiles')
    },
  })
}

export { useUpdateProfile }
