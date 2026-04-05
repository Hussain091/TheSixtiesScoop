import { useState, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Shield, Heart, Sparkles, TrendingUp, ChevronRight } from 'lucide-react';

const fourRs = [
  {
    id: 'resistance',
    title: 'Resistance',
    icon: Shield,
    // Definition in the Indigenous context
    definition: {
      short: 'To protect what is sacred.',
      full: 'In Indigenous thought, Resistance is not merely opposition — it is the active defence of relationality: the ties between people, land, language, and spirit. For Sixties Scoop survivors and their communities, resistance meant refusing to let the colonial state define who they were. It is a sacred obligation to ancestors and descendants alike.',
    },
    content: [
      {
        title: 'Community Blockades',
        text: 'In 1990 the Wabaseemoong community physically blocked the Children\'s Aid Society from entering their reserve and prevented the removal of more children. This was a direct action to protect their children.',
      },
      {
        title: 'Legal Action',
        text: 'Class action lawsuits began in 2009 in Manitoba, and the first major legal challenge against Canada for failing to protect Aboriginal children\'s cultural identity occurred. Survivors used the colonial legal system against itself.',
      },
      {
        title: 'Survivor Networks',
        text: 'The 60s Scoop Network was founded by survivors to demand justice, recognition, and compensation. Colleen Hele Cardinal, Director stated: "The trafficking of Indigenous children through the child welfare policies known as the 60s Scoop caused tremendous harm, yet Canada has swept us under the rug without acknowledgement or apology."',
      },
      {
        title: 'Justice Won',
        text: 'Legal resistance resulted in an $800 million settlement in 2017 and a federal apology from Prime Minister Trudeau in 2018. This was not enough — but acknowledgment forced this matter into the open.',
      },
    ],
  },
  {
    id: 'resilience',
    title: 'Resilience',
    icon: Heart,
    definition: {
      short: 'To bend without breaking — and grow toward the light.',
      full: 'Indigenous resilience is rooted in the understanding that survival is communal, not individual. It draws on generations of adaptation to colonial violence while keeping the core of identity intact. For Sixties Scoop survivors, resilience is not simply enduring trauma — it is the quiet, daily act of choosing to remain fully human in the face of a system designed to erase you.',
    },
    content: [
      {
        title: 'Rebuilding Identity',
        text: 'Indigenous Survivors rebuilt their identities that were systematically destroyed. Christine Smith went from being a ward of the state to publishing memoirs and editing anthologies of survivor voices.',
      },
      {
        title: 'Teaching the Next Generation',
        text: 'Rolanda Murphy McPhee is now a teacher and army reservist who shares her story with young people. She turned her pain into a method of teaching — ensuring the next generation knows what happened.',
      },
      {
        title: 'Reframing the Narrative',
        text: 'David Mortimer writes: "I survived Canada\'s child welfare system and its failed Sixties Scoop policy" — framing survival as strength, not victimhood.',
      },
      {
        title: 'Cultural Reconnection as Healing',
        text: 'Many survivors describe reconnection with culture as literally life-saving. Resilience is not just enduring trauma — it is choosing to live fully despite it, and working to overcome it.',
      },
    ],
  },
  {
    id: 'reclamation',
    title: 'Reclamation',
    icon: Sparkles,
    definition: {
      short: 'To take back what was never truly lost.',
      full: 'Reclamation in Indigenous frameworks means more than recovery — it is an assertion that colonial dispossession was never legitimate. Land, language, ceremony, name, and kinship were stolen but never surrendered. For Sixties Scoop survivors, reclamation is a sovereign act: returning not to what was, but to a living relationship with who they have always been.',
    },
    content: [
      {
        title: 'Coming Home',
        text: 'Survivors returning back to their communities, learning languages, reconnecting with Elders and ceremonies — reclaiming everything that was stolen.',
      },
      {
        title: 'Bill C-92',
        text: 'The 2019 Act Respecting First Nations, Inuit, and Métis Children, Youth, and Families gives Indigenous communities legal control over their own child welfare for the first time — a direct reclamation of sovereignty.',
      },
      {
        title: 'Reclaiming Names and Status',
        text: 'Survivors are reclaiming birth names, Indian status, and community membership. Legal recognition of who they always were.',
      },
      {
        title: 'Survivor-Led Healing',
        text: 'The National Sixties Scoop Healing Foundation supports cultural reclamation and family reunion — building structures that serve the community on the community\'s own terms.',
      },
      {
        title: 'Mapping the Diaspora',
        text: 'The "In Our Own Words: Mapping the Sixties Scoop Diaspora" project by the 60s Scoop Network lets survivors map their displacement and reclaim their own story — helping visualize 22,500+ children\'s journeys.',
      },
    ],
  },
  {
    id: 'resurgence',
    title: 'Resurgence',
    icon: TrendingUp,
    definition: {
      short: 'To rise — not back to the past, but forward into sovereignty.',
      full: 'Leanne Betasamosake Simpson\'s concept of Indigenous resurgence calls for a return to land-based relationships, languages, governance, and ways of knowing — not as nostalgia, but as a radical refusal of the colonial present. For survivors of the Sixties Scoop, resurgence means building Indigenous futures on Indigenous terms: creating art, institutions, and knowledge systems that answer to the community, not the state.',
    },
    content: [
      {
        title: 'Land-Based Healing',
        text: 'Indigenous-led healing programs like "Healing on the Land with Horses" in Saskatchewan connect survivors to land and culture. Healing happens in relationship to the land.',
      },
      {
        title: 'Telling Our Own Stories',
        text: 'Jennifer Podemski (Anishnabe/Ashkenazi), award-winning showrunner, created the TV series Little Bird about a Sixties Scoop survivor — telling the story from an Indigenous perspective to a national audience.',
      },
      {
        title: 'Survivor-Led Institutions',
        text: 'The Sixties Scoop Healing Foundation (2020) is survivor-led, Inuit/First Nations/Métis/status/non-status inclusive, and fully independent — building institutions that serve the community.',
      },
      {
        title: 'Anthology as Resistance',
        text: 'Survivors like Christine Smith editing anthologies like Silence to Strength (2022) so that the community can tell its own story — knowledge production from the Indigenous perspective.',
      },
      {
        title: 'Language Revitalization',
        text: 'Language revitalization programs — Rolanda learning Ojibway, schools teaching Indigenous languages, survivors reconnecting with oral traditions. Resurgence is not going back; it is carrying forward and regaining what was lost.',
      },
    ],
  },
];

