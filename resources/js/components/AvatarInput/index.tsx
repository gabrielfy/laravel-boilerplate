import React, { useState, forwardRef } from 'react'
import classNames from 'classnames'

import { MdCameraEnhance, MdClose } from 'react-icons/md'

type AvatarInputProps = {
  src: string
  remove?: boolean
  rounded?: boolean
  size?: 'small' | 'medium' | 'large'
  handleRemove: () => void
}

const avatarInputModifiers = {
  size: (size: string) => {
    if (size === 'small') {
      return 'h-20 w-20'
    }

    if (size === 'large') {
      return 'h-48 w-48'
    }

    // default: medium
    return 'h-32 w-32'
  },
  rounded: () => 'rounded-full'
}

const AvatarInput = forwardRef<HTMLInputElement, AvatarInputProps>(
  (
    {
      src,
      remove = false,
      rounded = false,
      size = 'medium',
      handleRemove = () => {}
    },
    ref
  ) => {
    const [show, setShow] = useState(false)

    const styles = classNames(
      'relative inline-block overflow-hidden group',
      !!size && avatarInputModifiers.size(size),
      !!rounded && avatarInputModifiers.rounded()
    )

    return (
      <div
        className={styles}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <input
          className="hidden"
          name="photo"
          id="photo"
          type="file"
          accept="image/*"
          ref={ref}
        />
        <img
          src={src}
          alt="Profile photo"
          className="h-full w-full object-cover"
        />
        <div
          className={classNames(
            'absolute top-0 h-full w-full bg-black bg-opacity-25 items-center justify-center',
            show ? 'flex' : 'hidden'
          )}
        >
          <label
            htmlFor="photo"
            className="cursor-pointer rounded-full hover:bg-white hover:bg-opacity-25 p-2 focus:outline-none text-white transition duration-200"
          >
            <MdCameraEnhance className="h-6 w-6" />
          </label>
          {!!remove && (
            <label
              className="cursor-pointer rounded-full hover:bg-white hover:bg-opacity-25 p-2 focus:outline-none text-white transition duration-200"
              onClick={handleRemove}
            >
              <MdClose className="h-6 w-6" />
            </label>
          )}
        </div>
      </div>
    )
  }
)

export default AvatarInput
