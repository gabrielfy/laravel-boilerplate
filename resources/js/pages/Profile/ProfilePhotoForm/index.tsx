import React, { useEffect, useRef } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { toast } from 'react-toastify'

import AvatarInput from '@/components/AvatarInput'
import { getRefElement } from '@/utils'
import { useAuth } from '@/hooks'

const ProfilePhotoForm = () => {
  const { profile_photo_path, profile_photo_url } = useAuth()
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // @ts-ignore
    getRefElement(ref)?.addEventListener('change', (e) => {
      const data = new FormData()
      data.append('_method', 'PUT')
      data.append('photo', e.target.files[0])

      Inertia.post(
        route('user-profile-information.upload-profile-photo'),
        data,
        {
          onError: (errors) => {
            for (const error in errors) {
              toast.error(errors[error])
            }
          },
          onSuccess: () => {
            toast.success('Profile picture successfully changed')
          }
        }
      )
    })
  }, [ref])

  const handleRemoveCallback = () => {
    Inertia.post(
      route('user-profile-information.delete-profile-photo'),
      {
        _method: 'PUT'
      },
      {
        onError: () => {
          toast.error('Error on removed profile picture')
        },
        onSuccess: () => {
          toast.success('Profile picture successfully removed')
        }
      }
    )
  }

  return (
    <div className="flex items-center justify-center">
      <AvatarInput
        src={profile_photo_url}
        remove={!!profile_photo_path}
        handleRemove={handleRemoveCallback}
        size="medium"
        ref={ref}
        rounded
      />
    </div>
  )
}

export default ProfilePhotoForm
