import { useState, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { X, Check } from 'lucide-react';

const comparisons = [
  {
    deficit: '"Indigenous families are failing their children"',
    antiOp: '"The Indian Act created the poverty used to justify removal"',
    deficitBack: 'This framing places blame on individuals while ignoring the conditions that led to it.',
    antiOpBack: 'This framing names structural violence, colonial history, and the misuse of state power, finding the problem in systems and not people or groups.',
  },
  {
    deficit: '"Poverty and dysfunction need intervention"',
    antiOp: '"Who defined \'dysfunction\'? Whose norms are being applied?"',
    deficitBack: 'This framing places blame on individuals while ignoring the conditions that led to it.',
    antiOpBack: 'This framing names structural violence, colonial history, and the misuse of state power, finding the problem in systems and not people or groups.',
  },
  {
    deficit: '"Removal is in the best interest of the child"',
    antiOp: '"Removal destroys identity, language, and community belonging"',
    deficitBack: 'This framing places blame on individuals while ignoring the conditions that led to it.',
    antiOpBack: 'This framing names structural violence, colonial history, and the misuse of state power, finding the problem in systems and not people or groups.',
  },
  {
    deficit: '"We are saving these children from bad situations"',
    antiOp: '"The saviour narrative is actually covert assimilation"',
    deficitBack: 'This framing places blame on individuals while ignoring the conditions that led to it.',
    antiOpBack: 'This framing names structural violence, colonial history, and the misuse of state power, finding the problem in systems and not people or groups.',
  },
  {
    deficit: '"This is unfortunate but necessary"',
    antiOp: '"This is a deliberate continuation of colonial policy"',
    deficitBack: 'This framing places blame on individuals while ignoring the conditions that led to it.',
    antiOpBack: 'This framing names structural violence, colonial history, and the misuse of state power, finding the problem in systems and not people or groups.',
  },
];

export default function AntiDiscriminatorySection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [flipped, setFlipped] = useState({});

  const toggleFlip = (i) => {
    setFlipped((p) => ({ ...p, [i]: !p[i] }));
  };

  return (
    <>
      <style>{`
        @keyframes fadeUpIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowPulse {
          0%,100% { opacity: 0.3; }
          50%      { opacity: 0.7; }
        }
        @keyframes shimmer {
          from { background-position: -200% center; }
          to   { background-position: 200% center; }
        }

        .fade-up    { animation: fadeUpIn 0.7s cubic-bezier(0.16,1,0.3,1) both; }
        .glow-orb   { animation: glowPulse 4s ease-in-out infinite; }

        .flip-card {
          perspective: 1000px;
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .flip-card:hover { transform: translateY(-3px); }

        .flip-inner {
          position: relative;
          transition: transform 0.55s cubic-bezier(0.455, 0.03, 0.515, 0.955);
          transform-style: preserve-3d;
        }
        .flip-inner.flipped { transform: rotateY(180deg); }

        .flip-front, .flip-back {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .flip-back {
          position: absolute;
          inset: 0;
          transform: rotateY(180deg);
        }

        .quote-shimmer {
          background: linear-gradient(90deg, #c8873a 0%, #f5f0e8 40%, #c8873a 60%, #d4963f 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 5s linear infinite;
        }

        .vs-divider {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hint-text {
          font-family: sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.25);
        }

        .connect-card {
          transition: border-color 0.3s ease;
        }
      `}</style>

      <section
        id="anti-discriminatory"
        ref={ref}
        style={{
          padding: '8rem 1.5rem',
          background: 'linear-gradient(180deg, #1e1814 0%, #1a1612 50%, #1c1510 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
        className={`transition-all duration-1000 ${
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Background */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(200,135,58,0.04) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />
        <div className="glow-orb" style={{
          position: 'absolute', top: '15%', left: '-15%',
          width: '55vw', height: '55vw',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(160,82,45,0.09) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="glow-orb" style={{
          position: 'absolute', bottom: '10%', right: '-15%',
          width: '45vw', height: '45vw',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(200,135,58,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          animationDelay: '2s',
        }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* ── HEADER ── */}
          <div className="fade-up" style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem',
            }}>
              <div style={{ width: 36, height: 1, background: 'rgba(200,135,58,0.5)' }} />
              <span style={{
                fontFamily: 'sans-serif', fontSize: '0.65rem',
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: '#c8873a', fontWeight: 600, opacity: 0.8,
              }}>
                Anti-Oppressive Framework
              </span>
              <div style={{ width: 36, height: 1, background: 'rgba(200,135,58,0.5)' }} />
            </div>

            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(2.6rem, 6vw, 5rem)',
              color: '#f5f0e8',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              marginBottom: '1.25rem',
            }}>
              Seeing It Clearly
            </h2>

            <div style={{
              width: 60, height: 2,
              background: 'linear-gradient(90deg, transparent, #c8873a, transparent)',
              margin: '0 auto 1.5rem',
            }} />

            <p style={{
              fontFamily: 'sans-serif', fontSize: '1.05rem',
              color: 'rgba(245,240,232,0.58)',
              maxWidth: 540, margin: '0 auto',
              lineHeight: 1.7,
            }}>
              An anti-oppressive lens asks us to see systems, not just individuals.
              To see power, not just problems.
            </p>
          </div>

          {/* ── FLIP CARDS COMPARISON ── */}
          <div className="fade-up" style={{ marginBottom: '4rem', animationDelay: '0.15s' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr auto 1fr',
              gap: '0.75rem', alignItems: 'center',
              marginBottom: '1.25rem',
            }}>
              <div style={{
                fontFamily: 'sans-serif', fontSize: '0.65rem',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'rgba(220,80,60,0.7)', fontWeight: 700,
                textAlign: 'center',
              }}>
                Deficit Thinking
              </div>
              <div />
              <div style={{
                fontFamily: 'sans-serif', fontSize: '0.65rem',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'rgba(140,180,130,0.8)', fontWeight: 700,
                textAlign: 'center',
              }}>
                Anti-Oppressive Thinking
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {comparisons.map((pair, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 40px 1fr',
                    gap: '0.75rem',
                    alignItems: 'stretch',
                    animation: `fadeUpIn 0.5s ease ${i * 80}ms both`,
                  }}
                >
                  {/* Deficit side */}
                  <div
                    className="flip-card"
                    onClick={() => toggleFlip(`d${i}`)}
                    style={{ minHeight: 72 }}
                  >
                    <div className={`flip-inner ${flipped[`d${i}`] ? 'flipped' : ''}`} style={{ minHeight: 72 }}>
                      <div
                        className="flip-front"
                        style={{
                          background: 'rgba(180,40,30,0.08)',
                          border: '1px solid rgba(200,60,50,0.25)',
                          borderRadius: 8,
                          padding: '0.85rem 1rem',
                          display: 'flex', alignItems: 'center', gap: 10,
                          minHeight: 72,
                        }}
                      >
                        <X size={14} color="rgba(220,80,60,0.7)" style={{ flexShrink: 0 }} />
                        <span style={{
                          fontFamily: 'sans-serif', fontSize: '0.88rem',
                          color: 'rgba(245,240,232,0.72)', lineHeight: 1.5,
                        }}>
                          {pair.deficit}
                        </span>
                      </div>
                      <div
                        className="flip-back"
                        style={{
                          background: 'rgba(180,40,30,0.15)',
                          border: '1px solid rgba(200,60,50,0.4)',
                          borderRadius: 8,
                          padding: '0.85rem 1rem',
                          display: 'flex', alignItems: 'center',
                          minHeight: 72,
                        }}
                      >
                        <span style={{
                          fontFamily: 'Georgia, serif', fontStyle: 'italic',
                          fontSize: '0.8rem', color: 'rgba(220,100,80,0.9)',
                          lineHeight: 1.5,
                        }}>
                          {pair.deficitBack}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* VS divider */}
                  <div className="vs-divider">
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: 'rgba(200,135,58,0.08)',
                      border: '1px solid rgba(200,135,58,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{
                        fontFamily: 'sans-serif', fontSize: '0.55rem',
                        fontWeight: 800, color: 'rgba(200,135,58,0.5)',
                        letterSpacing: '-0.02em',
                      }}>VS</span>
                    </div>
                  </div>

                  {/* Anti-oppressive side */}
                  <div
                    className="flip-card"
                    onClick={() => toggleFlip(`a${i}`)}
                    style={{ minHeight: 72 }}
                  >
                    <div className={`flip-inner ${flipped[`a${i}`] ? 'flipped' : ''}`} style={{ minHeight: 72 }}>
                      <div
                        className="flip-front"
                        style={{
                          background: 'rgba(100,150,100,0.08)',
                          border: '1px solid rgba(120,170,120,0.25)',
                          borderRadius: 8,
                          padding: '0.85rem 1rem',
                          display: 'flex', alignItems: 'center', gap: 10,
                          minHeight: 72,
                        }}
                      >
                        <Check size={14} color="rgba(140,180,130,0.8)" style={{ flexShrink: 0 }} />
                        <span style={{
                          fontFamily: 'sans-serif', fontSize: '0.88rem',
                          color: 'rgba(245,240,232,0.82)', lineHeight: 1.5,
                        }}>
                          {pair.antiOp}
                        </span>
                      </div>
                      <div
                        className="flip-back"
                        style={{
                          background: 'rgba(100,150,100,0.15)',
                          border: '1px solid rgba(120,170,120,0.4)',
                          borderRadius: 8,
                          padding: '0.85rem 1rem',
                          display: 'flex', alignItems: 'center',
                          minHeight: 72,
                        }}
                      >
                        <span style={{
                          fontFamily: 'Georgia, serif', fontStyle: 'italic',
                          fontSize: '0.8rem', color: 'rgba(140,200,130,0.9)',
                          lineHeight: 1.5,
                        }}>
                          {pair.antiOpBack}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="hint-text" style={{ textAlign: 'center', marginTop: '1rem' }}>
              Click any card to reveal deeper context
            </p>
          </div>

          {/* ── CONNECTING PARAGRAPH ── */}
          <div
            className="fade-up connect-card"
            style={{
              marginBottom: '4rem',
              animationDelay: '0.3s',
              background: 'rgba(20,16,12,0.8)',
              border: '1px solid rgba(200,135,58,0.18)',
              borderRadius: 14,
              padding: 'clamp(1.5rem, 3vw, 2.5rem)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 10px 36px rgba(0,0,0,0.3)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 2,
              background: 'linear-gradient(90deg, transparent, #c8873a, transparent)',
            }} />

            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              marginBottom: '1.1rem',
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: '50%', background: '#c8873a', flexShrink: 0,
              }} />
              <span style={{
                fontFamily: 'sans-serif', fontSize: '0.62rem',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: '#c8873a', fontWeight: 700,
              }}>
                Why This Lens Matters
              </span>
            </div>

            <p style={{
              fontFamily: 'sans-serif',
              fontSize: 'clamp(0.9rem, 1.6vw, 1rem)',
              color: 'rgba(245,240,232,0.72)',
              lineHeight: 1.9,
              margin: 0,
              maxWidth: 820,
            }}>
              The stories on this website, the survivors, the statistics, the policies, all of them look
              different depending on the lens you use to read them. Deficit thinking turns those stories
              into a problem with Indigenous families. An anti-oppressive lens turns them into a problem
              with a government that had too much power and no accountability. The reason the survivor
              testimonies, the Four Rs, and the history of the Sixties Scoop are presented together on
              this site is because understanding what happened is not enough on its own. You also have to
              understand who caused it, who benefited from it, and whose voices were left out of the
              decisions that shaped it. That is what an anti-oppressive lens does. It does not change
              the facts. It changes where you look for the cause.
            </p>
          </div>

          {/* ── CLOSING STATEMENT ── */}
          <div style={{
            position: 'relative',
            background: 'rgba(16,12,10,0.85)',
            border: '1px solid rgba(200,135,58,0.2)',
            borderRadius: 16,
            padding: 'clamp(2rem, 5vw, 4rem)',
            textAlign: 'center',
            overflow: 'hidden',
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
                fontSize: 'clamp(5rem, 12vw, 12rem)',
                color: 'rgba(200,135,58,0.03)',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                userSelect: 'none',
              }}>
                COLONIALISM
              </span>
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                width: 40, height: 2,
                background: 'linear-gradient(90deg, transparent, rgba(200,135,58,0.5), transparent)',
                margin: '0 auto 2rem',
              }} />

              <p
                className="quote-shimmer"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(1.3rem, 3vw, 2rem)',
                  lineHeight: 1.55,
                  maxWidth: 780,
                  margin: '0 auto 2rem',
                  fontStyle: 'italic',
                }}
              >
                "To see this clearly is to understand that the Sixties Scoop was not child welfare. It was colonialism by another name."
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1px',
                background: 'rgba(200,135,58,0.1)',
                borderRadius: 8,
                overflow: 'hidden',
                marginTop: '2.5rem',
                border: '1px solid rgba(200,135,58,0.15)',
              }}>
                {[
                  { label: 'Residential Schools', note: '1876 to 1996' },
                  { label: 'Sixties Scoop', note: '1951 to 1984' },
                  { label: 'Overrepresentation Today', note: 'The same logic, ongoing' },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '1rem 1.25rem',
                      background: 'rgba(26,22,18,0.7)',
                      textAlign: 'center',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,135,58,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(26,22,18,0.7)'; }}
                  >
                    <div style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: '0.95rem',
                      color: '#f5f0e8',
                      marginBottom: '0.2rem',
                    }}>
                      {item.label}
                    </div>
                    <div style={{
                      fontFamily: 'sans-serif',
                      fontSize: '0.72rem',
                      color: 'rgba(200,135,58,0.6)',
                      letterSpacing: '0.05em',
                    }}>
                      {item.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
