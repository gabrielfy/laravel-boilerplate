import React, { useState } from 'react'

import Button from '@/components/Button'
import ModalPasswordConfirmation from '@/components/ModalPasswordConfirmation'

import { useAuth, useDisclosure } from '@/hooks'
import useTwoFactorAuthentication from './useTwoFactorAuthentication'

// TODO:
const TwoFactorAuthenticationForm = () => {
  const [action, setAction] = useState('')
  const { two_factor_enabled } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { qrCode, recoveryCodes, ...actions } = useTwoFactorAuthentication()

  const onOpenModal = (callback: string) => {
    setAction(callback)
    onOpen()
  }

  const onConfirmed = () => {
    switch (action) {
      case 'enableTwoFactorAuthentication':
        actions.enableTwoFactorAuthentication()
        break
      case 'disableTwoFactorAuthentication':
        actions.disableTwoFactorAuthentication()
        break
      case 'regenerateRecoveryCodes':
        actions.regenerateRecoveryCodes()
        break
      case 'showQrCode':
        actions.showQrCode()
        break
      case 'showRecoveryCodes':
        actions.showRecoveryCodes()
        break
    }
  }

  return (
    <div className="space-y-4">
      <ModalPasswordConfirmation
        handleCloseModal={onClose}
        isOpenModal={isOpen}
        confirmed={onConfirmed}
      />

      <h1 className="font-semibold text-xl text-gray-600">
        Two Factor Authentication
      </h1>

      <p className="text-sm text-gray-600">
        Add additional security to your account using two factor authentication.
      </p>

      <div className="text-sm text-gray-600">
        When two factor authentication is enabled, you will be prompted for a
        secure, random token during authentication. You may retrieve this token
        from your phone's Google Authenticator application.
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

      <div className="w-full flex justify-end">
        <div className="space-x-4">
          {!two_factor_enabled && (
            <Button
              onClick={() => onOpenModal('enableTwoFactorAuthentication')}
            >
              Enable
            </Button>
          )}

          {two_factor_enabled && (
            <>
              {recoveryCodes.length > 0 ? (
                <Button
                  type="button"
                  onClick={() => onOpenModal('regenerateRecoveryCodes')}
                >
                  Regenerate Recovery Codes
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => onOpenModal('showRecoveryCodes')}
                >
                  Show Recovery Codes
                </Button>
              )}

              <Button
                type="button"
                color="danger"
                onClick={() => onOpenModal('disableTwoFactorAuthentication')}
              >
                Disable
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default TwoFactorAuthenticationForm
