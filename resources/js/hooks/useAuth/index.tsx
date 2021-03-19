import { usePage } from '@inertiajs/inertia-react'

// TODO:
export const useAuth = () => {
  const { auth } = usePage().props
  return auth
}
