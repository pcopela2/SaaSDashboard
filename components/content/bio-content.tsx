'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from './bio-content.module.css'

export function BioContent() {
  const articleRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible)
          }
        })
      },
      {
        threshold: 0.1,
      }
    )

    articleRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  // Function to set refs properly
  const setRef = (index: number) => (el: HTMLDivElement | null) => {
    articleRefs.current[index] = el
  }

  return (
    <main className={styles.main}>
      <div 
        className={styles.article}
        ref={setRef(0)}
      >
        <div className={styles.fixed}>
          <Image 
            src="https://picsum.photos/seed/beach/1920/1080"
            alt="Outer Banks Sunset"
            fill
            unoptimized
            className={styles.backgroundImage}
          />
          <div className={styles.content}>
            <h1 className={styles.heading}>Growing up in Paradise</h1>
            <p className={styles.paragraph}>Born and raised on the Outer Banks of North Carolina, where the Atlantic meets adventure.</p>
          </div>
        </div>
      </div>

      <div 
        className={styles.article}
        ref={setRef(1)}
      >
        <div className={styles.fixed}>
          <Image 
            src="https://picsum.photos/seed/wedding/1920/1080"
            alt="Wedding Photo"
            fill
            unoptimized
            className={styles.backgroundImage}
          />
          <div className={styles.content}>
            <div className={styles.textWrap}>
              <div className={styles.loudWrap}>
                <h2 className={styles.heading}>A New Chapter</h2>
                <p className={styles.paragraph}>In 2023, I married my beautiful wife Emily, beginning our greatest adventure together.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div 
        className={styles.article}
        ref={setRef(2)}
      >
        <div className={styles.fixed}>
          <Image 
            src="https://picsum.photos/seed/code/1920/1080"
            alt="Programming"
            fill
            unoptimized
            className={styles.backgroundImage}
          />
          <div className={styles.content}>
            <h2 className={styles.heading}>Professional Journey</h2>
            <div className={styles.chatContainer}>
              <div className={styles.textBlocks}>
                <p className={`${styles.textBlock} ${styles.textBlockOdd}`}>Senior Data Solutions Architect</p>
                <p className={`${styles.textBlock} ${styles.textBlockEven}`}>Cloud Architecture Expert</p>
                <p className={`${styles.textBlock} ${styles.textBlockOdd}`}>Full Stack Developer</p>
                <p className={`${styles.textBlock} ${styles.textBlockEven}`}>Microsoft Certified Professional</p>
                <p className={`${styles.textBlock} ${styles.textBlockOdd}`}>Continuous Learner</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 