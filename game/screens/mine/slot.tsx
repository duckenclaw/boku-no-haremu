import cn from 'classnames'
import s from './mine.module.scss'

type SlotProps = {
  className?: string
  asset_id?: string
  isTaken?: boolean
  isLoading?: boolean
  onPlaceCard?: () => void
}

export const Slot = ({
  className,
  isTaken = false,
  isLoading = false,
  onPlaceCard,
}: SlotProps) => {
  return (
    <div
      className={cn(className, s.slot)}
      onClick={isTaken ? undefined : onPlaceCard}
    >
      <div className={s.background} />
      <div className={s.content}>
        {isLoading && <>...</>}
        {isTaken ? (
          <></>
        ) : (
          <>
            <span>EMPTY SLOT</span>
            <div>+</div>
          </>
        )}
      </div>
    </div>
  )
}
