import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { useMediaQuery } from 'react-responsive'
import {
  runSakuraAnimation,
  unmountSakuraAnimation,
  stopSakuraAnimation,
} from '../canvas/canvas'

type SakuraAnimationProps = {
  className?: string
}

export const SakuraAnimation = ({ className }: SakuraAnimationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isMobile = useMediaQuery({
    query: '(min-width: 768px)',
  })
  useLayoutEffect(() => {
    runSakuraAnimation(canvasRef.current)
    !isMobile && stopSakuraAnimation()
    return () => {
      unmountSakuraAnimation()
    }
  }, [isMobile])

  return <canvas className={className} ref={canvasRef} id="sakura" />
}
