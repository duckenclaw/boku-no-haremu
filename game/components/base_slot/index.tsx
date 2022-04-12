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
  ...props
}: BaseSlotProps) => {
  return (
    <div className={cn(className, s.slot)} {...props}>
      <div className={s.background} />
      <div className={s.content}>
        <Loader isLoading={isLoading}>
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
      {overlayChildren && !isLoading && !isEmpty && (
        <div className={s.overlay}>{overlayChildren}</div>
      )}
    </div>
  )
}
