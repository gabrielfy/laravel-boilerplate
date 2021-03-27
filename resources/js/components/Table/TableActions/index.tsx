import React from 'react'
import { RiEyeLine, RiPencilLine } from 'react-icons/ri'
import { FiTrash2 } from 'react-icons/fi'
import { HiDotsVertical } from 'react-icons/hi'
import Button from '@/components/Button'
import Dropdown, {
  DropdownItemButton,
  DropdownList
} from '@/components/Dropdown'
import { MdRestore } from 'react-icons/md'

type TableActionsProps = {
  showAction?: () => void
  editAction?: () => void
  deleteAction?: () => void
  restoreAction?: () => void
  dropdown?: Array<{
    label: string
    show: boolean
    action: () => void
  }>
}

export const TableActions = ({
  showAction,
  editAction,
  deleteAction,
  restoreAction,
  dropdown
}: TableActionsProps) => {
  return (
    <div className="flex item-center">
      {!!showAction && (
        <Button
          variant="outline"
          className="border-none hover:bg-info hover:text-white"
          onClick={showAction}
        >
          <RiEyeLine />
        </Button>
      )}

      {!!editAction && (
        <Button
          variant="outline"
          className="border-none hover:bg-warning hover:text-white"
          onClick={editAction}
        >
          <RiPencilLine />
        </Button>
      )}

      {!!restoreAction && (
        <Button
          variant="outline"
          className="border-none hover:bg-info hover:text-white"
          onClick={restoreAction}
        >
          <MdRestore />
        </Button>
      )}

      {!!deleteAction && (
        <Button
          variant="outline"
          className="border-none hover:bg-danger hover:text-white"
          onClick={deleteAction}
        >
          <FiTrash2 />
        </Button>
      )}

      {!!dropdown && (
        <Dropdown
          title={
            <Button variant="outline" className="border-none">
              <HiDotsVertical />
            </Button>
          }
        >
          <DropdownList>
            {dropdown.map(({ label, action, show }, index) =>
              show ? (
                <DropdownItemButton onClick={action} key={index}>
                  {label}
                </DropdownItemButton>
              ) : null
            )}
          </DropdownList>
        </Dropdown>
      )}
    </div>
  )
}
