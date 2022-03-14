import React, { useLayoutEffect, useRef } from 'react'
import { runSakuraAnimation } from '../canvas/canvas'

export const SakuraAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useLayoutEffect(() => {
    runSakuraAnimation(canvasRef.current)
  }, [])

  return (
    <div className="scripts-container">
      <canvas ref={canvasRef} id="sakura" />
    </div>
  )
}
