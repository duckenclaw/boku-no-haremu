import { useState } from 'react'

import { Button } from 'game/components/button'
import { BanknoteModal } from 'game/components/card_modal'
import { Image } from 'components/shared-ui/image'
import { useBurnBanknote, useMintBanknote } from 'game/game_api'
import { ipfsToUrlSafe } from 'utils'

import s from './withdraw.module.scss'

type BanknoteCardProps = {
  templateData: AtomicTemplate
  amount: number
  isLoadingAmount?: boolean
}

export const BanknoteCard = ({
  templateData,
  amount,
  isLoadingAmount,
}: BanknoteCardProps) => {
  const [isOpenModal, setIsModalOpen] = useState(false)
  const { immutable_data, template_id } = templateData
  const { mutateAsync: mintBanknote, isLoading: isMintLoading } =
    useMintBanknote({
      template_id,
    })
  const { mutateAsync: burnBanknote, isLoading: isBurnLoading } =
    useBurnBanknote()

  return (
    <div className={s.card}>
      <BanknoteModal
        title="CHOOSE BANKNOTE FOR BURN"
        isOpen={isOpenModal}
        onSelect={(asset_id) => {
          burnBanknote({ asset_id })
          setIsModalOpen(false)
        }}
        onClose={() => setIsModalOpen(false)}
        template_id={template_id}
      />
      <div className={s.background} />
      <div className={s.content}>
        <Image
          src={ipfsToUrlSafe(immutable_data.img)}
          alt={templateData.template_id}
          width={162}
          height={76}
          style={{ objectFit: 'cover' }}
        />
        <div>
          {Number(immutable_data.amount) / 10000} {immutable_data.symbol}
        </div>
        <div>You own: {isLoadingAmount ? '...' : amount}</div>
        <Button
          size="xsmall"
          disabled={isMintLoading || isBurnLoading}
          onClick={() => mintBanknote()}
        >
          MINT
        </Button>
        <Button
          size="xsmall"
          disabled={isMintLoading || isBurnLoading || (amount ?? 0) === 0}
          onClick={() => setIsModalOpen(true)}
        >
          BURN
        </Button>
      </div>
    </div>
  )
}
