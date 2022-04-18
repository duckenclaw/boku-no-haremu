import Image from 'next/image'

import { Button } from 'game/components/button'
import {
  useBurnBanknote,
  useGetBanknotesByTemplateId,
  useMintBanknote,
} from 'game/game_api'
import { ipfsToUrlSafe } from 'utils'

import s from './withdraw.module.scss'
import { useState } from 'react'
import { GameModal } from 'game/components/game_modal'
import { Loader } from 'components/shared-ui/loader'

type BanknoteSelectionProps = {
  template_id: string
  onSelect?: (asset_id: string) => void
}

export const BanknoteSelection = ({
  template_id,
  onSelect,
}: BanknoteSelectionProps) => {
  const { data, isLoading } = useGetBanknotesByTemplateId({ template_id })
  return (
    <div className={s.asset_list}>
      <Loader isLoading={isLoading}>
        {data?.pages
          .flatMap((p) => p.data)
          .map((c) => (
            <div
              key={c.asset_id}
              className={s.asset_card}
              onClick={() => onSelect?.(c.asset_id)}
            >
              <Image
                width={195}
                height={240}
                objectFit="cover"
                alt={c.name}
                src={ipfsToUrlSafe(c.data.img)}
              />
              <span>{c.name}</span>
            </div>
          ))}
      </Loader>
    </div>
  )
}

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
      <GameModal
        title="CHOOSE BANKNOTE FOR BURN"
        isOpen={isOpenModal}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <BanknoteSelection
          template_id={template_id}
          onSelect={(asset_id) => {
            burnBanknote({ asset_id })
            setIsModalOpen(false)
          }}
        />
      </GameModal>
      <div className={s.background} />
      <div className={s.content}>
        <Image
          src={ipfsToUrlSafe(immutable_data.img)}
          alt={templateData.template_id}
          width={204}
          height={325}
          objectFit="contain"
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
