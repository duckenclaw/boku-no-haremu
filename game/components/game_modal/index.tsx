import Modal from 'react-modal'
import cn from 'classnames'

import s from './game_modal.module.scss'

import CrossIcon from 'public/game/svg/modal_cross.svg'
import { useRef } from 'react'

type GameModalProps = {
  title?: string
  disabled?: boolean
  showClose?: boolean
} & React.ComponentProps<typeof Modal>

export const GameModal: React.FC<GameModalProps> = ({
  children,
  title,
  disabled,
  showClose,
  ...modalProps
}) => {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <Modal
      {...modalProps}
      overlayClassName={s.overlay}
      bodyOpenClassName={s.bodyOpen}
      onAfterOpen={(obj) => {
        obj?.contentEl.focus()
      }}
      htmlOpenClassName={s.bodyOpen}
      portalClassName={s.portal}
      className={cn(modalProps.className, s.modal, { [s.disabled]: disabled })}
    >
      {title && <h1 className={s.title}>{title}</h1>}
      {children}
      {showClose && (
        <CrossIcon onClick={modalProps.onRequestClose} className={s.cross} />
      )}
    </Modal>
  )
}
