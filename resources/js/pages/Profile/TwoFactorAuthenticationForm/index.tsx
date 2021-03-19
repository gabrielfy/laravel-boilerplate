import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Inertia } from '@inertiajs/inertia'
import { useAuth } from '@/hooks'
import Button from '@/components/Button'
import ModalPasswordConfirmation from '@/components/ModalPasswordConfirmation'

// TODO:
const TwoFactorAuthenticationForm = () => {
  const { two_factor_enabled } = useAuth()
  const [recoveryCodes, setRecoveryCodes] = useState([])
  const [qrCode, setQrCode] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [action, setAction] = useState('')

  const actions = {
    enableTwoFactorAuthentication: () => {
      Inertia.post(
        '/user/two-factor-authentication',
        {},
        {
          preserveScroll: true,
          onSuccess: () =>
            Promise.all([actions.showQrCode(), actions.showRecoveryCodes()])
        }
      )
    },
    showQrCode: () => {
      return axios.get('/user/two-factor-qr-code').then((response) => {
        setQrCode(response.data.svg)
      })
    },
    showRecoveryCodes: () => {
      return axios.get('/user/two-factor-recovery-codes').then((response) => {
        setRecoveryCodes(response.data)
      })
    },
    regenerateRecoveryCodes: () => {
      axios.post('/user/two-factor-recovery-codes').then((_) => {
        actions.showRecoveryCodes()
      })
    },
    disableTwoFactorAuthentication: () => {
      Inertia.delete('/user/two-factor-authentication', {
        preserveScroll: true
      })
    }
  } as { [key: string]: () => void }

  const handleAction = (callback: string) => {
    setAction(callback)
    setIsOpen(true)
  }

  return (
    <div className="space-y-4">
      <ModalPasswordConfirmation
        handleCloseModal={() => setIsOpen(false)}
        isOpenModal={isOpen}
        confirmed={() => actions[action]()}
      />

      <h1 className="font-semibold text-xl text-gray-600">
        Two Factor Authentication
      </h1>

      <p className="text-sm text-gray-600">
        Add additional security to your account using two factor authentication.
      </p>

      <h3 className="text-lg font-medium text-gray-900">
        {two_factor_enabled
          ? 'You have enabled two factor authentication.'
          : 'You have not enabled two factor authentication.'}
      </h3>

      <div className="mt-3 max-w-xl text-sm text-gray-600">
        <p>
          When two factor authentication is enabled, you will be prompted for a
          secure, random token during authentication. You may retrieve this
          token from your phone's Google Authenticator application.
        </p>
      </div>

      {two_factor_enabled && (
        <div>
          {qrCode && (
            <div>
              <div className="mt-4 max-w-xl text-sm text-gray-600">
                <p className="font-semibold">
                  Two factor authentication is now enabled. Scan the following
                  QR code using your phone's authenticator application.
                </p>
              </div>

              <div
                className="mt-4 dark:p-4 dark:w-56 dark:bg-white"
                dangerouslySetInnerHTML={{ __html: qrCode }}
              ></div>
            </div>
          )}

          {recoveryCodes.length > 0 && (
            <div v-if="recoveryCodes.length > 0">
              <div className="mt-4 max-w-xl text-sm text-gray-600">
                <p className="font-semibold">
                  Store these recovery codes in a secure password manager. They
                  can be used to recover access to your account if your two
                  factor authentication device is lost.
                </p>
              </div>

              <div className="grid gap-1 max-w-xl mt-4 px-4 py-4 font-mono text-sm bg-gray-100 rounded-lg">
                {recoveryCodes.map((code, index) => (
                  <div key={index}>{code}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-5">
        {!two_factor_enabled && (
          <Button onClick={() => handleAction('enableTwoFactorAuthentication')}>
            Enable
          </Button>
        )}

        {two_factor_enabled && (
          <div>
            <Button
              type="button"
              onClick={() => handleAction('regenerateRecoveryCodes')}
            >
              Regenerate Recovery Codes
            </Button>
            <Button
              type="button"
              onClick={() => handleAction('showRecoveryCodes')}
            >
              Show Recovery Codes
            </Button>
            <Button
              type="button"
              onClick={() => handleAction('disableTwoFactorAuthentication')}
            >
              Disable
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TwoFactorAuthenticationForm
