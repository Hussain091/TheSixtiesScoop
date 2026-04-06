import { useState, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { AlertTriangle, Baby, TrendingUp } from 'lucide-react';

// rAF counter with ease-out
function AnimatedNumber({ target, duration = 1800, suffix = '', started }) {
  const [val, setVal] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  useEffect(() => {
    if (!started) return;
    startRef.current = null;
    const animate = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const p = Math.min((ts - startRef.current) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(e * target));
      if (p < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [started, target, duration]);
  return <span style={{ fontVariantNumeric: 'tabular-nums' }}>{val}{suffix}</span>;
}

// Animated progress bar label
function Bar({ label, pct, color, subLabel, started, delay = 0 }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setWidth(pct), delay);
    return () => clearTimeout(t);
  }, [started, pct, delay]);

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        marginBottom: '0.4rem',
      }}>
        <span style={{ fontFamily: 'sans-serif', fontSize: '0.88rem', color: 'rgba(245,240,232,0.8)' }}>
          {label}
        </span>
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '0.95rem', color, fontWeight: 700 }}>
          {pct}%
        </span>
      </div>
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        borderRadius: 999, height: 28,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{
          width: `${width}%`,
          height: '100%',
          background: color === '#c8873a'
            ? 'linear-gradient(90deg, #b85c2a, #d4963f)'
            : 'rgba(200,200,200,0.2)',
          borderRadius: 999,
          transition: 'width 1.2s cubic-bezier(0.16,1,0.3,1)',
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
          paddingRight: 10,
        }}>
          {pct > 10 && (
            <span style={{
              fontFamily: 'sans-serif', fontSize: '0.7rem',
              fontWeight: 700, color: '#f5f0e8',
            }}>
              {pct}%
            </span>
          )}
        </div>
      </div>
      {subLabel && (
        <p style={{
          fontFamily: 'sans-serif', fontSize: '0.72rem',
          color: 'rgba(245,240,232,0.35)',
          marginTop: '0.3rem', fontStyle: 'italic',
        }}>
          {subLabel}
        </p>
      )}
    </div>
  );
}

