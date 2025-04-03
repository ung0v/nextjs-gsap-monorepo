'use client'

import { useRef } from 'react'

import gsap from '@repo/motion/gsap'
import { ScrollTrigger } from '@repo/motion/gsap'
import { useGSAP } from '@repo/motion/gsap_react'
import { ReactLenis, useLenis } from '@repo/motion/lenis'

export default function Home() {
  const container = useRef(null)
  const lenis = useLenis(({ scroll }) => {})

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      const cards = document.querySelectorAll('.card')
      const images = document.querySelectorAll('.card img')
      const totalCards = cards.length

      gsap.set(cards[0] as Element, { y: '0%', scale: 1, rotation: 0 })
      gsap.set(images[0] as Element, { scale: 1 })

      for (let i = 1; i < totalCards; i++) {
        gsap.set(cards[i] as Element, { y: '100%', scale: 1, rotation: 0 })
        gsap.set(images[i] as Element, { scale: 1 })
      }

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.sticky-cards',
          start: 'top top',
          end: `+=${window.innerHeight * (totalCards - 1)}`,
          pin: true,
          scrub: 0.5,
        },
      })

      for (let i = 0; i < totalCards - 1; i++) {
        const currentCard = cards[i]
        const currentImage = images[i]
        const nextCard = cards[i + 1]
        const position = i

        scrollTimeline.to(
          currentCard as Element,
          {
            scale: 0.5,
            rotation: 10,
            duration: 1,
            ease: 'none',
          },
          position,
        )

        scrollTimeline.to(
          currentImage as Element,
          {
            scale: 1.5,
            duration: 1,
            ease: 'none',
          },
          position,
        )

        scrollTimeline.to(
          nextCard as Element,
          {
            y: '0%',
            duration: 1,
            ease: 'none',
          },
          position,
        )
      }

      return () => {
        scrollTimeline.kill()
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    },
    { scope: container },
  )

  return (
    <ReactLenis root>
      <div className="container" ref={container}>
        <section className="intro">
          <h1>
            Art is not what you see. It&apos;s what you *feel* in the blur, the
            chaos, the motion — every pulse captured in color and form.
          </h1>
        </section>
        <section className="sticky-cards">
          <div className="cards-container">
            <div className="card">
              <div className="tag">
                <p>Raw Emotion</p>
              </div>
              <img src="/assets/img1.jpg" alt="" />
            </div>
            <div className="card">
              <div className="tag">
                <p>Inner Conflict</p>
              </div>
              <img src="/assets/img2.jpg" alt="" />
            </div>
            <div className="card">
              <div className="tag">
                <p>Fury & Flow</p>
              </div>
              <img src="/assets/img3.jpg" alt="" />
            </div>
            <div className="card">
              <div className="tag">
                <p>Rebellion</p>
              </div>
              <img src="/assets/img4.jpg" alt="" />
            </div>
            <div className="card">
              <div className="tag">
                <p>Liberation</p>
              </div>
              <img src="/assets/img5.jpg" alt="" />
            </div>
          </div>
        </section>
        <section className="outro">
          <h1>
            This isn&apos;t just motion. It&apos;s meaning in movement. In every
            blurred edge and amplified hue, we trace the shape of something
            deeper — truth in abstraction.
          </h1>
        </section>
      </div>
    </ReactLenis>
  )
}
