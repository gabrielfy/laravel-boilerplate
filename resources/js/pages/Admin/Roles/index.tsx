import React from 'react'
import { Inertia } from '@inertiajs/inertia'
import { InertiaLink } from '@inertiajs/inertia-react'

import Admin from '@/containers/Admin'
import Pagination from '@/components/Pagination'
import Card, { CardBody } from '@/components/Card'
import SearchFilter from '@/components/SearchFilter'
import Badge from '@/components/Badge'
import Button from '@/components/Button'
import { BsPlus } from 'react-icons/bs'
import Table, {
  TableContainer,
  TableBody,
  TableHeader,
  TableFooter,
  TableCell,
  TableRow,
  TableActions
} from '@/components/Table'

export type PermissionProps = {
  uuid: string
  name: string
}

export type RoleProps = {
  uuid: string
  name: string
  number_users: number
  permissions: Array<PermissionProps>
}

type RolesProps = {
  roles: DataWithPaginationProps<RoleProps>
}

const Roles = ({ roles }: RolesProps) => {
  return (
    <Admin
      breadcrumbs={[
        {
          label: 'Roles',
          url: route('admin.roles.index')
        }
      ]}
      actions={
        <Button
          as={InertiaLink}
          href={route('admin.roles.create')}
          iconLeft={<BsPlus />}
        >
          Create
        </Button>
      }
    >
      <div className="w-full flex items-center justify-between mb-5">
        <div className="flex">
          <h1 className="font-semibold text-2xl text-gray-700">Roles</h1>
        </div>
        <div className="flex">
          <SearchFilter />
        </div>
      </div>
      <Card>
        <CardBody>
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Permissions</TableCell>
                  <TableCell>Number of users</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.data.map((role, index) => (
                  <TableRow key={index}>
                    <TableCell>{role.name}</TableCell>
                    <TableCell>
                      {role.permissions.map((permission, index) => (
                        <Badge type="info" key={index}>
                          {permission.name}
                        </Badge>
                      ))}
                    </TableCell>

                    <TableCell>{role.number_users}</TableCell>
                    <TableCell>
                      <TableActions
                        editAction={() =>
                          Inertia.visit(route('admin.roles.edit', role.uuid))
                        }
                        deleteAction={() => {}}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TableFooter>
              <Pagination meta={roles.meta} links={roles.links} />
            </TableFooter>
          </TableContainer>
        </CardBody>
      </Card>
    </Admin>
  )
}

export default Roles
