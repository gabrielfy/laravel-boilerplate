import React from 'react'

import Admin from '@/containers/Admin'
import Input from '@/components/Input'
import Card, { CardBody } from '@/components/Card'
import Button from '@/components/Button'
import useChangePassword from './useChangePassword'

const UserChangePassword = () => {
  const {
    register,
    handleSubmit,
    processing,
    onChangePassword
  } = useChangePassword()

  return (
    <Admin
      breadcrumbs={[
        {
          label: 'Users',
          url: route('admin.users.index')
        },
        {
          label: 'Change password ',
          url: route('admin.users.create')
        }
      ]}
    >
      <div className="w-full flex items-center justify-between mb-5">
        <div className="flex">
          <h1 className="font-semibold text-2xl text-gray-600">
            Change user password
          </h1>
        </div>
      </div>
      <Card>
        <CardBody>
          <form
            onSubmit={handleSubmit(onChangePassword)}
            className="w-full grid grid-cols-6 gap-4 auto-rows-max"
          >
            <div className="col-span-4">
              <Input
                type="password"
                name="password"
                label="Password"
                ref={register}
                inline
              />
            </div>
            <div className="col-span-2"></div>
            <div className="col-span-4">
              <Input
                type="password"
                name="password_confirmation"
                label="Password confirmation"
                ref={register}
                inline
              />
            </div>
            <div className="col-span-2"></div>

            <div className="col-start-6">
              <Button disabled={processing} type="submit" block>
                Update
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </Admin>
  )
}

export default UserChangePassword