// Tab accent colors per R
const tabColors = {
  resistance: '#b85c2a',
  resilience: '#c8873a',
  reclamation: '#a0753a',
  resurgence: '#d4963f',
};

export default function FourRsSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.15 });
  const [activeTab, setActiveTab] = useState('resistance');
  const [prevTab, setPrevTab] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const contentRef = useRef(null);

  const activeContent = fourRs.find((r) => r.id === activeTab);
  const accentColor = tabColors[activeTab];

  const switchTab = (id) => {
    if (id === activeTab || animating) return;
    setAnimating(true);
    setPrevTab(activeTab);
    setTimeout(() => {
      setActiveTab(id);
      setAnimating(false);
    }, 220);
  };

  return (
    <>
      <style>{`
        @keyframes fadeUpIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOutUp {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-14px); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(18px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes lineGrow {
          from { height: 0; }
          to   { height: 100%; }
        }
        @keyframes glowPulse {
          0%,100% { opacity: 0.4; }
          50%      { opacity: 0.9; }
        }
        @keyframes borderFlow {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes defFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes imgReveal {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0% 0 0); }
        }
        @keyframes softFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }

        .panel-enter { animation: fadeUpIn 0.35s cubic-bezier(0.16,1,0.3,1) both; }
        .panel-exit  { animation: fadeOutUp 0.2s ease both; }
        .item-enter  { animation: slideInRight 0.4s cubic-bezier(0.16,1,0.3,1) both; }
        .def-enter   { animation: defFadeIn 0.5s ease both; }
        .img-reveal  { animation: imgReveal 1.1s cubic-bezier(0.16,1,0.3,1) 0.3s both; }
        .soft-float  { animation: softFloat 6s ease-in-out infinite; }

        .tab-btn {
          position: relative;
          overflow: hidden;
          transition: all 0.28s cubic-bezier(0.16,1,0.3,1);
        }
        .tab-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
          transform: translateX(-100%);
          transition: transform 0.5s ease;
        }
        .tab-btn:hover::after { transform: translateX(100%); }

        .content-card {
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }

        .item-card {
          transition: all 0.25s ease;
          border-left-width: 3px;
          border-left-style: solid;
        }
        .item-card:hover {
          transform: translateX(6px);
          background: rgba(255,255,255,0.03);
          border-radius: 0 6px 6px 0;
        }

        .r-number {
          font-family: Georgia, serif;
          font-size: 9rem;
          line-height: 1;
          position: absolute;
          right: -10px;
          top: -20px;
          opacity: 0.04;
          pointer-events: none;
          user-select: none;
          color: #f5f0e8;
          font-weight: 700;
        }

        .glow-dot {
          animation: glowPulse 2.5s ease-in-out infinite;
        }

        .section-enter {
          animation: fadeUpIn 0.9s cubic-bezier(0.16,1,0.3,1) both;
        }
      `}</style>

      <section
        id="resistance"
        ref={ref}
        style={{
          padding: '8rem 1.5rem',
          background: 'linear-gradient(180deg, #1a1612 0%, #1e1814 60%, #1a1612 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
        className={`transition-all duration-1000 ${
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Background texture dot grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(200,135,58,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          zIndex: 0,
        }} />

        {/* Ambient glow that shifts color with active tab */}
        <div style={{
          position: 'absolute', top: '20%', left: '50%',
          transform: 'translateX(-50%)',
          width: '60vw', height: '40vh',
          background: `radial-gradient(ellipse, ${accentColor}18 0%, transparent 70%)`,
          transition: 'background 0.6s ease',
          pointerEvents: 'none', zIndex: 0,
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* ── HEADER ── */}
          <div className="section-enter" style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              marginBottom: '1.5rem',
            }}>
              <span className="glow-dot" style={{
                width: 8, height: 8, borderRadius: '50%',
                background: accentColor,
                display: 'inline-block',
                transition: 'background 0.4s ease',
              }} />
              <span style={{
                fontFamily: 'sans-serif', fontSize: '0.7rem',
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: accentColor, fontWeight: 600,
                transition: 'color 0.4s ease',
              }}>
                Resistance · Resilience · Reclamation · Resurgence
              </span>
              <span className="glow-dot" style={{
                width: 8, height: 8, borderRadius: '50%',
                background: accentColor, display: 'inline-block',
                transition: 'background 0.4s ease',
              }} />
            </div>

            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              color: '#f5f0e8',
              marginBottom: '1.25rem',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
            }}>
              They Never Stopped Fighting
            </h2>

            <div style={{
              width: 64, height: 2,
              background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
              margin: '0 auto 1.5rem',
              transition: 'background 0.4s ease',
            }} />

            <p style={{
              fontFamily: 'sans-serif', fontSize: '1.05rem',
              color: 'rgba(245,240,232,0.6)',
              maxWidth: 560, margin: '0 auto',
              lineHeight: 1.7,
            }}>
              Four interconnected pillars — rooted in Indigenous philosophy —
              that describe how communities responded to the Sixties Scoop
              and continue to shape the path forward.
            </p>
          </div>

          {/* ── TAB BUTTONS ── */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '0.75rem',
            justifyContent: 'center', marginBottom: '2.5rem',
            marginTop: '3rem',
          }}>
            {fourRs.map((r) => {
              const Icon = r.icon;
              const isActive = activeTab === r.id;
              const color = tabColors[r.id];
              return (
                <button
                  key={r.id}
                  onClick={() => switchTab(r.id)}
                  className="tab-btn"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '0.75rem 1.75rem',
                    borderRadius: 8,
                    border: isActive
                      ? `1px solid ${color}60`
                      : '1px solid rgba(160,82,45,0.2)',
                    background: isActive
                      ? `${color}22`
                      : 'rgba(26,22,18,0.6)',
                    color: isActive ? color : 'rgba(245,240,232,0.55)',
                    fontFamily: 'sans-serif',
                    fontSize: '0.95rem',
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                    letterSpacing: '0.02em',
                    boxShadow: isActive ? `0 0 20px ${color}18` : 'none',
                  }}
                >
                  <Icon size={18} />
                  <span>{r.title}</span>
                </button>
              );
            })}
          </div>

          {/* ── MAIN CONTENT PANEL ── */}
          {activeContent && (
            <div
              className={`content-card ${animating ? 'panel-exit' : 'panel-enter'}`}
              style={{
                background: 'rgba(26,22,18,0.7)',
                border: `1px solid ${accentColor}30`,
                borderRadius: 16,
                padding: 'clamp(1.5rem, 4vw, 3rem)',
                backdropFilter: 'blur(12px)',
                boxShadow: `0 0 60px ${accentColor}0c, inset 0 1px 0 rgba(255,255,255,0.04)`,
                transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
              }}
            >
              {/* Panel header row */}
              <div style={{
                display: 'flex', alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '2rem',
                marginBottom: '2.5rem',
                flexWrap: 'wrap',
              }}>
                <div style={{ flex: 1, minWidth: 240 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: '1rem' }}>
                    {(() => { const Icon = activeContent.icon; return <Icon color={accentColor} size={32} style={{ flexShrink: 0 }} />; })()}
                    <h3 style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: 'clamp(2rem, 4vw, 3rem)',
                      color: '#f5f0e8',
                      lineHeight: 1,
                      margin: 0,
                    }}>
                      {activeContent.title}
                    </h3>
                  </div>

                  {/* ── DEFINITION BLOCK ── */}
                  <div
                    className="def-enter"
                    style={{
                      borderLeft: `3px solid ${accentColor}`,
                      paddingLeft: '1.25rem',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <p style={{
                      fontFamily: 'Georgia, serif',
                      fontStyle: 'italic',
                      fontSize: '1.05rem',
                      color: accentColor,
                      margin: '0 0 0.75rem',
                      lineHeight: 1.5,
                      transition: 'color 0.4s ease',
                    }}>
                      "{activeContent.definition.short}"
                    </p>
                    <p style={{
                      fontFamily: 'sans-serif',
                      fontSize: '0.88rem',
                      color: 'rgba(245,240,232,0.58)',
                      lineHeight: 1.75,
                      margin: 0,
                      maxWidth: 520,
                    }}>
                      {activeContent.definition.full}
                    </p>
                  </div>
                </div>

                {/* Image — shown on Resurgence tab, fits layout */}
                {activeContent.id === 'resurgence' && (
                  <div
                    className="img-reveal soft-float"
                    style={{
                      width: 'clamp(180px, 22vw, 260px)',
                      flexShrink: 0,
                      borderRadius: 10,
                      overflow: 'hidden',
                      border: `1px solid ${accentColor}30`,
                      boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px ${accentColor}18`,
                      position: 'relative',
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1574617945027-5af1e11e5b06?w=600&q=80"
                      alt="Indigenous elder and youth — intergenerational knowledge sharing"
                      onLoad={() => setImageLoaded(true)}
                      style={{
                        width: '100%', display: 'block',
                        filter: 'sepia(25%) contrast(1.05) brightness(0.82)',
                        opacity: imageLoaded ? 1 : 0,
                        transition: 'opacity 0.8s ease',
                      }}
                    />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(180deg, transparent 50%, rgba(26,22,18,0.8) 100%)',
                    }} />
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      padding: '0.9rem',
                    }}>
                      <p style={{
                        fontFamily: 'Georgia, serif',
                        fontStyle: 'italic',
                        fontSize: '0.72rem',
                        color: 'rgba(245,240,232,0.65)',
                        margin: 0, lineHeight: 1.4,
                      }}>
                        Carrying knowledge forward — elder to youth
                      </p>
                    </div>
                  </div>
                )}

                {/* Image on Reclamation tab */}
                {activeContent.id === 'reclamation' && (
                  <div
                    className="img-reveal soft-float"
                    style={{
                      width: 'clamp(180px, 22vw, 260px)',
                      flexShrink: 0,
                      borderRadius: 10,
                      overflow: 'hidden',
                      border: `1px solid ${accentColor}30`,
                      boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px ${accentColor}18`,
                      position: 'relative',
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80"
                      alt="Hands holding earth — reclamation of land and identity"
                      style={{
                        width: '100%', display: 'block',
                        filter: 'sepia(30%) contrast(1.08) brightness(0.8)',
                      }}
                    />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(180deg, transparent 50%, rgba(26,22,18,0.8) 100%)',
                    }} />
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      padding: '0.9rem',
                    }}>
                      <p style={{
                        fontFamily: 'Georgia, serif',
                        fontStyle: 'italic',
                        fontSize: '0.72rem',
                        color: 'rgba(245,240,232,0.65)',
                        margin: 0, lineHeight: 1.4,
                      }}>
                        "Land is not property — it is relation."
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div style={{
                height: 1,
                background: `linear-gradient(90deg, ${accentColor}40, transparent)`,
                marginBottom: '2rem',
                transition: 'background 0.4s ease',
              }} />

              {/* ── CONTENT ITEMS ── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {activeContent.content.map((item, index) => (
                  <div
                    key={`${activeTab}-${index}`}
                    className="item-card item-enter"
                    style={{
                      borderLeftColor: index === 0 ? accentColor : `${accentColor}55`,
                      paddingLeft: '1.25rem',
                      paddingTop: '0.25rem',
                      paddingBottom: '0.25rem',
                      animationDelay: `${index * 70}ms`,
                    }}
                  >
                    <h4 style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: '1.2rem',
                      color: '#f5f0e8',
                      marginBottom: '0.4rem',
                      display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                      <ChevronRight size={14} color={accentColor} style={{ flexShrink: 0 }} />
                      {item.title}
                    </h4>
                    <p style={{
                      fontFamily: 'sans-serif',
                      color: 'rgba(245,240,232,0.72)',
                      lineHeight: 1.75,
                      fontSize: '0.93rem',
                      margin: 0,
                    }}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── CLOSING QUOTE ── */}
          <div style={{ marginTop: '4rem', textAlign: 'center' }}>
            <div style={{
              width: 48, height: 1,
              background: `linear-gradient(90deg, transparent, ${accentColor}60, transparent)`,
              margin: '0 auto 2rem',
            }} />
            <p style={{
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              color: accentColor,
              maxWidth: 700,
              margin: '0 auto 1rem',
              lineHeight: 1.65,
              transition: 'color 0.4s ease',
            }}>
              "Survival is not passive. It is an act of defiance — choosing to carry forward what they tried to destroy."
            </p>
            <p style={{
              fontFamily: 'sans-serif', fontSize: '0.75rem',
              color: 'rgba(245,240,232,0.35)',
              letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>
              Sixties Scoop Survivors
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
