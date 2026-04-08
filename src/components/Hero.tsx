import { useEffect, useState, useRef } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

// Inline ParticleCanvas stub — replace with your real import
// import ParticleCanvas from './ParticleCanvas';

const phrases = [
  '20,000 children taken.',
  'A generation erased.',
  'They are still here.',
  'This is not history. It is now.',
  'Their stories demand to be heard.',
];

// Counter hook — animates a number from 0 to target
function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

export default function Hero() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [visible, setVisible] = useState(false);
  const [countersActive, setCountersActive] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const statsRef = useRef(null);

  // Entrance animation
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Intersection observer for stat counters
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setCountersActive(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // Typewriter
  useEffect(() => {
    const currentFullText = phrases[currentPhrase];
    const typingSpeed = isDeleting ? 30 : 80;
    if (!isDeleting && displayText === currentFullText) {
      const t = setTimeout(() => setIsDeleting(true), 2200);
      return () => clearTimeout(t);
    }
    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
      return;
    }
    const timeout = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentFullText.substring(0, displayText.length - 1)
          : currentFullText.substring(0, displayText.length + 1)
      );
    }, typingSpeed);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPhrase]);

  const children = useCounter(20000, 2000, countersActive);
  const settlement = useCounter(800, 1600, countersActive);

  const scrollToContent = () => {
    const element = document.getElementById('what');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50%       { transform: translateY(-12px) rotate(1deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(205,133,63,0); }
          50%       { box-shadow: 0 0 32px 8px rgba(205,133,63,0.18); }
        }
        @keyframes lineExpand {
          from { width: 0; }
          to   { width: 80px; }
        }
        @keyframes revealMask {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0% 0 0); }
        }
        @keyframes slowZoom {
          from { transform: scale(1); }
          to   { transform: scale(1.06); }
        }
        @keyframes grain {
          0%,100%{ transform: translate(0,0) }
          10%    { transform: translate(-1%,-2%) }
          20%    { transform: translate(2%,1%) }
          30%    { transform: translate(-2%,3%) }
          40%    { transform: translate(1%,-1%) }
          50%    { transform: translate(-1%,2%) }
          60%    { transform: translate(2%,-2%) }
          70%    { transform: translate(-1%,1%) }
          80%    { transform: translate(1%,-3%) }
          90%    { transform: translate(-2%,2%) }
        }

        .hero-title {
          background: linear-gradient(
            90deg,
            #f5f0e8 0%,
            #d4a853 35%,
            #f5f0e8 50%,
            #d4a853 65%,
            #f5f0e8 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 5s linear infinite;
        }

        .fade-up-1 { animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
        .fade-up-2 { animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s both; }
        .fade-up-3 { animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s both; }
        .fade-up-4 { animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.7s both; }
        .fade-up-5 { animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.9s both; }
        .fade-up-6 { animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 1.1s both; }
        .fade-in-slow { animation: fadeIn 1.8s ease 0.4s both; }

        .image-float { animation: float 7s ease-in-out infinite; }
        .stat-glow:hover { animation: pulseGlow 1.5s ease-in-out infinite; }
        .line-expand { animation: lineExpand 0.8s cubic-bezier(0.16,1,0.3,1) 1.2s both; }
        .slow-zoom { animation: slowZoom 18s ease-in-out infinite alternate; }
        .reveal-mask { animation: revealMask 1.2s cubic-bezier(0.16,1,0.3,1) 0.6s both; }

        .grain-overlay::after {
          content: '';
          position: absolute;
          inset: -50%;
          width: 200%;
          height: 200%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.04;
          animation: grain 0.5s steps(1) infinite;
          pointer-events: none;
          z-index: 1;
        }

        .quote-line::before {
          content: '';
          display: block;
          width: 3px;
          background: #c8873a;
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          border-radius: 2px;
        }

        .scroll-btn { animation: fadeUp 1s ease 1.6s both; }
      `}</style>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal grain-overlay">

        {/* Radial ambient glow */}
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 0,
            background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(160,82,45,0.13) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* ParticleCanvas — uncomment if you have it */}
        {/* <ParticleCanvas /> */}

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24">

          {/* ── TOP LAYOUT: text left + image right ── */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-16">

            {/* Left column */}
            <div className="flex-1 text-center lg:text-left">
              {/* Eyebrow */}
              <div className="fade-up-1 flex items-center gap-3 justify-center lg:justify-start mb-6">
                <span
                  style={{
                    display: 'inline-block',
                    width: 36, height: 2,
                    background: '#c8873a',
                    borderRadius: 2,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'sans-serif',
                    fontSize: '0.7rem',
                    letterSpacing: '0.25em',
                    color: '#c8873a',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  A History of State-Sanctioned Removal
                </span>
              </div>

              {/* Main title */}
              <h1
                className="hero-title fade-up-2"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(4rem, 10vw, 8rem)',
                  lineHeight: 0.92,
                  marginBottom: '1.25rem',
                  letterSpacing: '-0.02em',
                }}
              >
                Stolen
              </h1>

              {/* Subtitle */}
              <p
                className="fade-up-3"
                style={{
                  fontFamily: 'sans-serif',
                  fontSize: 'clamp(1rem, 2vw, 1.35rem)',
                  color: 'rgba(245,240,232,0.82)',
                  lineHeight: 1.65,
                  marginBottom: '1.5rem',
                  maxWidth: 480,
                  margin: '0 auto 1.5rem',
                }}
              >
              
        The Sixties Scoop and the Children Canada Took <br />
        By: Hussain Khokhawala
        </p>

              {/* Description */}
              <p
                className="fade-up-4"
                style={{
                  fontFamily: 'sans-serif',
                  fontSize: '0.95rem',
                  color: 'rgba(245,240,232,0.6)',
                  lineHeight: 1.8,
                  maxWidth: 460,
                  margin: '0 auto 2rem',
                }}
              >
                Between 1951 and the mid-1980s, the Canadian government systematically removed
                Indigenous children from their families and communities. They were placed with
                non-Indigenous families and led to the erasure of language, culture, and identity.
                This is their story. (Baswan and Yenilmez).
              </p>

              {/* Typewriter */}
              <div className="fade-up-5 h-12 mb-8" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p
                  style={{
                    fontFamily: 'sans-serif',
                    fontSize: '1.05rem',
                    color: '#c8873a',
                    fontWeight: 600,
                    letterSpacing: '0.01em',
                  }}
                >
                  {displayText}
                  <span style={{ animation: 'fadeUp 0.6s ease infinite alternate', opacity: 0.9 }}>|</span>
                </p>
              </div>

              {/* CTA */}
              <div className="fade-up-6 flex gap-4 justify-center lg:justify-start">
                <button
                  onClick={scrollToContent}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '0.75rem 1.75rem',
                    background: '#c8873a',
                    color: '#1a1612',
                    border: 'none',
                    borderRadius: 6,
                    fontFamily: 'sans-serif',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#d4963f';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#c8873a';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Learn More <ArrowRight size={16} />
                </button>
                <button
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '0.75rem 1.75rem',
                    background: 'transparent',
                    color: 'rgba(245,240,232,0.75)',
                    border: '1px solid rgba(245,240,232,0.2)',
                    borderRadius: 6,
                    fontFamily: 'sans-serif',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    letterSpacing: '0.03em',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(200,135,58,0.5)';
                    e.currentTarget.style.color = '#c8873a';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(245,240,232,0.2)';
                    e.currentTarget.style.color = 'rgba(245,240,232,0.75)';
                  }}
                >
                  Survivor Stories
                </button>
              </div>
            </div>

            {/* Right column — image */}
            <div
              className="flex-shrink-0 reveal-mask"
              style={{ width: 'clamp(260px, 36vw, 440px)' }}
            >
              <div
                className="image-float"
                style={{
                  position: 'relative',
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: '0 40px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(200,135,58,0.15)',
                }}
              >
                {/* Slow-zoom image */}
                <div style={{ overflow: 'hidden', borderRadius: 4 }}>
                  <img
                    src="https://bcfosterparents.ca/wp-content/uploads/SIXTIES-SCOOP-APOLOGY-still.webp"
                    alt="Indigenous child's hands holding a feather — a symbol of cultural identity"
                    className="slow-zoom"
                    onLoad={() => setImageLoaded(true)}
                    style={{
                      width: '100%',
                      display: 'block',
                      filter: 'sepia(30%) contrast(1.05) brightness(0.88)',
                      opacity: imageLoaded ? 1 : 0,
                      transition: 'opacity 1s ease',
                    }}
                  />
                </div>

                {/* Gradient overlay */}
                <div
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, transparent 55%, rgba(26,22,18,0.75) 100%)',
                  }}
                />

                {/* Caption on image */}
                <div
                  style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: '1.25rem 1.25rem 1.1rem',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'Georgia, serif',
                      fontStyle: 'italic',
                      fontSize: '0.82rem',
                      color: 'rgba(245,240,232,0.7)',
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    "They took everything our language, our home, our names."
                  </p>
                  <p style={{ fontFamily: 'sans-serif', fontSize: '0.7rem', color: '#c8873a', marginTop: 4 }}>
                    — Sixties Scoop Survivor
                  </p>
                </div>

                {/* Corner accent */}
                <div
                  style={{
                    position: 'absolute', top: 14, right: 14,
                    width: 36, height: 36,
                    border: '2px solid rgba(200,135,58,0.45)',
                    borderRadius: 2,
                  }}
                />
              </div>
            </div>
          </div>

          {/* ── STATS ── */}
          <div ref={statsRef} className="fade-up-5">
            <div
              style={{
                width: 80, height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(200,135,58,0.5), transparent)',
                margin: '0 auto 2.5rem',
              }}
              className="line-expand"
            />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '1rem',
                marginBottom: '3rem',
              }}
            >
              {[
                {
                  value: countersActive ? `${children.toLocaleString()}+` : '—',
                  label: 'Children removed',
                  sub: 'Estimated across Canada',
                },
                {
                  value: '1951–1984',
                  label: 'Years active',
                  sub: 'Over three decades of policy',
                },
                {
                  value: countersActive ? `$${settlement}M` : '—',
                  label: 'Settlement reached',
                  sub: '2017 class-action judgment',
                },
                {
                  value: 'Ongoing',
                  label: 'Still happening',
                  sub: 'Overrepresentation in child welfare',
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="stat-glow"
                  style={{
                    background: 'rgba(160,82,45,0.1)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(160,82,45,0.2)',
                    borderRadius: 8,
                    padding: '1.5rem 1.25rem',
                    cursor: 'default',
                    transition: 'all 0.3s ease',
                    animationDelay: `${i * 0.12}s`,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(160,82,45,0.18)';
                    e.currentTarget.style.borderColor = 'rgba(200,135,58,0.4)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(160,82,45,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(160,82,45,0.2)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                      color: '#c8873a',
                      marginBottom: '0.35rem',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: 'sans-serif',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'rgba(245,240,232,0.9)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {stat.label}
                  </div>
                  <div
                    style={{
                      fontFamily: 'sans-serif',
                      fontSize: '0.72rem',
                      color: 'rgba(245,240,232,0.45)',
                      lineHeight: 1.4,
                    }}
                  >
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── PULL QUOTE ── */}
          <div
            className="fade-up-6"
            style={{
              position: 'relative',
              paddingLeft: '1.5rem',
              maxWidth: 620,
              margin: '0 auto 3rem',
              textAlign: 'left',
            }}
          >
            <div
              style={{
                position: 'absolute', left: 0, top: 0, bottom: 0,
                width: 3, background: '#c8873a', borderRadius: 2,
              }}
            />
            <p
              style={{
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
                color: 'rgba(245,240,232,0.65)',
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              The Sixties Scoop was not an accident of history rather it was a policy.
              Children were taken not because they were in danger, but because they were
              Indigenous. Understanding this is the first step toward reconciliation. This website will explore this issue with an anti opressive lens, connecting topics back to the 4Rs.
            </p>
          </div>

          {/* ── SCROLL CTA ── */}
          <div className="scroll-btn" style={{ textAlign: 'center' }}>
            <button
              onClick={scrollToContent}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'rgba(245,240,232,0.45)',
                transition: 'color 0.2s ease',
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                animation: 'fadeUp 1s ease 1.8s both',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'rgba(245,240,232,0.85)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(245,240,232,0.45)'; }}
              aria-label="Scroll to content"
            >
              <span style={{ fontFamily: 'sans-serif', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Scroll to explore
              </span>
              <ChevronDown size={28} style={{ animation: 'fadeUp 0.8s ease infinite alternate' }} />
            </button>
          </div>

        </div>
      </section>
    </>
  );
}
