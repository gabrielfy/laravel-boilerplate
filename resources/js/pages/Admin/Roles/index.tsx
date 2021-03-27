import React from 'react'
import { Inertia } from '@inertiajs/inertia'
import { InertiaLink } from '@inertiajs/inertia-react'

import Admin from '@/containers/Admin'
import Pagination from '@/components/Pagination'
import Card, { CardBody } from '@/components/Card'
import SearchFilter from '@/components/SearchFilter'
import Badge from '@/components/Badge'
import Button from '@/components/Button'
import Table, {
  TableContainer,
  TableBody,
  TableHeader,
  TableFooter,
  TableCell,
  TableRow,
  TableActions
} from '@/components/Table'
import Swal from 'sweetalert2'

export type PermissionProps = {
  uuid: string
  name: string
}

export type RoleProps = {
  uuid: string
  name: string
  guard_name: string
  users: number
  permissions: Array<PermissionProps>
}

type RolesPageProps = {
  roles: DataWithPaginationProps<RoleProps>
}

const Roles = ({ roles }: RolesPageProps) => {
  const handleDelete = (uuid: string) => {
    Swal.fire({
      title: 'Delete role',
      text: 'Are you sure?',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        Inertia.delete(route('admin.roles.destroy', uuid))
      }
    })
  }

  return (
    <Admin
      breadcrumbs={[
        {
          label: 'Roles',
          url: route('admin.roles.index')
        }
      ]}
      actions={
        <Button as={InertiaLink} href={route('admin.roles.create')}>
          Create role
        </Button>
      }
    >
      <div className="w-full flex items-center justify-between mb-5">
        <div className="flex">
          <h1 className="font-semibold text-2xl text-gray-600">Roles</h1>
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
                  <TableCell>Guard name</TableCell>
                  <TableCell>Permissions</TableCell>
                  <TableCell>Users</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.data.map((role, index) => (
                  <TableRow key={index}>
                    <TableCell>{role.name}</TableCell>
                    <TableCell>{role.guard_name}</TableCell>
                    <TableCell>
                      {role.permissions.map((permission, index) => (
                        <Badge type="info" key={index}>
                          {permission}
                        </Badge>
                      ))}
                    </TableCell>

                    <TableCell>{role.users}</TableCell>
                    <TableCell>
                      <TableActions
                        editAction={() =>
                          Inertia.visit(route('admin.roles.edit', role.uuid))
                        }
                        deleteAction={() => handleDelete(role.uuid)}
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
