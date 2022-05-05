import { useState } from 'react'

import cn from 'classnames'
import { Button } from 'game/components/button'
import { GameModal } from 'game/components/game_modal'
import { useSpring, animated } from '@react-spring/web'

import s from './fusion.module.scss'
import { useFuseQueue } from 'game/game_api'
import { Loader } from 'components/shared-ui/loader'

type FusionQueueProps = {
  className?: string
  counter?: number
  onCounterReset?: () => void
}

type AnimatedValueProps = {
  value?: number
}
const AnimatedValue = animated(({ value }: AnimatedValueProps) => {
  return <>{value?.toFixed(0)}</>
})

export const FusionQueue = ({
  className,
  counter,
  onCounterReset,
}: FusionQueueProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    data: fuseQueueData,
    isLoading: isFuseQueueLoading,
    isError,
    refetch,
  } = useFuseQueue()
  const style = useSpring({
    to: {
      opacity: counter && counter > 0 ? 1 : 0,
      value: counter ?? 0,
    },
    from: {
      opacity: 0,
      value: 0,
    },
  })
  return (
    <div className={cn(className, s.fusion_queue)}>
      <Button
        size="small"
        onClick={() => {
          setIsOpen(true)
          onCounterReset?.()
        }}
      >
        Fusion Queue
      </Button>
      <animated.div className={s.counter} style={{ opacity: style.opacity }}>
        + <AnimatedValue value={style.value} />
      </animated.div>
      <GameModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        title="Fusion Queue"
      >
        <Loader
          isLoading={isFuseQueueLoading}
          isError={isError}
          isNoData={fuseQueueData?.length === 0}
          onRetry={refetch}
        >
          <div className={s.rows}>
            {fuseQueueData?.map((f, i) => (
              <div key={i}>fuse row</div>
            ))}
          </div>
        </Loader>
      </GameModal>
    </div>
  )
}
