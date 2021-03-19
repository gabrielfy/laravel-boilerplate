import { Inertia } from '@inertiajs/inertia'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

type LoginProps = {
  email: string
  password: string
}

function useLogin() {
  const { register, handleSubmit, setValue } = useForm<LoginProps>()
  const [processing, setProcessing] = useState(false)

  const onLogin = (data: LoginProps) => {
    Inertia.post(route('login'), data, {
      onError: (errors) => {
        for (const error in errors) {
          toast.error(errors[error])
        }

        setValue('password', '')
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
    onLogin
  }
}

export default useLogin
