import React from 'react'
import _ from 'lodash'

import Admin from '@/containers/Admin'
import Card, { CardBody } from '@/components/Card'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Select, { SelectOption } from '@/components/Select'
import PermissionsGroup, {
  PermissionsGroupProps
} from '@/components/PermissionsGroup'

import useRoleEdit, { RoleEditProps } from './useRoleEdit'

type RoleEditPageProps = {
  role: RoleEditProps
} & PermissionsGroupProps

const RoleEdit = ({ role, permissions }: RoleEditPageProps) => {
  const { register, handleSubmit, onRoleEdit, processing } = useRoleEdit(role)

  return (
    <Admin
      breadcrumbs={[
        {
          label: 'Roles',
          url: route('admin.roles.index')
        },
        {
          label: 'Edit',
          url: route('admin.roles.edit', role.uuid)
        }
      ]}
    >
      <div className="w-full flex items-center justify-between mb-5">
        <div className="flex">
          <h1 className="font-semibold text-2xl text-gray-600">Edit role</h1>
        </div>
      </div>
      <Card>
        <CardBody>
          <form
            onSubmit={handleSubmit(onRoleEdit)}
            className="w-full grid grid-cols-6 gap-6 auto-rows-max"
          >
            <div className="col-span-4">
              <Input
                type="text"
                name="name"
                label="Name"
                ref={register}
                inline
              />
            </div>
            <div className="col-span-2"></div>
            <div className="col-span-4">
              <Select
                label="Guard name"
                name="guard_name"
                ref={register}
                inline
              >
                <SelectOption value="web">Web</SelectOption>
                <SelectOption value="api">Api</SelectOption>
              </Select>
            </div>
            <div className="col-span-2"></div>

            <PermissionsGroup permissions={permissions} ref={register} />

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

export default RoleEdit
