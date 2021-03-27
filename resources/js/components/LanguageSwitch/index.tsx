import React from 'react'
import _ from 'lodash'

import { usePage } from '@inertiajs/inertia-react'

import Dropdown, { DropdownList, DropdownItemLink } from '@/components/Dropdown'
import { APP_LANG } from '@/constants'

const LanguageSwitch = () => {
  const { appLang } = usePage().props
  const currentLang = APP_LANG[appLang]

  return (
    <Dropdown
      title={
        <button
          type="button"
          className="inline-flex items-center justify-items-center w-full rounded-md px-3 py-2 bg-white text-sm font-medium text-gray-700 md:hover:text-primary md:hover:bg-gray-100 focus:outline-none"
        >
          <img className="w-6 h-6 rounded-sm" src={currentLang.url} />
        </button>
      }
    >
      <DropdownList>
        {_.map(
          APP_LANG,
          (value, key) =>
            key !== appLang && (
              <DropdownItemLink
                href={route('locale.store', key)}
                className="flex items-center space-x-2"
                key={key}
              >
                <img className="w-6 h-6 rounded-sm" src={value.url} />
                <label className="cursor-pointer">{value.name}</label>
              </DropdownItemLink>
            )
        )}
      </DropdownList>
    </Dropdown>
  )
}

export default LanguageSwitch
