import { Loader } from 'components/shared-ui/loader'
import { ScreenContainer } from 'game/components/screen_container'
import { ScreenTitle } from 'game/components/screen_title'
import {
  useGetAllBanknotesTemplates,
  useGetBanknotesBalances,
} from 'game/game_api'
import { useMemo } from 'react'
import { BanknoteCard } from './banknote_card'
import s from './withdraw.module.scss'

export const Withdraw = () => {
  const {
    data: templateData,
    isLoading: isLoadingTemplates,
    isError: isErrorTemplate,
    refetch: refetchTemplate,
  } = useGetAllBanknotesTemplates()
  const {
    data: balancesData,
    isLoading: isLoadingAmount,
    isError: isErrorBalance,
    refetch: refetchBalance,
  } = useGetBanknotesBalances()

  const templateMapping = useMemo(
    () =>
      (balancesData?.data.templates ?? []).reduce((map, val) => {
        map[val.template_id] = Number.parseInt(val.assets)
        return map
      }, {} as { [key: string]: number }),

    [balancesData]
  )

  const onRetry = () => {
    Promise.all([refetchTemplate(), refetchBalance()])
  }

  const banknotes = templateData?.pages.map((p) => p.data).flat(1) ?? []

  return (
    <ScreenContainer
      header={<ScreenTitle className={s.title}>atm</ScreenTitle>}
      classes={{
        content: s.screenContent,
      }}
    >
      <Loader
        isLoading={isLoadingTemplates}
        isError={isErrorTemplate || isErrorBalance}
        onRetry={onRetry}
      >
        {banknotes.map((b) => (
          <BanknoteCard
            templateData={b}
            isLoadingAmount={isLoadingAmount}
            amount={templateMapping[b.template_id] ?? 0}
            key={b.template_id}
          />
        ))}
      </Loader>
    </ScreenContainer>
  )
}
