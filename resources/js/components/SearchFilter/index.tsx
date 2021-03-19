import React, { useState, useEffect } from 'react'
import { Inertia } from '@inertiajs/inertia'
import pickBy from 'lodash/pickBy'
import { MdSearch } from 'react-icons/md'

type SearchFilterProps = {
  defaultValue?: string
}

// TODO: refactoring
const SearchFilter = ({ defaultValue }: SearchFilterProps) => {
  const [values, setValues] = useState({
    search: defaultValue || ''
  })

  const fetchData = () => {
    const query = Object.keys(pickBy(values)).length
      ? pickBy(values)
      : { remember: 'forget' }
    Inertia.get(route(route().current()), query, {
      replace: true,
      preserveState: true
    })
  }

  useEffect(() => {
    if (defaultValue) {
      fetchData()
    }
  }, [])

  function handleChange(e: any) {
    const key = e.target.name
    const value = e.target.value

    setValues((values) => ({
      ...values,
      [key]: value
    }))
  }

  return (
    <div className="bg-white h-10 rounded-full flex items-center px-3 space-x-2 cursor-pointer">
      <input
        className="bg-transparent text-sm border-none text-gray-700 ring-0 focus:outline-none placeholder-gray-500"
        value={values.search}
        name="search"
        autoComplete="off"
        onChange={handleChange}
        placeholder="Search"
      />
      <MdSearch className="text-gray-600 w-6 h-6" onClick={fetchData} />
    </div>
  )
}

export default SearchFilter
