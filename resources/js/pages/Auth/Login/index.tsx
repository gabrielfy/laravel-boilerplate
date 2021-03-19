import React, { useEffect } from 'react'
import { usePage } from '@inertiajs/inertia-react'
import { toast } from 'react-toastify'

import { MdMailOutline, MdLockOutline } from 'react-icons/md'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Link from '@/components/Link'
import Checkbox from '@/components/Checkbox'
import Auth from '@/containers/Auth'

import useLogin from './useLogin'

const Login = () => {
  const { register, processing, handleSubmit, onLogin } = useLogin()
  const { status, errors } = usePage().props

  useEffect(() => {
    if (status) {
      toast.info(status)
    }

    if (errors) {
      for (const error in errors) {
        toast.error(errors[error])
      }
    }
  }, [])

  return (
    <Auth
      image="/img/auth-login.svg"
      title="Sign in"
      description="Enter your information to sign in"
    >
      <form
        onSubmit={handleSubmit(onLogin)}
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
            icon={<MdLockOutline />}
            ref={register}
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <Checkbox name="remember" ref={register}>
            Remember me
          </Checkbox>
        </div>
        <div className="col-span-6 sm:col-span-3 flex items-start justify-end">
          <Link href={route('password.request')} fontSize="small">
            Forgot your password?
          </Link>
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
            Sign in
          </Button>
        </div>
        <div className="col-span-6 text-center">
          <Link href={route('register')} fontSize="small">
            Do not have an account yet?
          </Link>
        </div>
      </form>
    </Auth>
  )
}

export default Login
