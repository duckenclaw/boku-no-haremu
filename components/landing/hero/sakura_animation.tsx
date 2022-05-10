import React, { useLayoutEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { runSakuraAnimation, unmountSakuraAnimation } from '../canvas/canvas'

type SakuraAnimationProps = {
  className?: string
}

export const SakuraAnimation = ({ className }: SakuraAnimationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isAnimationReady, setIsAnimationReady] = useState(false)
  const isMobile = useMediaQuery({
    query: '(min-width: 768px)',
  })
  useLayoutEffect(() => {
    runSakuraAnimation(canvasRef.current).then(() => setIsAnimationReady(true))
    return () => {
      unmountSakuraAnimation()
    }
  }, [isMobile])

  return (
    <canvas
      className={className}
      style={{ opacity: isAnimationReady ? 1 : 0 }}
      ref={canvasRef}
      id="sakura"
    />
  )
}
