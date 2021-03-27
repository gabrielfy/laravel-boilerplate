import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Inertia } from '@inertiajs/inertia'
import { toast } from 'react-toastify'

export type ChangePasswordProps = {
  password: string
  password_confirmation: string
}

function useChangePassword() {
  const [processing, setProcessing] = useState(false)
  const { register, handleSubmit } = useForm<ChangePasswordProps>()

  const onChangePassword = (data: ChangePasswordProps) => {
    const { user } = route().params as { user: string }

    Inertia.post(
      route('admin.users.change-password.update', user),
      {
        _method: 'PUT',
        ...data
      },
      {
        onError: (errors) => {
          for (const error in errors) {
            toast.error(errors[error])
          }
        },
        onStart: () => {
          setProcessing(true)
        },
        onSuccess: (page) => {
          if (page.props.flash.error) {
            toast.error(page.props.flash.error)
          }

          if (page.props.flash.success) {
            toast.success(page.props.flash.success)
          }
        },
        onFinish: () => {
          setProcessing(false)
        }
      }
    )
  }

  return {
    register,
    processing,
    handleSubmit,
    onChangePassword
  }
}

export default useChangePassword
