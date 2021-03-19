import React from 'react'
import { Inertia } from '@inertiajs/inertia'
import { InertiaLink } from '@inertiajs/inertia-react'

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
import { BsPlus } from 'react-icons/bs'

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

type UsersProps = {
  users: DataWithPaginationProps<UserProps>
}

const Users = ({ users }: UsersProps) => {
  return (
    <Admin
      breadcrumbs={[
        {
          label: 'Users',
          url: route('admin.users.index')
        }
      ]}
      actions={
        <Button
          as={InertiaLink}
          href={route('admin.users.create')}
          iconLeft={<BsPlus />}
        >
          Create
        </Button>
      }
    >
      <div className="w-full flex items-center justify-between mb-5">
        <div className="flex">
          <h1 className="font-semibold text-2xl text-gray-700">Users</h1>
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
                      <div className="flex items-center text-sm">
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
                        deleteAction={() => console.log(user)}
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
