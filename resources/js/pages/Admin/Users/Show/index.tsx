import React from 'react'
import { InertiaLink } from '@inertiajs/inertia-react'

import Admin from '@/containers/Admin'
import Card, { CardBody } from '@/components/Card'
import Avatar from '@/components/Avatar'
import Badge from '@/components/Badge'
import Button from '@/components/Button'
import { RiPencilLine } from 'react-icons/ri'
import Table, {
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@/components/Table'

import { UserProps } from '../index'

type UserShowProps = {
  user: {
    data: UserProps
  }
}

const UserShow = ({ user: { data } }: UserShowProps) => {
  return (
    <Admin
      breadcrumbs={[
        {
          label: 'Users',
          url: route('admin.users.index')
        },
        {
          label: 'Show',
          url: route('admin.users.index')
        }
      ]}
      actions={
        <Button
          as={InertiaLink}
          href={route('admin.users.edit', data.uuid)}
          iconLeft={<RiPencilLine />}
        >
          Edit
        </Button>
      }
    >
      <div className="w-full flex items-center justify-between mb-5">
        <div className="flex">
          <h1 className="font-semibold text-2xl text-gray-700">Users</h1>
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
                      src={data.profile_photo_url}
                      size="large"
                      alt="Judith"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{`${data.first_name} ${data.last_name}`}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>E-mail</TableCell>
                  <TableCell>{data.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Active</TableCell>
                  <TableCell>
                    <Badge type={data.is_active ? 'success' : 'danger'}>
                      {data.is_active ? 'Yes' : 'No'}
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Verified</TableCell>
                  <TableCell>
                    <Badge type={data.is_verified ? 'success' : 'danger'}>
                      {data.is_verified ? 'Yes' : 'No'}
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2FA</TableCell>
                  <TableCell>
                    <Badge
                      type={data.two_factor_enabled ? 'success' : 'danger'}
                    >
                      {data.two_factor_enabled ? 'Yes' : 'No'}
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Provider</TableCell>
                  <TableCell>
                    {data.provider ? (
                      data.provider
                    ) : (
                      <Badge type="danger">No</Badge>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Last login ip</TableCell>
                  <TableCell>{data.last_login_ip || '-'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Last login</TableCell>
                  <TableCell>{data.last_login_at || '-'}</TableCell>
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
