import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Inertia } from '@inertiajs/inertia'
import { toast } from 'react-toastify'

export type UserCreateProps = {
  first_name: string
  last_name: string
  email: string
  active: boolean
  send_confirmation_email: boolean
  roles?: Array<string>
}

function useUserCreate() {
  const [processing, setProcessing] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    getValues
  } = useForm<UserCreateProps>({
    defaultValues: {
      active: true,
      send_confirmation_email: true
    }
  })

  const onUserCreate = (data: UserCreateProps) => {
    Inertia.post(route('admin.users.store'), data, {
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
    })
  }

  return {
    register,
    processing,
    handleSubmit,
    setValue,
    getValues,
    onUserCreate
  }
}

export default useUserCreate
