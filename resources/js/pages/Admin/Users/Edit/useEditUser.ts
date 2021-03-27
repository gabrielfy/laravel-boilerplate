import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Inertia } from '@inertiajs/inertia'
import { toast } from 'react-toastify'

export type UserEditProps = {
  uuid: string
  first_name: string
  last_name: string
  email: string
  profile_photo_url: string
  photo: File
  roles?: Array<string>
}

function useUserEdit(user: UserEditProps) {
  const [processing, setProcessing] = useState(false)
  const { register, handleSubmit } = useForm<UserEditProps>({
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      roles: user?.roles
    }
  })

  const onUserEdit = (data: UserEditProps) => {
    Inertia.post(
      route('admin.users.update', user.uuid),
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
    onUserEdit
  }
}

export default useUserEdit
