import React, { useEffect, useRef } from 'react'
import { useTransition, animated } from '@react-spring/web'
import { SkewButton } from 'game/components/button'
import s from './game_dialog.module.scss'

type GameDialogProps = {
  children?: React.ReactNode
  isOpen?: boolean
  onOk?: () => void
  okLabel?: string
  cancelLabel?: string
  onCancel?: () => void
  onClickOutside?: () => void
}

export const GameDialog = ({
  children,
  onOk,
  onCancel,
  isOpen,
  okLabel,
  cancelLabel,
  onClickOutside,
}: GameDialogProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const transitions = useTransition(isOpen, {
    from: { opacity: 0, translateY: '100%', translateX: '-50%' },
    enter: { opacity: 1, translateY: '0', translateX: '-50%' },
    leave: { opacity: 0, translateY: '100%', translateX: '-50%' },
  })

  useEffect(() => {
    if (onClickOutside) {
      const cb = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        if (!ref.current || ref.current.contains(target)) {
          return
        }
        onClickOutside?.()
      }
      window.addEventListener('click', cb, { passive: true })
      return () => window.removeEventListener('click', cb)
    }
  }, [onClickOutside])

  return transitions(
    ({ opacity, translateY, translateX }, isOpen) =>
      isOpen && (
        <animated.div
          ref={ref}
          style={{ opacity, translateY, translateX }}
          className={s.dialog}
        >
          <div className={s.content}>{children}</div>
          <div className={s.buttons}>
            {onOk && <SkewButton onClick={onOk}>{okLabel ?? 'OK'}</SkewButton>}
            {onCancel && (
              <SkewButton onClick={onCancel} mirror>
                {cancelLabel ?? 'Cancel'}
              </SkewButton>
            )}
          </div>
        </animated.div>
      )
  )
}
