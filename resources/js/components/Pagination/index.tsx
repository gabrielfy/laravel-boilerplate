import React from 'react'
import { InertiaLink } from '@inertiajs/inertia-react'

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

import Button from '@/components/Button'

const Pagination = ({ meta: { links, from, to, total } }: PaginationProps) => {
  return (
    <div className="flex flex-col justify-between text-xs sm:flex-row text-gray-600">
      <span className="flex items-center font-semibold tracking-wide uppercase">
        Showing {from} - {to} of {total}
      </span>

      <div className="flex mt-2 sm:mt-auto sm:justify-end">
        <nav aria-label="Pagination">
          <ul className="inline-flex items-center">
            {links?.map(({ label, url, active }, index) => (
              <React.Fragment key={index}>
                {index == 0 || index == links.length - 1 ? (
                  <li>
                    <Button
                      href={url}
                      as={url == null ? 'button' : InertiaLink}
                      variant="link"
                      disabled={url == null ? true : false}
                    >
                      {index == 0 ? (
                        <MdKeyboardArrowLeft />
                      ) : (
                        <MdKeyboardArrowRight />
                      )}
                    </Button>
                  </li>
                ) : (
                  <li>
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
                )}
              </React.Fragment>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Pagination
