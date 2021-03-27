import React from 'react'

import Admin from '@/containers/Admin'
import Input from '@/components/Input'
import Card, { CardBody } from '@/components/Card'
import Button from '@/components/Button'
import Checkbox from '@/components/Checkbox'

import useUserEdit, { UserEditProps } from './useEditUser'

type UserEditPageProps = {
  user: UserEditProps
  roles: Array<{
    name: string
    uuid: string
    guard_name: string
    permissions: Array<string>
  }>
}

// TODO: Add profile photo field
const UserEdit = ({ user, roles }: UserEditPageProps) => {
  const { register, handleSubmit, processing, onUserEdit } = useUserEdit(user)

  return (
    <Admin
      breadcrumbs={[
        {
          label: 'Users',
          url: route('admin.users.index')
        },
        {
          label: 'Edit',
          url: route('admin.users.edit', user.uuid)
        }
      ]}
    >
      <div className="w-full flex items-center justify-between mb-5">
        <div className="flex">
          <h1 className="font-semibold text-2xl text-gray-600">Edit user</h1>
        </div>
      </div>
      <Card>
        <CardBody>
          <form
            onSubmit={handleSubmit(onUserEdit)}
            className="w-full grid grid-cols-6 gap-2 auto-rows-max"
          >
            {/* <div className="col-span-4">
              <div className="text-gray-700 md:flex md:items-center">
                <div className="mb-1 md:mb-0 md:w-1/3">
                  <label className="block px-1 text-gray-500 text-base">
                    Profile photo
                  </label>
                </div>
                <div className="md:w-2/3 md:flex-grow">
                  <AvatarInput
                    src={user.profile_photo_url}
                    ref={register}
                    handleRemove={() => {}}
                    rounded
                  />
                </div>
              </div>
            </div>
            <div className="col-span-2"></div> */}
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
                Update
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </Admin>
  )
}

export default UserEdit
