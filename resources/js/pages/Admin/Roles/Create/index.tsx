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

import useRoleCreate from './useRoleCreate'

type RoleCreatePageProps = PermissionsGroupProps

const RoleCreate = ({ permissions }: RoleCreatePageProps) => {
  const { register, handleSubmit, onRoleCreate, processing } = useRoleCreate()

  return (
    <Admin
      breadcrumbs={[
        {
          label: 'Roles',
          url: route('admin.roles.index')
        },
        {
          label: 'Create',
          url: route('admin.roles.create')
        }
      ]}
    >
      <div className="w-full flex items-center justify-between mb-5">
        <div className="flex">
          <h1 className="font-semibold text-2xl text-gray-600">Create role</h1>
        </div>
      </div>
      <Card>
        <CardBody>
          <form
            onSubmit={handleSubmit(onRoleCreate)}
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
                Create
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </Admin>
  )
}

export default RoleCreate
