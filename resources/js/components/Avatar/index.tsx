import React, { ImgHTMLAttributes } from 'react'

import classNames from 'classnames'

type AvatarProps = {
  size?: 'small' | 'medium' | 'large'
  border?: boolean
} & ImgHTMLAttributes<HTMLImageElement>

const avatarModifiers = {
  size: (size: string) => {
    if (size === 'small') {
      return 'w-9 h-9'
    }

    if (size === 'large') {
      return 'w-11 h-11'
    }

    return `w-7 h-7`
  },
  border: () => 'ring-2 ring-white'
}

const Avatar = ({ size = 'small', border = false, ...props }: AvatarProps) => {
  const styles = classNames(
    'inline-block rounded-full',
    avatarModifiers.size(size),
    !!border && avatarModifiers.border()
  )
  return <img className={styles} {...props} />
}

export default Avatar
