import cn from 'classnames'
import { Button } from 'game/components/button'
import s from './withdraw.module.scss'
import { Banknote } from './withdraw_slot_banknote'

type WithdrawBanknoteValuesProps = {
  className?: string
  banknotes: Banknote[]
  setCurrentBanknote: (banknote: Banknote) => void
  currentBanknote?: Banknote | null
}

const WithdrawBanknoteValues: React.FC<WithdrawBanknoteValuesProps> = ({
  className,
  banknotes,
  setCurrentBanknote,
  currentBanknote,
}) => {
  return (
    <div className={cn(s.banknoteValues, className)}>
      {banknotes.map((item) => (
        <Button
          className={cn(s.banknoteValueButton)}
          size="xsmall"
          color={
            currentBanknote?.template_id === item.template_id
              ? 'purple'
              : 'blue'
          }
          onClick={() => setCurrentBanknote(item)}
          key={item.template_id}
        >
          {item.value}
        </Button>
      ))}
    </div>
  )
}

export { WithdrawBanknoteValues }
