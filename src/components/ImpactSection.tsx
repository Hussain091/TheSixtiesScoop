import { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { User, Languages, Users, Heart, BookOpen, Scale, ChevronDown } from 'lucide-react';

const impactAreas = [
  {
    icon: User,
    title: 'Identity',
    accentColor: '#c8873a',
    image: 'https://images.unsplash.com/photo-1504670073073-6123e39e0754?w=700&q=80',
    imageAlt: 'Reflection in water — fractured identity',
    content:
      'Many children who were taken did not learn they were Indigenous until adulthood. Birth records were sealed and could only be opened with consent of both parties which meant that survivors grew up not knowing their language, their nation, their family. Identity is not just a name or a status number, it is belonging. It is knowing where you come from and who your people are and the Scoop stole that.',
    stat: { value: '50+', label: 'years some survivors searched before finding family' },
  },
  {
    icon: Languages,
    title: 'Language',
    accentColor: '#b85c2a',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=700&q=80',
    imageAlt: 'Open book — the loss of written and spoken language',
    content:
      'Indigenous languages are not just words but they carry worldview, law, medicine, spirituality and the removal of children broke intergenerational language transmission. Over 60 Indigenous languages in Canada are now endangered. When a language dies, an entire way of understanding the world disappears and an entire community loses a part of their identity. The Scoop silenced thousands of voices before they could learn to speak.',
    stat: { value: '60+', label: 'Indigenous languages in Canada now endangered' },
  },
  {
    icon: Users,
    title: 'Family and Kinship',
    accentColor: '#d4963f',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=80',
    imageAlt: 'Empty swings — absence of children from community',
    content:
      'Indigenous cultures are built around kinship networks. Removing a child does not just affect one family but it affects the connection across entire communities. Many families searched for decades but never found them. Siblings were separated and never saw each other again. Grandparents lost the chance to pass on knowledge. The Scoop didn\'t just remove children. It tore apart the foundations of a community.',
    stat: { value: '20,000+', label: 'children separated from their kinship networks' },
  },
  {
    icon: Heart,
    title: 'Mental Health',
    accentColor: '#a0753a',
    image: 'https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=700&q=80',
    imageAlt: 'Storm clouds — the weight of intergenerational trauma',
    content:
      'The scoop also led to long-term effects that include loss of cultural identity, low self-esteem, shame, loneliness, confusion, depression and PTSD. Many survivors reported abuse in adoptive homes. Which led to an increase in suicide rates, substance use, and mental health crises for survivors. These are not individual failures. They are the predictable result of systemic trauma.',
    stat: { value: 'Higher', label: 'rates of PTSD, depression, and crisis among survivors' },
  },
  {
    icon: BookOpen,
    title: 'Community Continuity',
    accentColor: '#c8873a',
    image: 'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=700&q=80',
    imageAlt: 'Abandoned path — disrupted transmission of knowledge',
    content:
      'The knowledge that was passed through oral tradition, through Elders, through lived community experience was ruined. The Scoop disrupted not just individual lives but the transmission of knowledge across generations. How do you teach a ceremony if the children are gone? How do you pass on stories? How do you keep a culture alive when its future is taken?',
    stat: { value: 'Generations', label: 'of oral tradition and ceremony interrupted' },
  },
  {
    icon: Scale,
    title: 'Legal Status',
    accentColor: '#b85c2a',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=700&q=80',
    imageAlt: 'Legal documents — bureaucratic barriers to belonging',
    content:
      'For status the removal of First Nations children resulted in loss of Indian status stripping them of treaty rights, land rights, and the ability to return to their communities. Even when survivors reconnected with their nations, they often found themselves legally excluded from the communities they belonged to. The colonial legal system created another barrier to coming home.',
    stat: { value: 'Denied', label: 'treaty rights, land rights, and community membership' },
  },
];

export default function ImpactSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [expandedCard, setExpandedCard] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});

  const toggle = (i) => setExpandedCard(expandedCard === i ? null : i);

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
        @keyframes imgReveal {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0% 0 0); }
        }
        @keyframes shimmerMove {
          from { background-position: -200% center; }
          to   { background-position: 200% center; }
        }
        @keyframes iconPop {
          0%   { transform: scale(0.7); opacity: 0; }
          70%  { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes borderGlow {
          0%,100% { box-shadow: 0 0 0 0 transparent; }
          50%      { box-shadow: 0 0 20px 2px rgba(200,135,58,0.12); }
        }
        @keyframes expandIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .fade-up-1 { animation: fadeUpIn 0.85s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .fade-up-2 { animation: fadeUpIn 0.85s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
        .glow-orb  { animation: glowPulse 4.5s ease-in-out infinite; }

        .impact-card {
          transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .impact-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }
        .impact-card:hover::before,
        .impact-card.open::before { transform: scaleX(1); }
        .impact-card:hover {
          transform: translateY(-4px);
        }
        .impact-card.open {
          transform: translateY(-2px);
        }

        .card-shimmer {
          position: absolute;
          top: 0; bottom: 0;
          width: 60%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.025), transparent);
          pointer-events: none;
          animation: shimmerMove 4s ease-in-out infinite;
        }

        .icon-wrap {
          transition: transform 0.3s ease, background 0.3s ease;
        }
        .impact-card:hover .icon-wrap {
          transform: scale(1.1) rotate(-4deg);
        }

        .expand-content {
          animation: expandIn 0.4s cubic-bezier(0.16,1,0.3,1) both;
        }

        .chevron-icon {
          transition: transform 0.35s ease;
        }
        .chevron-icon.open { transform: rotate(180deg); }

        .stat-badge {
          transition: all 0.25s ease;
        }
        .impact-card:hover .stat-badge {
          border-color: rgba(200,135,58,0.4);
          background: rgba(200,135,58,0.1);
        }

        .img-expand { animation: imgReveal 0.8s cubic-bezier(0.16,1,0.3,1) both; }

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
        id="impact"
        ref={ref}
        style={{
          padding: '8rem 1.5rem',
          background: 'linear-gradient(180deg, #1c1510 0%, #1a1612 50%, #1c1510 100%)',
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
          position: 'absolute', top: '10%', left: '-15%',
          width: '55vw', height: '55vw', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(160,82,45,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="glow-orb" style={{
          position: 'absolute', bottom: '10%', right: '-15%',
          width: '45vw', height: '45vw', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(200,135,58,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
          animationDelay: '2.2s',
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
                The Cost of Removal
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
              What Was Taken
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
              maxWidth: 560, margin: '0 auto',
              lineHeight: 1.7,
            }}>
              The Sixties Scoop didn't just remove children from their homes. It severed
              connections that define what it means to be human.
            </p>
          </div>

          {/* ── HINT ── */}
          <div className="fade-up-2" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              fontFamily: 'sans-serif', fontSize: '0.65rem',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'rgba(200,135,58,0.4)',
            }}>
              Click any card to expand
            </span>
          </div>

          {/* ── CARDS GRID ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem',
            marginBottom: '4rem',
          }}>
            {impactAreas.map((area, i) => {
              const Icon = area.icon;
              const isOpen = expandedCard === i;
              const color = area.accentColor;

              return (
                <div
                  key={i}
                  className={`impact-card ${isOpen ? 'open' : ''}`}
                  onClick={() => toggle(i)}
                  style={{
                    background: isOpen
                      ? 'rgba(24,19,14,0.92)'
                      : 'rgba(20,16,12,0.72)',
                    border: `1px solid ${isOpen ? `${color}45` : 'rgba(200,135,58,0.14)'}`,
                    borderRadius: 14,
                    padding: isOpen ? '2rem' : '1.5rem',
                    boxShadow: isOpen
                      ? `0 24px 50px rgba(0,0,0,0.45), 0 0 40px ${color}14`
                      : '0 6px 20px rgba(0,0,0,0.25)',
                    backdropFilter: 'blur(8px)',
                    gridColumn: isOpen ? 'span 1' : 'span 1',
                    animation: `fadeUpIn 0.6s ease ${i * 80}ms both`,
                  }}
                >
                  {/* Card shimmer (always present, subtle) */}
                  <div className="card-shimmer" />

                  {/* Top accent bar */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                    background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                    transform: isOpen ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.4s ease',
                  }} />

                  {/* Card header */}
                  <div style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem', marginBottom: isOpen ? '1.5rem' : 0,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div
                        className="icon-wrap"
                        style={{
                          width: 46, height: 46, flexShrink: 0,
                          borderRadius: 10,
                          background: isOpen
                            ? `${color}22`
                            : 'rgba(200,135,58,0.08)',
                          border: `1px solid ${isOpen ? `${color}45` : 'rgba(200,135,58,0.18)'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'all 0.3s ease',
                          animation: isOpen ? 'iconPop 0.4s ease both' : 'none',
                        }}
                      >
                        <Icon size={20} color={isOpen ? color : 'rgba(200,135,58,0.55)'} />
                      </div>

                      <h3 style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                        color: isOpen ? '#f5f0e8' : 'rgba(245,240,232,0.75)',
                        margin: 0,
                        transition: 'color 0.3s ease',
                      }}>
                        {area.title}
                      </h3>
                    </div>

                    <ChevronDown
                      size={16}
                      color={isOpen ? color : 'rgba(200,135,58,0.35)'}
                      className={`chevron-icon ${isOpen ? 'open' : ''}`}
                      style={{ flexShrink: 0 }}
                    />
                  </div>

                  {/* Expanded content */}
                  {isOpen && (
                    <div className="expand-content">
                      {/* Image */}
                      <div
                        className="img-expand"
                        style={{
                          borderRadius: 9,
                          overflow: 'hidden',
                          marginBottom: '1.5rem',
                          position: 'relative',
                          border: `1px solid ${color}25`,
                          boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
                          height: 180,
                        }}
                      >
                        <img
                          src={area.image}
                          alt={area.imageAlt}
                          onLoad={() => setLoadedImages(p => ({ ...p, [i]: true }))}
                          style={{
                            width: '100%', height: '100%',
                            objectFit: 'cover', display: 'block',
                            filter: 'sepia(30%) contrast(1.05) brightness(0.72)',
                            opacity: loadedImages[i] ? 1 : 0,
                            transition: 'opacity 0.7s ease',
                          }}
                        />
                        <div style={{
                          position: 'absolute', inset: 0,
                          background: `linear-gradient(180deg, transparent 40%, rgba(20,16,12,0.8) 100%)`,
                        }} />
                        {/* Image label */}
                        <div style={{
                          position: 'absolute', bottom: '0.75rem', left: '0.9rem',
                        }}>
                          <span style={{
                            fontFamily: 'sans-serif', fontSize: '0.62rem',
                            letterSpacing: '0.18em', textTransform: 'uppercase',
                            color: color, fontWeight: 700,
                          }}>
                            {area.title}
                          </span>
                        </div>
                      </div>

                      {/* Body text */}
                      <p style={{
                        fontFamily: 'sans-serif',
                        fontSize: '0.92rem',
                        color: 'rgba(245,240,232,0.75)',
                        lineHeight: 1.85,
                        margin: '0 0 1.25rem',
                      }}>
                        {area.content}
                      </p>

                      {/* Stat badge */}
                      <div
                        className="stat-badge"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 10,
                          padding: '0.55rem 1rem',
                          background: `${color}0d`,
                          border: `1px solid ${color}28`,
                          borderRadius: 8,
                        }}
                      >
                        <div style={{
                          width: 4, height: 4, borderRadius: '50%',
                          background: color, flexShrink: 0,
                        }} />
                        <span style={{
                          fontFamily: 'Georgia, serif',
                          fontSize: '1rem',
                          color: color,
                          fontWeight: 700,
                          marginRight: 6,
                        }}>
                          {area.stat.value}
                        </span>
                        <span style={{
                          fontFamily: 'sans-serif',
                          fontSize: '0.72rem',
                          color: 'rgba(245,240,232,0.45)',
                          lineHeight: 1.4,
                        }}>
                          {area.stat.label}
                        </span>
                      </div>

                      {/* Collapse hint */}
                      <div style={{
                        fontFamily: 'sans-serif', fontSize: '0.62rem',
                        letterSpacing: '0.12em', textTransform: 'uppercase',
                        color: 'rgba(245,240,232,0.2)',
                        marginTop: '1.25rem',
                      }}>
                        Click to collapse
                      </div>
                    </div>
                  )}

                  {/* Collapsed hint */}
                  {!isOpen && (
                    <div style={{
                      fontFamily: 'sans-serif', fontSize: '0.62rem',
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      color: 'rgba(200,135,58,0.3)',
                      marginTop: '0.85rem',
                    }}>
                      Click to read more
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── CLOSING ── */}
          <div style={{
            background: 'rgba(14,11,8,0.9)',
            border: '1px solid rgba(200,135,58,0.18)',
            borderRadius: 16,
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(12px)',
          }}>
            {/* Top bar */}
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
                fontSize: 'clamp(3rem, 8vw, 8rem)',
                color: 'rgba(200,135,58,0.025)',
                fontWeight: 700, whiteSpace: 'nowrap',
                userSelect: 'none',
              }}>
                EVERYTHING
              </span>
            </div>

            <p
              className="closing-shimmer"
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(1.2rem, 2.8vw, 1.9rem)',
                lineHeight: 1.55,
                maxWidth: 740,
                margin: '0 auto',
                fontStyle: 'italic',
                position: 'relative', zIndex: 1,
              }}
            >
              They took everything that makes a person. And then they called it progress or welfare.
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
