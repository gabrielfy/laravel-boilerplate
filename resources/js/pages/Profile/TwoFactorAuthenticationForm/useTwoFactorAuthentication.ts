import { Inertia } from '@inertiajs/inertia'
import axios from 'axios'
import { useState } from 'react'

// TODO: Refactor
function useTwoFactorAuthentication() {
  const [recoveryCodes, setRecoveryCodes] = useState([])
  const [qrCode, setQrCode] = useState('')

  const showQrCode = async () => {
    return axios.get('/user/two-factor-qr-code').then(({ data }) => {
      setQrCode(data.svg)
    })
  }

  const showRecoveryCodes = async () => {
    return axios.get('/user/two-factor-recovery-codes').then(({ data }) => {
      setRecoveryCodes(data)
    })
  }

  const enableTwoFactorAuthentication = () => {
    Inertia.post(
      '/user/two-factor-authentication',
      {},
      {
        preserveScroll: true,
        onSuccess: () => Promise.all([showQrCode(), showRecoveryCodes()])
      }
    )
  }

  const regenerateRecoveryCodes = () => {
    axios.post('/user/two-factor-recovery-codes').then(() => {
      showRecoveryCodes()
    })
  }

  const disableTwoFactorAuthentication = () => {
    Inertia.delete('/user/two-factor-authentication', {
      preserveScroll: true
    })
  }

  return {
    recoveryCodes,
    qrCode,
    enableTwoFactorAuthentication,
    showQrCode,
    showRecoveryCodes,
    regenerateRecoveryCodes,
    disableTwoFactorAuthentication
  }
}

export default useTwoFactorAuthentication
