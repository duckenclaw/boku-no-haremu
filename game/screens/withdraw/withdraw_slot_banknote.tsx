import cn from 'classnames'
import { BaseSlot } from 'game/components/base_slot'
import { Button } from 'game/components/button'
import { useGetAllBanknotesTemplates } from 'game/game_api'
import { useEffect, useMemo, useState } from 'react'
import s from './withdraw.module.scss'
import { Image } from 'components/shared-ui/image'
import { WithdrawBanknoteValues } from './withdraw_bancnote_values'
import { CurrentResourceType } from './withdraw_create'
import { ipfsToS3Url, ipfsToUrlSafe } from 'utils'

type WithdrawSlotBanknoteProps = {
  className?: string
  currentResource: CurrentResourceType
}

export type Banknote = {
  template_id: string
  image: string
  value: string
}

type BanknotesType = { [k: string]: Banknote[] }

const WithdrawSlotBanknote: React.FC<WithdrawSlotBanknoteProps> = ({
  className,
  currentResource,
}) => {
  const [currentBanknote, setCurrentBanknote] = useState<Banknote | null>(null)

  const {
    data: templateData,
    isLoading: isLoadingTemplates,
    isError: isErrorTemplate,
    refetch: refetchTemplate,
  } = useGetAllBanknotesTemplates()

  const banknotes = useMemo(() => {
    return templateData?.data.reduce<BanknotesType>((acc, item) => {
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
  }, [templateData?.data])

  useEffect(() => {
    if (banknotes && currentResource?.currency) {
      setCurrentBanknote(banknotes[currentResource.currency][0])
    }
  }, [banknotes, currentResource?.currency])
  console.log('currentBanknote', currentBanknote)

  return (
    <div className={s.slotContainerBanknote}>
      <BaseSlot
        classes={{
          container: s.slot,
          content: s.slotContent,
          emptyTitle: s.slotEmptyTitle,
        }}
        isEmpty={!banknotes}
        isLoading={isLoadingTemplates}
        isError={isErrorTemplate}
        onRetry={() => null}
        onClick={() => {
          console.log('BaseSlot')
        }}
      >
        {currentBanknote && (
          <Image
            className={s.slotBanknote}
            src={[
              ipfsToS3Url(currentBanknote.image),
              ipfsToUrlSafe(currentBanknote.image),
            ]}
            alt={currentBanknote.value}
          />
        )}
      </BaseSlot>
      {banknotes && currentResource && (
        <WithdrawBanknoteValues
          banknotes={banknotes[currentResource.currency]}
          setCurrentBanknote={setCurrentBanknote}
          currentBanknote={currentBanknote}
        />
      )}
    </div>
  )
}

export { WithdrawSlotBanknote }
