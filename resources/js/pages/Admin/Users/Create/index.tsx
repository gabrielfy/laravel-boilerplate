import React from 'react'

import Admin from '@/containers/Admin'
import Input from '@/components/Input'
import Card, { CardBody } from '@/components/Card'
import Button from '@/components/Button'
import Checkbox from '@/components/Checkbox'

import useUserCreate from './useUserCreate'

type UserCreatePageProps = {
  roles: Array<{
    name: string
    uuid: string
    guard_name: string
    permissions: Array<string>
  }>
}

const UserCreate = ({ roles }: UserCreatePageProps) => {
  const { register, handleSubmit, processing, onUserCreate } = useUserCreate()

  return (
    <Admin
      breadcrumbs={[
        {
          label: 'Users',
          url: route('admin.users.index')
        },
        {
          label: 'Create',
          url: route('admin.users.create')
        }
      ]}
    >
      <div className="w-full flex items-center justify-between mb-5">
        <div className="flex">
          <h1 className="font-semibold text-2xl text-gray-600">Create user</h1>
        </div>
      </div>
      <Card>
        <CardBody>
          <form
            onSubmit={handleSubmit(onUserCreate)}
            className="w-full grid grid-cols-6 gap-4 auto-rows-max"
          >
            <div className="col-span-4">
              <Input
                type="text"
                name="first_name"
                label="First name"
                inline
                ref={register}
              />
            </div>
            <div className="col-span-2"></div>
            <div className="col-span-4">
              <Input
                type="text"
                name="last_name"
                label="Last name"
                inline
                ref={register}
              />
            </div>
            <div className="col-span-2"></div>
            <div className="col-span-4">
              <Input
                type="email"
                name="email"
                label="E-mail"
                inline
                ref={register}
              />
            </div>
            <div className="col-span-2"></div>
            <div className="col-span-4">
              <Input
                type="password"
                name="password"
                label="Password"
                inline
                ref={register}
              />
            </div>
            <div className="col-span-2"></div>
            <div className="col-span-4">
              <Input
                type="password"
                name="password_confirmation"
                label="Password confirmation"
                inline
                ref={register}
              />
            </div>
            <div className="col-span-2"></div>

            <div className="col-span-4">
              <div className="text-gray-700 md:flex md:items-start">
                <div className="mb-1 md:mb-0 md:w-1/3">
                  <label className="block px-1 text-gray-500 text-base">
                    Advanced
                  </label>
                </div>
                <div className="md:w-2/3 md:flex-grow">
                  <Checkbox name="active" ref={register}>
                    Active
                  </Checkbox>
                  <Checkbox name="send_confirmation_email" ref={register}>
                    Send confirmation email
                  </Checkbox>
                </div>
              </div>
            </div>
            <div className="col-span-2"></div>

            <div className="col-span-4">
              <div className="text-gray-700 md:flex md:items-start">
                <div className="mb-1 md:mb-0 md:w-1/3">
                  <label className="block px-1 text-gray-500 text-base">
                    Roles
                  </label>
                </div>
                <div className="md:w-2/3 md:flex-grow">
                  {roles.map((role: any) => (
                    <Checkbox
                      name="roles[]"
                      value={role.name}
                      id={role.uuid}
                      key={role.uuid}
                      ref={register}
                    >
                      {role.name}
                    </Checkbox>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-span-2"></div>

            <div className="col-start-6">
              <Button type="submit" disabled={processing} block>
                Create
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </Admin>
  )
}

export default UserCreate
