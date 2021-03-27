import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Inertia } from '@inertiajs/inertia'
import { toast } from 'react-toastify'
import { useAuth } from '@/hooks'

type ProfileInfomationProps = {
  first_name: string
  last_name: string
  email: string
}

function useProfileInformation() {
  const { first_name, last_name, email } = useAuth()
  const [processing, setProcessing] = useState(false)
  const { register, handleSubmit } = useForm<ProfileInfomationProps>({
    defaultValues: {
      first_name,
      last_name,
      email
    }
  })

  const onProfileInformation = (data: ProfileInfomationProps) => {
    Inertia.post(
      route('user-profile-information.update'),
      {
        _method: 'PUT',
        ...data
      },
      {
        // @ts-ignore
        errorBag: 'updateProfileInformation',
        onError: (errors) => {
          for (const error in errors) {
            toast.error(errors[error])
          }
        },
        onStart: () => {
          setProcessing(true)
        },
        onFinish: () => {
          setProcessing(false)
        },
        onSuccess: () => {
          toast.success('Profile successfully updated')
        }
      }
    )
  }

  return {
    register,
    processing,
    handleSubmit,
    onProfileInformation
  }
}

export default useProfileInformation
