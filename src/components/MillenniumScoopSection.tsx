import { useState, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { AlertTriangle, Baby, TrendingUp, ArrowRight } from 'lucide-react';

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

// Animated progress bar
function Bar({ label, pct, color, subLabel, started, delay = 0 }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setWidth(pct), delay);
    return () => clearTimeout(t);
  }, [started, pct, delay]);

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
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
            <span style={{ fontFamily: 'sans-serif', fontSize: '0.7rem', fontWeight: 700, color: '#f5f0e8' }}>
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

// Millennium Scoop fact cards
const millenniumFacts = [
  {
    label: 'Same Goal, New Name',
    body: 'The Millennium Scoop is not an official government term. It is what advocates, survivors, and researchers started calling it because the pattern was so obvious. The government never said "we are doing the Sixties Scoop again." But the numbers told the truth.',
  },
  {
    label: 'Why Did It Keep Happening?',
    body: 'The Sixties Scoop officially ended around 1984. But the child welfare laws that made it possible were never fully changed. Social workers still had the power to remove Indigenous children based on poverty and neglect, even when poverty was caused by decades of colonial policy. The conditions that led to the Sixties Scoop were never fixed, so the removals never actually stopped.',
  },
  {
    label: 'Poverty Was Used as Proof',
    body: 'If a family did not have stable housing, enough food, or consistent income, child welfare could decide the home was "unsafe." But Indigenous communities had been stripped of land, resources, and economic opportunity for generations. Judging families by standards they were never given a fair chance to meet is not child protection. It is a system designed to keep failing the same people.',
  },
  {
    label: 'The Numbers Grew, Not Shrank',
    body: 'In 1990, there were roughly 15,000 Indigenous children in care across Canada. By 2016, that number had grown to over 52,000. That is not a system improving. That is a system getting worse while calling itself child welfare. More children were being taken in the 2000s and 2010s than during the original Sixties Scoop.',
  },
  {
    label: 'The International Response',
    body: 'In 2016, the Canadian Human Rights Tribunal ruled that the federal government was racially discriminating against First Nations children and families by underfunding child welfare services on reserves. They were spending far less per child on reserve than off reserve. Less money meant fewer support services, which meant more removals. The tribunal ordered the government to fix it. They were found non-compliant multiple times.',
  },
  {
    label: 'Bill C-92 and What Changed',
    body: 'In 2019, Canada passed Bill C-92, which gave Indigenous communities the legal right to govern their own child welfare. For the first time, a First Nation could create its own child welfare laws and have them recognized federally. This was a major shift. But passing a law and actually changing what happens on the ground are two very different things. The work is not finished.',
  },
];

