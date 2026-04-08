import { useEffect, useState, useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

// rAF-based counter with cubic ease-out
function AnimatedNumber({ target, duration = 2200, started }) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (!started) return;
    startRef.current = null;
    const animate = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const progress = Math.min((ts - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [started, target, duration]);

  return <span style={{ fontVariantNumeric: 'tabular-nums' }}>{display.toLocaleString()}</span>;
}

// Typewriter for the badge labels (50×, 80%)
function Typewriter({ text, started, delay = 0 }) {
  const [shown, setShown] = useState('');
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(t);
  }, [started, delay]);

  useEffect(() => {
    if (!active || shown.length >= text.length) return;
    const t = setTimeout(() => setShown(text.slice(0, shown.length + 1)), 60);
    return () => clearTimeout(t);
  }, [active, shown, text]);

  return (
    <span style={{ fontVariantNumeric: 'tabular-nums' }}>
      {shown}
      {shown.length < text.length && (
        <span style={{ animation: 'cursorBlink 0.7s steps(1) infinite' }}>|</span>
      )}
    </span>
  );
}

export default function WhatWasSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });
  const [started, setStarted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (isIntersecting && !started) setStarted(true);
  }, [isIntersecting]);

  return (
    <>
      <style>{`
        @keyframes fadeUpIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes imgReveal {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0% 0 0); }
        }
        @keyframes glowPulse {
          0%,100% { opacity: 0.25; }
          50%      { opacity: 0.6; }
        }
        @keyframes softFloat {
          0%,100% { transform: translateY(0) rotate(-0.5deg); }
          50%      { transform: translateY(-9px) rotate(0.5deg); }
        }
        @keyframes cursorBlink {
          0%,49% { opacity: 1; }
          50%,100% { opacity: 0; }
        }
        @keyframes digitFlicker {
          0%,100% { opacity: 1; }
          47% { opacity: 0.65; }
          50% { opacity: 1; }
        }
        @keyframes lineExpand {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes shimmerMove {
          from { background-position: -200% center; }
          to   { background-position: 200% center; }
        }
        @keyframes badgePop {
          0%   { transform: scale(0.85); opacity: 0; }
          70%  { transform: scale(1.04); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes borderPulse {
          0%,100% { border-color: rgba(200,135,58,0.18); }
          50%      { border-color: rgba(200,135,58,0.42); }
        }

        .fade-up-1 { animation: fadeUpIn 0.85s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .fade-up-2 { animation: fadeUpIn 0.85s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
        .fade-up-3 { animation: fadeUpIn 0.85s cubic-bezier(0.16,1,0.3,1) 0.35s both; }
        .fade-up-4 { animation: fadeUpIn 0.85s cubic-bezier(0.16,1,0.3,1) 0.5s both; }
        .fade-up-5 { animation: fadeUpIn 0.85s cubic-bezier(0.16,1,0.3,1) 0.65s both; }

        .img-reveal { animation: imgReveal 1.2s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
        .soft-float { animation: softFloat 7s ease-in-out infinite; }
        .glow-orb   { animation: glowPulse 4s ease-in-out infinite; }

        .stat-card {
          animation: borderPulse 4s ease-in-out infinite;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .stat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 28px 56px rgba(0,0,0,0.5), 0 0 40px rgba(200,135,58,0.09) !important;
        }

        .big-num {
          animation: digitFlicker 5s ease-in-out 2s infinite;
        }

        .badge-pop {
          animation: badgePop 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
        }

        .highlight-shimmer {
          background: linear-gradient(90deg, #c8873a 0%, #f0c070 40%, #c8873a 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerMove 3.5s linear infinite;
          font-weight: 600;
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
          position: 'absolute', top: '0%', right: '-15%',
          width: '55vw', height: '55vw', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(160,82,45,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="glow-orb" style={{
          position: 'absolute', bottom: '5%', left: '-12%',
          width: '42vw', height: '42vw', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(200,135,58,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
          animationDelay: '2s',
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* ── HEADER ── */}
          <div className="fade-up-1" style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem',
            }}>
              <div style={{
                width: 40, height: 1, background: 'rgba(200,135,58,0.5)',
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
                width: 40, height: 1, background: 'rgba(200,135,58,0.5)',
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
              width: 64, height: 2,
              background: 'linear-gradient(90deg, transparent, #c8873a, transparent)',
              margin: '0 auto',
              animation: 'lineExpand 0.9s ease 0.4s both',
              transformOrigin: 'center',
            }} />
          </div>

          {/* ── QUOTE + TEXT + IMAGE ── */}
          <div className="fade-up-2" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2.5rem',
            marginBottom: '4rem',
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
                color: 'rgba(200,135,58,0.09)',
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
                fontSize: '0.8rem',
                color: 'rgba(245,240,232,0.45)',
                lineHeight: 1.5,
              }}>
                B.C. social worker, describing the practice that Patrick Johnston would name in 1983
              </p>
            </div>

            {/* Body text */}
            <div style={{
              fontFamily: 'sans-serif',
              fontSize: '0.95rem',
              color: 'rgba(245,240,232,0.8)',
              lineHeight: 1.9,
              display: 'flex', flexDirection: 'column', gap: '1rem',
            }}>
              <p>
                In 1951, the government had created the Indian Act to give provincial governments
                power over Indigenous child welfare. As residential schools were being stopped, so
                they found a new way to finish the goal of assimilation never stopped. (Baswan and Yenilmez).
              </p>
              <p>
                In simple terms when Indian Residential Schools didn't "kill the Indigenous in the
                child," Child Welfare agencies stepped in to finish the job.
              </p>
              <p>
                They took children without consent, without warning, without families being told
                where their children went. (Baswan and Yenilmez)
              </p>
              <p>
                Between the 1950s and 1980s, over{' '}
                <span className="highlight-shimmer">20,000 Indigenous children</span>{' '}
                were removed from their families and communities and placed into non-Indigenous
                homes across Canada and around the world. (Baswan and Yenilmez)
              </p>
            </div>
          </div>

          {/* ── IMAGE BANNER ── */}
          <div className="fade-up-3" style={{ marginBottom: '3.5rem' }}>
            <div
              className="img-reveal soft-float"
              style={{
                borderRadius: 14,
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid rgba(200,135,58,0.18)',
                boxShadow: '0 32px 64px rgba(0,0,0,0.55)',
                maxHeight: 340,
              }}
            >
              <img
                src="https://b1867527.smushcdn.com/1867527/wp-content/uploads/2020/04/60S-SCOOP-COVID-2-640x360-1.jpg?lossy=1&strip=1&webp=1"
                alt="A child's hands — representing the children taken by the Sixties Scoop"
                onLoad={() => setImageLoaded(true)}
                style={{
                  width: '100%',
                  height: 340,
                  objectFit: 'cover',
                  objectPosition: 'center 40%',
                  display: 'block',
                  filter: 'sepia(40%) contrast(1.05) brightness(0.68)',
                  opacity: imageLoaded ? 1 : 0,
                  transition: 'opacity 0.9s ease',
                }}
              />
              {/* Gradient overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(90deg, rgba(22,18,14,0.85) 0%, transparent 40%, transparent 60%, rgba(22,18,14,0.85) 100%)',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, transparent 50%, rgba(22,18,14,0.75) 100%)',
              }} />

              {/* Left stat overlay */}
              <div style={{
                position: 'absolute', top: '50%', left: '2rem',
                transform: 'translateY(-50%)',
                textAlign: 'left',
              }}>
                <div style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  color: '#c8873a',
                  lineHeight: 1,
                  marginBottom: '0.3rem',
                }}>
                  1951
                </div>
                <div style={{
                  fontFamily: 'sans-serif', fontSize: '0.72rem',
                  color: 'rgba(245,240,232,0.55)',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>
                  Indian Act amended
                </div>
              </div>

              {/* Right stat overlay */}
              <div style={{
                position: 'absolute', top: '50%', right: '2rem',
                transform: 'translateY(-50%)',
                textAlign: 'right',
              }}>
                <div style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  color: '#c8873a',
                  lineHeight: 1,
                  marginBottom: '0.3rem',
                }}>
                  1984
                </div>
                <div style={{
                  fontFamily: 'sans-serif', fontSize: '0.72rem',
                  color: 'rgba(245,240,232,0.55)',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>
                  Practice ended
                </div>
              </div>

              {/* Center caption */}
              <div style={{
                position: 'absolute', bottom: '1.25rem',
                left: '50%', transform: 'translateX(-50%)',
                textAlign: 'center', whiteSpace: 'nowrap',
              }}>
                <p style={{
                  fontFamily: 'Georgia, serif', fontStyle: 'italic',
                  fontSize: '0.8rem',
                  color: 'rgba(245,240,232,0.5)',
                  margin: 0,
                }}>
                  Over three decades of state-sanctioned removal
                </p>
              </div>
            </div>
          </div>

          {/* ── STAT CARDS ── */}
          <div className="fade-up-4" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem',
            marginBottom: '1.5rem',
          }}>
            {/* Card 1 */}
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
              {/* Top accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: 'linear-gradient(90deg, transparent, #b85c2a, transparent)',
              }} />

              <div
                className="big-num"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(3.2rem, 6vw, 5rem)',
                  color: '#c8873a',
                  lineHeight: 1,
                  marginBottom: '0.75rem',
                  letterSpacing: '-0.02em',
                  minHeight: '5rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {started
                  ? <AnimatedNumber target={1400} duration={2200} started={started} />
                  : <span style={{ opacity: 0.25 }}>—</span>
                }
              </div>

              <div style={{
                fontFamily: 'sans-serif', fontSize: '0.9rem',
                color: 'rgba(245,240,232,0.75)',
                lineHeight: 1.55, marginBottom: '0.35rem',
              }}>
                Indigenous children in B.C. provincial care in 1964 (Truth and Reconciliation Commission of Canada)
              </div>
              <div style={{
                fontFamily: 'sans-serif', fontSize: '0.72rem',
                color: 'rgba(245,240,232,0.38)', marginBottom: '1.5rem',
              }}>
                Up from approximately 30 in 1951 (Truth and Reconciliation Commission of Canada)
              </div>

              {started && (
                <div
                  className="badge-pop"
                  style={{ animationDelay: '2s', display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '0.3rem 1rem',
                    background: 'rgba(184,92,42,0.12)',
                    border: '1px solid rgba(184,92,42,0.3)',
                    borderRadius: 999,
                  }}
                >
                  <span style={{ fontFamily: 'Georgia, serif', fontSize: '1.3rem', color: '#b85c2a' }}>
                    <Typewriter text="50x increase" started={started} delay={2000} />
                  </span>
                </div>
              )}
              <div style={{
                fontFamily: 'sans-serif', fontSize: '0.72rem',
                color: 'rgba(245,240,232,0.4)', marginTop: '0.5rem',
              }}>
                in just 13 years
              </div>
            </div>

            {/* Card 2 */}
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
                className="big-num"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(3.2rem, 6vw, 5rem)',
                  color: '#c8873a',
                  lineHeight: 1,
                  marginBottom: '0.75rem',
                  letterSpacing: '-0.02em',
                  minHeight: '5rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {started
                  ? <AnimatedNumber target={3400} duration={2400} started={started} />
                  : <span style={{ opacity: 0.25 }}>—</span>
                }
              </div>

              <div style={{
                fontFamily: 'sans-serif', fontSize: '0.9rem',
                color: 'rgba(245,240,232,0.75)',
                lineHeight: 1.55, marginBottom: '0.35rem',
              }}>
                Indigenous children adopted in Manitoba (James Sinclair)
              </div>
              <div style={{
                fontFamily: 'sans-serif', fontSize: '0.72rem',
                color: 'rgba(245,240,232,0.38)', marginBottom: '1.5rem',
              }}>
                Between 1971 and 1981
              </div>

              {started && (
                <div
                  className="badge-pop"
                  style={{ animationDelay: '2.2s', display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '0.3rem 1rem',
                    background: 'rgba(184,92,42,0.12)',
                    border: '1px solid rgba(184,92,42,0.3)',
                    borderRadius: 999,
                  }}
                >
                  <span style={{ fontFamily: 'Georgia, serif', fontSize: '1.3rem', color: '#b85c2a' }}>
                    <Typewriter text="80%" started={started} delay={2200} />
                  </span>
                </div>
              )}
              <div style={{
                fontFamily: 'sans-serif', fontSize: '0.72rem',
                color: 'rgba(245,240,232,0.4)', marginTop: '0.5rem',
              }}>
                placed into non-Indigenous homes
              </div>
            </div>
          </div>

          {/* ── CLOSING STAT ── */}
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
            {/* Top shimmer bar */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 2,
              background: 'linear-gradient(90deg, transparent, #c8873a, #d4963f, #c8873a, transparent)',
            }} />
            {/* Ghost number */}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'none', overflow: 'hidden',
            }}>
              <span style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(5rem, 14vw, 11rem)',
                color: 'rgba(200,135,58,0.028)',
                fontWeight: 700, userSelect: 'none',
              }}>4.5×</span>
            </div>

            <p style={{
              fontFamily: 'sans-serif',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
              color: 'rgba(245,240,232,0.85)',
              lineHeight: 1.8,
              margin: '0 auto',
              maxWidth: 780,
              position: 'relative', zIndex: 1,
            }}>
              Aboriginal children were{' '}
              <span className="highlight-shimmer" style={{ fontSize: '1.15em' }}>
                4.5 times more likely
              </span>{' '}
              than non-Aboriginal children to be in the care of child welfare authorities. (James Sinclair)
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
