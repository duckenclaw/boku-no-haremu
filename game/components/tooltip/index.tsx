import ReactTooltip from 'react-tooltip'
import cn from 'classnames'
import s from './tooltip.module.scss'

type TooltipProps = {
  className?: string
} & React.ComponentProps<typeof ReactTooltip>

const Tooltip: React.FC<TooltipProps> = ({
  className,
  children,
  place,
  ...restProps
}) => {
  return (
    <ReactTooltip
      className={cn(className, s.tooltip)}
      {...restProps}
      place={place || 'bottom'}
      backgroundColor="#111622;"
    >
      {children}
    </ReactTooltip>
  )
}

Tooltip.displayName = 'LinkButton'

export { Tooltip }
