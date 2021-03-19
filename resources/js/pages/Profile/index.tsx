import React, { useState } from 'react'

import App from '@/containers/App'

import Card, { CardBody } from '@/components/Card'
import Menu, { MenuItem, MenuLabel } from '@/components/Menu'

import ProfileInformationForm from './ProfileInformationForm'
import UpdatePasswordForm from './UpdatePasswordForm'
import TwoFactorAuthenticationForm from './TwoFactorAuthenticationForm'
import DeleteAccountForm from './DeleteAccountForm'
import LogoutOtherBrowserSessionsForm, {
  LogoutOtherBrowserSessionsProps
} from './LogoutOtherBrowserSessionsForm'

type ProfileTypes = LogoutOtherBrowserSessionsProps

const Profile = ({ sessions }: ProfileTypes) => {
  const [tabSelected, setTabSelected] = useState(0)

  return (
    <App>
      <div className="grid grid-cols-6 gap-4">
        <div className="col-start-2 col-span-1">
          <Card>
            <CardBody>
              <Menu>
                <MenuLabel name="Account" />
                <MenuItem
                  onClick={() => setTabSelected(0)}
                  active={tabSelected == 0}
                >
                  Profile Information
                </MenuItem>
                <MenuItem
                  onClick={() => setTabSelected(1)}
                  active={tabSelected == 1}
                >
                  Update Password
                </MenuItem>
                <MenuItem
                  onClick={() => setTabSelected(2)}
                  active={tabSelected == 2}
                >
                  Browser Sessions
                </MenuItem>
                <MenuItem
                  onClick={() => setTabSelected(3)}
                  active={tabSelected == 3}
                >
                  Two Factor Authentication
                </MenuItem>
                <MenuItem
                  onClick={() => setTabSelected(4)}
                  active={tabSelected == 4}
                >
                  Delete Account
                </MenuItem>
              </Menu>
            </CardBody>
          </Card>
        </div>
        <div className="col-span-3">
          <Card className="">
            <CardBody>
              {tabSelected == 0 && <ProfileInformationForm />}
              {tabSelected == 1 && <UpdatePasswordForm />}
              {tabSelected == 2 && (
                <LogoutOtherBrowserSessionsForm sessions={sessions} />
              )}
              {tabSelected == 3 && <TwoFactorAuthenticationForm />}
              {tabSelected == 4 && <DeleteAccountForm />}
            </CardBody>
          </Card>
        </div>
      </div>
    </App>
  )
}

export default Profile
