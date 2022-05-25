import { Image } from 'components/shared-ui/image'
import { Button } from 'game/components/button'
import { ConfirmModal } from 'game/components/confirm_modal'
import { useMintBanknote } from 'game/game_api'
import { useState } from 'react'
import { ipfsToS3Url, ipfsToUrlSafe } from 'utils'
import { WithdrawExchangeRow } from '../withdraw_exchange_row'
import { CreateSlotBanknote } from './create_slot_banknote'
import { CreateSlotResource } from './create_slot_resource'
import s from './withdraw_create.module.scss'

type WithdrawCreateProps = {
  className?: string
}

export type CurrentResourceType = {
  name: string
  image: string
  currency: string
} | null

export type Banknote = {
  template_id: string
  image: string
  value: string
}

const WithdrawCreate: React.FC<WithdrawCreateProps> = ({ className }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [currentResource, setCurrentResource] =
    useState<null | CurrentResourceType>(null)
  const [currentBanknote, setCurrentBanknote] = useState<Banknote | null>(null)

  const { mutateAsync: mintBanknote, isLoading: isMintLoading } =
    useMintBanknote()

  return (
    <>
      <ConfirmModal
        isOpen={modalIsOpen}
        onConfirm={() =>
          mintBanknote({ template_id: currentBanknote?.template_id! }).finally(
            () => setModalIsOpen(false)
          )
        }
        onClose={() => setModalIsOpen(false)}
        title={`You will lose ${currentBanknote?.value || '??'} ${
          currentResource?.name || '??'
        }\n you will receive 1 bill`}
        dialogChildren={
          <p>
            “Senpai, are you sure you want to spend{' '}
            <span className={s.dialogValue}>
              {currentBanknote?.value || '??'} {currentResource?.name || '??'}{' '}
            </span>
            to mint that banknote? Prosperity of your harem is in your hands,
            waifu trust you with all their heart!”
          </p>
        }
      >
        <div className={s.modal}>
          <WithdrawExchangeRow
            classes={{ container: s.modalSlotsContainer, arrow: s.arrow }}
            exchangeSlot={
              <div className={s.confirmModalResource}>
                <Image
                  alt={currentResource?.name}
                  src={currentResource?.image!}
                />
                <div className={s.quantity}>
                  {currentBanknote?.value || '??'}{' '}
                  {currentResource?.name || '??'}
                </div>
              </div>
            }
            receiveSlot={
              <div className={s.confirmModalBanknote}>
                <Image
                  src={[
                    ipfsToS3Url(currentBanknote?.image),
                    ipfsToUrlSafe(currentBanknote?.image),
                  ]}
                  alt={currentBanknote?.value}
                />
                <div className={s.quantity}>1 banknote</div>
              </div>
            }
          />
        </div>
      </ConfirmModal>
      <WithdrawExchangeRow
        exchangeSlot={
          <CreateSlotResource
            selectResource={setCurrentResource}
            currentResource={currentResource}
            mode="create"
          />
        }
        receiveSlot={
          currentResource && (
            <CreateSlotBanknote
              currentResource={currentResource}
              currentBanknote={currentBanknote}
              setCurrentBanknote={setCurrentBanknote}
            />
          )
        }
      />
      <Button
        className={s.button}
        disabled={!currentBanknote || isMintLoading}
        onClick={() => setModalIsOpen(true)}
      >
        Create
      </Button>
    </>
  )
}

export { WithdrawCreate }
