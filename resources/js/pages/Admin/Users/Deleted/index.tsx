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
import { UserProps } from '../index'
import Dropdown, { DropdownItemLink, DropdownList } from '@/components/Dropdown'
import Button from '@/components/Button'
import { HiDotsVertical } from 'react-icons/hi'

type UsersDeletedPageProps = {
  users: DataWithPaginationProps<UserProps>
}

const UsersDeletedActions = () => {
  return (
    <Dropdown
      title={
        <Button variant="outline" className="border-none">
          <HiDotsVertical />
        </Button>
      }
    >
      <DropdownList>
        <DropdownItemLink href={route('admin.users.index')}>
          Users
        </DropdownItemLink>
      </DropdownList>
    </Dropdown>
  )
}

const UsersDeleted = ({ users }: UsersDeletedPageProps) => {
  const handlePermanentlyDelete = (uuid: string) => {
    Swal.fire({
      title: 'Permanently delete user',
      text: 'Are you sure?',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        Inertia.delete(route('admin.users.permanently-delete', uuid))
      }
    })
  }

  const handleRestore = (uuid: string) => {
    Swal.fire({
      title: 'Restore this user',
      text: 'Are you sure?',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        Inertia.post(route('admin.users.restore', uuid))
      }
    })
  }

  return (
    <Admin
      breadcrumbs={[
        {
          label: 'Users',
          url: route('admin.users.index')
        },
        {
          label: 'Deleted',
          url: route('admin.users.deleted')
        }
      ]}
      actions={<UsersDeletedActions />}
    >
      <div className="w-full flex items-center justify-between mb-5">
        <div className="flex">
          <h1 className="font-semibold text-2xl text-gray-600">
            Users deleted
          </h1>
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
                        restoreAction={() => handleRestore(user.uuid)}
                        deleteAction={() => handlePermanentlyDelete(user.uuid)}
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

export default UsersDeleted
