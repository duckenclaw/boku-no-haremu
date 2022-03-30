import Modal from 'react-modal'
import cn from 'classnames'

import s from './game_modal.module.scss'
type GameModalProps = {} & React.ComponentProps<typeof Modal>

export const GameModal: React.FC<GameModalProps> = ({
  children,
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
      {children}
    </Modal>
  )
}
