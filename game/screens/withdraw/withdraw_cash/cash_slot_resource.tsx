import cn from 'classnames'
import { Image } from 'components/shared-ui/image'
import { ipfsToS3Url, ipfsToUrlSafe } from 'utils'
import { ResourceType } from '..'
import { WithdrawSlot } from '../withdraw_slot'
import s from './withdraw_cash.module.scss'

type CashSlotResourceProps = {
  className?: string
  resource?: ResourceType
  banknote?: AtomicAsset
}

const CashSlotResource: React.FC<CashSlotResourceProps> = ({
  className,
  resource,
  banknote,
}) => {
  return (
    <WithdrawSlot className={s.cashSlot} isEmpty={false}>
      {resource?.image && (
        <>
          <Image
            className={s.resourceImage}
            src={resource.image}
            alt={resource?.name}
          />
          <div className={s.slotText}>{banknote?.immutable_data?.name}</div>
        </>
      )}
    </WithdrawSlot>
  )
}

export { CashSlotResource }
