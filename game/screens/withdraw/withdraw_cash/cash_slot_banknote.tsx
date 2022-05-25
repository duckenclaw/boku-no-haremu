import cn from 'classnames'
import { BanknoteInventory } from 'game/components/card_modal'
import { GameModal } from 'game/components/game_modal'
import { useGetCardByAssetId } from 'game/game_api'
import { useState } from 'react'
import { Image } from 'components/shared-ui/image'
import { WithdrawSlot } from '../withdraw_slot'
import s from './withdraw_cash.module.scss'
import { ipfsToS3Url, ipfsToUrlSafe } from 'utils'

type WithdrawSlotBanknoteProps = {
  className?: string
  setBanknoteId: (banknoteId: string) => void
  banknote?: AtomicAsset
  isLoading: boolean
  isError: boolean
}

const CashSlotBanknote: React.FC<WithdrawSlotBanknoteProps> = ({
  className,
  setBanknoteId,
  banknote,
  isLoading,
  isError,
}) => {
  const [isModalOpen, setModalIsOpen] = useState(false)

  return (
    <>
      <GameModal
        isOpen={isModalOpen}
        showClose
        onRequestClose={() => setModalIsOpen(false)}
      >
        <BanknoteInventory
          onSelect={(id) => {
            setBanknoteId(id)
            setModalIsOpen(false)
          }}
        />
      </GameModal>
      <WithdrawSlot
        className={s.cashSlot}
        isLoading={isLoading}
        isError={isError}
        isEmpty={!banknote}
        onClick={() => setModalIsOpen(true)}
        onRetry={() => null}
      >
        {banknote?.immutable_data?.img && (
          <Image
            src={[
              ipfsToS3Url(banknote?.immutable_data?.img),
              ipfsToUrlSafe(banknote?.immutable_data?.img),
            ]}
            alt={banknote?.immutable_data?.name}
          />
        )}
      </WithdrawSlot>
    </>
  )
}

export { CashSlotBanknote }
