import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import cn from 'classnames'

import { LinkButton } from 'game/components/button'
import { GameModal } from 'game/components/game_modal'
import { Button } from 'game/components/button'
import { Loader } from 'components/shared-ui/loader'

import {
  useGetMiningCards,
  useGetAllCards,
  useGetAllBanknotes,
} from 'game/game_api'
import { ipfsToUrlSafe } from 'utils'

import CrossIcon from 'public/game/svg/modal_cross.svg'
import SlideIcon from 'public/game/svg/modal_slide.svg'

import s from './card_modal.module.scss'

type CardModalProps = {
  isOpen?: boolean
  onClose?: () => void
  onSelect?: (asset_id: string) => void
  blockedCards?: string[]
  title?: string
  subtitle?: string
}

export const CardModal = ({
  isOpen = false,
  onClose,
  onSelect,
  blockedCards,
  title,
  subtitle,
}: CardModalProps) => {
  return (
    <GameModal isOpen={isOpen} onRequestClose={onClose}>
      {isOpen && (
        <CardsInventory
          onSelect={onSelect}
          blockedCards={blockedCards}
          title={title}
          subtitle={subtitle}
          onCloseClick={onClose}
        />
      )}
    </GameModal>
  )
}

type CardsInventoryProps = {
  onSelect?: (asset_id: string) => void
  onCloseClick?: () => void
  blockedCards?: string[]
  title?: string
  subtitle?: string
}

export const CardsInventory = ({
  onSelect,
  onCloseClick,
  blockedCards,
  title,
  subtitle,
}: CardsInventoryProps) => {
  const { data: miningData, isLoading: isMiningDataLoading } =
    useGetMiningCards()
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useGetAllCards({
      limit: 8,
    })

  const [page, setPage] = useState(1)
  useEffect(() => {
    if (
      !isLoading &&
      !isFetchingNextPage &&
      data?.pages &&
      data?.pages.length <= page + 1 &&
      hasNextPage
    ) {
      fetchNextPage()
    }
  }, [page, data, isLoading, isFetchingNextPage, hasNextPage])
  const cards = useMemo(
    () =>
      data?.pages[page - 1].data.map((c) => ({
        ...c,
        is_blocked_by_game:
          blockedCards?.includes(c.asset_id) ||
          miningData?.find((d) => d.staked_asset_id === c.asset_id),
      })) ?? [],
    [data, blockedCards, miningData, page]
  )

  const isLoadingNextPage = isFetchingNextPage && data?.pages.length === page

  const canClickNextPage =
    data &&
    (page < data.pages.length || hasNextPage) &&
    (!data.pages[page] || data.pages[page].data.length > 0)
  return (
    <div className={s.container}>
      <div className={s.header}>
        <div className={s.side}>
          <Button className={s.filter} color="blue" size="small">
            FILTER
          </Button>
        </div>
        <div className={s.center}>
          {title && <h1>{title}</h1>}
          {subtitle && <h2>{subtitle}</h2>}
        </div>
        <div className={s.side}>
          {onCloseClick && (
            <CrossIcon className={s.close} onClick={onCloseClick} />
          )}
        </div>
      </div>
      <div className={s.content}>
        <SlideIcon
          className={cn(s.side, { [s.hide]: page <= 1 })}
          onClick={page > 1 ? () => setPage(page - 1) : undefined}
        />
        <div className={s.cards}>
          <Loader isLoading={isLoading || isMiningDataLoading}>
            {cards.map((c) => (
              <div
                className={cn(s.card, {
                  [s.blocked]: c.is_blocked_by_game,
                })}
                key={c.asset_id}
                onClick={() => !c.is_blocked_by_game && onSelect?.(c.asset_id)}
              >
                <Image
                  height={215}
                  width={120}
                  objectFit="cover"
                  alt={c.name}
                  src={ipfsToUrlSafe(c.data.img)}
                />
              </div>
            ))}
          </Loader>
        </div>
        <SlideIcon
          className={cn(s.side, s.rotate, {
            [s.hide]: !canClickNextPage,
            [s.disabled]: isLoadingNextPage,
          })}
          onClick={() => {
            canClickNextPage && !isLoadingNextPage && setPage(page + 1)
          }}
        />
      </div>
      <div className={s.footer}>
        <LinkButton
          className={s.buy}
          href={`https://wax.atomichub.io/market?collection_name=${encodeURIComponent(
            process.env.NEXT_PUBLIC_CARDS_NFT_COLLECTION ?? ''
          )}`}
          target="_blank"
        >
          Buy Cards
        </LinkButton>
      </div>
    </div>
  )
}

