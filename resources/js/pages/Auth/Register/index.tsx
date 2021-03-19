import React from 'react'
import { MdPersonOutline, MdMailOutline, MdLockOutline } from 'react-icons/md'

import Checkbox from '@/components/Checkbox'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Link from '@/components/Link'
import Auth from '@/containers/Auth'

import useRegister from './useRegister'

const Register = () => {
  const { register, processing, handleSubmit, onRegister } = useRegister()

  return (
    <Auth
      image="/img/auth-register.svg"
      title="Sign up"
      description="Enter your information to register"
    >
      <form
        onSubmit={handleSubmit(onRegister)}
        className="w-full grid grid-cols-6 gap-6"
      >
        <div className="col-span-6 sm:col-span-3">
          <Input
            type="text"
            name="first_name"
            label="First name"
            ref={register}
            icon={<MdPersonOutline />}
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <Input
            type="text"
            name="last_name"
            label="Last name"
            ref={register}
            icon={<MdPersonOutline />}
          />
        </div>
        <div className="col-span-6">
          <Input
            type="email"
            name="email"
            label="E-mail"
            ref={register}
            icon={<MdMailOutline />}
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
        {/* TODO: Add links */}
        <div className="col-span-6">
          <Checkbox name="terms" ref={register}>
            I agree to the{' '}
            <a
              href="/"
              target="_blank"
              className="text-primary text-sm rounded-md "
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href="/"
              target="_blank"
              className="text-primary text-sm rounded-md "
            >
              Privacy Policy
            </a>
          </Checkbox>
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
            Sign up
          </Button>
        </div>
        <div className="col-span-6 text-center">
          <Link href={route('login')} fontSize="medium">
            Already have an account?
          </Link>
        </div>
      </form>
    </Auth>
  )
}

export default Register
