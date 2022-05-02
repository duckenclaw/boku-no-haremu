import React, { useState } from 'react'

import { GameModal } from 'game/components/game_modal'
import { GameDialog } from 'game/components/game_dialog'

type ConfirmModalProps = {
  children?: React.ReactNode
  dialogChildren?: React.ReactNode
  isOpen?: boolean
  title?: string
  onClose?: () => void
  onConfirm?: () => Promise<any>
}

export const ConfirmModal = ({
  isOpen = false,
  dialogChildren,
  onClose,
  title,
  onConfirm,
  children,
}: ConfirmModalProps) => {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <>
      <GameModal
        isOpen={isOpen}
        onRequestClose={onClose}
        title={title}
        disabled={isLoading}
        showClose
      >
        {children}
      </GameModal>
      <GameDialog
        isOpen={isOpen && !isLoading}
        onOk={() => {
          if (onConfirm) {
            setIsLoading(true)
            onConfirm().finally(() => setIsLoading(false))
          }
        }}
        onCancel={onClose}
      >
        {dialogChildren}
      </GameDialog>
    </>
  )
}
