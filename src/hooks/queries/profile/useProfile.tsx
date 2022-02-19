import { supabase } from '@/libs/supabase/client'
import { Profile } from '@/types'
import { useQuery } from 'react-query'

const getProfile = async (profileId: string) => {
  const { data, error } = await supabase
    .from<Profile>('profiles')
    .select()
    .eq('id', profileId)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  if (!data) {
    throw new Error('Profile not found')
  }

  return data
}

const useProfile = (profileId: string) => {
  return useQuery(['getProfile', profileId], () => getProfile(profileId), {
    staleTime: 10000,
    enabled: !!profileId,
  })
}

export { useProfile }
