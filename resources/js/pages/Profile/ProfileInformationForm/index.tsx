import React from 'react'
import { MdMailOutline, MdPersonOutline } from 'react-icons/md'

import Button from '@/components/Button'
import Input from '@/components/Input'

import useProfileInformation from './useProfileInformation'
import ProfilePhoto from '../ProfilePhotoForm'

const ProfileInformationForm = () => {
  const {
    register,
    onProfileInformation,
    handleSubmit,
    processing
  } = useProfileInformation()

  return (
    <div className="space-y-4">
      <h1 className="font-semibold text-xl text-gray-600">
        Profile information
      </h1>
      <div className="mb-10">
        <ProfilePhoto />
      </div>

      <form onSubmit={handleSubmit(onProfileInformation)}>
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <Input
              type="text"
              name="first_name"
              label="First name"
              icon={<MdPersonOutline />}
              ref={register}
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <Input
              type="text"
              name="last_name"
              label="Last name"
              icon={<MdPersonOutline />}
              ref={register}
            />
          </div>
          <div className="col-span-6">
            <Input
              type="text"
              name="email"
              label="E-mail"
              helperText="lorem ipsulum dolores"
              icon={<MdMailOutline />}
              ref={register}
            />
          </div>
          <div className="col-start-6">
            <Button type="submit" disabled={processing} block>
              Update
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ProfileInformationForm
