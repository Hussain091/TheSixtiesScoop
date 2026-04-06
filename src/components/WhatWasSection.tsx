import { useEffect, useState, useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ExternalLink, ArrowRight } from 'lucide-react';

// ── Inline citation badge ──────────────────────────────────────────────────
function Cite({ id, label, href }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      style={{ position: 'relative', display: 'inline' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a
        href={href || '#'}
        target={href ? '_blank' : undefined}
        rel="noopener noreferrer"
        onClick={e => { if (!href) e.preventDefault(); }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 17, height: 17,
          borderRadius: '50%',
          background: hovered ? 'rgba(200,135,58,0.28)' : 'rgba(200,135,58,0.1)',
          border: '1px solid rgba(200,135,58,0.4)',
          color: '#c8873a',
          fontFamily: 'sans-serif',
          fontSize: '0.52rem',
          fontWeight: 800,
          textDecoration: 'none',
          verticalAlign: 'super',
          marginLeft: 2,
          lineHeight: 1,
          transition: 'all 0.2s ease',
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        {id}
      </a>
      {hovered && (
        <span style={{
          position: 'absolute',
          bottom: '130%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(12,9,7,0.97)',
          border: '1px solid rgba(200,135,58,0.35)',
          borderRadius: 7,
          padding: '0.45rem 0.75rem',
          fontFamily: 'sans-serif',
          fontSize: '0.68rem',
          color: 'rgba(245,240,232,0.8)',
          whiteSpace: 'nowrap',
          zIndex: 200,
          boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
          pointerEvents: 'none',
          animation: 'tooltipPop 0.15s ease both',
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            {href && <ExternalLink size={9} color="#c8873a" />}
            <span style={{ color: '#c8873a', fontWeight: 700 }}>[{id}]</span>
            {label}
          </span>
        </span>
      )}
    </span>
  );
}

// ── Animated counter with custom easing ──────────────────────────────────
function AnimatedNumber({ target, duration = 2200, prefix = '', suffix = '', started }) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (!started) return;
    startRef.current = null;
    const animate = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [started, target, duration]);

  return (
    <span style={{ fontVariantNumeric: 'tabular-nums' }}>
      {prefix}{display.toLocaleString()}{suffix}
    </span>
  );
}

// ── Typewriter for a single string ────────────────────────────────────────
function TypewriterStat({ text, started, delay = 0 }) {
  const [shown, setShown] = useState('');
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(t);
  }, [started, delay]);

  useEffect(() => {
    if (!active) return;
    if (shown.length >= text.length) return;
    const t = setTimeout(() => {
      setShown(text.slice(0, shown.length + 1));
    }, 55);
    return () => clearTimeout(t);
  }, [active, shown, text]);

  return (
    <span style={{ fontVariantNumeric: 'tabular-nums' }}>
      {shown}
      {shown.length < text.length && (
        <span style={{ animation: 'cursorBlink 0.7s steps(1) infinite', opacity: 1 }}>|</span>
      )}
    </span>
  );
}

