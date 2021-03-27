import React from 'react'
import { InertiaLink } from '@inertiajs/inertia-react'

import Admin from '@/containers/Admin'
import Card, { CardBody } from '@/components/Card'
import Avatar from '@/components/Avatar'
import Badge from '@/components/Badge'
import Button from '@/components/Button'
import Table, {
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@/components/Table'

import { UserProps } from '../index'

type UserShowPageProps = {
  user: UserProps
}

const UserShow = ({ user }: UserShowPageProps) => {
  return (
    <Admin
      breadcrumbs={[
        {
          label: 'Users',
          url: route('admin.users.index')
        },
        {
          label: 'Show',
          url: route('admin.users.show', user.uuid)
        }
      ]}
      actions={
        <Button
          as={InertiaLink}
          href={route('admin.users.edit', user.uuid)}
          color="info"
        >
          Edit user
        </Button>
      }
    >
      <div className="w-full flex items-center justify-between mb-5">
        <div className="flex">
          <h1 className="font-semibold text-2xl text-gray-600">Show user</h1>
        </div>
      </div>
      <Card>
        <CardBody>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Profile photo</TableCell>
                  <TableCell>
                    <Avatar
                      src={user.profile_photo_url}
                      size="large"
                      alt="Profile photo"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{`${user.first_name} ${user.last_name}`}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>E-mail</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Active</TableCell>
                  <TableCell>
                    <Badge type={user.is_active ? 'success' : 'danger'}>
                      {user.is_active ? 'Yes' : 'No'}
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Verified</TableCell>
                  <TableCell>
                    <Badge type={user.is_verified ? 'success' : 'danger'}>
                      {user.is_verified ? 'Yes' : 'No'}
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2FA</TableCell>
                  <TableCell>
                    <Badge
                      type={user.two_factor_enabled ? 'success' : 'danger'}
                    >
                      {user.two_factor_enabled ? 'Yes' : 'No'}
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Provider</TableCell>
                  <TableCell>
                    {user.provider ? (
                      user.provider
                    ) : (
                      <Badge type="danger">No</Badge>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Last login ip</TableCell>
                  <TableCell>{user.last_login_ip || '-'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Last login</TableCell>
                  <TableCell>{user.last_login_at || '-'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </Admin>
  )
}

export default UserShow
