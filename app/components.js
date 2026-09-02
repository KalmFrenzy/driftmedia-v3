'use client'

import { useEffect, useMemo, useState } from 'react'
import { CONFIG, logos, projectsByCategory, services } from './site-data'

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <a href="/" className="logo">drift<span>media</span></a>
      <nav><a href="/projects">Projects</a><a href="#contact">Contact</a></nav>
      <a className="chat-pill" href={`https://wa.me/${CONFIG.whatsapp}`} target="_blank" rel="noreferrer"><span>●</span> Chat with us <b>→</b></a>
    </header>
  )
}

export function Showreel({ className = '' }) {
  return (
    <div className={`showreel ${className}`}>
      <video autoPlay muted loop playsInline preload="metadata" poster="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2200&q=90" aria-label="Drift Media showreel">
        <source src={CONFIG.showreelSrc} type="video/mp4" />
      </video>
      <div className="showreel-fallback" />
      <div className="showreel-overlay" />
    </div>
  )
}

export function Copyable({ value, children }) {
  const [notice, setNotice] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = value
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      textarea.remove()
    }
    setNotice(true)
    window.setTimeout(() => setNotice(false), 1800)
  }
  return <button className="copyable" onClick={copy} aria-label={`Copy ${value}`}>{children}{notice && <span className="copy-toast">Copied</span>}</button>
}

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-brand"><a href="/" className="logo big">drift<span>media</span></a><small>© 2015–2026 Driftmedia</small></div>
      <div className="socials">
        <a href={`https://wa.me/${CONFIG.whatsapp}`} target="_blank" rel="noreferrer"><span>◉</span><small>WhatsApp</small></a>
        <a href={CONFIG.instagram} target="_blank" rel="noreferrer"><span>◎</span><small>Instagram</small></a>
        <a href={CONFIG.youtubeChannel} target="_blank" rel="noreferrer"><span>▶</span><small>YouTube</small></a>
      </div>
      <div className="footer-contact"><small>Contact us;</small><Copyable value={CONFIG.phones[0]}>{CONFIG.phones[0]}</Copyable><Copyable value={CONFIG.phones[1]}>{CONFIG.phones[1]}</Copyable><Copyable value={CONFIG.email}>{CONFIG.email}</Copyable></div>
    </footer>
  )
}

export function ContactSection() {
  return (
    <section className="contact section" id="contact">
      <h2>Send a message.<br />Lets bring your ideas to <em>reality.</em></h2>
      <a className="chat-pill large" href={`https://wa.me/${CONFIG.whatsapp}`} target="_blank" rel="noreferrer"><span>●</span> Chat with us <b>→</b></a>
    </section>
  )
}

export function VideoModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="video-modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose} aria-label="Close video">×</button>
        <div className="video-frame"><iframe src={`https://www.youtube.com/embed/${CONFIG.youtubeVideoId}?autoplay=1&rel=0`} title="Drift Media project video" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /></div>
      </div>
    </div>
  )
}

export function ProjectCards({ category, onPlay }) {
  const projects = projectsByCategory[category] || []
  return (
    <div className="category-project-grid">
      {projects.map((project) => (
        <button className="project-card project-card-large" key={`${category}-${project.title}`} onClick={onPlay}>
          <img src={project.image} alt="" />
          <div className="project-shade" />
          <span className="play">▶</span>
          <div className="project-meta"><strong>{project.title}</strong><small>{project.type}</small></div>
        </button>
      ))}
    </div>
  )
}

export function ServicesAccordion({ initial = 'commercial', showCta = true, ctaMode = 'navigate', rowClickMode = 'expand' }) {
  const [open, setOpen] = useState(initial)
  const [hovered, setHovered] = useState(null)
  const [videoOpen, setVideoOpen] = useState(false)

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (services.some((service) => service.slug === hash)) {
      setOpen(hash)
      window.setTimeout(() => document.getElementById(hash)?.scrollIntoView({ block: 'center', behavior: 'smooth' }), 50)
    }
  }, [])

  const currentService = useMemo(() => services.find((service) => service.slug === open), [open])

  return (
    <>
      <section className="services" id="services">
        {services.map((service) => {
          const isOpen = open === service.slug
          const isHovered = hovered === service.slug
          return (
            <div
              id={service.slug}
              className={`service-row ${isOpen ? 'is-open' : ''}`}
              key={service.slug}
              onMouseEnter={() => setHovered(service.slug)}
              onMouseLeave={() => setHovered(null)}
            >
              <button className="service-trigger" onClick={() => rowClickMode === 'expand' ? setOpen(service.slug) : (window.location.href = `/projects#${service.slug}`)} aria-expanded={isOpen}>
                <span className="service-index">{service.number}</span>
                <span className="service-main"><strong>{service.title}</strong><small>{service.items}</small></span>
              </button>
              {isHovered && !isOpen && (
                <div className="service-preview show">
                  <img src={service.image} alt="" />
                  <span>View {service.title} projects →</span>
                </div>
              )}
              <div className={`service-side ${isHovered || isOpen ? 'visible' : ''}`}>
                {showCta && (ctaMode === 'expand' ? (
                  <button className="service-cta" onClick={(e) => { e.stopPropagation(); setOpen(service.slug) }}>View projects <span>→</span></button>
                ) : (
                  <a className="service-cta" href={`/projects#${service.slug}`} onClick={(e) => e.stopPropagation()}>View projects <span>→</span></a>
                ))}
                <span className="service-plus">{isOpen ? '−' : '+'}</span>
              </div>
              {isOpen && currentService?.slug === service.slug && (
                <div className="service-expanded">
                  <ProjectCards category={service.slug} onPlay={() => setVideoOpen(true)} />
                </div>
              )}
            </div>
          )
        })}
      </section>
      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </>
  )
}

export function ClientLogos() {
  const repeated = useMemo(() => [...logos, ...logos], [])
  return <div className="logo-marquee"><div className="logo-track">{repeated.map((logo, i) => <div className="client-logo" key={`${logo}-${i}`}>{logo}</div>)}</div></div>
}
