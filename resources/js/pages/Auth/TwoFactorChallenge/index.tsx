import React, { useState } from 'react'
// import { Inertia } from '@inertiajs/inertia'

import Auth from '@/containers/Auth'
import Input from '@/components/Input'
import Button from '@/components/Button'

// TODO:
const TwoFactorChallenge = () => {
  const [recovery, setRecovery] = useState(false)
  const [values, setValues] = useState({
    code: '',
    recovery_code: ''
  })

  // const handleSubmit = () => {
  //   Inertia.post(route('two-factor.login'), values)
  // }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name
    const value = e.target.value

    setValues((values) => ({
      ...values,
      [key]: value
    }))
  }

  const toggleRecovery = () => {
    setValues({
      code: '',
      recovery_code: ''
    })

    setRecovery(!recovery)
  }

  return (
    <Auth
      image="/img/auth-two-factor-authentication.svg"
      title="Tow factor authenticate"
      description={
        !recovery
          ? 'Please confirm access to your account by entering the authentication code provided by your authenticator application.'
          : 'Please confirm access to your account by entering one of your emergency recovery codes.'
      }
    >
      <h1 className="text-center m-2">
        {recovery ? 'Enter your recovery code' : 'Enter your pin code'}
      </h1>
      <div className="w-full flex justify-center  m-2">
        {recovery ? (
          <Input
            name="recovery_code"
            type="text"
            autoComplete="false"
            value={values.recovery_code}
            onChange={handleChange}
          />
        ) : (
          <Input
            name="code"
            autoComplete="false"
            value={values.code}
            onChange={handleChange}
          />
        )}
      </div>

      <div className="flex justify-center m-2">
        {recovery ? (
          <Button type="button" variant="link" onClick={toggleRecovery}>
            Use an authentication code
          </Button>
        ) : (
          <Button type="button" variant="link" onClick={toggleRecovery}>
            Use a recovery code
          </Button>
        )}
      </div>

      <Button type="submit" color="primary" size="large" uppercase block>
        Login
      </Button>
    </Auth>
  )
}

export default TwoFactorChallenge
