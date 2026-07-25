import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Jobs() {
  const [jobs, setJobs] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true)
        setError(null)
        const res = await axios.get('/api/jobs')
        setJobs(res.data)
      } catch (e) {
        setError('Failed to load job listings. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  // Filtered jobs list by type or all
  const filteredJobs = jobs?.filter(
    (job) => filter === 'all' || (job.type?.toLowerCase() || '') === filter
  )

  // Collect unique job types for filtering (lowercase)
  const jobTypesSet = new Set(jobs?.map(j => (j.type || '').toLowerCase()).filter(Boolean))
  const jobTypes = Array.from(jobTypesSet)

  return (
    <>
      <section className="section section-head" style={{ paddingBottom: '44px' }}>
        <div className="container" style={{ maxWidth: 720, textAlign: 'center', margin: '0 auto' }}>
          <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontWeight: 700, fontSize: 'clamp(2.8rem, 7vw, 4.1rem)', lineHeight: 1.07 }}>
            Explore <span className="gradient-text">Warehouse Careers</span>
          </h1>
          <p style={{ fontWeight: 500, fontSize: 'clamp(1rem, 1vw, 1.125rem)', marginTop: 12, color: 'var(--muted)' }}>
            Find your next opportunity in logistics, fulfillment, and warehouse operations with TalentUltra.
          </p>
        </div>
      </section>

      <section className="section" aria-label="Job type filter">
        <div className="container" style={{ maxWidth: 680, marginBottom: 24, display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            className={`btn btn-ghost${filter === 'all' ? ' active' : ''}`}
            onClick={() => setFilter('all')}
            aria-pressed={filter === 'all'}
            type="button"
          >
            All Types
          </button>
          {jobTypes.map((type) => (
            <button
              key={type}
              className={`btn btn-ghost${filter === type ? ' active' : ''}`}
              onClick={() => setFilter(type)}
              aria-pressed={filter === type}
              type="button"
              style={{ textTransform: 'capitalize' }}
            >
              {type}
            </button>
          ))}
        </div>
      </section>

      <section className="section" aria-label="Job listings">
        <div className="container" style={{ maxWidth: 1180 }}>
          {loading && (
            <p role="status" style={{ color: 'var(--muted)', textAlign: 'center' }}>
              Loading job listings...
            </p>
          )}
          {error && (
            <p role="alert" style={{ color: 'var(--primary)', textAlign: 'center' }}>
              {error}
            </p>
          )}
          {!loading && !error && filteredJobs?.length === 0 && (
            <p style={{ color: 'var(--muted)', textAlign: 'center' }}>
              No jobs match your filter. Please try another category or check back soon.
            </p>
          )}
          {!loading && !error && filteredJobs && filteredJobs.length > 0 && (
            <ul className="grid grid-3" style={{ gap: '1.5rem', listStyle: 'none', padding: 0, margin: 0 }}>
              {filteredJobs.map((job) => (
                <li key={job._id} className="card" style={{ borderColor: 'var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontWeight: 700, fontSize: 'clamp(1.2rem, 2vw, 1.45rem)', marginBottom: 6 }}>
                      <Link to={`/jobs/${job._id}`} style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                        {job.title ?? 'Untitled Job'}
                      </Link>
                    </h3>
                    <p style={{ fontWeight: 500, fontSize: 'clamp(1rem, 1vw, 1.125rem)', color: 'var(--muted)', marginBottom: 8 }}>
                      {job.location ?? 'Location not specified'}
                    </p>
                    <p style={{ fontWeight: 400, fontSize: 'clamp(0.9rem, 0.8vw, 1rem)', color: 'var(--text)', maxHeight: 80, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {(job.description || '').slice(0, 130)}{(job.description && job.description.length > 130) ? '...' : ''}
                    </p>
                  </div>
                  <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="badge" style={{ textTransform: 'uppercase', fontWeight: 700, fontSize: '0.75rem' }}>
                      {job.type ?? 'Position'}
                    </span>
                    <Link
                      to={`/jobs/${job._id}`}
                      className="btn btn-secondary"
                      aria-label={`View details and apply for ${job.title ?? 'job'}`}
                      style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase' }}
                    >
                      View & Apply
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="section" aria-label="How to apply" style={{ backgroundColor: 'var(--surface-2)', color: 'var(--text)' }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.7rem)', marginBottom: 24 }}>
            <span style={{ color: 'var(--primary)' }}>Apply</span> in 3 simple steps
          </h2>
          <ol style={{ display: 'flex', gap: '3rem', listStyle: 'none', padding: 0, margin: 0, justifyContent: 'space-between', fontWeight: 500 }}>
            <li className="step" style={{ flex: 1, textAlign: 'center' }}>
              <div className="step-num" style={{ marginBottom: 12, color: 'var(--primary)', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.1em' }}>1</div>
              <p>Browse and find your ideal warehouse or logistics role.</p>
            </li>
            <li className="step" style={{ flex: 1, textAlign: 'center' }}>
              <div className="step-num" style={{ marginBottom: 12, color: 'var(--primary)', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.1em' }}>2</div>
              <p>Submit your application directly through the job details page.</p>
            </li>
            <li className="step" style={{ flex: 1, textAlign: 'center' }}>
              <div className="step-num" style={{ marginBottom: 12, color: 'var(--primary)', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.1em' }}>3</div>
              <p>Our team will contact you promptly to guide you next.</p>
            </li>
          </ol>
        </div>
      </section>
    </>
  )
}