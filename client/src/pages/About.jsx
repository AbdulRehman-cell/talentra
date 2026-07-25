import React from 'react';

export default function About() {
  return (
    <>
      <section className="hero" aria-label="About TalentUltra overview">
        <img
          className="hero-bg"
          src="https://picsum.photos/seed/warehouse2/1600/900"
          alt="Exterior view of an industrial warehouse building with clear sky"
          width={1600}
          height={900}
          loading="eager"
        />
        <div className="container">
          <span className="eyebrow" aria-hidden="true">
            About TalentUltra
          </span>
          <h1>
            Excellence in <span className="gradient-text">Industrial Recruitment</span>
          </h1>
          <p className="hero-subtitle">
            Connecting highly skilled warehouse professionals with top-tier employers — your workforce solution for today and tomorrow.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="mission-title">
        <div className="container">
          <header className="section-head">
            <h2 id="mission-title">
              Our <span className="gradient-text">Mission</span>
            </h2>
            <div className="stats" aria-hidden="true" style={{ marginTop: '0.5rem' }}>
              <div>
                <div className="stat-value">99%</div>
                <div className="stat-label">Candidate Satisfaction</div>
              </div>
              <div>
                <div className="stat-value">12+</div>
                <div className="stat-label">Years of Industrial Hiring Experience</div>
              </div>
              <div>
                <div className="stat-value">4500+</div>
                <div className="stat-label">Positions Successfully Filled</div>
              </div>
            </div>
          </header>
          <p style={{ maxWidth: '780px', marginTop: '1.5rem', lineHeight: 1.5, fontWeight: 400, fontSize: 'clamp(1rem, 1vw, 1.125rem)', color: 'var(--text)' }}>
            TalentUltra is dedicated to empowering the industrial workforce by bridging the gap between skilled warehouse labor and visionary employers.
            We foster long-term partnerships built on trust, respect, and outstanding service, ensuring every placement maximizes efficiency and job satisfaction.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="values-title">
        <div className="container">
          <header className="section-head">
            <h2 id="values-title">
              Our <span className="gradient-text">Values</span>
            </h2>
          </header>
          <div className="grid grid-3" style={{ gap: '22px' }}>
            <article className="feature-card" aria-labelledby="value-1-title">
              <span className="feature-icon" role="img" aria-label="Handshake icon">
                🤝
              </span>
              <h3 id="value-1-title">Integrity</h3>
              <p>
                Transparent and honest communication with candidates and clients alike ensures every engagement is trustworthy and ethical.
              </p>
            </article>
            <article className="feature-card" aria-labelledby="value-2-title">
              <span className="feature-icon" role="img" aria-label="Gear icon">
                ⚙️
              </span>
              <h3 id="value-2-title">Efficiency</h3>
              <p>
                Streamlined recruitment processes tailored to industrial client needs that accelerate job matches without compromising quality.
              </p>
            </article>
            <article className="feature-card" aria-labelledby="value-3-title">
              <span className="feature-icon" role="img" aria-label="Growth arrow icon">
                📈
              </span>
              <h3 id="value-3-title">Growth</h3>
              <p>
                Supporting career advancement and operational scalability, we invest in people development and continuous improvement.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="team-title">
        <div className="container">
          <header className="section-head">
            <h2 id="team-title">
              Meet <span className="gradient-text">Our Team</span>
            </h2>
          </header>
          <p style={{ maxWidth: '800px', marginBottom: '2rem' }}>
            Our team combines deep industry expertise with unmatched dedication to match job seekers and employers expertly — 
            from warehouse floor supervisors to logistics coordinators and recruiter specialists.
          </p>
          <div className="grid grid-4" style={{ gap: '22px' }}>
            <article className="card" aria-label="Photograph of Sarah Collins, Recruitment Manager">
              <img
                src="https://i.pravatar.cc/300?img=5"
                alt="Sarah Collins, Recruitment Manager at TalentUltra"
                width={300}
                height={300}
                style={{ borderRadius: '6px', objectFit: 'cover', width: '100%', aspectRatio: '1 / 1' }}
                loading="lazy"
              />
              <div style={{ padding: '1rem 0 0' }}>
                <h3 style={{ fontWeight: 700, fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(1.2rem, 2vw, 1.45rem)', marginBottom: '0.25rem' }}>
                  Sarah Collins
                </h3>
                <p style={{ fontWeight: 500, color: 'var(--secondary)', fontSize: 'clamp(1rem, 1vw, 1.125rem)', marginTop: 0 }}>
                  Recruitment Manager
                </p>
              </div>
            </article>
            <article className="card" aria-label="Photograph of Miguel Torres, Senior Talent Specialist">
              <img
                src="https://i.pravatar.cc/300?img=12"
                alt="Miguel Torres, Senior Talent Specialist at TalentUltra"
                width={300}
                height={300}
                style={{ borderRadius: '6px', objectFit: 'cover', width: '100%', aspectRatio: '1 / 1' }}
                loading="lazy"
              />
              <div style={{ padding: '1rem 0 0' }}>
                <h3 style={{ fontWeight: 700, fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(1.2rem, 2vw, 1.45rem)', marginBottom: '0.25rem' }}>
                  Miguel Torres
                </h3>
                <p style={{ fontWeight: 500, color: 'var(--secondary)', fontSize: 'clamp(1rem, 1vw, 1.125rem)', marginTop: 0 }}>
                  Senior Talent Specialist
                </p>
              </div>
            </article>
            <article className="card" aria-label="Photograph of Emily Nguyen, Logistics Recruitment Advisor">
              <img
                src="https://i.pravatar.cc/300?img=24"
                alt="Emily Nguyen, Logistics Recruitment Advisor at TalentUltra"
                width={300}
                height={300}
                style={{ borderRadius: '6px', objectFit: 'cover', width: '100%', aspectRatio: '1 / 1' }}
                loading="lazy"
              />
              <div style={{ padding: '1rem 0 0' }}>
                <h3 style={{ fontWeight: 700, fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(1.2rem, 2vw, 1.45rem)', marginBottom: '0.25rem' }}>
                  Emily Nguyen
                </h3>
                <p style={{ fontWeight: 500, color: 'var(--secondary)', fontSize: 'clamp(1rem, 1vw, 1.125rem)', marginTop: 0 }}>
                  Logistics Recruitment Advisor
                </p>
              </div>
            </article>
            <article className="card" aria-label="Photograph of Liam Patel, Client Relations Lead">
              <img
                src="https://i.pravatar.cc/300?img=17"
                alt="Liam Patel, Client Relations Lead at TalentUltra"
                width={300}
                height={300}
                style={{ borderRadius: '6px', objectFit: 'cover', width: '100%', aspectRatio: '1 / 1' }}
                loading="lazy"
              />
              <div style={{ padding: '1rem 0 0' }}>
                <h3 style={{ fontWeight: 700, fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(1.2rem, 2vw, 1.45rem)', marginBottom: '0.25rem' }}>
                  Liam Patel
                </h3>
                <p style={{ fontWeight: 500, color: 'var(--secondary)', fontSize: 'clamp(1rem, 1vw, 1.125rem)', marginTop: 0 }}>
                  Client Relations Lead
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}