import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Inertia } from '@inertiajs/inertia'
import { toast } from 'react-toastify'

export type RoleCreateProps = {
  uuid: string
  name: string
  guard_name: string
  permissions: Array<string>
}

function useRoleCreate() {
  const [processing, setProcessing] = useState(false)
  const { register, handleSubmit } = useForm<RoleCreateProps>()

  const onRoleCreate = (data: RoleCreateProps) => {
    Inertia.post(route('admin.roles.store'), data, {
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
    onRoleCreate
  }
}

export default useRoleCreate