type BanknoteInventoryProps = {
  onSelect?: (asset_id: string) => void
  onCloseClick?: () => void
  title?: string
  subtitle?: string
  template_id?: string
}

export const BanknoteInventory = ({
  title,
  onCloseClick,
  onSelect,
  subtitle,
  template_id,
}: BanknoteInventoryProps) => {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useGetAllBanknotes({
      limit: 9,
      template_id,
    })

  const [page, setPage] = useState(1)
  useEffect(() => {
    if (
      !isLoading &&
      !isFetchingNextPage &&
      data?.pages &&
      data?.pages.length <= page + 1 &&
      hasNextPage
    ) {
      fetchNextPage()
    }
  }, [page, data, isLoading, isFetchingNextPage, hasNextPage])
  const banknotes = data?.pages[page - 1].data ?? []

  const isLoadingNextPage = isFetchingNextPage && data?.pages.length === page

  const canClickNextPage =
    data &&
    (page < data.pages.length || hasNextPage) &&
    (!data.pages[page] || data.pages[page].data.length > 0)
  return (
    <div className={s.container}>
      <div className={s.header}>
        <div className={s.side}>
          <Button className={s.filter} color="blue" size="small">
            FILTER
          </Button>
        </div>
        <div className={s.center}>
          {title && <h1>{title}</h1>}
          {subtitle && <h2>{subtitle}</h2>}
        </div>
        <div className={s.side}>
          {onCloseClick && (
            <CrossIcon className={s.close} onClick={onCloseClick} />
          )}
        </div>
      </div>
      <div className={s.content}>
        <SlideIcon
          className={cn(s.side, { [s.hide]: page <= 1 })}
          onClick={page > 1 ? () => setPage(page - 1) : undefined}
        />
        <div className={s.banknotes}>
          <Loader isLoading={isLoading}>
            {banknotes.map((c) => (
              <div
                className={cn(s.banknote)}
                key={c.asset_id}
                onClick={() => onSelect?.(c.asset_id)}
              >
                <Image
                  width={162}
                  height={76}
                  objectFit="cover"
                  alt={c.name}
                  src={ipfsToUrlSafe(c.data.img)}
                />
              </div>
            ))}
          </Loader>
        </div>
        <SlideIcon
          className={cn(s.side, s.rotate, {
            [s.hide]: !canClickNextPage,
            [s.disabled]: isLoadingNextPage,
          })}
          onClick={() => {
            canClickNextPage && !isLoadingNextPage && setPage(page + 1)
          }}
        />
      </div>
      <div className={s.footer}>
        <LinkButton
          className={s.buy}
          href={`https://wax.atomichub.io/market?collection_name=${encodeURIComponent(
            process.env.NEXT_PUBLIC_BANKNOTE_NFT_COLLECTION ?? ''
          )}`}
          target="_blank"
        >
          Buy Banknotes
        </LinkButton>
      </div>
    </div>
  )
}

type BanknoteModalProps = {
  isOpen?: boolean
  onClose?: () => void
  onSelect?: (asset_id: string) => void
  title?: string
  subtitle?: string
  template_id?: string
}

export const BanknoteModal = ({
  isOpen = false,
  onClose,
  onSelect,
  title,
  subtitle,
  template_id,
}: BanknoteModalProps) => {
  return (
    <GameModal isOpen={isOpen} onRequestClose={onClose}>
      {isOpen && (
        <BanknoteInventory
          onSelect={onSelect}
          title={title}
          subtitle={subtitle}
          onCloseClick={onClose}
          template_id={template_id}
        />
      )}
    </GameModal>
  )
}
