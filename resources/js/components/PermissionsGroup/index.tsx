import React, { forwardRef } from 'react'
import _ from 'lodash'

import Checkbox from '@/components/Checkbox'

export type PermissionsGroupProps = {
  permissions: {
    [key: string]: Array<{
      disabled?: boolean
      name: string
      uuid: string
      gard_name: string
      group: string
    }>
  }
  defaultDisabled?: Array<string>
}

const PermissionsGroup = forwardRef<HTMLInputElement, PermissionsGroupProps>(
  ({ permissions, defaultDisabled = [] }, ref) => {
    return (
      <>
        <div className="col-span-4">
          <div className="text-gray-700 md:flex md:items-start">
            <div className="mb-1 md:mb-0 md:w-1/3">
              <label className="block px-1 text-gray-500 text-base">
                Permissions
              </label>
            </div>
            <div className="md:w-2/3 md:flex-grow">
              <div className="grid grid-cols-2 gap-6">
                {_.map(permissions, (value, key) => (
                  <div className="col-span-1" key={key}>
                    <h1 className="font-semibold text-xl text-gray-600 mb-2">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </h1>
                    <div>
                      {value.map(({ name, uuid }) => (
                        <Checkbox
                          name="permissions[]"
                          value={name}
                          id={uuid}
                          key={uuid}
                          ref={ref}
                          disabled={defaultDisabled.indexOf(name) > -1}
                        >
                          {name}
                        </Checkbox>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2"></div>
      </>
    )
  }
)

export default PermissionsGroup
