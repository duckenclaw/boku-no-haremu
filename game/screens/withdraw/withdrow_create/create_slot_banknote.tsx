import cn from 'classnames'
import { Image } from 'components/shared-ui/image'
import { Button } from 'game/components/button'
import { useGetAllBanknotesTemplates } from 'game/game_api'
import { useEffect, useMemo } from 'react'
import { ipfsToS3Url, ipfsToUrlSafe } from 'utils'
import { Banknote, CurrentResourceType } from '.'
import { WithdrawSlot } from '../withdraw_slot'
import s from './withdraw_create.module.scss'

type CreateSlotBanknoteProps = {
  className?: string
  currentResource: CurrentResourceType
  currentBanknote: Banknote | null
  setCurrentBanknote: (banknote: Banknote | null) => void
}

type BanknotesType = { [k: string]: Banknote[] }

const CreateSlotBanknote: React.FC<CreateSlotBanknoteProps> = ({
  className,
  currentResource,
  currentBanknote,
  setCurrentBanknote,
}) => {
  const {
    data: templateData,
    isLoading: isLoadingTemplates,
    isError: isErrorTemplate,
    refetch: refetchTemplate,
  } = useGetAllBanknotesTemplates()

  const banknotes = useMemo(() => {
    const orderedTemplateData = templateData?.data.sort((a, b) => {
      if (Number(a.immutable_data?.amount) < Number(b.immutable_data?.amount))
        return -1
      if (Number(a.immutable_data?.amount) > Number(b.immutable_data?.amount))
        return 1
      return 0
    })

    return orderedTemplateData?.reduce<BanknotesType>((acc, item) => {
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
  }, [banknotes, currentResource?.currency, setCurrentBanknote])

  return (
    <div className={s.slotContainerBanknote}>
      <WithdrawSlot
        isEmpty={!banknotes}
        isLoading={isLoadingTemplates}
        isError={isErrorTemplate}
        onRetry={() => null}
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
      </WithdrawSlot>
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

export { CreateSlotBanknote }
