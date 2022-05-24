import { Image } from 'components/shared-ui/image'
import { Button } from 'game/components/button'
import { ConfirmModal } from 'game/components/confirm_modal'
import { useMintBanknote } from 'game/game_api'
import { useState } from 'react'
import { ipfsToS3Url, ipfsToUrlSafe } from 'utils'
import { WithdrawSlots } from '../withdraw_slots'
import s from './withdraw_create.module.scss'
import { WithdrawSlotBanknote } from './withdraw_slot_banknote'
import { WithdrawSlotResource } from './withdraw_slot_resource'

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
          mintBanknote({ template_id: currentBanknote?.template_id! })
        }
        onClose={() => setModalIsOpen(false)}
        title={`You will lose ${currentBanknote?.value || '??'} ${
          currentResource?.name || '??'
        } you will receive 1 bill`}
        dialogChildren={
          <>
            <p>
              “Senpai, are you sure you want to spend 100 bento to mint that
              banknote? Prosperity of your harem is in your hands, waifu trust
              you with all their heart!”
            </p>
          </>
        }
      >
        <div className={s.modal}>
          <WithdrawSlots
            classes={{ container: s.modalSlotsContainer, arrow: s.arrow }}
            firstSlot={
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
            secondSlot={
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

          {/* <Image
            className={s.arrow}
            src="/images/svg/arrow2.svg"
            mode="none"
            alt="arrow"
          /> */}
          {/* <div className={s.confirmModalBanknote}>
            <Image
              src={[
                ipfsToS3Url(currentBanknote?.image),
                ipfsToUrlSafe(currentBanknote?.image),
              ]}
              alt={currentBanknote?.value}
            />
          </div> */}
        </div>
      </ConfirmModal>
      <WithdrawSlots
        firstSlot={
          <WithdrawSlotResource
            selectResource={setCurrentResource}
            currentResource={currentResource}
            mode="create"
          />
        }
        secondSlot={
          currentResource && (
            <WithdrawSlotBanknote
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
