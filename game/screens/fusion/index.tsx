import { Button } from 'game/components/button'
import { ScreenContainer } from 'game/components/screen_container'
import { useEffect, useState } from 'react'

import s from './fusion.module.scss'

type FusionMode = '3to1' | '5to2'

export const Fusion = () => {
  const [mode, setMode] = useState<FusionMode>('3to1')
  const [cards, setCards] = useState<string | null[]>([null, null, null])
  useEffect(() => {
    setCards(Array(mode === '3to1' ? 3 : 5).fill(null))
  }, [mode])
  return (
    <ScreenContainer vertical>
      <Button onClick={() => setMode('3to1')}>3 to 1</Button>
      <Button onClick={() => setMode('5to2')}>5 to 2</Button>
      <div className={s.cards}>{}</div>
      <Button>Fuse</Button>
    </ScreenContainer>
  )
}
