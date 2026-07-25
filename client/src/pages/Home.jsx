import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [jobs, setJobs] = useState(null)
  const [testimonials, setTestimonials] = useState(null)
  const [loadingJobs, setLoadingJobs] = useState(true)
  const [loadingTestimonials, setLoadingTestimonials] = useState(true)
  const [errorJobs, setErrorJobs] = useState(null)
  const [errorTestimonials, setErrorTestimonials] = useState(null)

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoadingJobs(true)
        setErrorJobs(null)
        const res = await axios.get('/api/jobs?limit=3&sort=postedDate')
        setJobs(Array.isArray(res.data) ? res.data : [])
      } catch (err) {
        setErrorJobs('Failed to load jobs. Please try again later.')
      } finally {
        setLoadingJobs(false)
      }
    }
    fetchJobs()
  }, [])

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        setLoadingTestimonials(true)
        setErrorTestimonials(null)
        const res = await axios.get('/api/testimonials')
        setTestimonials(Array.isArray(res.data) ? res.data : [])
      } catch (err) {
        setErrorTestimonials('Failed to load testimonials. Please try again later.')
      } finally {
        setLoadingTestimonials(false)
      }
    }
    fetchTestimonials()
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="hero" aria-label="talentultra recruitment hero">
        <img
          className="hero-bg"
          src="https://picsum.photos/seed/herowarehouse/1600/900"
          alt="Wide industrial warehouse interior with workers and logistics activity"
          width={1600}
          height={900}
          loading="eager"
        />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span className="eyebrow" tabIndex={-1}>Industrial Talent, Delivered</span>
          <h1>
            Unlock Your&nbsp;
            <span className="gradient-text">Potential</span><br />
            with TalentUltra
          </h1>
          <p className="hero-subtitle">
            Connecting skilled warehouse and logistics professionals with top employers nationwide. 
            Find your perfect role or build your dream team with confidence and speed.
          </p>
          <div className="hero-actions" role="group" aria-label="Call to action">
            <a href="/jobs" className="btn btn-primary" aria-describedby="applyDesc" tabIndex={0}>
              Browse Jobs
            </a>
            <a href="/contact" className="btn btn-secondary" aria-describedby="hireDesc" tabIndex={0}>
              Hire Talent
            </a>
            <span id="applyDesc" className="sr-only">View current warehouse and logistics jobs available.</span>
            <span id="hireDesc" className="sr-only">Contact TalentUltra to staff your warehouse team.</span>
          </div>
        </div>
      </section>

      {/* Clients Logos Section */}
      <section className="section" aria-label="Trusted by leading companies">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Trusted Partners</span>
            <h2>
              Companies Who <span className="gradient-text">Trust</span> Us
            </h2>
          </div>
          <div className="grid grid-4" aria-label="Logos of partner companies" role="list">
            {[
              { alt: 'Global Freight Inc. logo', src: 'https://picsum.photos/seed/logo1/300/100' },
              { alt: 'Warehouse Solutions logo', src: 'https://picsum.photos/seed/logo2/300/100' },
              { alt: 'FastTrack Logistics logo', src: 'https://picsum.photos/seed/logo3/300/100' },
              { alt: 'Prime Distribution logo', src: 'https://picsum.photos/seed/logo4/300/100' },
            ].map(({ alt, src }, i) => (
              <img
                key={i}
                src={src}
                alt={alt}
                loading="lazy"
                width={300}
                height={100}
                role="listitem"
                style={{ filter: 'grayscale(100%) brightness(1.1)', transition: 'filter 200ms ease' }}
                onMouseEnter={e => (e.currentTarget.style.filter = 'grayscale(0%) brightness(1)')}
                onMouseLeave={e => (e.currentTarget.style.filter = 'grayscale(100%) brightness(1.1)')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section" aria-label="How talentultra recruitment process works">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How It Works</span>
            <h2>
              Simplified <span className="gradient-text">Recruitment</span> Process
            </h2>
            <p className="section-intro">
              Our proven, transparent approach ensures the right match every time — whether you're hiring or job hunting.
            </p>
          </div>
          <div className="grid grid-3" role="list">
            {[{
              title: 'Discover Opportunities',
              icon: '🔎',
              desc: 'Explore a wide selection of vetted warehouse and logistics positions tailored to your skills and ambitions.'
            }, {
              title: 'Connect & Interview',
              icon: '🤝',
              desc: 'Engage directly with top companies through our streamlined interview scheduling and support.'
            }, {
              title: 'Start Your New Role',
              icon: '🚀',
              desc: 'Get onboarded smoothly and begin contributing in your new job with confidence and rapid growth opportunities.'
            }].map(({ title, icon, desc }, i) => (
              <article key={i} className="step" role="listitem" tabIndex={0} aria-label={title}>
                <div className="step-num" aria-hidden="true">{i + 1}</div>
                <div className="feature-icon" aria-hidden="true" style={{ fontSize: '2.4rem', marginBottom: '0.5rem' }}>{icon}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="section" aria-label="Featured jobs available at talentultra">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Latest Positions</span>
            <h2>
              Featured <span className="gradient-text">Jobs</span>
            </h2>
            <p className="section-intro">
              Opportunities waiting for skilled professionals ready to grow their careers in industrial logistics and warehousing.
            </p>
          </div>
          {loadingJobs && (
            <p aria-live="polite" role="status">Loading jobs...</p>
          )}
          {errorJobs && (
            <p role="alert" style={{ color: 'var(--primary)' }}>{errorJobs}</p>
          )}
          {!loadingJobs && !errorJobs && (
            <>
              {jobs && jobs.length === 0 && (
                <p>No open positions currently available. Please check back soon.</p>
              )}
              {jobs && jobs.length > 0 && (
                <div className="grid grid-3" role="list">
                  {jobs.map((job) => (
                    <article
                      key={job._id}
                      className="card"
                      role="listitem"
                      tabIndex={0}
                      aria-label={`${job.title} in ${job.location}`}
                    >
                      <h3>{job.title || 'Untitled Role'}</h3>
                      <p><strong>Location:</strong> {job.location || 'Multiple locations'}</p>
                      <p><strong>Type:</strong> {job.type || 'Full-time'}</p>
                      <p className="muted-text" style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                        {job.description?.slice(0, 90) ?? 'No description available.'}…
                      </p>
                      <a href={`/jobs/${job._id}`} className="btn btn-ghost" aria-label={`View details for ${job.title}`}>
                        View Details
                      </a>
                    </article>
                  ))}
                </div>
              )}
              <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <a href="/jobs" className="btn btn-primary" tabIndex={0}>Browse All Jobs</a>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section" aria-label="Testimonials from talentultra clients and candidates">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Success Stories</span>
            <h2>
              Trusted <span className="gradient-text">Voices</span>
            </h2>
            <p className="section-intro">
              Hear directly from professionals and companies transformed by TalentUltra’s tailored recruitment solutions.
            </p>
          </div>
          {loadingTestimonials && (
            <p aria-live="polite" role="status">Loading testimonials...</p>
          )}
          {errorTestimonials && (
            <p role="alert" style={{ color: 'var(--primary)' }}>{errorTestimonials}</p>
          )}
          {!loadingTestimonials && !errorTestimonials && (
            <>
              {testimonials && testimonials.length === 0 && (
                <p>No testimonials available at the moment.</p>
              )}
              {testimonials && testimonials.length > 0 && (
                <div className="grid grid-3" role="list">
                  {testimonials.map(({ _id, name, role, photoUrl, quote }) => (
                    <blockquote
                      key={_id}
                      className="testimonial-card"
                      role="listitem"
                      tabIndex={0}
                      aria-label={`Testimonial from ${name}, ${role}`}
                    >
                      <div>
                        <img
                          src={photoUrl || `https://i.pravatar.cc/300?img=${Math.floor(Math.random() * 70) + 1}`}
                          alt={`${name || 'Client'} photo`}
                          width={72}
                          height={72}
                          style={{ borderRadius: '50%', objectFit: 'cover' }}
                          loading="lazy"
                        />
                      </div>
                      <p aria-live="polite" style={{ fontStyle: 'italic' }}>{quote || 'No quote provided.'}</p>
                      <footer>
                        <strong>{name || 'Anonymous'}</strong>, <span>{role || 'Role not specified'}</span>
                      </footer>
                    </blockquote>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="section" aria-label="Meet the talentultra recruitment team">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our People</span>
            <h2>
              Meet the <span className="gradient-text">Team</span>
            </h2>
            <p className="section-intro">
              Dedicated recruitment experts and industry veterans committed to your success every step of the way.
            </p>
          </div>
          <div className="grid grid-4" role="list">
            {[
              { name: 'Mia Turner', role: 'Senior Recruiter', imgId: 25 },
              { name: 'Carlos Rivera', role: 'Logistics Specialist', imgId: 32 },
              { name: 'Sara Patel', role: 'Candidate Relations', imgId: 43 },
              { name: 'David Nguyen', role: 'Operations Manager', imgId: 18 },
            ].map(({ name, role, imgId }) => (
              <article key={name} className="card" role="listitem" tabIndex={0} aria-label={`${name}, ${role}`}>
                <img
                  src={`https://i.pravatar.cc/300?img=${imgId}`}
                  alt={`${name} portrait`}
                  width={300}
                  height={300}
                  loading="lazy"
                  style={{ borderRadius: '8px', objectFit: 'cover', marginBottom: '1rem' }}
                />
                <h3>{name}</h3>
                <p style={{ color: 'var(--secondary)', fontWeight: '600', fontSize: '0.95rem' }}>{role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="section" aria-labelledby="cta-final">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 id="cta-final" style={{ marginBottom: '0.4rem' }}>
            Ready to Join the <span className="gradient-text">Future</span> of Industrial Recruitment?
          </h2>
          <p style={{ maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '1.5rem' }}>
            Whether you’re seeking your next role or want to grow your warehouse team faster and smarter, TalentUltra delivers unmatched results. Start the journey with us today.
          </p>
          <a href="/contact" className="btn btn-primary" tabIndex={0}>
            Get in Touch
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-links" aria-label="Site footer with legal and contact information">
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <a href="/" className="brand" aria-label="TalentUltra homepage" style={{ fontFamily: "'Bebas Neue', cursive", fontWeight: 700, fontSize: '1.8rem', textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.06em', textDecoration: 'none' }}>
              talen<span aria-hidden="true" style={{ color: 'var(--text)' }}>tra</span>
            </a>
            <p style={{ marginTop: '0.75rem', maxWidth: '320px', color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.5 }}>
              TalentUltra &copy; {new Date().getFullYear()}. Excellence in industrial staffing and talent solutions.
            </p>
          </div>

          <nav aria-label="Footer navigation" style={{ display: 'flex', gap: '2rem', flexGrow: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/jobs" className="btn btn-ghost" tabIndex={0}>Jobs</a>
            <a href="/about" className="btn btn-ghost" tabIndex={0}>About</a>
            <a href="/contact" className="btn btn-ghost" tabIndex={0}>Contact</a>
            <a href="/privacy" className="btn btn-ghost" tabIndex={0}>Privacy</a>
          </nav>

          <address style={{ fontStyle: 'normal', color: 'var(--muted)', fontSize: '0.875rem', maxWidth: '320px' }}>
            <p><strong>TalentUltra HQ</strong></p>
            <p>124 Industrial Drive<br />Metropolis, NY 10022</p>
            <p>Phone: <a href="tel:+1234567890" className="btn btn-ghost" tabIndex={0}>+1-234-567-890</a></p>
            <p>Email: <a href="mailto:info@talentultra.com" className="btn btn-ghost" tabIndex={0}>info@talentultra.com</a></p>
          </address>
        </div>
      </footer>
    </>
  )
}