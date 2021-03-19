import { Inertia } from '@inertiajs/inertia'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

type RegisterProps = {
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
  terms: boolean
}

function useRegister() {
  const { register, handleSubmit, setValue } = useForm<RegisterProps>()
  const [processing, setProcessing] = useState(false)

  const onRegister = (data: RegisterProps) => {
    Inertia.post(route('register'), data, {
      onError: (errors) => {
        for (const error in errors) {
          toast.error(errors[error])
        }

        setValue('password', '')
        setValue('password_confirmation', '')
      },
      onStart: () => {
        setProcessing(true)
      },
      onFinish: () => {
        setProcessing(false)
      }
    })
  }

  return {
    register,
    processing,
    handleSubmit,
    onRegister
  }
}

export default useRegister
