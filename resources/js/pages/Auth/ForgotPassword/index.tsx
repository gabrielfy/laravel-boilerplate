import React from 'react'

import { MdMailOutline } from 'react-icons/md'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Link from '@/components/Link'
import Auth from '@/containers/Auth'

import useForgotPassword from './useForgotPassword'

const ForgotPassword = () => {
  const {
    register,
    processing,
    handleSubmit,
    onForgotPassword
  } = useForgotPassword()

  return (
    <Auth
      image="/img/auth-forgot-password.svg"
      title="Forgot password"
      description="Just let us know your email address and we will email you a password reset link that will allow you to choose a new one."
    >
      <form
        onSubmit={handleSubmit(onForgotPassword)}
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
          <Button
            type="submit"
            color="primary"
            size="large"
            disabled={processing}
            uppercase
            block
          >
            Email Password Reset Link
          </Button>
        </div>
        <div className="col-span-6 text-center">
          <Link href={route('login')} fontSize="medium">
            Back
          </Link>
        </div>
      </form>
    </Auth>
  )
}

export default ForgotPassword
