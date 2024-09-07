import { ReactNode } from 'react'

export default function Modal({ children }: { children: ReactNode }) {
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">{children}</div>
    </dialog>
  )
}
