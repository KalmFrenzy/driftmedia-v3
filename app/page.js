'use client'

import { useEffect, useState } from 'react'
import { ClientLogos, ContactSection, ProjectCards, ServicesAccordion, Showreel, SiteFooter, SiteNav, VideoModal } from './components'

function AnimatedWord() {
  const words = ['Ads', 'Events', 'Films', 'Content']
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2400)
    return () => clearInterval(id)
  }, [])
  return <span className="script-word" key={words[index]}>{words[index]}</span>
}

function Stat({ target, suffix = '', label }) {
  const [value, setValue] = useState(0)
  const [started, setStarted] = useState(false)
  useEffect(() => {
    const node = document.getElementById(`stat-${label.replace(/\s+/g, '-')}`)
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return
      setStarted(true)
      const duration = 1400
      const startTime = performance.now()
      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(target * eased))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.45 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [started, target, label])
  return <div className="stat" id={`stat-${label.replace(/\s+/g, '-')}`}><div className="stat-number">{value}{suffix}</div><div className="stat-label">{label}</div></div>
}

export default function Home() {
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <main>
      <section className="hero" id="top">
        <Showreel className="hero-showreel" />
        <SiteNav />
        <div className="hero-copy"><h1>We create <AnimatedWord /><br />that people remember.</h1></div>
      </section>

      <section className="trust">
        <p>We are a full service media agency trusted by<br />International &amp; Local clients.</p>
        <ClientLogos />
      </section>

      <section className="projects section" id="projects">
        <h2>Selected projects</h2>
        <div className="project-grid">
          <button className="project-card" onClick={() => setVideoOpen(true)}><img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85" alt="" /><div className="project-shade" /><span className="play">▶</span><div className="project-meta"><strong>Pazuzu Coffee</strong><small>Creative Ad</small></div></button>
          <button className="project-card" onClick={() => setVideoOpen(true)}><img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=85" alt="" /><div className="project-shade" /><span className="play">▶</span><div className="project-meta"><strong>Abuja Tech Expo</strong><small>Conference</small></div></button>
          <button className="project-card" onClick={() => setVideoOpen(true)}><img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85" alt="" /><div className="project-shade" /><span className="play">▶</span><div className="project-meta"><strong>Keffi &amp; Salahudeen</strong><small>Wedding</small></div></button>
        </div>
        <a className="text-link" href="/projects">View more works <span>→</span></a>
      </section>

      <section className="stats section">
        <Stat target={11} label="yrs of expertise" />
        <Stat target={37} suffix=" million" label="views generated" />
        <Stat target={200} suffix="+" label="satisfied clients" />
      </section>

      <section className="story section"><h2>Whatever the <em>story,</em><br />we know how to tell it.</h2></section>

      <ServicesAccordion initial="commercial" rowClickMode="navigate" />

      <ContactSection />
      <SiteFooter />
      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </main>
  )
}
