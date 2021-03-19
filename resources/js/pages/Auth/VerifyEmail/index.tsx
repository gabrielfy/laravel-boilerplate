import React from 'react'
import { usePage } from '@inertiajs/inertia-react'
import { toast } from 'react-toastify'

import Auth from '@/containers/Auth'
import Link from '@/components/Link'

const VerifyEmail = () => {
  const { status } = usePage<any>().props

  if (status == 'verification-link-sent') {
    toast.info(
      'A new verification link has been sent to the email address you provided during registration.'
    )
  }

  return (
    <Auth
      image="/img/auth-verify-email.svg"
      title="Verify e-mail"
      description="Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you?"
    >
      <div className="h-auto flex flex-col justify-between">
        <div>
          If you didn't receive the email, we'll be happy to send you another
          one.
        </div>
        <div className="mt-4 flex justify-between items-center">
          <Link
            href={route('verification.send')}
            color="primary"
            as="button"
            method="post"
          >
            Resend verification email
          </Link>
          <Link
            href={route('logout')}
            color="primary"
            as="button"
            method="post"
          >
            Logout
          </Link>
        </div>
      </div>
    </Auth>
  )
}

export default VerifyEmail
