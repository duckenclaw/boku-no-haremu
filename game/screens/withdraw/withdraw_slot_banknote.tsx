import cn from 'classnames'
import { BaseSlot } from 'game/components/base_slot'
import { useGetAllBanknotesTemplates } from 'game/game_api'
import s from './withdraw.module.scss'

type WithdrawSlotBanknoteProps = {
  className?: string
}

type Banknote = {
  template_id: string
  image: string
  value: string
}

type BanknotesType = { [k: string]: Banknote[] }

const WithdrawSlotBanknote: React.FC<WithdrawSlotBanknoteProps> = ({
  className,
}) => {
  const {
    data: templateData,
    isLoading: isLoadingTemplates,
    isError: isErrorTemplate,
    refetch: refetchTemplate,
  } = useGetAllBanknotesTemplates()

  const banknotes = templateData?.data.reduce<BanknotesType>((acc, item) => {
    const symbol: string = item?.immutable_data?.symbol
    if (symbol) {
      acc[symbol] = [
        ...(acc[symbol] || []),
        {
          template_id: item.template_id,
          image: item.immutable_data?.img,
          value: item.immutable_data?.amount,
        },
      ]
    }
    return acc
  }, {})

  return (
    <>
      <BaseSlot
        classes={{
          container: s.slot,
          content: s.slotContent,
          emptyTitle: s.slotEmptyTitle,
        }}
        className={s.slot}
        isEmpty={true}
        isLoading={false}
        isError={false}
        onRetry={() => null}
        onClick={() => {
          console.log('BaseSlot')
        }}
      ></BaseSlot>
    </>
  )
}

export { WithdrawSlotBanknote }
