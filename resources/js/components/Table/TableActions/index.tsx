import React from 'react'
import { RiEyeLine, RiPencilLine } from 'react-icons/ri'
import { FiTrash2 } from 'react-icons/fi'
import { HiDotsVertical } from 'react-icons/hi'
import Button from '@/components/Button'
import Dropdown, { DropdownItem } from '@/components/Dropdown'

type TableActionsProps = {
  showAction?: () => void
  editAction?: () => void
  deleteAction?: () => void
  dropdown?: Array<{
    label: string
    action: () => void
  }>
}

export const TableActions = ({
  showAction,
  editAction,
  deleteAction,
  dropdown
}: TableActionsProps) => {
  return (
    <div className="flex item-center">
      {!!showAction && (
        <Button
          variant="outline"
          className="border-none hover:bg-blue-500 hover:text-white"
          onClick={showAction}
        >
          <RiEyeLine />
        </Button>
      )}

      {!!editAction && (
        <Button
          variant="outline"
          className="border-none hover:bg-yellow-500 hover:text-white"
          onClick={editAction}
        >
          <RiPencilLine />
        </Button>
      )}

      {!!deleteAction && (
        <Button
          variant="outline"
          className="border-none hover:bg-red-500 hover:text-white"
          onClick={deleteAction}
        >
          <FiTrash2 />
        </Button>
      )}

      {!!dropdown && (
        <Dropdown
          title={
            <Button
              variant="outline"
              className="border-none hover:bg-red-500 hover:text-white"
            >
              <HiDotsVertical />
            </Button>
          }
        >
          {/* TODO: */}
          {dropdown.map((item, index) => (
            <DropdownItem href="" key={index}>
              {item.label}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </div>
  )
}
