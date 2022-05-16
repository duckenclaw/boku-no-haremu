import React from 'react'

import { ScreenContainer } from 'game/components/screen_container'
import { useCraftRecipes } from 'game/game_api'
import { Loader } from 'components/shared-ui/loader'

import { CraftSlot } from './craft_slot'

import s from './craft.module.scss'
import { ScreenTitle } from 'game/components/screen_title'

export const Craft = () => {
  const {
    data: recipeData,
    isLoading: isRecipesLoading,
    isError,
    refetch,
  } = useCraftRecipes()
  return (
    <section className={s.section}>
      <ScreenTitle className={s.title}>Craft a new nft</ScreenTitle>
      <ScreenContainer className={s.slots}>
        <Loader
          isLoading={isRecipesLoading}
          isError={isError}
          onRetry={refetch}
        >
          {recipeData?.map((r) => (
            <CraftSlot
              key={r.result_template_id}
              template_id={r.result_template_id}
              cost={r.cost}
            />
          ))}
        </Loader>
      </ScreenContainer>
    </section>
  )
}
