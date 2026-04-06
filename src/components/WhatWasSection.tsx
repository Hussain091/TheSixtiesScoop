import { useEffect, useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ExternalLink } from 'lucide-react';

// Citation component
function Cite({ id, children, href }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      style={{ position: 'relative', display: 'inline' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 16, height: 16,
          borderRadius: '50%',
          background: hovered ? 'rgba(200,135,58,0.3)' : 'rgba(200,135,58,0.12)',
          border: '1px solid rgba(200,135,58,0.4)',
          color: '#c8873a',
          fontFamily: 'sans-serif',
          fontSize: '0.55rem',
          fontWeight: 700,
          textDecoration: 'none',
          verticalAlign: 'super',
          marginLeft: 2,
          lineHeight: 1,
          transition: 'all 0.2s ease',
          cursor: 'pointer',
          flexShrink: 0,
        }}
        title={`Source: ${id}`}
      >
        {id}
      </a>
      {hovered && (
        <span style={{
          position: 'absolute',
          bottom: '120%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(16,12,10,0.96)',
          border: '1px solid rgba(200,135,58,0.3)',
          borderRadius: 6,
          padding: '0.4rem 0.65rem',
          fontFamily: 'sans-serif',
          fontSize: '0.68rem',
          color: 'rgba(245,240,232,0.8)',
          whiteSpace: 'nowrap',
          zIndex: 100,
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          pointerEvents: 'none',
          animation: 'fadeUpIn 0.15s ease both',
        }}>
          {href ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <ExternalLink size={9} color="#c8873a" /> View source
            </span>
          ) : id}
        </span>
      )}
    </span>
  );
}