export default function WhatWasSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.15 });
  const [started, setStarted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    if (isIntersecting && !started) setStarted(true);
  }, [isIntersecting]);

  const sources = [
    { id: 'J',   label: 'Johnston, 1983',        href: 'https://www.canadiansocialresearch.net/nativechildren.htm' },
    { id: 'TRC', label: 'TRC Calls to Action, 2015', href: 'https://www2.gov.bc.ca/assets/gov/british-columbians-our-governments/indigenous-people/aboriginal-peoples-documents/calls_to_action_english2.pdf' },
    { id: 'HD',  label: 'Healthy Debate, 2020',   href: 'https://healthydebate.ca/2020/10/topic/sixties-scoop-survivors/' },
    { id: 'S',   label: 'Sinclair, 2007',         href: null },
  ];

  const contextCards = [
    {
      label: 'The Legal Mechanism',
      text: 'Section 88 of the Indian Act (1951) extended provincial laws — including child welfare — to reserves. This gave provinces authority to remove children without federal oversight or Indigenous consent.',
      cite: { id: 'TRC', label: 'TRC Calls to Action, 2015', href: 'https://www2.gov.bc.ca/assets/gov/british-columbians-our-governments/indigenous-people/aboriginal-peoples-documents/calls_to_action_english2.pdf' },
    },
    {
      label: 'Named in 1983',
      text: 'Patrick Johnston coined the term "Sixties Scoop" in his 1983 report Native Children and the Child Welfare System — the first time the practice was formally named and documented.',
      cite: { id: 'J', label: 'Johnston, 1983', href: 'https://www.canadiansocialresearch.net/nativechildren.htm' },
    },
    {
      label: 'Global Reach',
      text: 'Children were not only placed across Canada — some were sent to the United States and Europe. Families had no legal recourse and were rarely told where their children had gone.',
      cite: { id: 'S', label: 'Sinclair, 2007', href: null },
    },
  ];

  return (
    <>
      <style>{`
        @keyframes fadeUpIn {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tooltipPop {
          from { opacity: 0; transform: translateX(-50%) translateY(4px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes imgReveal {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0% 0 0); }
        }
        @keyframes glowPulse {
          0%,100% { opacity: 0.22; }
          50%      { opacity: 0.55; }
        }
        @keyframes softFloat {
          0%,100% { transform: translateY(0) rotate(-0.5deg); }
          50%      { transform: translateY(-8px) rotate(0.5deg); }
        }
        @keyframes cursorBlink {
          0%,49% { opacity: 1; }
          50%,100% { opacity: 0; }
        }
        @keyframes statReveal {
          from { opacity: 0; transform: scale(0.92) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes lineExpand {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes shimmerMove {
          from { background-position: -200% center; }
          to   { background-position: 200% center; }
        }
        @keyframes digitFlicker {
          0%,100% { opacity: 1; }
          45%      { opacity: 0.7; }
          50%      { opacity: 1; }
        }

        .fade-up-1 { animation: fadeUpIn 0.85s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .fade-up-2 { animation: fadeUpIn 0.85s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
        .fade-up-3 { animation: fadeUpIn 0.85s cubic-bezier(0.16,1,0.3,1) 0.35s both; }
        .fade-up-4 { animation: fadeUpIn 0.85s cubic-bezier(0.16,1,0.3,1) 0.5s both; }
        .fade-up-5 { animation: fadeUpIn 0.85s cubic-bezier(0.16,1,0.3,1) 0.65s both; }

        .img-reveal  { animation: imgReveal 1.1s cubic-bezier(0.16,1,0.3,1) 0.3s both; }
        .soft-float  { animation: softFloat 7s ease-in-out infinite; }
        .glow-orb    { animation: glowPulse 4s ease-in-out infinite; }

        .stat-card {
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .stat-card:hover {
          transform: translateY(-6px);
          border-color: rgba(200,135,58,0.45) !important;
          box-shadow: 0 24px 48px rgba(0,0,0,0.45), 0 0 40px rgba(200,135,58,0.07) !important;
        }

        .big-number {
          font-variant-numeric: tabular-nums;
          animation: digitFlicker 4s ease-in-out infinite;
        }

        .ctx-card {
          transition: all 0.25s ease;
        }
        .ctx-card:hover {
          border-color: rgba(200,135,58,0.35) !important;
          background: rgba(200,135,58,0.06) !important;
          transform: translateX(4px);
        }

        .source-link {
          transition: color 0.2s ease;
        }
        .source-link:hover { color: #c8873a !important; }

        .highlight-number {
          background: linear-gradient(90deg, #c8873a 0%, #f0c070 40%, #c8873a 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerMove 3.5s linear infinite;
          font-family: Georgia, serif;
          font-weight: 700;
        }
      `}</style>

      <section
        id="what"
        ref={ref}
        style={{
          padding: '8rem 1.5rem',
          background: 'linear-gradient(180deg, #1a1612 0%, #1c1510 55%, #1a1612 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
        className={`transition-all duration-1000 ${
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(200,135,58,0.045) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />

        {/* Glow orbs */}
        <div className="glow-orb" style={{
          position: 'absolute', top: '5%', right: '-12%',
          width: '52vw', height: '52vw', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(160,82,45,0.11) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="glow-orb" style={{
          position: 'absolute', bottom: '5%', left: '-12%',
          width: '40vw', height: '40vw', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(200,135,58,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
          animationDelay: '2s',
        }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* ── HEADER ── */}
          <div className="fade-up-1" style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem',
            }}>
              <div style={{
                width: 36, height: 1, background: 'rgba(200,135,58,0.5)',
                animation: 'lineExpand 0.8s ease 0.2s both',
                transformOrigin: 'right',
              }} />
              <span style={{
                fontFamily: 'sans-serif', fontSize: '0.65rem',
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: '#c8873a', fontWeight: 600, opacity: 0.8,
              }}>
                Historical Context
              </span>
              <div style={{
                width: 36, height: 1, background: 'rgba(200,135,58,0.5)',
                animation: 'lineExpand 0.8s ease 0.2s both',
                transformOrigin: 'left',
              }} />
            </div>

            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(2.6rem, 6vw, 5rem)',
              color: '#f5f0e8',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              marginBottom: '1.25rem',
            }}>
              What Was the Sixties Scoop
            </h2>

            <div style={{
              width: 60, height: 2,
              background: 'linear-gradient(90deg, transparent, #c8873a, transparent)',
              margin: '0 auto',
              animation: 'lineExpand 0.9s ease 0.4s both',
              transformOrigin: 'center',
            }} />
          </div>

          {/* ── QUOTE + BODY TEXT ── */}
          <div className="fade-up-2" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
            marginBottom: '3.5rem',
            alignItems: 'start',
          }}>
            {/* Pull quote */}
            <div style={{
              borderLeft: '3px solid #c8873a',
              paddingLeft: '1.75rem',
              position: 'relative',
            }}>
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '6rem',
                color: 'rgba(200,135,58,0.1)',
                lineHeight: 0.75,
                position: 'absolute',
                top: -12, left: 10,
                userSelect: 'none', pointerEvents: 'none',
              }}>"</div>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(1.05rem, 2vw, 1.35rem)',
                color: '#c8873a',
                lineHeight: 1.65,
                fontStyle: 'italic',
                marginBottom: '1rem',
                position: 'relative', zIndex: 1,
              }}>
                "It was common practice to 'scoop' newborns from their mothers on reserves."
              </p>
              <p style={{
                fontFamily: 'sans-serif',
                fontSize: '0.78rem',
                color: 'rgba(245,240,232,0.4)',
                lineHeight: 1.5,
              }}>
                B.C. social worker — the practice Patrick Johnston would name in 1983
                <Cite id="J" label="Johnston, 1983" href="https://www.canadiansocialresearch.net/nativechildren.htm" />
              </p>
            </div>

            {/* Body */}
            <div style={{
              fontFamily: 'sans-serif',
              fontSize: '0.93rem',
              color: 'rgba(245,240,232,0.76)',
              lineHeight: 1.9,
              display: 'flex', flexDirection: 'column', gap: '1rem',
            }}>
              <p>
                In 1951, the government amended the Indian Act to give provincial governments power
                over Indigenous child welfare.
                <Cite id="TRC" label="TRC Calls to Action, 2015" href="https://www2.gov.bc.ca/assets/gov/british-columbians-our-governments/indigenous-people/aboriginal-peoples-documents/calls_to_action_english2.pdf" />{' '}
                As residential schools faced mounting criticism, a new mechanism emerged to pursue
                the same goal — assimilation — under a different name.
              </p>
              <p>
                When Indian Residential Schools failed to "kill the Indian in the child," child
                welfare agencies stepped in to finish the job.
                <Cite id="TRC" label="TRC Calls to Action, 2015" href="https://www2.gov.bc.ca/assets/gov/british-columbians-our-governments/indigenous-people/aboriginal-peoples-documents/calls_to_action_english2.pdf" />
              </p>
              <p>
                Children were taken without consent, without warning, without families being told
                where their children went.
                <Cite id="HD" label="Healthy Debate, 2020" href="https://healthydebate.ca/2020/10/topic/sixties-scoop-survivors/" />
              </p>
              <p>
                Between the 1950s and 1980s, over{' '}
                <span className="highlight-number">20,000 Indigenous children</span>{' '}
                were removed from their families and placed into non-Indigenous homes across Canada
                and around the world.
                <Cite id="J" label="Johnston, 1983" href="https://www.canadiansocialresearch.net/nativechildren.htm" />
              </p>
            </div>
          </div>

          {/* ── IMAGE + CONTEXT CARDS ── */}
          <div className="fade-up-3" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3.5rem',
            alignItems: 'stretch',
          }}>
            {/* Image */}
            <div
              className="img-reveal soft-float"
              style={{
                borderRadius: 12, overflow: 'hidden',
                position: 'relative',
                border: '1px solid rgba(200,135,58,0.18)',
                boxShadow: '0 32px 64px rgba(0,0,0,0.55)',
                minHeight: 280,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1503525148566-ef5c2b9c93bd?w=800&q=80"
                alt="A child's hands — representing the children taken by the Sixties Scoop"
                onLoad={() => setImageLoaded(true)}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', display: 'block',
                  filter: 'sepia(40%) contrast(1.06) brightness(0.72)',
                  opacity: imageLoaded ? 1 : 0,
                  transition: 'opacity 0.9s ease',
                  minHeight: 280,
                }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, transparent 35%, rgba(22,18,14,0.9) 100%)',
              }} />
              {/* Image overlay quote */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '1.5rem',
              }}>
                <p style={{
                  fontFamily: 'Georgia, serif', fontStyle: 'italic',
                  fontSize: '0.8rem',
                  color: 'rgba(245,240,232,0.65)',
                  margin: 0, lineHeight: 1.55,
                }}>
                  "They took children without consent, without warning."
                  <Cite id="HD" label="Healthy Debate, 2020" href="https://healthydebate.ca/2020/10/topic/sixties-scoop-survivors/" />
                </p>
              </div>
            </div>

            {/* Context cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {contextCards.map((card, i) => (
                <div
                  key={i}
                  className="ctx-card"
                  style={{
                    background: 'rgba(22,18,14,0.72)',
                    border: '1px solid rgba(200,135,58,0.13)',
                    borderRadius: 10,
                    padding: '1rem 1.25rem',
                    backdropFilter: 'blur(8px)',
                    flex: 1,
                    animation: `fadeUpIn 0.6s ease ${0.35 + i * 0.12}s both`,
                  }}
                >
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 7,
                    marginBottom: '0.5rem',
                  }}>
                    <ArrowRight size={11} color="#c8873a" style={{ flexShrink: 0 }} />
                    <span style={{
                      fontFamily: 'sans-serif', fontSize: '0.62rem',
                      letterSpacing: '0.18em', textTransform: 'uppercase',
                      color: '#c8873a', fontWeight: 700,
                    }}>
                      {card.label}
                    </span>
                  </div>
                  <p style={{
                    fontFamily: 'sans-serif', fontSize: '0.83rem',
                    color: 'rgba(245,240,232,0.63)',
                    lineHeight: 1.72, margin: 0,
                  }}>
                    {card.text}
                    <Cite id={card.cite.id} label={card.cite.label} href={card.cite.href} />
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── STAT CARDS ── */}
          <div className="fade-up-4" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem',
            marginBottom: '1.5rem',
          }}>
            {/* Stat 1 */}
            <div
              className="stat-card"
              style={{
                background: 'rgba(20,16,12,0.85)',
                border: '1px solid rgba(200,135,58,0.18)',
                borderRadius: 14,
                padding: '2.25rem 2rem',
                textAlign: 'center',
                boxShadow: '0 10px 36px rgba(0,0,0,0.35)',
                position: 'relative', overflow: 'hidden',
              }}
            >
              {/* Top accent bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: 'linear-gradient(90deg, transparent, #b85c2a, transparent)',
              }} />

              <div
                className="big-number"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                  color: '#c8873a',
                  lineHeight: 1,
                  marginBottom: '0.75rem',
                  letterSpacing: '-0.02em',
                  minHeight: '4.5rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {started
                  ? <AnimatedNumber target={1400} duration={2200} started={started} />
                  : <span style={{ opacity: 0.3 }}>—</span>
                }
              </div>

              <div style={{
                fontFamily: 'sans-serif', fontSize: '0.87rem',
                color: 'rgba(245,240,232,0.72)', lineHeight: 1.55, marginBottom: '0.4rem',
              }}>
                Indigenous children in B.C. provincial care in 1964
              </div>
              <div style={{
                fontFamily: 'sans-serif', fontSize: '0.7rem',
                color: 'rgba(245,240,232,0.38)', marginBottom: '1.25rem',
              }}>
                Up from approximately 30 in 1951
                <Cite id="J" label="Johnston, 1983" href="https://www.canadiansocialresearch.net/nativechildren.htm" />
              </div>

              {/* Badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '0.3rem 1rem',
                background: 'rgba(184,92,42,0.12)',
                border: '1px solid rgba(184,92,42,0.28)',
                borderRadius: 999,
              }}>
                <span style={{ fontFamily: 'Georgia, serif', fontSize: '1.25rem', color: '#b85c2a' }}>
                  {started
                    ? <TypewriterStat text="50×" started={started} delay={1800} />
                    : '—'
                  }
                </span>
                <span style={{
                  fontFamily: 'sans-serif', fontSize: '0.7rem',
                  color: 'rgba(245,240,232,0.45)',
                }}>
                  increase in 13 years
                </span>
              </div>
            </div>

            {/* Stat 2 */}
            <div
              className="stat-card"
              style={{
                background: 'rgba(20,16,12,0.85)',
                border: '1px solid rgba(200,135,58,0.18)',
                borderRadius: 14,
                padding: '2.25rem 2rem',
                textAlign: 'center',
                boxShadow: '0 10px 36px rgba(0,0,0,0.35)',
                position: 'relative', overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: 'linear-gradient(90deg, transparent, #d4963f, transparent)',
              }} />

              <div
                className="big-number"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                  color: '#c8873a',
                  lineHeight: 1,
                  marginBottom: '0.75rem',
                  letterSpacing: '-0.02em',
                  minHeight: '4.5rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {started
                  ? <AnimatedNumber target={3400} duration={2400} started={started} />
                  : <span style={{ opacity: 0.3 }}>—</span>
                }
              </div>

              <div style={{
                fontFamily: 'sans-serif', fontSize: '0.87rem',
                color: 'rgba(245,240,232,0.72)', lineHeight: 1.55, marginBottom: '0.4rem',
              }}>
                Indigenous children adopted in Manitoba
              </div>
              <div style={{
                fontFamily: 'sans-serif', fontSize: '0.7rem',
                color: 'rgba(245,240,232,0.38)', marginBottom: '1.25rem',
              }}>
                Between 1971 and 1981
                <Cite id="J" label="Johnston, 1983" href="https://www.canadiansocialresearch.net/nativechildren.htm" />
              </div>

              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '0.3rem 1rem',
                background: 'rgba(184,92,42,0.12)',
                border: '1px solid rgba(184,92,42,0.28)',
                borderRadius: 999,
              }}>
                <span style={{ fontFamily: 'Georgia, serif', fontSize: '1.25rem', color: '#b85c2a' }}>
                  {started
                    ? <TypewriterStat text="80%" started={started} delay={2000} />
                    : '—'
                  }
                </span>
                <span style={{
                  fontFamily: 'sans-serif', fontSize: '0.7rem',
                  color: 'rgba(245,240,232,0.45)',
                }}>
                  placed in non-Indigenous homes
                </span>
              </div>
            </div>
          </div>

          {/* ── HIGHLIGHTED STAT ── */}
          <div className="fade-up-5" style={{
            background: 'rgba(14,11,8,0.9)',
            border: '1px solid rgba(200,135,58,0.18)',
            borderRadius: 14,
            padding: '2.25rem 2.5rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(10px)',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 2,
              background: 'linear-gradient(90deg, transparent, #c8873a, #d4963f, #c8873a, transparent)',
            }} />
            {/* Ghost text */}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'none', overflow: 'hidden',
            }}>
              <span style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(4rem, 10vw, 9rem)',
                color: 'rgba(200,135,58,0.025)',
                fontWeight: 700, whiteSpace: 'nowrap',
                userSelect: 'none',
              }}>
                4.5×
              </span>
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{
                fontFamily: 'sans-serif',
                fontSize: 'clamp(0.93rem, 1.8vw, 1.1rem)',
                color: 'rgba(245,240,232,0.82)',
                lineHeight: 1.8, margin: '0 auto 0.5rem',
                maxWidth: 760,
              }}>
                Aboriginal children were{' '}
                <span className="highlight-number" style={{ fontSize: '1.2em' }}>
                  {started
                    ? <TypewriterStat text="4.5 times more likely" started={started} delay={2400} />
                    : '4.5 times more likely'
                  }
                </span>{' '}
                than non-Aboriginal children to be in the care of child welfare authorities.
                <Cite id="S" label="Sinclair, 2007" href={null} />
              </p>
            </div>

            {/* Source legend */}
            <div style={{
              marginTop: '2rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid rgba(200,135,58,0.08)',
              display: 'flex', flexWrap: 'wrap',
              justifyContent: 'center', gap: '0.4rem 1.25rem',
            }}>
              <span style={{
                fontFamily: 'sans-serif', fontSize: '0.58rem',
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'rgba(245,240,232,0.2)',
                width: '100%', textAlign: 'center', marginBottom: '0.3rem',
              }}>
                Sources cited in this section
              </span>
              {sources.map((s) => (
                <a
                  key={s.id}
                  href={s.href || '#'}
                  target={s.href ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  onClick={e => { if (!s.href) e.preventDefault(); }}
                  className="source-link"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    fontFamily: 'sans-serif', fontSize: '0.67rem',
                    color: 'rgba(200,135,58,0.5)',
                    textDecoration: 'none',
                    letterSpacing: '0.02em',
                  }}
                >
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 15, height: 15, borderRadius: '50%',
                    background: 'rgba(200,135,58,0.09)',
                    border: '1px solid rgba(200,135,58,0.28)',
                    fontSize: '0.48rem', fontWeight: 800, color: '#c8873a',
                    flexShrink: 0,
                  }}>
                    {s.id}
                  </span>
                  {s.label}
                  {s.href && <ExternalLink size={9} />}
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
