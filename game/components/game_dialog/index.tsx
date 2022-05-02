import React from 'react'
import { useTransition, animated } from '@react-spring/web'
import { SkewButton } from 'game/components/button'
import s from './game_dialog.module.scss'

type GameDialogProps = {
  children?: React.ReactNode
  isOpen?: boolean
  onOk?: () => void
  onCancel?: () => void
  onClickOutside?: () => void
}

export const GameDialog = ({
  children,
  onOk,
  onCancel,
  isOpen,
}: GameDialogProps) => {
  const transitions = useTransition(isOpen, {
    from: { opacity: 0, translateY: '100%', translateX: '-50%' },
    enter: { opacity: 1, translateY: '0', translateX: '-50%' },
    leave: { opacity: 0, translateY: '100%', translateX: '-50%' },
  })
  return transitions(
    ({ opacity, translateY, translateX }, isOpen) =>
      isOpen && (
        <animated.div
          style={{ opacity, translateY, translateX }}
          className={s.dialog}
        >
          <div className={s.content}>{children}</div>
          <div className={s.buttons}>
            {onOk && <SkewButton onClick={onOk}>OK</SkewButton>}
            {onCancel && (
              <SkewButton onClick={onCancel} mirror>
                Cancel
              </SkewButton>
            )}
          </div>
        </animated.div>
      )
  )
}
