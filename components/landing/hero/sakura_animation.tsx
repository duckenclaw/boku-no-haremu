import React, { useLayoutEffect, useRef } from 'react'
import { runSakuraAnimation, unmountSakuraAnimation } from '../canvas/canvas'

type SakuraAnimationProps = {
  className?: string
}

export const SakuraAnimation = ({ className }: SakuraAnimationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useLayoutEffect(() => {
    runSakuraAnimation(canvasRef.current)
    return () => {
      unmountSakuraAnimation()
    }
  }, [])

  return <canvas className={className} ref={canvasRef} id="sakura" />
}
