import React from 'react'

import { ScreenContainer } from 'game/components/screen_container'
import { useCraftRecipes } from 'game/game_api'
import { Loader } from 'components/shared-ui/loader'
import { CraftSlot } from './craft_slot'

import s from './craft.module.scss'

export const Craft = () => {
  const { data: recipeData, isLoading: isRecipesLoading } = useCraftRecipes()
  return (
    <ScreenContainer className={s.slots}>
      <Loader isLoading={isRecipesLoading}>
        {recipeData?.map((r) => (
          <CraftSlot
            key={r.result_template_id}
            template_id={r.result_template_id}
            cost={r.cost}
          />
        ))}
      </Loader>
    </ScreenContainer>
  )
}
