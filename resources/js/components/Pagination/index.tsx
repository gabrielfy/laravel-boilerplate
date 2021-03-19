import React from 'react'
import Button from '../Button'
import { InertiaLink } from '@inertiajs/inertia-react'

// TODO:
const Pagination = ({ meta: { links, from, to, total } }: PaginationProps) => {
  return (
    <div className="flex flex-col justify-between text-xs sm:flex-row text-gray-600">
      <span className="flex items-center font-semibold tracking-wide uppercase">
        Showing {from} - {to} of {total}
      </span>

      <div className="flex mt-2 sm:mt-auto sm:justify-end">
        <nav aria-label="Pagination">
          <ul className="inline-flex items-center">
            {/* <li>
              <NavigationButton
                directionIcon="prev"
                disabled={activePage === FIRST_PAGE}
                onClick={handlePreviousClick}
              />
            </li> */}
            {links?.map(({ label, url, active }, index) => (
              <li key={index}>
                {label == '...' ? (
                  <span className="px-2 py-1">...</span>
                ) : (
                  <Button
                    href={url}
                    as={InertiaLink}
                    variant={active ? undefined : 'link'}
                    disabled={
                      active && (index == 1 || index - 2 == links.length)
                    }
                  >
                    {label}
                  </Button>
                )}
              </li>
            ))}
            {/* <li>
              <NavigationButton
                directionIcon="next"
                disabled={activePage === LAST_PAGE}
                onClick={handleNextClick}
              />
            </li> */}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Pagination
