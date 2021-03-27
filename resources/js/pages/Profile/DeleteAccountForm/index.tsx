import Button from '@/components/Button'
import Input from '@/components/Input'
import Modal from '@/components/Modal'
import { useDisclosure } from '@/hooks'
import React, { useState } from 'react'
import { MdLockOutline } from 'react-icons/md'
import { toast } from 'react-toastify'
import { Inertia } from '@inertiajs/inertia'

// TODO:
const DeleteAccountForm = () => {
  const [password, setPassword] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleSubmit = () => {
    Inertia.post(
      route('current-user.destroy'),
      { _method: 'DELETE', password },
      {
        onError: (errors) => {
          for (const error in errors) {
            toast.error(errors[error])
          }
        }
      }
    )
  }
  return (
    <div className="space-y-4">
      <h1 className="font-semibold text-xl text-gray-600">Delete Account</h1>

      <p className="text-sm text-gray-600">Permanently delete your account.</p>

      <div className="text-sm text-gray-600">
        Once your account is deleted, all of its resources and data will be
        permanently deleted. Before deleting your account, please download any
        data or information that you wish to retain.
      </div>

      <div className="w-full flex justify-end">
        <Button color="danger" onClick={onOpen}>
          Delete Account
        </Button>
      </div>

      {/* TODO: submit on enter */}
      <Modal show={isOpen} title="Confirm passsword" handleClose={onClose}>
        <p className="text-gray-700 text-sm mb-6">
          Are you sure you want to delete your account? Once your account is
          deleted, all of its resources and data will be permanently deleted.
          Please enter your password to confirm you would like to permanently
          delete your account.
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
          <Button onClick={handleSubmit}>Delete Account</Button>
        </div>
      </Modal>
    </div>
  )
}

// current-user.destroy

export default DeleteAccountForm
