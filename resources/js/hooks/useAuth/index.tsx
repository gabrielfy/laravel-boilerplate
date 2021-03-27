import { usePage } from '@inertiajs/inertia-react'

export const useAuth = () => {
  const { auth } = usePage().props
  return auth
}
