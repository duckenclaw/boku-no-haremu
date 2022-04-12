import { Loader } from 'components/shared-ui/loader'
import { ScreenContainer } from 'game/components/screen_container'
import {
  useGetAllBanknotesTemplates,
  useGetBanknotesBalances,
} from 'game/game_api'
import { useMemo } from 'react'
import { BanknoteCard } from './banknote_card'
import s from './withdraw.module.scss'

export const Withdraw = () => {
  const { data: templateData, isLoading: isLoadingTemplates } =
    useGetAllBanknotesTemplates()
  const { data: balancesData, isLoading: isLoadingAmount } =
    useGetBanknotesBalances()

  const templateMapping = useMemo(
    () =>
      (balancesData?.data.templates ?? []).reduce((map, val) => {
        map[val.template_id] = Number.parseInt(val.assets)
        return map
      }, {} as { [key: string]: number }),

    [balancesData]
  )

  const banknotes = templateData?.pages.map((p) => p.data).flat(1) ?? []
  return (
    <ScreenContainer>
      <Loader isLoading={isLoadingTemplates}>
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
