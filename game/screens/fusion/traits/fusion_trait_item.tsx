import cn from 'classnames'
import s from './fusion_traits.module.scss'

type TraitItemProps = {
  className?: string
  valueClassName?: string
  type?: string
  value: string
}

const intCharacteristics = ['level', 'passionate', 'shy', 'emotional']

const TraitItem: React.FC<TraitItemProps> = ({
  className,
  valueClassName,
  type = '???',
  value,
}) => (
  <div className={cn(className, s.item)}>
    <span className={s.templateTrait}>{type}: </span>
    <span className={cn(s.traitValue, valueClassName)}>
      {intCharacteristics.includes(type) ? Number(value) + 1 : value}
    </span>
  </div>
)

export { TraitItem }
