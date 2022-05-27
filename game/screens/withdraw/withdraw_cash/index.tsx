import cn from 'classnames'
import { Button } from 'game/components/button'
import { ConfirmModal } from 'game/components/confirm_modal'
import { useBurnBanknote, useGetCardByAssetId } from 'game/game_api'
import { useState } from 'react'
import { RESOURCES } from '..'
import { WithdrawExchangeRow } from '../withdraw_exchange_row'
import { CashSlotBanknote } from './cash_slot_banknote'
import { CashSlotResource } from './cash_slot_resource'
import { Image } from 'components/shared-ui/image'
import s from './withdraw_cash.module.scss'
import modalStyles from '../confirm_modal.module.scss'
import { ipfsToS3Url, ipfsToUrlSafe } from 'utils'

type WithdrawCashProps = {
  className?: string
}

const WithdrawCash: React.FC<WithdrawCashProps> = ({ className }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [banknoteId, setBanknoteId] = useState<null | string>(null)

  const {
    data: banknoteData,
    isLoading: banknoteIsLoading,
    isError: banknoteIsError,
  } = useGetCardByAssetId({ asset_id: banknoteId })
  const banknote = banknoteData?.data

  const { mutateAsync: burnBanknote } = useBurnBanknote()

  const banknoteName =
    banknote?.immutable_data.name?.split(' ').reverse().join(' ') || '??'

  const currentResource = RESOURCES.find(
    (item) => item.currency === banknote?.immutable_data.symbol
  )

  return (
    <>
      <ConfirmModal
        isOpen={modalIsOpen}
        onConfirm={() =>
          burnBanknote({ asset_id: banknoteId! }).finally(() => {
            setBanknoteId(null)
            setModalIsOpen(false)
          })
        }
        onClose={() => setModalIsOpen(false)}
        title={`You will get ${banknoteName} \n you will lose ${banknoteName} banknote`}
        dialogChildren={
          <p>
            “You will get <span className={s.dialogValue}>{banknoteName} </span>
            but lose{' '}
            <span className={s.dialogValue}>{banknoteName} banknote</span>. Are
            you sure you want it Senpai? You’re the master of this harem and we
            know you are making the right choice
          </p>
        }
      >
        <div className={modalStyles.modal}>
          <WithdrawExchangeRow
            mode="modal"
            exchangeSlot={
              <div className={modalStyles.confirmModalBanknote}>
                <Image
                  alt={banknote?.immutable_data?.name}
                  src={[
                    ipfsToS3Url(banknote?.immutable_data?.img),
                    ipfsToUrlSafe(banknote?.immutable_data?.img),
                  ]}
                />
                <div className={modalStyles.quantity}>1 banknote</div>
              </div>
            }
            receiveSlot={
              <div className={modalStyles.confirmModalResource}>
                <Image
                  src={currentResource?.image!}
                  alt={currentResource?.name}
                />
                <div className={modalStyles.quantity}>{banknoteName}</div>
              </div>
            }
          />
        </div>
      </ConfirmModal>
      <WithdrawExchangeRow
        exchangeSlot={
          <CashSlotBanknote
            setBanknoteId={setBanknoteId}
            banknote={banknote}
            isLoading={banknoteIsLoading}
            isError={banknoteIsError}
          />
        }
        receiveSlot={
          banknote?.immutable_data && (
            <CashSlotResource resource={currentResource} banknote={banknote} />
          )
        }
      />
      <Button
        className={s.button}
        disabled={!banknote}
        onClick={() => setModalIsOpen(true)}
      >
        Burn
      </Button>
    </>
  )
}

export { WithdrawCash }
