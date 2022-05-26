import React from 'react'
import cn from 'classnames'

import s from './base_slot.module.scss'
import AddIcon from 'public/game/svg/slot_plus.svg'
import { Loader } from 'components/shared-ui/loader'

type BaseSlotProps = {
  children?: React.ReactNode
  classes?: {
    container?: string
    content?: string
    emptyTitle?: string
    emptyIcon?: string
  }
  overlayChildren?: React.ReactNode
  isEmpty?: boolean
  isLoading?: boolean
  isError?: boolean
  onRetry?: () => void
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const BaseSlot = ({
  classes,
  className,
  children,
  isEmpty = false,
  overlayChildren,
  isLoading = false,
  isError,
  onRetry,
  ...props
}: BaseSlotProps) => {
  const isOverlayChildrenAvailable = () =>
    overlayChildren && !isLoading && !isEmpty && !isError

  return (
    <div className={cn(classes?.container, s.slot)} {...props}>
      <div className={s.background} />
      <div className={cn(s.content, classes?.content)}>
        <Loader isLoading={isLoading} isError={isError} onRetry={onRetry}>
          {isEmpty ? (
            <>
              <span className={cn(s.empty_title, classes?.emptyTitle)}>
                EMPTY SLOT
              </span>
              <AddIcon className={cn(s.empty_icon, classes?.emptyIcon)} />
            </>
          ) : (
            children
          )}
        </Loader>
      </div>
      {isOverlayChildrenAvailable() && (
        <div className={s.overlay}>{overlayChildren}</div>
      )}
    </div>
  )
}
