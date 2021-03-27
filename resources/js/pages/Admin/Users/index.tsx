import React from 'react'
import { Inertia } from '@inertiajs/inertia'
import { InertiaLink } from '@inertiajs/inertia-react'
import Swal from 'sweetalert2'

import Admin from '@/containers/Admin'
import Avatar from '@/components/Avatar'
import Badge from '@/components/Badge'
import Pagination from '@/components/Pagination'
import Card, { CardBody } from '@/components/Card'
import SearchFilter from '@/components/SearchFilter'
import Table, {
  TableContainer,
  TableBody,
  TableHeader,
  TableFooter,
  TableCell,
  TableRow,
  TableActions
} from '@/components/Table'
import Button from '@/components/Button'
import Dropdown, { DropdownItemLink, DropdownList } from '@/components/Dropdown'
import { HiDotsVertical } from 'react-icons/hi'

export type UserProps = {
  uuid: string
  first_name: string
  last_name: string
  email: string
  profile_photo_url: string
  two_factor_enabled: boolean
  is_active: boolean
  last_login_ip: string
  last_login_at: Date
  is_verified: boolean
  provider?: string
}

type UsersPageProps = {
  users: DataWithPaginationProps<UserProps>
}

const UsersActions = () => {
  return (
    <div className="flex items-center">
      <Button href={route('admin.users.create')} as={InertiaLink} color="info">
        Create user
      </Button>
      <Dropdown
        title={
          <Button variant="outline" className="border-none">
            <HiDotsVertical />
          </Button>
        }
      >
        <DropdownList>
          <DropdownItemLink href={route('admin.users.deleted')}>
            Deleted
          </DropdownItemLink>
        </DropdownList>
      </Dropdown>
    </div>
  )
}

const Users = ({ users }: UsersPageProps) => {
  const handleDelete = (uuid: string) => {
    Swal.fire({
      title: 'Delete user',
      text: 'Are you sure?',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        Inertia.delete(route('admin.users.destroy', uuid))
      }
    })
  }

  return (
    <Admin
      breadcrumbs={[
        {
          label: 'Users',
          url: route('admin.users.index')
        }
      ]}
      actions={<UsersActions />}
    >
      <div className="w-full flex items-center justify-between mb-5">
        <div className="flex">
          <h1 className="font-semibold text-2xl text-gray-600">Users</h1>
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
                  <TableCell>E-mail</TableCell>
                  <TableCell>2FA</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell>Provider</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.data.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center text-sm text-gray-600">
                        <Avatar src={user.profile_photo_url} alt="Judith" />
                        <span className="font-semibold ml-2">
                          {`${user.first_name} ${user.last_name}`}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="text-sm">{user.email}</span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        type={user.two_factor_enabled ? 'success' : 'danger'}
                      >
                        {user.two_factor_enabled ? 'Yes' : 'No'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge type={user.is_active ? 'success' : 'danger'}>
                        {user.is_active ? 'Yes' : 'No'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.provider ? (
                        user.provider
                      ) : (
                        <Badge type="danger">No</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <TableActions
                        showAction={() =>
                          Inertia.visit(route('admin.users.show', user.uuid))
                        }
                        editAction={() =>
                          Inertia.visit(route('admin.users.edit', user.uuid))
                        }
                        deleteAction={() => handleDelete(user.uuid)}
                        dropdown={[
                          {
                            label: 'Change password',
                            show: true,
                            action: () =>
                              Inertia.visit(
                                route('admin.users.change-password', user.uuid)
                              )
                          },
                          {
                            label: 'Deactivate',
                            show: user.is_active,
                            action: () =>
                              Inertia.post(
                                route('admin.users.deactivate', user.uuid)
                              )
                          },
                          {
                            label: 'Mark user as verified',
                            show: !user.is_verified,
                            action: () =>
                              Inertia.post(
                                route(
                                  'admin.users.confirm-email-verification',
                                  user.uuid
                                )
                              )
                          },
                          {
                            label: 'Mark user as unverified',
                            show: user.is_verified,
                            action: () =>
                              Inertia.post(
                                route(
                                  'admin.users.unconfirm-email-verification',
                                  user.uuid
                                )
                              )
                          },
                          {
                            // TODO: Error 404
                            label: 'Login as ' + user.first_name,
                            show: true,
                            action: () =>
                              Inertia.visit(route('impersonate', user.uuid))
                          },
                          {
                            label: 'Reactivate',
                            show: !user.is_active,
                            action: () =>
                              Inertia.post(
                                route('admin.users.reactivate', user.uuid),
                                {},
                                { preserveScroll: true, preserveState: true }
                              )
                          },
                          {
                            label: 'Resend verification email',
                            show: !user.is_verified,
                            action: () =>
                              Inertia.post(
                                route(
                                  'admin.users.resend-email-verification',
                                  user.uuid
                                )
                              )
                          }
                        ]}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TableFooter>
              <Pagination meta={users.meta} links={users.links} />
            </TableFooter>
          </TableContainer>
        </CardBody>
      </Card>
    </Admin>
  )
}

export default Users