export default function MillenniumScoopSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [started, setStarted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (isIntersecting && !started) setStarted(true);
  }, [isIntersecting]);

  return (
    <>
      <style>{`
        @keyframes fadeUpIn {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowPulse {
          0%,100% { opacity: 0.22; }
          50%      { opacity: 0.55; }
        }
        @keyframes lineExpand {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes shimmerMove {
          from { background-position: -200% center; }
          to   { background-position: 200% center; }
        }
        @keyframes imgReveal {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0% 0 0); }
        }
        @keyframes softFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-7px); }
        }
        @keyframes borderPulse {
          0%,100% { border-color: rgba(184,92,42,0.25); }
          50%      { border-color: rgba(184,92,42,0.5); }
        }
        @keyframes badgePop {
          0%   { transform: scale(0.85); opacity: 0; }
          70%  { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes warningFlash {
          0%,100% { background: rgba(184,50,30,0.08); }
          50%      { background: rgba(184,50,30,0.15); }
        }

        .fade-up-1 { animation: fadeUpIn 0.85s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .fade-up-2 { animation: fadeUpIn 0.85s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
        .fade-up-3 { animation: fadeUpIn 0.85s cubic-bezier(0.16,1,0.3,1) 0.35s both; }
        .fade-up-4 { animation: fadeUpIn 0.85s cubic-bezier(0.16,1,0.3,1) 0.5s both; }
        .fade-up-5 { animation: fadeUpIn 0.85s cubic-bezier(0.16,1,0.3,1) 0.65s both; }

        .glow-orb  { animation: glowPulse 4.5s ease-in-out infinite; }
        .img-reveal { animation: imgReveal 1.1s cubic-bezier(0.16,1,0.3,1) 0.3s both; }
        .soft-float { animation: softFloat 7s ease-in-out infinite; }

        .stat-card {
          animation: borderPulse 4s ease-in-out infinite;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 24px 48px rgba(0,0,0,0.45), 0 0 30px rgba(200,135,58,0.1) !important;
        }

        .birth-alert-card {
          animation: warningFlash 3.5s ease-in-out infinite;
        }

        .highlight-shimmer {
          background: linear-gradient(90deg, #c8873a 0%, #f0c070 40%, #c8873a 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerMove 3.5s linear infinite;
          font-weight: 700;
        }

        .closing-shimmer {
          background: linear-gradient(90deg, #b85c2a 0%, #f0c070 40%, #c8873a 60%, #d4963f 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerMove 5s linear infinite;
        }
      `}</style>

      <section
        id="today"
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
          backgroundImage: 'radial-gradient(circle, rgba(200,135,58,0.04) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />

        {/* Glow orbs */}
        <div className="glow-orb" style={{
          position: 'absolute', top: '5%', right: '-15%',
          width: '55vw', height: '55vw', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(160,82,45,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="glow-orb" style={{
          position: 'absolute', bottom: '5%', left: '-12%',
          width: '42vw', height: '42vw', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(200,135,58,0.07) 0%, transparent 70%)',
          pointerEvents: 'none', animationDelay: '2s',
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* ── HEADER ── */}
          <div className="fade-up-1" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem',
            }}>
              <div style={{
                width: 40, height: 1, background: 'rgba(200,135,58,0.5)',
                animation: 'lineExpand 0.8s ease 0.2s both', transformOrigin: 'right',
              }} />
              <span style={{
                fontFamily: 'sans-serif', fontSize: '0.65rem',
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: '#c8873a', fontWeight: 600, opacity: 0.8,
              }}>
                Still Happening Today
              </span>
              <div style={{
                width: 40, height: 1, background: 'rgba(200,135,58,0.5)',
                animation: 'lineExpand 0.8s ease 0.2s both', transformOrigin: 'left',
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
              The Scoop Never Ended
            </h2>

            <div style={{
              width: 64, height: 2,
              background: 'linear-gradient(90deg, transparent, #c8873a, transparent)',
              margin: '0 auto 1.5rem',
              animation: 'lineExpand 0.9s ease 0.4s both', transformOrigin: 'center',
            }} />

            <p style={{
              fontFamily: 'sans-serif', fontSize: '1.05rem',
              color: 'rgba(245,240,232,0.58)',
              maxWidth: 520, margin: '0 auto',
              lineHeight: 1.7,
            }}>
              This is not history. This is happening right now.
            </p>
          </div>

          {/* ── IMAGE BANNER ── */}
          <div className="fade-up-2" style={{ marginBottom: '3.5rem' }}>
            <div
              className="img-reveal soft-float"
              style={{
                borderRadius: 14, overflow: 'hidden',
                position: 'relative',
                border: '1px solid rgba(200,135,58,0.18)',
                boxShadow: '0 32px 64px rgba(0,0,0,0.55)',
                height: 280,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80"
                alt="Children in care — the Millennium Scoop continues today"
                onLoad={() => setImageLoaded(true)}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'center 35%',
                  display: 'block',
                  filter: 'sepia(35%) contrast(1.05) brightness(0.65)',
                  opacity: imageLoaded ? 1 : 0,
                  transition: 'opacity 0.9s ease',
                }}
              />
              {/* Gradients */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(90deg, rgba(22,18,14,0.88) 0%, transparent 35%, transparent 65%, rgba(22,18,14,0.88) 100%)',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, transparent 45%, rgba(22,18,14,0.8) 100%)',
              }} />

              {/* Left overlay */}
              <div style={{
                position: 'absolute', top: '50%', left: '2rem',
                transform: 'translateY(-50%)',
              }}>
                <div style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                  color: '#c8873a', lineHeight: 1, marginBottom: '0.3rem',
                }}>
                  1951
                </div>
                <div style={{
                  fontFamily: 'sans-serif', fontSize: '0.68rem',
                  color: 'rgba(245,240,232,0.45)',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>
                  It began
                </div>
              </div>

              {/* Center overlay */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: 'Georgia, serif',
                  fontStyle: 'italic',
                  fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                  color: 'rgba(245,240,232,0.55)',
                  whiteSpace: 'nowrap',
                }}>
                  It never stopped.
                </div>
              </div>

              {/* Right overlay */}
              <div style={{
                position: 'absolute', top: '50%', right: '2rem',
                transform: 'translateY(-50%)', textAlign: 'right',
              }}>
                <div style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                  color: '#c8873a', lineHeight: 1, marginBottom: '0.3rem',
                }}>
                  Today
                </div>
                <div style={{
                  fontFamily: 'sans-serif', fontSize: '0.68rem',
                  color: 'rgba(245,240,232,0.45)',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>
                  Still happening
                </div>
              </div>
            </div>
          </div>

          {/* ── STAT CARDS + CHART ── */}
          <div className="fade-up-3" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem',
            alignItems: 'start',
          }}>
            {/* Left — stat cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

              {[
                {
                  value: 30, suffix: '%',
                  label: 'of children in Ontario foster care are Indigenous',
                  sub: 'Indigenous kids are only 4.1% of the population under 15. That means they are massively overrepresented. If things were fair, it would be around 4%. Instead it is 30%.',
                  delay: 0,
                },
                {
                  value: 51, suffix: '%',
                  label: 'of children in B.C. care are Indigenous',
                  sub: 'More than half. In a province where Indigenous people make up around 6% of the population. This is not a coincidence — it is the result of policies that were never fixed.',
                  delay: 200,
                },
                {
                  value: 6, suffix: '×',
                  label: 'more likely for an Indigenous child in B.C. to be taken',
                  sub: 'Six times. If you are Indigenous, the system is six times more likely to decide you need to be removed from your family. That is not child welfare. That is a pattern.',
                  delay: 400,
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className="stat-card"
                  style={{
                    background: 'rgba(20,16,12,0.85)',
                    border: '1px solid rgba(200,135,58,0.2)',
                    borderRadius: 12,
                    padding: '1.5rem',
                    boxShadow: '0 8px 28px rgba(0,0,0,0.3)',
                    position: 'relative', overflow: 'hidden',
                    animation: `fadeUpIn 0.6s ease ${s.delay}ms both`,
                  }}
                >
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                    background: 'linear-gradient(90deg, transparent, #c8873a, transparent)',
                  }} />

                  <div style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: 'clamp(2.8rem, 5vw, 4rem)',
                    color: '#c8873a', lineHeight: 1,
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.02em',
                  }}>
                    {started
                      ? <AnimatedNumber target={s.value} suffix={s.suffix} started={started} duration={1600 + s.delay} />
                      : <span style={{ opacity: 0.2 }}>—</span>
                    }
                  </div>

                  <div style={{
                    fontFamily: 'sans-serif', fontSize: '0.9rem',
                    color: 'rgba(245,240,232,0.8)',
                    fontWeight: 600, lineHeight: 1.4,
                    marginBottom: '0.6rem',
                  }}>
                    {s.label}
                  </div>
                  <p style={{
                    fontFamily: 'sans-serif', fontSize: '0.8rem',
                    color: 'rgba(245,240,232,0.45)',
                    lineHeight: 1.7, margin: 0,
                  }}>
                    {s.sub}
                  </p>
                </div>
              ))}

              {/* Saskatchewan callout */}
              <div style={{
                borderLeft: '3px solid #b85c2a',
                paddingLeft: '1.25rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                animation: 'fadeUpIn 0.6s ease 600ms both',
              }}>
                <div style={{
                  fontFamily: 'sans-serif', fontSize: '0.62rem',
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: '#b85c2a', fontWeight: 700, marginBottom: '0.5rem',
                }}>
                  Saskatchewan, 2021
                </div>
                <p style={{
                  fontFamily: 'sans-serif', fontSize: '0.85rem',
                  color: 'rgba(245,240,232,0.7)',
                  lineHeight: 1.75, margin: 0,
                }}>
                  Of 24 child deaths reviewed,{' '}
                  <span className="highlight-shimmer">22 (92%)</span>{' '}
                  involved Indigenous children. Of 29 critical injuries,{' '}
                  <span className="highlight-shimmer">23 (79%)</span>{' '}
                  were Indigenous children and youth. These children are not being protected — they are being failed.
                </p>
              </div>

              {/* Millennium Scoop label */}
              <div style={{
                background: 'rgba(184,92,42,0.08)',
                border: '1px solid rgba(184,92,42,0.25)',
                borderRadius: 10,
                padding: '1rem 1.25rem',
                animation: 'fadeUpIn 0.6s ease 700ms both',
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.5rem',
                }}>
                  <TrendingUp size={14} color="#c8873a" />
                  <span style={{
                    fontFamily: 'sans-serif', fontSize: '0.62rem',
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: '#c8873a', fontWeight: 700,
                  }}>
                    What is the Millennium Scoop?
                  </span>
                </div>
                <p style={{
                  fontFamily: 'sans-serif', fontSize: '0.83rem',
                  color: 'rgba(245,240,232,0.62)',
                  lineHeight: 1.75, margin: 0,
                }}>
                  The term <strong style={{ color: '#c8873a' }}>"Millennium Scoop"</strong> is what people
                  call the same thing happening all over again in the 2000s and 2010s. Different decade,
                  different name, same result — Indigenous kids being taken from their families at
                  alarming rates. Same system. Same harm.
                </p>
              </div>
            </div>

            {/* Right — chart */}
            <div style={{
              background: 'rgba(20,16,12,0.85)',
              border: '1px solid rgba(200,135,58,0.18)',
              borderRadius: 14,
              padding: '2rem',
              boxShadow: '0 10px 36px rgba(0,0,0,0.3)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: 'linear-gradient(90deg, transparent, #d4963f, transparent)',
              }} />

              <h3 style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                color: '#f5f0e8',
                marginBottom: '0.5rem',
              }}>
                Who is in Care?
              </h3>
              <p style={{
                fontFamily: 'sans-serif', fontSize: '0.78rem',
                color: 'rgba(245,240,232,0.38)',
                marginBottom: '2rem',
                lineHeight: 1.5,
              }}>
                Representation in B.C. child welfare vs. actual population
              </p>

              <Bar
                label="Indigenous children in care (BC)"
                pct={51}
                color="#c8873a"
                subLabel="51% of children in care"
                started={started}
                delay={300}
              />
              <Bar
                label="Non-Indigenous children in care (BC)"
                pct={49}
                color="rgba(200,200,200,0.5)"
                started={started}
                delay={500}
              />

              <div style={{
                height: 1,
                background: 'rgba(200,135,58,0.12)',
                margin: '1.5rem 0',
              }} />

              <p style={{
                fontFamily: 'sans-serif', fontSize: '0.72rem',
                color: 'rgba(245,240,232,0.35)',
                marginBottom: '0.75rem',
                letterSpacing: '0.05em',
              }}>
                Actual population share:
              </p>
              <Bar
                label="Indigenous population (BC)"
                pct={6}
                color="#c8873a"
                subLabel="Only ~6% of BC's population — yet 51% of children in care"
                started={started}
                delay={700}
              />

              {/* Visual callout */}
              <div style={{
                marginTop: '1.5rem',
                padding: '0.9rem 1rem',
                background: 'rgba(184,92,42,0.08)',
                border: '1px solid rgba(184,92,42,0.2)',
                borderRadius: 8,
              }}>
                <p style={{
                  fontFamily: 'sans-serif', fontSize: '0.8rem',
                  color: 'rgba(245,240,232,0.55)',
                  lineHeight: 1.65, margin: 0, fontStyle: 'italic',
                }}>
                  The overrepresentation is not an accident. It is a continuation of the same colonial logic.
                </p>
              </div>
            </div>
          </div>

          {/* ── BIRTH ALERTS ── */}
          <div className="fade-up-4" style={{ marginBottom: '3rem' }}>
            <div
              className="birth-alert-card"
              style={{
                border: '1px solid rgba(184,50,30,0.35)',
                borderRadius: 14,
                padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                position: 'relative', overflow: 'hidden',
                backdropFilter: 'blur(8px)',
              }}
            >
              {/* Top accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: 'linear-gradient(90deg, transparent, rgba(184,50,30,0.7), transparent)',
              }} />

              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: '1.25rem', flexWrap: 'wrap',
              }}>
                <div style={{
                  width: 44, height: 44, flexShrink: 0,
                  borderRadius: 10,
                  background: 'rgba(184,50,30,0.15)',
                  border: '1px solid rgba(184,50,30,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Baby size={20} color="rgba(220,80,60,0.8)" />
                </div>

                <div style={{ flex: 1, minWidth: 220 }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.75rem', flexWrap: 'wrap',
                  }}>
                    <h3 style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: 'clamp(1.2rem, 2.5vw, 1.7rem)',
                      color: '#f5f0e8', margin: 0,
                    }}>
                      Birth Alerts
                    </h3>
                    <span style={{
                      fontFamily: 'sans-serif', fontSize: '0.6rem',
                      letterSpacing: '0.15em', textTransform: 'uppercase',
                      color: 'rgba(220,80,60,0.8)', fontWeight: 700,
                      padding: '0.2rem 0.6rem',
                      background: 'rgba(184,50,30,0.15)',
                      border: '1px solid rgba(184,50,30,0.3)',
                      borderRadius: 999,
                    }}>
                      Still recent
                    </span>
                  </div>

                  <p style={{
                    fontFamily: 'sans-serif', fontSize: '0.9rem',
                    color: 'rgba(245,240,232,0.75)',
                    lineHeight: 1.8, margin: '0 0 0.85rem',
                  }}>
                    Birth alerts meant that when an Indigenous woman went to the hospital to have her baby,
                    the hospital would secretly call child protective services. Before she even got home,
                    her newborn could be taken. She did not have to do anything wrong. Just being Indigenous
                    was enough reason.
                  </p>

                  <p style={{
                    fontFamily: 'sans-serif', fontSize: '0.9rem',
                    color: 'rgba(245,240,232,0.75)',
                    lineHeight: 1.8, margin: '0 0 0.85rem',
                  }}>
                    This was legal in most provinces until very recently. B.C. banned birth alerts
                    in 2019. Alberta in 2021. Some provinces only stopped because people fought hard
                    to end it. The "scooping" of newborns never actually stopped — it just moved
                    into the hospital.
                  </p>

                  {/* Impact note */}
                  <div style={{
                    padding: '0.8rem 1rem',
                    background: 'rgba(184,50,30,0.07)',
                    border: '1px solid rgba(184,50,30,0.2)',
                    borderRadius: 8,
                  }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 6, marginBottom: '0.3rem',
                    }}>
                      <AlertTriangle size={12} color="rgba(220,80,60,0.7)" />
                      <span style={{
                        fontFamily: 'sans-serif', fontSize: '0.6rem',
                        letterSpacing: '0.16em', textTransform: 'uppercase',
                        color: 'rgba(220,80,60,0.7)', fontWeight: 700,
                      }}>
                        Why this matters
                      </span>
                    </div>
                    <p style={{
                      fontFamily: 'sans-serif', fontSize: '0.8rem',
                      color: 'rgba(245,240,232,0.5)',
                      lineHeight: 1.65, margin: 0,
                    }}>
                      A mother who just gave birth should be celebrating. Instead, she was being watched.
                      The system assumed she would fail before she even had a chance to try.
                      That is not protection — that is prejudice written into policy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── CLOSING ── */}
          <div className="fade-up-5" style={{
            background: 'rgba(14,11,8,0.9)',
            border: '1px solid rgba(200,135,58,0.18)',
            borderRadius: 16,
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            textAlign: 'center',
            position: 'relative', overflow: 'hidden',
            backdropFilter: 'blur(12px)',
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
                fontSize: 'clamp(3rem, 9vw, 9rem)',
                color: 'rgba(200,135,58,0.025)',
                fontWeight: 700, whiteSpace: 'nowrap', userSelect: 'none',
              }}>
                STILL NOW
              </span>
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <p
                className="closing-shimmer"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(1.3rem, 3vw, 2rem)',
                  lineHeight: 1.55,
                  maxWidth: 700,
                  margin: '0 auto 1.5rem',
                  fontStyle: 'italic',
                }}
              >
                They changed the name. They did not change the practice.
              </p>
              <p style={{
                fontFamily: 'sans-serif',
                fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
                color: 'rgba(245,240,232,0.58)',
                maxWidth: 560, margin: '0 auto',
                lineHeight: 1.75,
              }}>
                The removal of Indigenous children from their families is not a historical injustice.
                It is a present-day crisis.
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
