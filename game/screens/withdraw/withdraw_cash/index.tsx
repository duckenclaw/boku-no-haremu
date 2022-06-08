import cn from 'classnames'
import { Button } from 'game/components/button'
import { ConfirmModal } from 'game/components/confirm_modal'
import { useBurnBanknote, useGetCardByAssetId } from 'game/game_api'
import { useMemo, useState } from 'react'
import { WithdrawExchangeRow } from '../withdraw_exchange_row'
import { CashSlotBanknote } from './cash_slot_banknote'
import { CashSlotResource } from './cash_slot_resource'
import { Image } from 'components/shared-ui/image'
import s from './withdraw_cash.module.scss'
import modalStyles from '../confirm_modal.module.scss'
import { ipfsToS3Url, ipfsToUrlSafe, isEmptyObj } from 'utils'
import { RESOURCES } from 'game/constants'

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

  const banknoteName = isEmptyObj(banknote?.immutable_data)
    ? banknote?.data.name?.split(' ').reverse().join(' ') || '??'
    : banknote?.immutable_data.name?.split(' ').reverse().join(' ') || '??'

  const currentResource = RESOURCES.find(
    (item) =>
      item.apiName === banknote?.immutable_data.symbol ||
      item.apiName === banknote?.data.symbol
  )

  const dialogStrings = useMemo(
    () => [
      `<p>
      “You will get <span>${banknoteName} </span>
      but lose
      <span className={s.dialogValue}>${banknoteName} banknote</span>. Are
      you sure you want it Senpai? You’re the master of this harem and we
      know you are making the right choice
    </p>`,
    ],
    [banknoteName]
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
        dialogStrings={dialogStrings}
      >
        <div className={modalStyles.modal}>
          <WithdrawExchangeRow
            mode="modal"
            exchangeSlot={
              <div className={modalStyles.confirmModalBanknote}>
                <Image
                  alt={banknote?.immutable_data?.name}
                  src={[
                    ipfsToS3Url(
                      banknote?.immutable_data?.img || banknote?.data.img
                    ),
                    ipfsToUrlSafe(
                      banknote?.immutable_data?.img || banknote?.data.img
                    ),
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
            <CashSlotResource
              className={s.resourceSlot}
              resource={currentResource}
              banknote={banknote}
            />
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
