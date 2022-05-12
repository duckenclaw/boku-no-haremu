import React, { useLayoutEffect, useRef, useState } from 'react'
import { runSakuraAnimation, unmountSakuraAnimation } from '../canvas/canvas'

type SakuraAnimationProps = {
  className?: string
}

export const SakuraAnimation = ({ className }: SakuraAnimationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isAnimationReady, setIsAnimationReady] = useState(false)
  useLayoutEffect(() => {
    runSakuraAnimation(canvasRef.current).then(() => setIsAnimationReady(true))
    return () => {
      unmountSakuraAnimation()
    }
  }, [])

  return (
    <canvas
      className={className}
      style={{ opacity: isAnimationReady ? 1 : 0 }}
      ref={canvasRef}
      id="sakura"
    />
  )
}
