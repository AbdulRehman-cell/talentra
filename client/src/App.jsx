import React from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Jobs from './pages/Jobs.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Admin from './pages/Admin.jsx'

export default function App() {
  return (
    <>
      <header className="sticky-header" style={{ position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(10px)', backgroundColor: 'rgba(33,44,46,0.82)' }}>
        <div className="container nav-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0' }}>
          <a href="/" className="brand" aria-label="talentra homepage" style={{ fontFamily: "'Bebas Neue', cursive", fontWeight: 700, fontSize: '1.8rem', textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.06em', textDecoration: 'none' }}>
            talen<span aria-hidden="true" style={{ color: 'var(--text)' }}>tra</span>
          </a>
          <nav aria-label="Primary navigation" style={{ display: 'flex', gap: '1.5rem', fontWeight: 700, fontFamily: "'Bebas Neue', cursive", fontSize: '1rem', textTransform: 'uppercase' }}>
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? 'active' : ''}
              end
              style={({ isActive }) => ({
                color: isActive ? 'var(--primary)' : 'var(--text)',
                textDecoration: 'none',
                paddingBottom: '0.25rem',
                borderBottom: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                transition: 'border-color 180ms ease-in-out, color 180ms ease-in-out',
              })}
            >
              Home
            </NavLink>
            <NavLink
              to="/jobs"
              className={({ isActive }) => isActive ? 'active' : ''}
              style={({ isActive }) => ({
                color: isActive ? 'var(--primary)' : 'var(--text)',
                textDecoration: 'none',
                paddingBottom: '0.25rem',
                borderBottom: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                transition: 'border-color 180ms ease-in-out, color 180ms ease-in-out',
              })}
            >
              Jobs
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => isActive ? 'active' : ''}
              style={({ isActive }) => ({
                color: isActive ? 'var(--primary)' : 'var(--text)',
                textDecoration: 'none',
                paddingBottom: '0.25rem',
                borderBottom: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                transition: 'border-color 180ms ease-in-out, color 180ms ease-in-out',
              })}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => isActive ? 'active' : ''}
              style={({ isActive }) => ({
                color: isActive ? 'var(--primary)' : 'var(--text)',
                textDecoration: 'none',
                paddingBottom: '0.25rem',
                borderBottom: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                transition: 'border-color 180ms ease-in-out, color 180ms ease-in-out',
              })}
            >
              Contact
            </NavLink>
          </nav>
        </div>
      </header>

      <main style={{ minHeight: 'calc(100vh - 140px)', backgroundColor: 'var(--bg)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      <footer className="footer-links" style={{ backgroundColor: 'var(--surface)', color: 'var(--muted)', padding: '1.5rem 0', fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '0.9rem' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', maxWidth: '1180px' }}>
          <div>
            &copy; {new Date().getFullYear()} Talentra. All rights reserved.
          </div>
          <nav aria-label="Footer navigation" style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="/" className="footer-link" style={{ color: 'var(--muted)', textDecoration: 'none', fontWeight: 500 }}>
              Home
            </a>
            <a href="/jobs" className="footer-link" style={{ color: 'var(--muted)', textDecoration: 'none', fontWeight: 500 }}>
              Jobs
            </a>
            <a href="/about" className="footer-link" style={{ color: 'var(--muted)', textDecoration: 'none', fontWeight: 500 }}>
              About
            </a>
            <a href="/contact" className="footer-link" style={{ color: 'var(--muted)', textDecoration: 'none', fontWeight: 500 }}>
              Contact
            </a>
          </nav>
        </div>
      </footer>
    </>
  )
}