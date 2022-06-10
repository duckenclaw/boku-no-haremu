import { useEffect, useMemo, useState } from 'react'
import cn from 'classnames'

import { Image } from 'components/shared-ui/image'
import { LinkButton } from 'game/components/button'
import { GameModal } from 'game/components/game_modal'
import { CardImage } from 'game/components/card_image'
import { Loader, LoaderIcon } from 'components/shared-ui/loader'

import {
  useGetMiningCards,
  useGetAllCards,
  useGetAllBanknotes,
  useGetTemplates,
  useGetMiningRecipes,
} from 'game/game_api'
import { ipfsToS3Url, ipfsToUrlSafe } from 'utils'

import CrossIcon from 'public/game/svg/modal_cross.svg'
import SlideIcon from 'public/game/svg/modal_slide.svg'

import s from './card_modal.module.scss'
import { CardFilter } from './card_filter'
import { useGame } from 'game/game_context'
import { Resource } from '../resource'

type CardModalProps = {
  isOpen?: boolean
  onClose?: () => void
  onSelect?: (asset_id: string, card: AtomicAsset) => void
  blockedCards?: string[]
  allowedTemplateIds?: string[]
  title?: string
  subtitle?: string
}

export const CardModal = ({
  isOpen = false,
  onClose,
  onSelect,
  blockedCards,
  allowedTemplateIds,
  title,
  subtitle,
}: CardModalProps) => {
  return (
    <GameModal isOpen={isOpen} onRequestClose={onClose}>
      {isOpen && (
        <CardsInventory
          onSelect={onSelect}
          allowedTemplateIds={allowedTemplateIds}
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
  onSelect?: (asset_id: string, card: AtomicAsset) => void
  onCloseClick?: () => void
  blockedCards?: string[]
  title?: string
  allowedTemplateIds?: string[]
  subtitle?: string
}

export const CardsInventory = ({
  onSelect,
  onCloseClick,
  blockedCards,
  title,
  allowedTemplateIds,
  subtitle,
}: CardsInventoryProps) => {
  const [page, setPage] = useState(1)
  const [templateFilter, setTemplateFilter] = useState<null | string>(null)

  useEffect(() => {
    setPage(1)
  }, [templateFilter])

  const { collection_name } = useGame()

  const { data: mineRecipes } = useGetMiningRecipes()
  const {
    data: miningData,
    isLoading: isMiningDataLoading,
    isError: isErrorMintingData,
    refetch: refetchMintingData,
  } = useGetMiningCards()
  const {
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError: isErrorCards,
    refetch: refetchCards,
  } = useGetAllCards({
    limit: 8,
    template_id: templateFilter ?? undefined,
  })

  const {
    data: templatesData,
    isLoading: isTemplatesLoading,
    isError: isTemplatesError,
    refetch: templatesRefetch,
  } = useGetTemplates({ mode: 'card' })

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

  const refetchCardsData = () => {
    Promise.all([refetchCards(), refetchMintingData()])
  }

  const cards = useMemo(
    () =>
      data?.pages[page - 1].data.map((c) => ({
        ...c,
        is_blocked_by_game:
          blockedCards?.includes(c.asset_id) ||
          miningData?.find((d) => d.staked_asset_id === c.asset_id) ||
          (allowedTemplateIds &&
            !allowedTemplateIds.includes(c.template.template_id)),
      })) ?? [],
    [data, blockedCards, miningData, page]
  )

  const isLoadingNextPage = isFetchingNextPage && data?.pages.length === page

  const canClickNextPage =
    data &&
    (page < data.pages.length || hasNextPage) &&
    (!data.pages[page] || data.pages[page].data.length > 0)
  return (
    <>
      <div className={s.container}>
        <div className={s.header}>
          <div className={s.side}>
            <CardFilter className={s.filter} contentClassName={s.templates}>
              <Loader
                isLoading={isTemplatesLoading}
                isError={isTemplatesError}
                onRetry={templatesRefetch}
              >
                {templatesData?.data.map((t) => (
                  <div
                    className={s.template}
                    key={t.template_id}
                    onClick={() => {
                      if (templateFilter === t.template_id) {
                        setTemplateFilter(null)
                      } else setTemplateFilter(t.template_id)
                    }}
                  >
                    <div
                      className={cn(s.checkbox, {
                        [s.checked]: t.template_id === templateFilter,
                      })}
                    />
                    {t.immutable_data.name}
                  </div>
                ))}
              </Loader>
            </CardFilter>
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
          <Loader
            isLoading={isLoading || isMiningDataLoading}
            isError={isErrorMintingData || isErrorCards}
            onRetry={refetchCardsData}
          >
            <div className={s.cards}>
              {cards.map((c) => {
                const mineRecipe = mineRecipes?.find(
                  (r) =>
                    r.asset_template_id.toString() === c.template.template_id
                )
                return (
                  <div className={s.row} key={c.asset_id}>
                    <CardImage
                      className={cn(s.card, {
                        [s.blocked]: c.is_blocked_by_game,
                      })}
                      style={{ objectFit: 'cover' }}
                      alt={c.name}
                      src={[ipfsToS3Url(c.data.img), ipfsToUrlSafe(c.data.img)]}
                      onClick={() =>
                        !c.is_blocked_by_game && onSelect?.(c.asset_id, c)
                      }
                    />
                    {mineRecipe && (
                      <div className={s.lower_content}>
                        <div className={s.row}>
                          <Resource
                            sign="plus"
                            size="large"
                            color="purple"
                            balance={mineRecipe.mined_resource}
                          />
                        </div>
                        <div className={s.row}>
                          {mineRecipe.cost.map((c, index) => (
                            <Resource sign="minus" balance={c} key={index} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </Loader>
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
            size="small"
            href={`https://wax.atomichub.io/market?collection_name=${encodeURIComponent(
              collection_name
            )}`}
            target="_blank"
          >
            Buy Cards
          </LinkButton>
        </div>
      </div>
    </>
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
  const [page, setPage] = useState(1)
  const [templateFilter, setTemplateFilter] = useState<null | string>(null)

  useEffect(() => {
    setPage(1)
  }, [templateFilter])

  const {
    data: templatesData,
    isLoading: isTemplatesLoading,
    isError: isErrorTemplates,
    refetch: refetchTemplates,
  } = useGetTemplates({ mode: 'banknote' })

  const { banknote_collection_name } = useGame()

  const {
    data,
    isLoading,
    isError: isErrorBanknotes,
    refetch: refetchBanknotes,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetAllBanknotes({
    limit: 9,
    template_id: template_id ?? templateFilter ?? undefined,
  })

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
    <>
      <div className={s.container}>
        <div className={s.header}>
          <div className={s.side}>
            <CardFilter className={s.filter} contentClassName={s.templates}>
              <Loader
                isLoading={isTemplatesLoading}
                isError={isErrorTemplates}
                onRetry={refetchTemplates}
              >
                {templatesData?.data.map((t) => (
                  <div
                    className={s.template}
                    key={t.template_id}
                    onClick={() => {
                      if (templateFilter === t.template_id) {
                        setTemplateFilter(null)
                      } else setTemplateFilter(t.template_id)
                    }}
                  >
                    <div
                      className={cn(s.checkbox, {
                        [s.checked]: t.template_id === templateFilter,
                      })}
                    />
                    {t.immutable_data.name}
                  </div>
                ))}
              </Loader>
            </CardFilter>
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
          <Loader
            isLoading={isLoading}
            isError={isErrorBanknotes}
            onRetry={refetchBanknotes}
          >
            <div className={s.banknotes}>
              {banknotes.map((c) => (
                <div
                  className={cn(s.banknote)}
                  key={c.asset_id}
                  onClick={() => onSelect?.(c.asset_id)}
                >
                  <Image
                    width={162}
                    height={76}
                    alt={c.name}
                    src={[ipfsToS3Url(c.data.img), ipfsToUrlSafe(c.data.img)]}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </Loader>
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
            size="small"
            href={`https://wax.atomichub.io/market?collection_name=${encodeURIComponent(
              banknote_collection_name
            )}`}
            target="_blank"
          >
            Buy Banknotes
          </LinkButton>
        </div>
      </div>
    </>
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
