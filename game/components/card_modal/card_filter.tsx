import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import { Button } from 'game/components/button'

import FilterIcon from 'public/game/svg/filter_icon.svg'
import s from './card_modal.module.scss'

type CardFilterProps = {
  className?: string
  children?: React.ReactNode
  contentClassName?: string
}

export const CardFilter = ({
  className,
  children,
  contentClassName,
}: CardFilterProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const cb = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!ref.current || ref.current.contains(target)) {
        return
      }
      setIsOpen(false)
    }
    window.addEventListener('click', cb, { passive: true })
    return () => window.removeEventListener('click', cb)
  }, [])
  return (
    <div className={cn(s.filter, className)} ref={ref}>
      <Button
        color="blue"
        size="small"
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <FilterIcon />
        FILTERS
      </Button>
      <div className={cn(s.dropdown, contentClassName, { [s.open]: isOpen })}>
        {children}
      </div>
    </div>
  )
}
