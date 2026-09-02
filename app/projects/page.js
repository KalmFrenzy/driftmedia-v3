'use client'

import { ContactSection, ServicesAccordion, Showreel, SiteFooter, SiteNav } from '../components'

export default function ProjectsPage() {
  return (
    <main>
      <section className="projects-hero">
        <Showreel />
        <SiteNav />
        <div className="projects-hero-copy"><h1>Selected <em>Projects</em></h1></div>
      </section>

      <section className="projects-intro">
        <p>Every individual project is tailored to the idea you hope to bring to life with a focus<br className="desktop-only" /> on the impact you generate with the outcome.</p>
      </section>

      <ServicesAccordion initial="commercial" showCta={true} ctaMode="expand" />

      <ContactSection />
      <SiteFooter />
    </main>
  )
}
