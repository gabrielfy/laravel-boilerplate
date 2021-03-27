import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Inertia } from '@inertiajs/inertia'
import { MdDesktopWindows, MdLockOutline, MdPhoneIphone } from 'react-icons/md'

import Button from '@/components/Button'
import Input from '@/components/Input'
import Modal from '@/components/Modal'
import { useDisclosure } from '@/hooks'

type SessionProps = {
  agent: {
    is_desktop: boolean
    platform: string
    browser: string
  }
  ip_address: string
  is_current_device: boolean
  last_active: string
}

export type LogoutOtherBrowserSessionsProps = {
  sessions?: Array<SessionProps>
}

const SessionItem = (session: SessionProps) => {
  return (
    <div className="flex items-center">
      <div>
        {session.agent.is_desktop ? (
          <MdDesktopWindows className="w-8 h-8 text-gray-500" />
        ) : (
          <MdPhoneIphone className="w-8 h-8 text-gray-500" />
        )}
      </div>

      <div className="ml-3">
        <div className="text-sm text-gray-600">
          {session.agent.platform} - {session.agent.browser}
        </div>

        <div>
          <div className="text-xs text-gray-500">
            {session.ip_address}
            {', '}
            {session.is_current_device ? (
              <span className="text-green-500 font-semibold">This device</span>
            ) : (
              <span>Last active {session.last_active}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const LogoutOtherBrowserSessionsForm = ({
  sessions
}: LogoutOtherBrowserSessionsProps) => {
  const [password, setPassword] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleSubmit = () => {
    Inertia.post(
      route('other-browser-sessions.destroy'),
      { password },
      {
        onError: (errors) => {
          for (const error in errors) {
            toast.error(errors[error])
          }
        },
        onSuccess: () => {
          onClose()
          // TODO: Change message
          toast.success('Done')
        }
      }
    )
  }

  return (
    <>
      <div className="space-y-4">
        <h1 className="font-semibold text-xl text-gray-600">
          Browser Sessions
        </h1>

        <p className="text-sm text-gray-600">
          Manage and log out your active sessions on other browsers and devices.
        </p>

        <div className="text-sm text-gray-600">
          If necessary, you may log out of all of your other browser sessions
          across all of your devices. Some of your recent sessions are listed
          below; however, this list may not be exhaustive. If you feel your
          account has been compromised, you should also update your password.
        </div>

        {sessions?.map((session: SessionProps, index: number) => (
          <SessionItem {...session} key={index} />
        ))}

        <div className="w-full flex justify-end">
          <Button type="submit" onClick={onOpen}>
            Logout other browser
          </Button>
        </div>

        {/* TODO: submit on enter */}
        <Modal show={isOpen} title="Confirm passsword" handleClose={onClose}>
          <p className="text-gray-700 text-sm mb-6">
            Please enter your password to confirm you would like to log out of
            your other browser sessions across all of your devices.
          </p>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6">
              <Input
                type="password"
                name="password"
                icon={<MdLockOutline />}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full inline-flex items-center justify-end mt-6 space-x-2">
            <Button type="submit" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Logout other browser</Button>
          </div>
        </Modal>
      </div>
    </>
  )
}

export default LogoutOtherBrowserSessionsForm
