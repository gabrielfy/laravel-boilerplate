import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Inertia } from '@inertiajs/inertia'
import { toast } from 'react-toastify'

type UpdatePasswordProps = {
  password: string
  password_confirmation: string
}

function useUpdatePassword() {
  const { register, handleSubmit, reset } = useForm<UpdatePasswordProps>()
  const [processing, setProcessing] = useState(false)

  const onUpdatePassword = (data: UpdatePasswordProps) => {
    Inertia.post(
      route('user-password.update'),
      {
        _method: 'PUT',
        ...data
      },
      {
        // @ts-ignore
        errorBag: 'updatePassword',
        onError: (errors) => {
          for (const error in errors) {
            toast.error(errors[error])
          }
        },
        onStart: () => {
          setProcessing(true)
        },
        onFinish: () => {
          reset()
          setProcessing(false)
        },
        onSuccess: () => {
          toast.success('Password successfully updated')
        }
      }
    )
  }

  return {
    register,
    processing,
    handleSubmit,
    onUpdatePassword
  }
}

export default useUpdatePassword
