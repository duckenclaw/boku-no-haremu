import Modal from 'react-modal'
import cn from 'classnames'

import s from './game_modal.module.scss'

type GameModalProps = { title?: string } & React.ComponentProps<typeof Modal>

export const GameModal: React.FC<GameModalProps> = ({
  children,
  title,
  ...modalProps
}) => {
  return (
    <Modal
      {...modalProps}
      style={{
        overlay: {
          zIndex: 2000,
        },
      }}
      shouldFocusAfterRender={true}
      preventScroll={true}
      className={cn(modalProps.className, s.modal)}
    >
      {title && <h1 className={s.title}>{title}</h1>}
      {children}
    </Modal>
  )
}
