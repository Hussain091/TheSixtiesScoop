import { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Shield, Heart, Sparkles, TrendingUp, ChevronRight } from 'lucide-react';

const fourRs = [
  {
    id: 'resistance',
    title: 'Resistance',
    icon: Shield,
    image: {
      src: 'https://afgj.org/wp-content/uploads/2022/11/SIERRA-AP_17069643612157-WB.jpeg',
      alt: 'Raised fist — symbol of resistance and community solidarity',
      caption: 'Standing together — the power of collective resistance',
    },
    definition: {
      short: 'It means to protect what is sacred.',
      full: 'In the Indigenous perspective, Resistance is not just opposition rather it is the active defence of who you are. For example the ties between people, land, language, and spirit. For Sixties Scoop survivors and their communities, resistance meant refusing to let the colonial state define who they were. ',
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
    image: {
      src: 'https://worldbank.scene7.com/is/image/worldbankprod/Screenshot-2024-08-08-20181199?wid=780&hei=439&qlt=85,0&resMode=sharp',
      alt: 'Light breaking through forest trees — resilience through darkness',
      caption: 'Light finds a way through — as people always have',
    },
    definition: {
      short: 'In short is the capacity to withstand or to recover quickly from difficulties.',
      full: 'Resilience for Indigenous People in Canada is the ability to survive and go forward despite facing years of colonization, oppression, and systemic barriers. For Indigenous People in Canada, resilience means refusing to disappear, holding onto their culture and language even when the law said you could not. Through an anti-discriminatory lens, resilience adds a new perspective. Indigenous People are not defined by what happened to them but instead are defined by the fact that they kept going forward. Resilience is not a personality trait but a choice they made for hundreds of years and colonial pressure could not take that away despite how hard they tried. ',
    },
    content: [
      {
        title: 'Rebuilding Identity',
        text: 'Indigenous Survivors rebuilt their identities that were systematically destroyed. Christine Smith went from being a ward of the state to publishing memoirs and editing anthologies of survivor voices.',
      },
      {
        title: 'Teaching the Next Generation',
        text: 'Rolanda Murphy McPhee is now a teacher and army reservist who shares her story with young people. She turned her pain into a method of teaching making sure the next generation knows what happened.',
      },
      {
        title: 'Reframing the Narrative',
        text: 'David Mortimer writes: "I survived Canada\'s child welfare system and its failed Sixties Scoop policy" this frames survival as strength, not victimhood.',
      
      {
        title: 'Cultural Reconnection as Healing',
        text: 'Many survivors describe reconnection with culture as literally life-saving. Resilience is not just enduring trauma but it is choosing to live fully despite it, and working to overcome it.',
      },
    ],
  },
  {
    id: 'reclamation',
    title: 'Reclamation',
    icon: Sparkles,
    image: {
      src: 'https://images.seattletimes.com/wp-content/uploads/2022/09/09272022_10-A1-Revisited-Historical_211228.jpg?d=1536x1279',
      alt: 'Hands holding earth — reclamation of land and identity',
      caption: '"Land is not property — it is relation."',
    },
    definition: {
      short: 'To take back what was never truly lost.',
      full: 'Reclamation from an Indigenous perspective, means taking back what was taken like their land, culture, language, and identity, and essentially restoring them so future generations can live with pride and connection to their roots. It\'s about healing from the harm caused by colonization, rebuilding traditions that were disrupted, and reclaiming the right to make decisions for their own communities.',
    },
    content: [
      {
        title: 'Coming Home',
        text: 'Survivors returning back to their communities, learning languages, reconnecting with Elders and ceremonies basically reclaiming everything that was stolen.',
      },
      {
        title: 'Bill C-92',
        text: 'The 2019 Act Respecting First Nations, Inuit, and Métis Children, Youth, and Families gives Indigenous communities legal control over their own child welfare for the first time.',
      },
      {
        title: 'Reclaiming Names and Status',
        text: 'Survivors are reclaiming birth names, Indian status, and community membership. Legal recognition of who they always were.',
      },
      {
        title: 'Survivor-Led Healing',
        text: 'The National Sixties Scoop Healing Foundation supports cultural reclamation and family reunion, building structures that serve the community on the community\'s own terms.',
      },
      {
        title: 'Mapping the Diaspora',
        text: 'The "In Our Own Words: Mapping the Sixties Scoop Diaspora" project by the 60s Scoop Network lets survivors map their displacement and reclaim their own story. This helps visualize 22,500+ children\'s journeys.',
      },
    ],
  },
  {
    id: 'resurgence',
    title: 'Resurgence',
    icon: TrendingUp,
    image: {
      src: 'https://imgproxy.gridwork.co/DHDG4NIqndqPOnLulxfi-DSqAZsEpEDA68LSWX-mt8U/w:1600/h:1067/rt:fill/g:fp:0.5:0.5/q:82/el:1/aHR0cHM6Ly9zMy51cy1lYXN0LTIuYW1hem9uYXdzLmNvbS9pdHQtaW1hZ2VzL0lOTS0zNi5qcGc.jpg',
      alt: 'Indigenous elder and youth — intergenerational knowledge sharing',
      caption: 'Carrying knowledge forward — elder to youth',
    },
    definition: {
      short: 'In short means a growth or increase that occurs after a period without growth or increase.',
      full: 'In the Indigenous perspective resurgence is about reconnecting with the land, language, governance, and information that have always been part of Indigenous life. It is not about looking back, but about actively rejecting the ongoing effects of colonialism today. For survivors of the Sixties Scoop, resurgence means creating a future on their own terms by building communities, art, and knowledge systems that reflect their identity and answer to their people, not the government.',
    },
    content: [
      {
        title: 'Land-Based Healing',
        text: 'Indigenous led healing programs like "Healing on the Land with Horses" in Saskatchewan connect survivors to land and culture. Healing happens in relationship to the land.',
      },
      {
        title: 'Telling Our Own Stories',
        text: 'Jennifer Podemski (Anishnabe/Ashkenazi), award-winning showrunner, created the TV series Little Bird about a Sixties Scoop survivor. The show told the story from an Indigenous perspective to a national audience.',
      },
      {
        title: 'Survivor-Led Institutions',
        text: 'The Sixties Scoop Healing Foundation (2020) is survivor-led, Inuit/First Nations/Métis/status/non-status inclusive, and fully independent building institutions that serve the community.',
      },
      {
        title: 'Anthology as Resistance',
        text: 'Survivors like Christine Smith editing anthologies like Silence to Strength (2022) so that the community can tell its own story.',
      },
      {
        title: 'Language Revitalization',
        text: 'Language revitalization programs like Rolanda learning Ojibway, schools teaching Indigenous languages, survivors reconnecting with oral traditions. Resurgence is not going back but it is carrying forward and regaining what was lost.',
      },
    ],
  },
];

const tabColors = {
  resistance: '#b85c2a',
  resilience: '#c8873a',
  reclamation: '#a0753a',
  resurgence: '#d4963f',
};

export default function FourRsSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.15 });
  const [activeTab, setActiveTab] = useState('resistance');
  const [animating, setAnimating] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});

  const activeContent = fourRs.find((r) => r.id === activeTab);
  const accentColor = tabColors[activeTab];

  const switchTab = (id) => {
    if (id === activeTab || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveTab(id);
      setAnimating(false);
    }, 220);
  };

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
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
        @keyframes glowPulse {
          0%,100% { opacity: 0.4; }
          50%      { opacity: 0.9; }
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
        .section-enter { animation: fadeUpIn 0.9s cubic-bezier(0.16,1,0.3,1) both; }

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

        .glow-dot { animation: glowPulse 2.5s ease-in-out infinite; }
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
        {/* Dot grid background */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(200,135,58,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px', zIndex: 0,
        }} />

        {/* Ambient glow */}
        <div style={{
          position: 'absolute', top: '20%', left: '50%',
          transform: 'translateX(-50%)',
          width: '60vw', height: '40vh',
          background: `radial-gradient(ellipse, ${accentColor}18 0%, transparent 70%)`,
          transition: 'background 0.6s ease',
          pointerEvents: 'none', zIndex: 0,
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* HEADER */}
          <div className="section-enter" style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
              <span className="glow-dot" style={{
                width: 8, height: 8, borderRadius: '50%',
                background: accentColor, display: 'inline-block',
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
              The 4Rs follow Indigenous philosophy which describe how communities responded to the Sixties Scoop
              and continue to shape the path forward.
            </p>
          </div>

          {/* TAB BUTTONS */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '0.75rem',
            justifyContent: 'center', marginBottom: '2.5rem', marginTop: '3rem',
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
                    border: isActive ? `1px solid ${color}60` : '1px solid rgba(160,82,45,0.2)',
                    background: isActive ? `${color}22` : 'rgba(26,22,18,0.6)',
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

          {/* MAIN CONTENT PANEL */}
          {activeContent && (
            <div
              className={animating ? 'panel-exit' : 'panel-enter'}
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
              {/* Panel header: text left, image right */}
              <div style={{
                display: 'flex', alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '2rem',
                marginBottom: '2.5rem',
                flexWrap: 'wrap',
              }}>
                {/* Left: title + definition */}
                <div style={{ flex: 1, minWidth: 240 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: '1rem' }}>
                    {(() => { const Icon = activeContent.icon; return <Icon color={accentColor} size={32} style={{ flexShrink: 0 }} />; })()}
                    <h3 style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: 'clamp(2rem, 4vw, 3rem)',
                      color: '#f5f0e8',
                      lineHeight: 1, margin: 0,
                    }}>
                      {activeContent.title}
                    </h3>
                  </div>

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

                {/* Right: image — present for every tab */}
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
                    key={activeContent.id}
                    src={activeContent.image.src}
                    alt={activeContent.image.alt}
                    onLoad={() => handleImageLoad(activeContent.id)}
                    style={{
                      width: '100%', display: 'block',
                      filter: 'sepia(25%) contrast(1.06) brightness(0.82)',
                      opacity: loadedImages[activeContent.id] ? 1 : 0,
                      transition: 'opacity 0.8s ease',
                    }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, transparent 50%, rgba(26,22,18,0.85) 100%)',
                  }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0.9rem' }}>
                    <p style={{
                      fontFamily: 'Georgia, serif',
                      fontStyle: 'italic',
                      fontSize: '0.72rem',
                      color: 'rgba(245,240,232,0.65)',
                      margin: 0, lineHeight: 1.4,
                    }}>
                      {activeContent.image.caption}
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div style={{
                height: 1,
                background: `linear-gradient(90deg, ${accentColor}40, transparent)`,
                marginBottom: '2rem',
                transition: 'background 0.4s ease',
              }} />

              {/* Content items */}
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

          {/* Closing quote */}
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
              "Survival is not passive but an act of defiance, choosing to carry forward what they tried to destroy."
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
