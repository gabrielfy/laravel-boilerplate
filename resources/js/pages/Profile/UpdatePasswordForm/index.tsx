import React from 'react'
import { MdLockOutline } from 'react-icons/md'

import Button from '@/components/Button'
import Input from '@/components/Input'

import useUpdatePassword from './useUpdatePassword'

const UpdatePasswordForm = () => {
  const {
    register,
    onUpdatePassword,
    handleSubmit,
    processing
  } = useUpdatePassword()

  return (
    <div className="space-y-4">
      <h1 className="font-semibold text-xl text-gray-600">Update password</h1>
      <form onSubmit={handleSubmit(onUpdatePassword)}>
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <Input
              type="password"
              name="current_password"
              label="Current password"
              icon={<MdLockOutline />}
              ref={register}
            />
          </div>
          <div className="col-span-6">
            <Input
              type="password"
              name="password"
              label="New password"
              icon={<MdLockOutline />}
              ref={register}
            />
          </div>
          <div className="col-span-6">
            <Input
              type="password"
              name="password_confirmation"
              label="Confirm password"
              icon={<MdLockOutline />}
              ref={register}
            />
          </div>
          <div className="col-start-6">
            <Button type="submit" disabled={processing} block>
              Update
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default UpdatePasswordForm
