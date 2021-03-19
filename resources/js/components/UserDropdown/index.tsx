import React from 'react'

import Avatar from '@/components/Avatar'
import Dropdown, { DropdownItem, DropdownList } from '@/components/Dropdown'

import { useAuth } from '@/hooks'

const UserDropdown = () => {
  const { profile_photo_url, first_name } = useAuth()
  return (
    <Dropdown
      title={
        <button
          type="button"
          className="flex items-center justify-items-center w-full rounded-lg md:px-2 md:py-1 bg-white text-sm font-medium text-gray-700 md:hover:text-primary md:hover:bg-gray-100 focus:outline-none"
        >
          <label className="cursor-pointer hidden md:block pr-2">
            {first_name}
          </label>
          <Avatar src={profile_photo_url} alt={first_name} />
        </button>
      }
    >
      <DropdownList>
        <DropdownItem href={route('admin.dashboard')}>Admin</DropdownItem>
        <DropdownItem href={route('user-profile-information.index')}>
          Profile
        </DropdownItem>
      </DropdownList>
      <DropdownList>
        <DropdownItem href={route('logout')} as="button" method="post">
          Logout
        </DropdownItem>
      </DropdownList>
    </Dropdown>
  )
}

export default UserDropdown
