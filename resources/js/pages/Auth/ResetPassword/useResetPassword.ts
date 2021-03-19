import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

type ResetPasswordProps = {
  email: string
  token: string
  password: string
  password_confirmation: string
}

function useResetPassword() {
  const { email, token } = usePage<any>().props
  const { register, handleSubmit, setValue } = useForm<ResetPasswordProps>({
    defaultValues: {
      email,
      token
    }
  })
  const [processing, setProcessing] = useState(false)

  const onResetPassword = (data: ResetPasswordProps) => {
    Inertia.post(route('password.update'), data, {
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
    onResetPassword
  }
}

export default useResetPassword