export default function MillenniumScoopSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [started, setStarted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [openFact, setOpenFact] = useState(null);

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
        @keyframes warningFlash {
          0%,100% { background: rgba(184,50,30,0.08); }
          50%      { background: rgba(184,50,30,0.15); }
        }
        @keyframes expandIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .fade-up-1 { animation: fadeUpIn 0.85s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .fade-up-2 { animation: fadeUpIn 0.85s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
        .fade-up-3 { animation: fadeUpIn 0.85s cubic-bezier(0.16,1,0.3,1) 0.35s both; }
        .fade-up-4 { animation: fadeUpIn 0.85s cubic-bezier(0.16,1,0.3,1) 0.5s both; }
        .fade-up-5 { animation: fadeUpIn 0.85s cubic-bezier(0.16,1,0.3,1) 0.65s both; }
        .fade-up-6 { animation: fadeUpIn 0.85s cubic-bezier(0.16,1,0.3,1) 0.8s both; }

        .glow-orb   { animation: glowPulse 4.5s ease-in-out infinite; }
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

        .birth-alert-card { animation: warningFlash 3.5s ease-in-out infinite; }

        .fact-card {
          transition: all 0.25s ease;
          cursor: pointer;
        }
        .fact-card:hover {
          border-color: rgba(200,135,58,0.35) !important;
          background: rgba(200,135,58,0.05) !important;
        }
        .fact-card.open {
          border-color: rgba(200,135,58,0.4) !important;
          background: rgba(24,19,14,0.95) !important;
        }

        .fact-expand { animation: expandIn 0.35s cubic-bezier(0.16,1,0.3,1) both; }

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

          {/* ══════════════════════════════════════════════
              SECTION 1: THE MILLENNIUM SCOOP (NEW, FIRST)
          ══════════════════════════════════════════════ */}
          <div className="fade-up-2" style={{ marginBottom: '4rem' }}>

            {/* Intro block */}
            <div style={{
              background: 'rgba(20,16,12,0.88)',
              border: '1px solid rgba(200,135,58,0.22)',
              borderRadius: 16,
              padding: 'clamp(1.75rem, 4vw, 3rem)',
              position: 'relative', overflow: 'hidden',
              backdropFilter: 'blur(8px)',
              marginBottom: '1.5rem',
              boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: 'linear-gradient(90deg, transparent, #c8873a, #d4963f, transparent)',
              }} />

              {/* Ghost watermark */}
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
                paddingRight: '2rem', pointerEvents: 'none', overflow: 'hidden',
              }}>
                <span style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(4rem, 10vw, 9rem)',
                  color: 'rgba(200,135,58,0.03)',
                  fontWeight: 700, userSelect: 'none', lineHeight: 1,
                }}>
                  2000s
                </span>
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
                  <div style={{
                    width: 40, height: 40, flexShrink: 0,
                    borderRadius: 10,
                    background: 'rgba(200,135,58,0.12)',
                    border: '1px solid rgba(200,135,58,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <TrendingUp size={18} color="#c8873a" />
                  </div>
                  <h3 style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                    color: '#f5f0e8', margin: 0,
                  }}>
                    What is the Millennium Scoop?
                  </h3>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1.25rem',
                }}>
                  <div>
                    <p style={{
                      fontFamily: 'sans-serif', fontSize: '0.93rem',
                      color: 'rgba(245,240,232,0.78)',
                      lineHeight: 1.85, margin: '0 0 1rem',
                    }}>
                      The Millennium Scoop is the name people started using to describe what happened after the Sixties Scoop "officially" ended. The government said the policy was over. The removals were not.
                    </p>
                    <p style={{
                      fontFamily: 'sans-serif', fontSize: '0.93rem',
                      color: 'rgba(245,240,232,0.78)',
                      lineHeight: 1.85, margin: 0,
                    }}>
                      Through the 1990s, 2000s, and 2010s, Indigenous children kept being taken from their families at rates that were not just high, they were getting worse. The name "Millennium Scoop" came from the fact that this was not ancient history. It was happening as people were buying iPhones and watching YouTube.
                    </p>
                  </div>
                  <div>
                    <p style={{
                      fontFamily: 'sans-serif', fontSize: '0.93rem',
                      color: 'rgba(245,240,232,0.78)',
                      lineHeight: 1.85, margin: '0 0 1rem',
                    }}>
                      The laws that made the Sixties Scoop possible were never properly cleaned up. Social workers still had enormous power to remove children based on things like poverty, unstable housing, or what they personally judged as neglect. But those conditions did not appear out of nowhere. They were created by generations of colonial policy.
                    </p>
                    <p style={{
                      fontFamily: 'sans-serif', fontSize: '0.93rem',
                      color: 'rgba(245,240,232,0.78)',
                      lineHeight: 1.85, margin: 0,
                    }}>
                      In short: the system blamed Indigenous families for problems the system itself created. Then it used those problems to take their kids. Again.
                    </p>
                  </div>
                </div>

                {/* Key numbers */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '1rem',
                  marginTop: '2rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid rgba(200,135,58,0.12)',
                }}>
                  {[
                    { value: '15,000', label: 'Indigenous children in care', sub: 'approx. 1990' },
                    { value: '52,000+', label: 'Indigenous children in care', sub: 'by 2016' },
                    { value: '3x+', label: 'increase in 26 years', sub: 'while the policy was "over"' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        textAlign: 'center',
                        padding: '1rem',
                        background: 'rgba(200,135,58,0.06)',
                        border: '1px solid rgba(200,135,58,0.15)',
                        borderRadius: 10,
                        animation: `fadeUpIn 0.5s ease ${i * 120}ms both`,
                      }}
                    >
                      <div style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                        color: '#c8873a', lineHeight: 1,
                        marginBottom: '0.4rem',
                      }}>
                        {item.value}
                      </div>
                      <div style={{
                        fontFamily: 'sans-serif', fontSize: '0.75rem',
                        color: 'rgba(245,240,232,0.65)',
                        lineHeight: 1.4, marginBottom: '0.25rem',
                      }}>
                        {item.label}
                      </div>
                      <div style={{
                        fontFamily: 'sans-serif', fontSize: '0.65rem',
                        color: 'rgba(245,240,232,0.3)',
                        fontStyle: 'italic',
                      }}>
                        {item.sub}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Expandable deep-dive fact cards */}
            <p style={{
              fontFamily: 'sans-serif', fontSize: '0.65rem',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'rgba(200,135,58,0.4)',
              textAlign: 'center', marginBottom: '1rem',
            }}>
              Click to go deeper
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {millenniumFacts.map((fact, i) => {
                const isOpen = openFact === i;
                return (
                  <div
                    key={i}
                    className={`fact-card ${isOpen ? 'open' : ''}`}
                    onClick={() => setOpenFact(isOpen ? null : i)}
                    style={{
                      background: 'rgba(20,16,12,0.7)',
                      border: '1px solid rgba(200,135,58,0.13)',
                      borderRadius: 10,
                      overflow: 'hidden',
                      backdropFilter: 'blur(6px)',
                      animation: `fadeUpIn 0.55s ease ${i * 70}ms both`,
                    }}
                  >
                    {/* Top accent */}
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                      background: `linear-gradient(90deg, transparent, rgba(200,135,58,${isOpen ? '0.5' : '0.15'}), transparent)`,
                      transition: 'background 0.3s ease',
                    }} />

                    <div style={{
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1rem 1.25rem', gap: '1rem',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 6, height: 6, borderRadius: '50%',
                          background: isOpen ? '#c8873a' : 'rgba(200,135,58,0.3)',
                          flexShrink: 0,
                          transition: 'background 0.3s ease',
                        }} />
                        <span style={{
                          fontFamily: 'Georgia, serif',
                          fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
                          color: isOpen ? '#f5f0e8' : 'rgba(245,240,232,0.65)',
                          transition: 'color 0.3s ease',
                        }}>
                          {fact.label}
                        </span>
                      </div>
                      <ArrowRight
                        size={14}
                        color={isOpen ? '#c8873a' : 'rgba(200,135,58,0.3)'}
                        style={{
                          flexShrink: 0,
                          transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease, color 0.3s ease',
                        }}
                      />
                    </div>

                    {isOpen && (
                      <div className="fact-expand" style={{ padding: '0 1.25rem 1.25rem' }}>
                        <div style={{
                          height: 1,
                          background: 'linear-gradient(90deg, rgba(200,135,58,0.25), transparent)',
                          marginBottom: '0.9rem',
                        }} />
                        <p style={{
                          fontFamily: 'sans-serif', fontSize: '0.88rem',
                          color: 'rgba(245,240,232,0.7)',
                          lineHeight: 1.82, margin: 0,
                        }}>
                          {fact.body}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ══════════════════════════════════════════
              SECTION 2: IMAGE BANNER
          ══════════════════════════════════════════ */}
          <div className="fade-up-3" style={{ marginBottom: '3.5rem' }}>
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
                alt="Children in care — the pattern continues today"
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
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(90deg, rgba(22,18,14,0.88) 0%, transparent 35%, transparent 65%, rgba(22,18,14,0.88) 100%)',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, transparent 45%, rgba(22,18,14,0.8) 100%)',
              }} />

              <div style={{ position: 'absolute', top: '50%', left: '2rem', transform: 'translateY(-50%)' }}>
                <div style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                  color: '#c8873a', lineHeight: 1, marginBottom: '0.3rem',
                }}>1951</div>
                <div style={{
                  fontFamily: 'sans-serif', fontSize: '0.68rem',
                  color: 'rgba(245,240,232,0.45)',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>It began</div>
              </div>

              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)', textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: 'Georgia, serif', fontStyle: 'italic',
                  fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                  color: 'rgba(245,240,232,0.55)', whiteSpace: 'nowrap',
                }}>
                  It never stopped.
                </div>
              </div>

              <div style={{
                position: 'absolute', top: '50%', right: '2rem',
                transform: 'translateY(-50%)', textAlign: 'right',
              }}>
                <div style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                  color: '#c8873a', lineHeight: 1, marginBottom: '0.3rem',
                }}>Today</div>
                <div style={{
                  fontFamily: 'sans-serif', fontSize: '0.68rem',
                  color: 'rgba(245,240,232,0.45)',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>Still happening</div>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════
              SECTION 3: STATS + CHART
          ══════════════════════════════════════════ */}
          <div className="fade-up-4" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem',
            alignItems: 'start',
          }}>
            {/* Stat cards */}
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
                  sub: 'More than half. In a province where Indigenous people make up around 6% of the population. This is not a coincidence. It is the result of policies that were never fixed.',
                  delay: 200,
                },
                {
                  value: 6, suffix: 'x',
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
                      : <span style={{ opacity: 0.2 }}>-</span>
                    }
                  </div>
                  <div style={{
                    fontFamily: 'sans-serif', fontSize: '0.9rem',
                    color: 'rgba(245,240,232,0.8)',
                    fontWeight: 600, lineHeight: 1.4, marginBottom: '0.6rem',
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

              {/* Saskatchewan */}
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
                  were Indigenous children and youth. These children are not being protected. They are being failed.
                </p>
              </div>
            </div>

            {/* Chart */}
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
                color: '#f5f0e8', marginBottom: '0.5rem',
              }}>
                Who is in Care?
              </h3>
              <p style={{
                fontFamily: 'sans-serif', fontSize: '0.78rem',
                color: 'rgba(245,240,232,0.38)',
                marginBottom: '2rem', lineHeight: 1.5,
              }}>
                Representation in B.C. child welfare vs. actual population
              </p>

              <Bar label="Indigenous children in care (BC)" pct={51} color="#c8873a" subLabel="51% of children in care" started={started} delay={300} />
              <Bar label="Non-Indigenous children in care (BC)" pct={49} color="rgba(200,200,200,0.5)" started={started} delay={500} />

              <div style={{ height: 1, background: 'rgba(200,135,58,0.12)', margin: '1.5rem 0' }} />

              <p style={{
                fontFamily: 'sans-serif', fontSize: '0.72rem',
                color: 'rgba(245,240,232,0.35)', marginBottom: '0.75rem', letterSpacing: '0.05em',
              }}>
                Actual population share:
              </p>
              <Bar
                label="Indigenous population (BC)"
                pct={6}
                color="#c8873a"
                subLabel="Only about 6% of BC population, yet 51% of children in care"
                started={started}
                delay={700}
              />

              <div style={{
                marginTop: '1.5rem', padding: '0.9rem 1rem',
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

          {/* ══════════════════════════════════════════
              SECTION 4: BIRTH ALERTS
          ══════════════════════════════════════════ */}
          <div className="fade-up-5" style={{ marginBottom: '3rem' }}>
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
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: 'linear-gradient(90deg, transparent, rgba(184,50,30,0.7), transparent)',
              }} />

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', flexWrap: 'wrap' }}>
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.75rem', flexWrap: 'wrap' }}>
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
                    to end it. The scooping of newborns never actually stopped. It just moved
                    into the hospital.
                  </p>

                  <div style={{
                    padding: '0.8rem 1rem',
                    background: 'rgba(184,50,30,0.07)',
                    border: '1px solid rgba(184,50,30,0.2)',
                    borderRadius: 8,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '0.3rem' }}>
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
                      That is not protection. That is prejudice written into policy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════
              CLOSING
          ══════════════════════════════════════════ */}
          <div className="fade-up-6" style={{
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
