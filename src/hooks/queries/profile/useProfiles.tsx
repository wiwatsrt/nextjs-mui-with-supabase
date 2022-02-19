import { useQuery } from 'react-query'
import { supabase } from '@/libs/supabase/client'
import { getPagination } from '@/utils/helpers'
import { Profile } from '@/types'

const fetchProfiles = async (offset: number, limit: number) => {
  const { from, to } = getPagination(offset, limit)

  try {
    const { data, error } = await supabase
      .from<Profile>('profiles')
      .select()
      .range(from, to)

    if (error) {
      throw new Error(error.message)
    }

    return data
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message)
    }
  }
}

const useProfiles = (offset = 0, limit = 10) => {
  return useQuery(
    ['fetchProfiles', offset, limit],
    () => fetchProfiles(offset, limit),
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  )
}

export { useProfiles }
