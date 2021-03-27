import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Inertia } from '@inertiajs/inertia'
import { toast } from 'react-toastify'

export type RoleEditProps = {
  uuid: string
  name: string
  guard_name: string
  permissions: Array<string>
}

function useRoleEdit(role: RoleEditProps) {
  const [processing, setProcessing] = useState(false)
  const { register, handleSubmit } = useForm<RoleEditProps>({
    defaultValues: {
      name: role?.name,
      guard_name: role?.guard_name,
      permissions: role?.permissions
    }
  })

  const onRoleEdit = (data: RoleEditProps) => {
    Inertia.post(
      route('admin.roles.update', role.uuid),
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
    onRoleEdit
  }
}

export default useRoleEdit
