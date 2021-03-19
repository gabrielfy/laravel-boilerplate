import React from 'react'
import { MdClose } from 'react-icons/md'
import Transition from '../Transition'

type ModalProps = {
  children: React.ReactNode
  title?: string
  show?: boolean
  handleClose?: () => void
}

const Modal = ({
  children,
  show = false,
  title,
  handleClose = () => {}
}: ModalProps) => {
  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        !show && 'pointer-events-none'
      }`}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Transition */}
        <Transition
          show={show}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div
              className="absolute inset-0 bg-gray-500 opacity-75"
              onClick={handleClose}
            ></div>
          </div>
        </Transition>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <Transition
          show={show}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            className="bg-white inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              {!!title && (
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {title}
                  </h3>
                  <span
                    className="cursor-pointer text-gray-900"
                    onClick={handleClose}
                  >
                    <MdClose className="w-6 h-6" />
                  </span>
                </div>
              )}
              {children}
            </div>
          </div>
        </Transition>
      </div>
    </div>
  )
}

export default Modal
