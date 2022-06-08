import {
  animated,
  useSpring,
  config,
  useChain,
  useTrail,
} from '@react-spring/web'
import { currencyToImg } from 'game/components/resource'
import { useRef, useLayoutEffect } from 'react'
import { Image } from 'components/shared-ui/image'
import { getDistanceBetweenElements } from 'utils'

import s from './mine.module.scss'

type ResourceAnimation = {
  resource: string
  showAnimation: boolean
  amount: number
}

export const ResourceAnimation = ({
  resource,
  showAnimation,
  amount,
}: ResourceAnimation) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [{ v }, bounceApi] = useSpring(() => ({
    from: {
      v: 0,
    },
    config: config.gentle,
  }))
  const [trail, flyApi] = useTrail(
    Math.min(amount, 200),
    () => ({
      from: { x: 0, y: 0, show: false },
    }),
    []
  )
  const [end, endApi] = useSpring(() => ({
    from: {
      t: 0,
    },
    onRest: () => {
      bounceApi.start({ v: 0 })
      flyApi.set({ x: 0, y: 0, show: false })
    },
    config: config.slow,
  }))

  useChain([bounceApi as any, flyApi, endApi], [0, 0.2, 0.9], 3000)

  useLayoutEffect(() => {
    if (showAnimation && containerRef.current) {
      const headerResource = document.getElementById(
        `header-resource-${resource.toLowerCase()}`
      )
      if (!headerResource) return
      const { x, y } = getDistanceBetweenElements(
        containerRef.current,
        headerResource
      )
      // reset values
      endApi.set({ t: 0 })
      bounceApi.set({ v: 0 })
      flyApi.set({ x: 0, y: 0, show: false })
      // start again
      bounceApi.start({ v: 1000 })
      flyApi.start({ x, y, show: true })
      endApi.start({ t: 1000 })

      const cb = () => {
        const { x, y } = getDistanceBetweenElements(
          containerRef.current!,
          headerResource
        )
        flyApi.start({ x, y })
      }
      window.addEventListener('scroll', cb, { passive: true })
      return () => {
        window.removeEventListener('scroll', cb)
      }
    }
  }, [showAnimation, resource])

  return (
    <div ref={containerRef} className={s.resource_animation}>
      <animated.img
        className={s.main_img}
        alt=""
        src={currencyToImg(resource)}
        style={{
          display: v.to((v) => (v <= 0 ? 'none' : 'block')),
          scale: v
            .to([0, 500, 750, 1000], [0, 100, 110, 100], 'extend')
            .to((v) => `${v}%`),
          background: `radial-gradient(circle, rgba(237,28,255,1) 0%, rgba(237,28,255,0) 80%)`,
        }}
      />
      {trail.map((t, i) => (
        <animated.div
          key={i}
          className={s.fly_image}
          style={{
            translateX: t.x,
            translateY: t.y,
            display: t.show.to((v) => (v ? 'block' : 'none')),
            opacity: end.t.to([0, 900, 1000], [1, 0.9, 0]),
          }}
        >
          <Image alt="" src={currencyToImg(resource)} mode="none" />
        </animated.div>
      ))}
    </div>
  )
}
