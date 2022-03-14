import React, { useLayoutEffect, useRef } from 'react'
import { runSakuraAnimation, unmountSakuraAnimation } from '../canvas/canvas'

export const SakuraAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useLayoutEffect(() => {
    runSakuraAnimation(canvasRef.current)
    return () => {
      unmountSakuraAnimation()
    }
  }, [])

  return (
    <div className="scripts-container">
      <canvas ref={canvasRef} id="sakura" />
    </div>
  )
}
