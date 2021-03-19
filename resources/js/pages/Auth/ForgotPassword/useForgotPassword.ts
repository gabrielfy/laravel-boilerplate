import { Inertia, Page } from '@inertiajs/inertia'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

type ForgotPasswordProps = {
  email: string
}

function useForgotPassword() {
  const { register, reset, handleSubmit } = useForm<ForgotPasswordProps>()
  const [processing, setProcessing] = useState(false)

  const onForgotPassword = (data: ForgotPasswordProps) => {
    Inertia.post(route('password.email'), data, {
      onSuccess: ({ props: { status } }: Page<any>) => {
        toast.info(status)
        reset()
      },
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
      }
    })
  }

  return {
    register,
    processing,
    handleSubmit,
    onForgotPassword
  }
}

export default useForgotPassword