export default function WhatWasSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [countersStarted, setCountersStarted] = useState(false);

  useEffect(() => {
    if (isIntersecting && !countersStarted) {
      setCountersStarted(true);
      const duration = 2000;
      const steps = 60;
      const increment1 = 1400 / steps;
      const increment2 = 3400 / steps;
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        setCount1(Math.min(Math.floor(increment1 * currentStep), 1400));
        setCount2(Math.min(Math.floor(increment2 * currentStep), 3400));
        if (currentStep >= steps) clearInterval(timer);
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isIntersecting]);

  return (
    <>
      <style>{`
        @keyframes fadeUpIn {
          from { opacity: 0; transform: translateY(16px); }
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
        @keyframes countUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineGrow {
          from { width: 0; }
          to   { width: 100%; }
        }
        @keyframes softFloat {
          0%,100% { transform: translateY(0) rotate(-1deg); }
          50%      { transform: translateY(-6px) rotate(1deg); }
        }

        .fade-up-1 { animation: fadeUpIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
        .fade-up-2 { animation: fadeUpIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
        .fade-up-3 { animation: fadeUpIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s both; }
        .fade-up-4 { animation: fadeUpIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s both; }

        .img-reveal { animation: imgReveal 1.1s cubic-bezier(0.16,1,0.3,1) 0.3s both; }
        .soft-float { animation: softFloat 7s ease-in-out infinite; }
        .glow-orb   { animation: glowPulse 4s ease-in-out infinite; }

        .stat-card {
          transition: all 0.3s ease;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          border-color: rgba(200,135,58,0.45) !important;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(200,135,58,0.08) !important;
        }

        .cite-ref {
          font-family: sans-serif;
          font-size: 0.72rem;
          color: rgba(200,135,58,0.65);
          letter-spacing: 0.04em;
        }
      `}</style>

      <section
        id="what"
        ref={ref}
        style={{
          padding: '8rem 1.5rem',
          background: 'linear-gradient(180deg, #1a1612 0%, #1c1510 50%, #1a1612 100%)',
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
          position: 'absolute', top: '5%', right: '-10%',
          width: '50vw', height: '50vw', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(160,82,45,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* ── HEADER ── */}
          <div className="fade-up-1" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem',
            }}>
              <div style={{ width: 36, height: 1, background: 'rgba(200,135,58,0.5)' }} />
              <span style={{
                fontFamily: 'sans-serif', fontSize: '0.65rem',
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: '#c8873a', fontWeight: 600, opacity: 0.8,
              }}>
                Historical Context
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
              What Was the Sixties Scoop
            </h2>
            <div style={{
              width: 60, height: 2,
              background: 'linear-gradient(90deg, transparent, #c8873a, transparent)',
              margin: '0 auto',
            }} />
          </div>

          {/* ── QUOTE + TEXT BLOCK ── */}
          <div className="fade-up-2" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
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
                fontSize: '5rem',
                color: 'rgba(200,135,58,0.12)',
                lineHeight: 0.8,
                position: 'absolute',
                top: -10, left: 12,
                userSelect: 'none',
              }}>"</div>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                color: '#c8873a',
                lineHeight: 1.65,
                fontStyle: 'italic',
                marginBottom: '1rem',
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
                <Cite id="J" href="https://www.canadiansocialresearch.net/nativechildren.htm"> </Cite>
              </p>
            </div>

            {/* Body text */}
            <div style={{
              fontFamily: 'sans-serif',
              fontSize: '0.95rem',
              color: 'rgba(245,240,232,0.78)',
              lineHeight: 1.85,
              display: 'flex',
              flexDirection: 'column',
              gap: '1.1rem',
            }}>
              <p>
                In 1951, the government amended the Indian Act to give provincial governments power
                over Indigenous child welfare.
                <Cite id="TRC" href="https://www2.gov.bc.ca/assets/gov/british-columbians-our-governments/indigenous-people/aboriginal-peoples-documents/calls_to_action_english2.pdf"> </Cite>{' '}
                As residential schools faced mounting criticism, a new mechanism
                emerged to pursue the same goal — assimilation — under a different name.
              </p>
              <p>
                In simple terms, when Indian Residential Schools failed to "kill the Indian in the
                child," child welfare agencies stepped in to finish the job.
                <Cite id="TRC" href="https://www2.gov.bc.ca/assets/gov/british-columbians-our-governments/indigenous-people/aboriginal-peoples-documents/calls_to_action_english2.pdf"> </Cite>
              </p>
              <p>
                Children were taken without consent, without warning, without families being told
                where their children went.
                <Cite id="HD" href="https://healthydebate.ca/2020/10/topic/sixties-scoop-survivors/"> </Cite>
              </p>
              <p>
                Between the 1950s and 1980s, over{' '}
                <span style={{ color: '#c8873a', fontWeight: 600 }}>20,000 Indigenous children</span>{' '}
                were removed from their families and communities and placed into non-Indigenous homes
                across Canada and around the world.
                <Cite id="J" href="https://www.canadiansocialresearch.net/nativechildren.htm"> </Cite>
              </p>
            </div>
          </div>

          {/* ── IMAGE + CALLOUT ROW ── */}
          <div className="fade-up-3" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
            marginBottom: '4rem',
            alignItems: 'stretch',
          }}>
            {/* Image */}
            <div
              className="img-reveal soft-float"
              style={{
                borderRadius: 12,
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid rgba(200,135,58,0.2)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                minHeight: 260,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1503525148566-ef5c2b9c93bd?w=800&q=80"
                alt="A child's hands — representing the children taken by the Sixties Scoop"
                onLoad={() => setImageLoaded(true)}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', display: 'block',
                  filter: 'sepia(35%) contrast(1.05) brightness(0.75)',
                  opacity: imageLoaded ? 1 : 0,
                  transition: 'opacity 0.8s ease',
                  minHeight: 260,
                }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, transparent 40%, rgba(26,22,18,0.85) 100%)',
              }} />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '1.25rem',
              }}>
                <p style={{
                  fontFamily: 'Georgia, serif',
                  fontStyle: 'italic',
                  fontSize: '0.78rem',
                  color: 'rgba(245,240,232,0.6)',
                  margin: 0, lineHeight: 1.5,
                }}>
                  "They took children without consent, without warning."
                  <Cite id="HD" href="https://healthydebate.ca/2020/10/topic/sixties-scoop-survivors/"> </Cite>
                </p>
              </div>
            </div>

            {/* Context callout cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                {
                  label: 'The Legal Mechanism',
                  text: 'Section 88 of the Indian Act (1951) extended provincial laws — including child welfare laws — to reserves. This gave provinces authority to remove children without federal oversight or Indigenous consent.',
                  cite: { id: 'TRC', href: 'https://www2.gov.bc.ca/assets/gov/british-columbians-our-governments/indigenous-people/aboriginal-peoples-documents/calls_to_action_english2.pdf' },
                },
                {
                  label: 'Named in 1983',
                  text: 'Patrick Johnston coined the term "Sixties Scoop" in his 1983 report Native Children and the Child Welfare System — the first time the practice was formally named and documented.',
                  cite: { id: 'J', href: 'https://www.canadiansocialresearch.net/nativechildren.htm' },
                },
                {
                  label: 'Global Reach',
                  text: 'Children were not just placed across Canada — some were sent to the United States and Europe. Families had no legal recourse and were rarely given information about where their children were taken.',
                  cite: { id: 'S', href: null },
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(22,18,14,0.7)',
                    border: '1px solid rgba(200,135,58,0.15)',
                    borderRadius: 10,
                    padding: '1rem 1.25rem',
                    backdropFilter: 'blur(8px)',
                    transition: 'all 0.25s ease',
                    flex: 1,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(200,135,58,0.35)';
                    e.currentTarget.style.background = 'rgba(200,135,58,0.06)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(200,135,58,0.15)';
                    e.currentTarget.style.background = 'rgba(22,18,14,0.7)';
                  }}
                >
                  <div style={{
                    fontFamily: 'sans-serif', fontSize: '0.65rem',
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: '#c8873a', fontWeight: 700, marginBottom: '0.5rem',
                  }}>
                    {item.label}
                  </div>
                  <p style={{
                    fontFamily: 'sans-serif', fontSize: '0.83rem',
                    color: 'rgba(245,240,232,0.65)',
                    lineHeight: 1.7, margin: 0,
                  }}>
                    {item.text}
                    <Cite id={item.cite.id} href={item.cite.href}> </Cite>
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
            marginBottom: '2.5rem',
          }}>
            <div
              className="stat-card"
              style={{
                background: 'rgba(22,18,14,0.8)',
                border: '1px solid rgba(200,135,58,0.2)',
                borderRadius: 12,
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              }}
            >
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                color: '#c8873a',
                lineHeight: 1,
                marginBottom: '0.75rem',
                animation: countersStarted ? 'countUp 0.5s ease both' : 'none',
              }}>
                {countersStarted ? count1.toLocaleString() : '—'}
              </div>
              <div style={{
                fontFamily: 'sans-serif', fontSize: '0.88rem',
                color: 'rgba(245,240,232,0.75)', marginBottom: '0.5rem', lineHeight: 1.5,
              }}>
                Indigenous children in B.C. provincial care in 1964
              </div>
              <div style={{
                fontFamily: 'sans-serif', fontSize: '0.72rem',
                color: 'rgba(245,240,232,0.4)', marginBottom: '1rem',
              }}>
                Up from approximately 30 in 1951
                <Cite id="J" href="https://www.canadiansocialresearch.net/nativechildren.htm"> </Cite>
              </div>
              <div style={{
                display: 'inline-block',
                padding: '0.3rem 0.9rem',
                background: 'rgba(184,92,42,0.15)',
                border: '1px solid rgba(184,92,42,0.3)',
                borderRadius: 999,
              }}>
                <span style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '1.3rem', color: '#b85c2a',
                }}>50×</span>
                <span style={{
                  fontFamily: 'sans-serif', fontSize: '0.72rem',
                  color: 'rgba(245,240,232,0.5)', marginLeft: 6,
                }}>
                  increase in 13 years
                </span>
              </div>
            </div>

            <div
              className="stat-card"
              style={{
                background: 'rgba(22,18,14,0.8)',
                border: '1px solid rgba(200,135,58,0.2)',
                borderRadius: 12,
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              }}
            >
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                color: '#c8873a',
                lineHeight: 1,
                marginBottom: '0.75rem',
                animation: countersStarted ? 'countUp 0.5s ease 0.2s both' : 'none',
              }}>
                {countersStarted ? count2.toLocaleString() : '—'}
              </div>
              <div style={{
                fontFamily: 'sans-serif', fontSize: '0.88rem',
                color: 'rgba(245,240,232,0.75)', marginBottom: '0.5rem', lineHeight: 1.5,
              }}>
                Indigenous children adopted in Manitoba
              </div>
              <div style={{
                fontFamily: 'sans-serif', fontSize: '0.72rem',
                color: 'rgba(245,240,232,0.4)', marginBottom: '1rem',
              }}>
                Between 1971 and 1981
                <Cite id="J" href="https://www.canadiansocialresearch.net/nativechildren.htm"> </Cite>
              </div>
              <div style={{
                display: 'inline-block',
                padding: '0.3rem 0.9rem',
                background: 'rgba(184,92,42,0.15)',
                border: '1px solid rgba(184,92,42,0.3)',
                borderRadius: 999,
              }}>
                <span style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '1.3rem', color: '#b85c2a',
                }}>80%</span>
                <span style={{
                  fontFamily: 'sans-serif', fontSize: '0.72rem',
                  color: 'rgba(245,240,232,0.5)', marginLeft: 6,
                }}>
                  placed into non-Indigenous homes
                </span>
              </div>
            </div>
          </div>

          {/* ── HIGHLIGHTED STAT ── */}
          <div style={{
            background: 'rgba(16,12,10,0.85)',
            border: '1px solid rgba(200,135,58,0.2)',
            borderRadius: 12,
            padding: '2rem 2.5rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(8px)',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 2,
              background: 'linear-gradient(90deg, transparent, #c8873a, transparent)',
            }} />
            <p style={{
              fontFamily: 'sans-serif',
              fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
              color: 'rgba(245,240,232,0.85)',
              lineHeight: 1.75,
              margin: 0,
              maxWidth: 780, marginLeft: 'auto', marginRight: 'auto',
            }}>
              Aboriginal children were{' '}
              <span style={{
                color: '#c8873a',
                fontWeight: 700,
                fontFamily: 'Georgia, serif',
                fontSize: '1.2em',
              }}>
                4.5 times more likely
              </span>{' '}
              than non-Aboriginal children to be in the care of child welfare authorities.
              <Cite id="S" href="https://firstpeopleschildandfamilyreview.org/"> </Cite>
            </p>

            {/* Source key */}
            <div style={{
              marginTop: '2rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(200,135,58,0.1)',
              display: 'flex', flexWrap: 'wrap',
              justifyContent: 'center', gap: '0.5rem 1.5rem',
            }}>
              <span style={{
                fontFamily: 'sans-serif', fontSize: '0.6rem',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'rgba(245,240,232,0.25)',
                width: '100%', textAlign: 'center', marginBottom: '0.35rem',
              }}>
                Sources
              </span>
              {[
                { id: 'J', label: 'Johnston, 1983', href: 'https://www.canadiansocialresearch.net/nativechildren.htm' },
                { id: 'TRC', label: 'TRC Calls to Action, 2015', href: 'https://www2.gov.bc.ca/assets/gov/british-columbians-our-governments/indigenous-people/aboriginal-peoples-documents/calls_to_action_english2.pdf' },
                { id: 'HD', label: 'Healthy Debate, 2020', href: 'https://healthydebate.ca/2020/10/topic/sixties-scoop-survivors/' },
                { id: 'S', label: 'Sinclair, 2007', href: null },
              ].map((s) => (
                <a
                  key={s.id}
                  href={s.href || '#'}
                  target={s.href ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    fontFamily: 'sans-serif', fontSize: '0.68rem',
                    color: 'rgba(200,135,58,0.55)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    letterSpacing: '0.02em',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#c8873a'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(200,135,58,0.55)'; }}
                >
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 14, height: 14, borderRadius: '50%',
                    background: 'rgba(200,135,58,0.1)',
                    border: '1px solid rgba(200,135,58,0.3)',
                    fontSize: '0.5rem', fontWeight: 700, color: '#c8873a',
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
