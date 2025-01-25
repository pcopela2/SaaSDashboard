'use client'

import { useEffect } from 'react'
import styles from './warp-speed.module.css'

interface WarpSpeedConfig {
  perspective: boolean
  reduced: number
  rx: number
  ry: number
  bn: number
  hl: number
  hu: number
  sl: number
  su: number
  dl: number
  du: number
  cell: number
  depth: number
}

export function WarpSpeed() {
  useEffect(() => {
    const sides = ['top', 'right', 'bottom', 'left']
    const config: WarpSpeedConfig = {
      perspective: false,
      reduced: 1,
      rx: -24,
      ry: -24,
      bn: 8,
      hl: 1,
      hu: 359,
      sl: 1.8,
      su: 3.2,
      dl: 0.1,
      du: 1,
      cell: 5,
      depth: 100,
    }

    const generateExtraBeams = (container: Element, config: WarpSpeedConfig) => {
      const extraBeams = Math.floor(Math.random() * 3) + 3;
      new Array(extraBeams).fill({}).forEach(() => {
        const beam: Beam = {
          hue: Math.floor(Math.random() * (config.hu - config.hl)) + config.hl,
          x: Math.floor(Math.random() * 8),
          speed: Math.random() * (config.su - config.sl) + config.sl,
          delay: Math.random() * config.du,
        }

        const div = document.createElement('div')
        div.className = styles.beam
        div.style.cssText = `
          --hue: ${beam.hue};
          --ar: ${Math.floor(Math.random() * 10) + 1};
          --x: ${beam.x};
          --speed: ${beam.speed};
          --delay: ${beam.delay};
          --reduced: ${config.reduced};
          left: ${beam.x * 5}%;
        `
        container.appendChild(div)
      })
    }

    const generateBeams = () => {
      sides.forEach(side => {
        const container = document.querySelector(`.${styles[`warp__side--${side}`]}`)
        if (!container) return
        container.innerHTML = ''
        const number = Math.floor(Math.random() * config.bn) + 1
        
        new Array(number).fill({}).forEach(() => {
          const beam: Beam = {
            hue: Math.floor(Math.random() * (config.hu - config.hl)) + config.hl,
            x: Math.floor(Math.random() * 20),
            speed: Math.random() * (config.su - config.sl) + config.sl,
            delay: Math.random() * config.du + config.dl,
            ar: Math.random() < 0.2 ? 
              Math.floor(Math.random() * 40) + 30 :
              Math.random() < 0.3 ?
                Math.floor(Math.random() * 30) + 15 :
                Math.floor(Math.random() * 15) + 5,
          }

          const div = document.createElement('div')
          div.className = styles.beam
          div.style.cssText = `
            --hue: ${beam.hue};
            --ar: ${beam.ar};
            --x: ${beam.x};
            --speed: ${beam.speed};
            --delay: ${beam.delay};
            --reduced: ${config.reduced};
            left: ${beam.x * 5}%;
          `
          container.appendChild(div)
        })

        if (side === 'left') {
          generateExtraBeams(container, config)
        }
      })
    }

    generateBeams()
    const interval = setInterval(generateBeams, 8000)

    return () => {
      clearInterval(interval)
      sides.forEach(side => {
        const container = document.querySelector(`.${styles[`warp__side--${side}`]}`)
        if (container) container.innerHTML = ''
      })
    }
  }, [])

  return (
    <div className={styles.scene}>
      <div className={styles.wrapper}>
        <div className={styles.warp}>
          <div className={`${styles.warp__side} ${styles['warp__side--top']}`}></div>
          <div className={`${styles.warp__side} ${styles['warp__side--right']}`}></div>
          <div className={`${styles.warp__side} ${styles['warp__side--bottom']}`}></div>
          <div className={`${styles.warp__side} ${styles['warp__side--left']}`}></div>
        </div>
      </div>
    </div>
  )
} 