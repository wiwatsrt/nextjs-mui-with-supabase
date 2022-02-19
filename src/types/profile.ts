export interface Profile {
  id: string
  full_name: string
  first_name?: string
  last_name?: string
  email?: string
  department?: string
  job_title?: string
  phone?: string
  status?: 'ACTIVE' | 'INACTIVE'
  updated_at?: Date
}
