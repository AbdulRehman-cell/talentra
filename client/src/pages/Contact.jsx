import React, { useState } from 'react'
import axios from 'axios'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ loading: false, success: null, error: null })

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required.'
    if (!form.email.trim()) {
      errs.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = 'Email is invalid.'
    }
    if (form.phone.trim() && !/^[\d\s()+-]+$/.test(form.phone.trim())) {
      errs.phone = 'Phone number contains invalid characters.'
    }
    if (!form.message.trim()) errs.message = 'Message is required.'
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setErrors({})
    setStatus({ loading: true, success: null, error: null })
    try {
      await axios.post('/api/contactsubmissions', {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
        submittedAt: new Date().toISOString(),
      })
      setStatus({ loading: false, success: 'Thank you for reaching out! We will respond shortly.', error: null })
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      setStatus({ loading: false, success: null, error: 'Submission failed. Please try again later.' })
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>
      <section className="section hero-compact" style={{ backgroundColor: 'var(--surface)', borderRadius: '12px', marginTop: '2rem' }}>
        <div className="container">
          <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontWeight: 700, fontSize: 'clamp(2.8rem, 7vw, 4.1rem)', color: 'var(--text)', marginBottom: '0.25rem' }}>
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 1vw, 1.125rem)', color: 'var(--muted)', fontWeight: 500 }}>
            Whether you're a candidate or a client, contact TalentUltra to discuss your staffing needs.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="contact-us-header">
        <div className="container">
          <h2 id="contact-us-header" className="section-head" style={{ fontFamily: "'Bebas Neue', cursive", fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.7rem)', color: 'var(--text)', marginBottom: '1rem' }}>
            Contact <span className="gradient-text">Us</span>
          </h2>
          <form onSubmit={handleSubmit} noValidate style={{ maxWidth: 520, marginTop: 0 }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '6px', fontWeight: 700, color: 'var(--text)' }}>
              Full Name<span style={{ color: 'var(--primary)', marginLeft: 4 }}>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="input"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'error-name' : undefined}
              style={{ marginBottom: errors.name ? 4 : 18 }}
              disabled={status.loading}
            />
            {errors.name && (
              <div id="error-name" role="alert" style={{ color: 'var(--primary)', fontWeight: 700, marginBottom: 12 }}>
                {errors.name}
              </div>
            )}

            <label htmlFor="email" style={{ display: 'block', marginBottom: '6px', fontWeight: 700, color: 'var(--text)' }}>
              Email Address<span style={{ color: 'var(--primary)', marginLeft: 4 }}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="input"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'error-email' : undefined}
              style={{ marginBottom: errors.email ? 4 : 18 }}
              disabled={status.loading}
              autoComplete="email"
            />
            {errors.email && (
              <div id="error-email" role="alert" style={{ color: 'var(--primary)', fontWeight: 700, marginBottom: 12 }}>
                {errors.email}
              </div>
            )}

            <label htmlFor="phone" style={{ display: 'block', marginBottom: '6px', fontWeight: 700, color: 'var(--text)' }}>
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="input"
              placeholder="(optional) +1 234 567 8901"
              value={form.phone}
              onChange={handleChange}
              aria-invalid={errors.phone ? 'true' : 'false'}
              aria-describedby={errors.phone ? 'error-phone' : undefined}
              style={{ marginBottom: errors.phone ? 4 : 18 }}
              disabled={status.loading}
              autoComplete="tel"
            />
            {errors.phone && (
              <div id="error-phone" role="alert" style={{ color: 'var(--primary)', fontWeight: 700, marginBottom: 12 }}>
                {errors.phone}
              </div>
            )}

            <label htmlFor="message" style={{ display: 'block', marginBottom: '6px', fontWeight: 700, color: 'var(--text)' }}>
              Message<span style={{ color: 'var(--primary)', marginLeft: 4 }}>*</span>
            </label>
            <textarea
              id="message"
              name="message"
              className="input"
              placeholder="Write your message here..."
              rows="6"
              value={form.message}
              onChange={handleChange}
              aria-invalid={errors.message ? 'true' : 'false'}
              aria-describedby={errors.message ? 'error-message' : undefined}
              style={{ marginBottom: errors.message ? 4 : 18, resize: 'vertical' }}
              disabled={status.loading}
            />
            {errors.message && (
              <div id="error-message" role="alert" style={{ color: 'var(--primary)', fontWeight: 700, marginBottom: 12 }}>
                {errors.message}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={status.loading}
              style={{ fontWeight: 700, textTransform: 'uppercase' }}
              aria-busy={status.loading ? 'true' : 'false'}
            >
              {status.loading ? 'Sending...' : 'Send Message'}
            </button>

            {status.success && (
              <p role="status" style={{ marginTop: 16, color: 'var(--accent)', fontWeight: 700 }}>
                {status.success}
              </p>
            )}
            {status.error && (
              <p role="alert" style={{ marginTop: 16, color: 'var(--primary)', fontWeight: 700 }}>
                {status.error}
              </p>
            )}
          </form>
        </div>
      </section>

      <section className="section" aria-label="Company contact details and location">
        <div className="container grid grid-2" style={{ gap: 40, alignItems: 'start' }}>
          <div className="card" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-2)', padding: 24 }}>
            <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.7rem)', color: 'var(--text)', marginBottom: 12 }}>
              Reach TalentUltra
            </h3>
            <p style={{ color: 'var(--muted)', fontSize: 'clamp(1rem, 1vw, 1.125rem)', lineHeight: 1.5 }}>
              Our offices are located in the industrial heartland, ready to connect you with the best warehouse and logistics talent.
            </p>
            <address style={{ marginTop: 20, fontStyle: 'normal', color: 'var(--text)', fontWeight: 500, lineHeight: 1.6 }}>
              <strong>TalentUltra Staffing Agency</strong><br />
              920 Industrial Way, Suite 400<br />
              Metro City, MC 54321<br />
              <br />
              <strong>Phone:</strong>{' '}
              <a href="tel:+12345678901" className="btn btn-ghost" style={{ fontWeight: 700, padding: '0 0.4em' }}>
                +1 (234) 567-8901
              </a>
              <br />
              <strong>Email:</strong>{' '}
              <a href="mailto:contact@talentultra.com" className="btn btn-ghost" style={{ fontWeight: 700, padding: '0 0.4em' }}>
                contact@talentultra.com
              </a>
            </address>
          </div>

          <div className="card" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-2)', padding: 0, overflow: 'hidden', borderRadius: '12px' }}>
            <iframe
              title="TalentUltra Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.5439508210034!2d-122.39572168267885!3d37.78904071975674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064f0000001%3A0x400e10f231f70364!2s920%20Industrial%20Way%2C%20San%20Francisco%2C%20CA%2094103%2C%20USA!5e0!3m2!1sen!2sus!4v1686734889273!5m2!1sen!2sus"
              width="100%"
              height="320"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  )
}