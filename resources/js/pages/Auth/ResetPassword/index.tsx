import React from 'react'
import { MdMailOutline, MdLockOutline } from 'react-icons/md'

import Button from '@/components/Button'
import Input from '@/components/Input'
import Auth from '@/containers/Auth'

import useResetPassword from './useResetPassword'

const ResetPassword = () => {
  const {
    register,
    processing,
    handleSubmit,
    onResetPassword
  } = useResetPassword()

  return (
    <Auth
      image="/img/auth-reset-password.svg"
      title="Reset password"
      description=""
    >
      <form
        onSubmit={handleSubmit(onResetPassword)}
        className="w-full grid grid-cols-6 gap-6"
      >
        <div className="col-span-6">
          <Input
            type="email"
            name="email"
            label="E-mail"
            icon={<MdMailOutline />}
            ref={register}
          />
        </div>
        <div className="col-span-6">
          <Input
            type="password"
            name="password"
            label="Password"
            ref={register}
            icon={<MdLockOutline />}
          />
        </div>
        <div className="col-span-6">
          <Input
            type="password"
            name="password_confirmation"
            label="Confirm Password"
            ref={register}
            icon={<MdLockOutline />}
          />
        </div>
        <div className="col-span-6">
          <Button
            type="submit"
            color="primary"
            size="large"
            disabled={processing}
            uppercase
            block
          >
            Reset Password
          </Button>
        </div>
      </form>
    </Auth>
  )
}

export default ResetPassword
