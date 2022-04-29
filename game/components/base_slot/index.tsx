import React from 'react'
import cn from 'classnames'

import s from './base_slot.module.scss'
import AddIcon from 'public/game/svg/slot_plus.svg'
import { Loader } from 'components/shared-ui/loader'

type BaseSlotProps = {
  children?: React.ReactNode
  overlayChildren?: React.ReactNode
  isEmpty?: boolean
  isLoading?: boolean
  contentClassName?: string
  isError: boolean
  onRetry: () => void
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const BaseSlot = ({
  className,
  children,
  isEmpty = false,
  overlayChildren,
  isLoading = false,
  isError,
  onRetry,
  contentClassName,
  ...props
}: BaseSlotProps) => {
  const isOverlayChildrenAvailable = () =>
    overlayChildren && !isLoading && !isEmpty && !isError

  return (
    <div className={cn(className, s.slot)} {...props}>
      <div className={s.background} />
      <div className={cn(s.content, contentClassName)}>
        <Loader isLoading={isLoading} isError={isError} onRetry={onRetry}>
          {isEmpty ? (
            <>
              <span className={s.empty_title}>EMPTY SLOT</span>
              <AddIcon className={s.empty_icon} />
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
