import { useState, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { X, Check, ChevronDown } from 'lucide-react';

const comparisons = [
  {
    deficit: '"Indigenous families are failing their children"',
    antiOp: '"The Indian Act created the poverty used to justify removal"',
  },
  {
    deficit: '"Poverty and dysfunction need intervention"',
    antiOp: '"Who defined \'dysfunction\'? Whose norms are being applied?"',
  },
  {
    deficit: '"Removal is in the best interest of the child"',
    antiOp: '"Removal destroys identity, language, and community belonging"',
  },
  {
    deficit: '"We are saving these children from bad situations"',
    antiOp: '"The saviour narrative is actually covert assimilation"',
  },
  {
    deficit: '"This is unfortunate but necessary"',
    antiOp: '"This is a deliberate continuation of colonial policy"',
  },
];

const pillars = [
  {
    title: 'It Was Not a Mistake',
    body: 'The Sixties Scoop was not a mistake or a misunderstanding. It was a weaponization of child welfare to continue the colonial plan of assimilating Indigenous citizens.',
    image: 'https://www.ictinc.ca/hubfs/Blog/LAC_5430109_Indigenous-and-non-children_768w.jpg',
    imageAlt: 'Empty hallway: institutional absence and silence',
    stat: { value: '1951', label: 'Year colonial child removal was codified into law' },
  },
  {
    title: 'The Circular Trap',
    body: 'Poverty that was caused by the Indian Act was then used as evidence of "unfit parenting" which is a circular trap built into the law. The same system that removed Indigenous peoples of their land and livelihood then judged them for being poor.',
    image: 'https://thumbs.dreamstime.com/b/detailed-d-model-classic-metal-animal-trap-complete-sturdy-chain-features-sharp-menacing-teeth-weathered-402230784.jpg?w=768',
    imageAlt: 'Chains and cycles: The trap of systemic oppression',
    stat: { value: '78%', label: 'Of children in care today who are Indigenous' },
  },
  {
    title: 'Unchecked Power',
    body: 'Social workers were not trained in Indigenous culture, operated under racist assumptions, and were given unchecked power over Indigenous children\'s lives. They did not need evidence of abuse. They only needed their own judgment.',
    image: 'https://b1867527.smushcdn.com/1867527/wp-content/uploads/2018/11/AAI-Media-3.jpg?lossy=1&strip=1&webp=1',
    imageAlt: 'Documents and bureaucracy',
    stat: { value: 'Zero', label: 'Cultural training required for workers removing children' },
  },
  {
    title: 'Who Benefits?',
    body: 'An anti-discriminatory lens asks: who benefits from this narrative? Who made the laws? Whose voices were excluded from the room when these decisions were made? The answer is always the same. Colonial structures benefit from Indigenous dispossession.',
    image: 'https://visit.parl.ca/staticfiles/Visit/assets/images/img-west-block-header.jpg',
    imageAlt: 'Empty parliament chamber, who holds power and who is excluded',
    stat: { value: 'None', label: 'Indigenous representation in parliament when law was passed' },
  },
];

export default function AntiDiscriminatorySection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [flipped, setFlipped] = useState({});
  const [activePillar, setActivePillar] = useState(null);
  const [countersVisible, setCountersVisible] = useState(false);
  const pillarsRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setCountersVisible(true); },
      { threshold: 0.2 }
    );
    if (pillarsRef.current) obs.observe(pillarsRef.current);
    return () => obs.disconnect();
  }, []);

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
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes expandHeight {
          from { max-height: 0; opacity: 0; }
          to   { max-height: 600px; opacity: 1; }
        }
        @keyframes shimmer {
          from { background-position: -200% center; }
          to   { background-position: 200% center; }
        }
        @keyframes lineGrow {
          from { width: 0; }
          to   { width: 100%; }
        }
        @keyframes flipIn {
          from { transform: rotateY(-90deg); opacity: 0; }
          to   { transform: rotateY(0deg); opacity: 1; }
        }
        @keyframes borderAnim {
          0%,100% { border-color: rgba(184,92,42,0.25); }
          50%      { border-color: rgba(184,92,42,0.55); }
        }
        @keyframes scalePop {
          0%   { transform: scale(0.92); opacity: 0; }
          60%  { transform: scale(1.02); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes imgReveal {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0% 0 0); }
        }

        .fade-up    { animation: fadeUpIn 0.7s cubic-bezier(0.16,1,0.3,1) both; }
        .glow-orb   { animation: glowPulse 4s ease-in-out infinite; }
        .float-el   { animation: float 6s ease-in-out infinite; }
        .pillar-img { animation: imgReveal 0.9s cubic-bezier(0.16,1,0.3,1) both; }

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

        .pillar-card {
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .pillar-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #b85c2a, #d4963f);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }
        .pillar-card:hover::before,
        .pillar-card.open::before { transform: scaleX(1); }

        .pillar-body {
          overflow: hidden;
          transition: max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease;
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
      `}</style>

      <section
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
          <div className="fade-up" style={{ marginBottom: '6rem', animationDelay: '0.15s' }}>
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
                          This framing places blame on individuals while ignoring the conditions that led to it.
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
                          This framing names structural violence, colonial history, and the misuse of state power which finds the problem in systems and not people or groups.
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

          {/* ── FOUR PILLARS ── */}
          <div ref={pillarsRef} style={{ marginBottom: '5rem' }}>
            <div style={{
              textAlign: 'center', marginBottom: '2.5rem',
            }}>
              <span style={{
                fontFamily: 'sans-serif', fontSize: '0.65rem',
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'rgba(200,135,58,0.6)', fontWeight: 600,
              }}>
                Four Critical Frames
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {pillars.map((pillar, i) => {
                const isOpen = activePillar === i;
                return (
                  <div
                    key={i}
                    className={`pillar-card ${isOpen ? 'open' : ''}`}
                    onClick={() => setActivePillar(isOpen ? null : i)}
                    style={{
                      background: isOpen
                        ? 'rgba(26,22,18,0.9)'
                        : 'rgba(22,18,14,0.6)',
                      border: `1px solid ${isOpen ? 'rgba(200,135,58,0.3)' : 'rgba(200,135,58,0.12)'}`,
                      borderRadius: 12,
                      overflow: 'hidden',
                      backdropFilter: 'blur(8px)',
                      transition: 'all 0.3s ease',
                      boxShadow: isOpen ? '0 20px 40px rgba(0,0,0,0.3)' : 'none',
                      animation: `fadeUpIn 0.6s ease ${i * 100}ms both`,
                    }}
                  >
                    {/* Pillar header */}
                    <div style={{
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1.25rem 1.5rem',
                      gap: '1rem',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                          width: 36, height: 36, flexShrink: 0,
                          borderRadius: '50%',
                          background: isOpen
                            ? 'linear-gradient(135deg, rgba(184,92,42,0.4), rgba(212,150,63,0.2))'
                            : 'rgba(200,135,58,0.08)',
                          border: `1px solid ${isOpen ? 'rgba(200,135,58,0.4)' : 'rgba(200,135,58,0.15)'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'all 0.3s ease',
                        }}>
                          <span style={{
                            fontFamily: 'Georgia, serif',
                            fontSize: '0.9rem', fontWeight: 700,
                            color: isOpen ? '#c8873a' : 'rgba(200,135,58,0.5)',
                            transition: 'color 0.3s ease',
                          }}>
                            {i + 1}
                          </span>
                        </div>
                        <h3 style={{
                          fontFamily: 'Georgia, serif',
                          fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
                          color: isOpen ? '#f5f0e8' : 'rgba(245,240,232,0.7)',
                          margin: 0,
                          transition: 'color 0.3s ease',
                        }}>
                          {pillar.title}
                        </h3>
                      </div>
                      <ChevronDown
                        size={18}
                        color={isOpen ? '#c8873a' : 'rgba(200,135,58,0.4)'}
                        style={{
                          flexShrink: 0,
                          transition: 'transform 0.35s ease, color 0.3s ease',
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      />
                    </div>

                    {/* Pillar expanded content */}
                    <div
                      className="pillar-body"
                      style={{
                        maxHeight: isOpen ? 600 : 0,
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: '1.5rem',
                        padding: '0 1.5rem 1.5rem',
                        borderTop: '1px solid rgba(200,135,58,0.1)',
                        paddingTop: '1.5rem',
                      }}>
                        {/* Text + stat */}
                        <div>
                          <p style={{
                            fontFamily: 'sans-serif',
                            fontSize: '0.93rem',
                            color: 'rgba(245,240,232,0.75)',
                            lineHeight: 1.8,
                            marginBottom: '1.5rem',
                          }}>
                            {pillar.body}
                          </p>

                          {/* Inline stat */}
                          {countersVisible && (
                            <div style={{
                              display: 'inline-flex', alignItems: 'center', gap: 12,
                              padding: '0.6rem 1rem',
                              background: 'rgba(200,135,58,0.07)',
                              border: '1px solid rgba(200,135,58,0.2)',
                              borderRadius: 8,
                              animation: 'scalePop 0.4s ease both',
                            }}>
                              <span style={{
                                fontFamily: 'Georgia, serif',
                                fontSize: '1.5rem',
                                color: '#c8873a',
                                lineHeight: 1,
                              }}>
                                {pillar.stat.value}
                              </span>
                              <span style={{
                                fontFamily: 'sans-serif',
                                fontSize: '0.72rem',
                                color: 'rgba(245,240,232,0.5)',
                                lineHeight: 1.4,
                                maxWidth: 180,
                              }}>
                                {pillar.stat.label}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Image */}
                        <div
                          className="pillar-img"
                          style={{
                            borderRadius: 8,
                            overflow: 'hidden',
                            position: 'relative',
                            maxHeight: 220,
                            border: '1px solid rgba(200,135,58,0.15)',
                            boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
                          }}
                        >
                          <img
                            src={pillar.image}
                            alt={pillar.imageAlt}
                            style={{
                              width: '100%', height: '100%',
                              objectFit: 'cover', display: 'block',
                              filter: 'sepia(30%) contrast(1.05) brightness(0.75)',
                            }}
                          />
                          <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(135deg, rgba(26,22,18,0.5) 0%, transparent 60%)',
                          }} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
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
            {/* Top shimmer line */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 2,
              background: 'linear-gradient(90deg, transparent, #c8873a, #d4963f, #c8873a, transparent)',
            }} />

            {/* Faint background text */}
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

              {/* Two supporting lines */}
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
                  { label: 'Residential Schools', note: '1876 – 1996' },
                  { label: 'Sixties Scoop', note: '1951 – 1984' },
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
