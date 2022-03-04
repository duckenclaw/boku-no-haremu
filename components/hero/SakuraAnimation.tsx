import React, { useLayoutEffect } from 'react';
import { runSakuraAnimation } from '../canvas/canvas';



export const SakuraAnimation = () => {
    useLayoutEffect(() => {
        runSakuraAnimation();
    }, [])
    
    return <div className="scripts-container">
        <canvas id="sakura"></canvas>
    </div>
}

