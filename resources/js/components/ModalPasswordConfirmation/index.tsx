import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { MdLockOutline } from 'react-icons/md'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Modal from '@/components/Modal'
import { toast } from 'react-toastify'

type ModalPasswordConfirmationProps = {
  isOpenModal: boolean
  textConfirmButton?: string
  textCancelButton?: string
  textBody?: string
  title?: string
  handleCloseModal: () => void
  confirmed: () => void
}

// TODO: Add submit form on enter
const ModalPasswordConfirmation = ({
  isOpenModal,
  handleCloseModal,
  confirmed,
  textCancelButton = 'Nevermind',
  textConfirmButton = 'Confirm',
  title = 'Confirm password',
  textBody
}: ModalPasswordConfirmationProps) => {
  const [password, setPassword] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const checkIfConfirmingPassword = async () => {
    const response = await axios.get(route('password.confirmation'))
    return response.data.confirmed
  }

  const handleSubmit = () => {
    axios
      .post(route('password.confirm'), {
        password
      })
      .then(() => {
        confirmed()
      })
      .catch(({ response }) => {
        // TODO:
        toast.error(response.data.errors['password'][0])
      })
  }

  const handleClose = () => {
    setIsOpen(false)
    handleCloseModal()
  }

  useEffect(() => {
    // TODO: chando 2 vezes
    async function start() {
      if (await checkIfConfirmingPassword()) {
        confirmed()
        handleClose() // ...
      } else {
        setIsOpen(true)
      }
    }

    if (isOpenModal) {
      start()
    }
  })

  return (
    <Modal show={isOpen} title={title} handleClose={handleClose}>
      {!!textBody && <p className="text-gray-700 text-sm mb-6">{textBody}</p>}
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
        <Button type="submit" variant="outline" onClick={handleClose}>
          {textCancelButton}
        </Button>
        <Button onClick={handleSubmit}>{textConfirmButton}</Button>
      </div>
    </Modal>
  )
}

export default ModalPasswordConfirmation
