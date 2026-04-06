import { useState, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ChevronLeft, ChevronRight, Quote, Eye } from 'lucide-react';

const testimonies = [
  {
    name: 'Christine Miskonoodinkwe Smith',
    nation: 'Saulteaux, Peguis First Nation',
    year: '2021',
    initials: 'CM',
    tags: ['Memoir', 'Reclamation', 'Education'],
    story:
      'She was taken as a child and placed in the child welfare system. In her 2021 memoir These Are the Stories: Memories of a 60s Scoop Survivor, she describes moving through the system, losing connection to her birth mother, and eventually reconnecting before her mother died. She wrote that reconnection allowed her to finally feel "complete, whole, and home." She has since published two books, earned a Master\'s in Education in Social Justice, and edits anthologies of survivor voices. Her work is an act of reclamation and resurgence.',
    // Timeline of key life moments
    timeline: [
      { phase: 'Taken', label: 'Removed from family as a child' },
      { phase: 'Lost', label: 'Lost connection to birth mother' },
      { phase: 'Reconnected', label: 'Reunited before her mother's passing' },
      { phase: 'Reclaimed', label: 'Master's in Education, author, editor' },
    ],
    analysis: {
      impact: 'Christine\'s story illustrates the long-term psychological violence of the Sixties Scoop — the severing of the mother-child bond, one of the most fundamental human relationships. The colonial system treated her as a problem to be managed, not a person to be loved.',
      lens: 'Through an anti-oppressive lens, Christine\'s journey from ward of the state to published author and educator is not a story of "success despite the odds" — it is a story of survival under conditions the state created. Her academic work on social justice is also an indictment: she now teaches the system about its own harm. Her editing of survivor anthologies directly transfers narrative power back to those the state tried to silence. This is what self-determination looks like in practice.',
    },
  },
  {
    name: 'Christine',
    nation: 'Anishnaabe, Winnipeg',
    year: '2020',
    initials: 'CH',
    tags: ['Adoption', 'Abuse', 'Identity'],
    story:
      '"I am a Sixties Scoop survivor, a Bill C-31 status Anishnaabe woman and a daughter of a Saulteaux mother and a Cree father. I was born in Winnipeg more than 40 years ago... child welfare officials from the city stepped in and took me and three other siblings away from her. When I was 3 years old, my sister and I were adopted together into an affluent Caucasian family and brought to live in Ontario. My childhood was not happy. In fact, it was rather traumatic and has left searing emotional scars on me to this day. My adoptive home was fraught with many emotional, physical, mental and spiritual abuses... I was treated like a prisoner."',
    timeline: [
      { phase: 'Born', label: 'Winnipeg, Anishnaabe family' },
      { phase: 'Taken', label: 'Removed at age 3 with sister' },
      { phase: 'Placed', label: 'Adopted into affluent Ontario household' },
      { phase: 'Harmed', label: 'Years of abuse — emotional, physical, spiritual' },
    ],
    analysis: {
      impact: 'Christine\'s account exposes one of the most devastating myths of the Sixties Scoop: that placement with a wealthier, white family was an act of "care." The state used class and race as proxies for fitness — assuming that an affluent white home was inherently better than an Indigenous one. That assumption was wrong, and children paid the price.',
      lens: 'Anti-oppressive practice demands we name what happened here: this was a system built on anti-Indigenous racism and white paternalism. The state did not intervene because Christine\'s family was unsafe — it intervened because her family was Indigenous. Her use of Bill C-31 status language also matters: it reflects the ongoing bureaucratic dehumanization of Indigenous identity, where belonging to a Nation is reduced to a legislative category. Her testimony is not just personal — it is political.',
    },
  },
  {
    name: 'Tauni Sheldon',
    nation: 'Inuit, taken 1970',
    year: '2023',
    initials: 'TS',
    tags: ['Racism', 'Identity Loss', 'Reunion'],
    story:
      'Taken from her birth mother three hours after birth. Advertised in the Toronto Telegram as an "Eskimo Baby" — the ad described her like a product. Adopted by a white family in southern Ontario. First saw her biological mother at age 23 at the Winnipeg airport. Describes experiencing severe racism growing up, rejecting her own identity, and years of anger: "I experienced a lot of racism... I didn\'t want to be who I was." She has since worked to rebuild the relationship with her biological mother.',
    timeline: [
      { phase: 'Birth', label: 'Removed 3 hours after birth' },
      { phase: 'Advertised', label: 'Listed in newspaper as "Eskimo Baby"' },
      { phase: 'Displaced', label: 'Grew up in southern Ontario, experiencing racism' },
      { phase: 'Reunion', label: 'Met birth mother at 23 in Winnipeg' },
    ],
    analysis: {
      impact: 'Tauni\'s story is one of the most viscerally dehumanizing in the public record. Being advertised in a newspaper like a commodity — described by ethnicity, as a product available for adoption — is not metaphor. It is exactly what happened. The child welfare system functioned, in this instance, as a marketplace.',
      lens: 'An anti-oppressive reading of Tauni\'s experience must center commodification: Indigenous children were treated as resources to be redistributed to white families. This reflects a colonial logic in which Indigenous bodies and lives are considered available for extraction. The internalized racism she describes — "I didn\'t want to be who I was" — is the intended outcome of cultural erasure. Identity destruction was not a side effect of the Sixties Scoop. It was the point.',
    },
  },
  {
    name: 'David Mortimer',
    nation: 'Winnipeg',
    year: '2026',
    initials: 'DM',
    tags: ['Hidden Truth', 'DNA', 'Reconciliation'],
    story:
      'Did not know he was adopted or that he was a Sixties Scoop survivor until his sister made a DNA connection through his son. He was taken in 1969. His birth mother Linda had searched for him for over 50 years, having been told he died at birth. He writes: "Everything I had believed to be true in my life was now in question — my name, my family, my heritage. Processing this information was amongst the hardest things I have ever endured." He says reconciliation "is hard and it is personal. It requires vulnerability to accept truths that are difficult to understand and even harder to process."',
    timeline: [
      { phase: 'Taken', label: 'Removed in 1969, mother told he died' },
      { phase: 'Hidden', label: 'Lived unaware of adoption for decades' },
      { phase: 'Discovered', label: 'DNA test revealed truth through his son' },
      { phase: 'Processing', label: 'Rebuilding identity, engaging reconciliation' },
    ],
    analysis: {
      impact: 'David\'s case reveals how deeply the colonial state embedded deception into the Sixties Scoop. His birth mother was told he died. He was told nothing. Both were denied the truth of each other\'s existence — and that erasure persisted for more than fifty years. This is not bureaucratic error. It is deliberate severance.',
      lens: 'Through an anti-oppressive lens, David\'s story challenges us to look beyond the individual trauma and see the systemic architecture of lies. The state actively prevented Indigenous mothers from searching for their children and gave adoptees false identities. His reflection that reconciliation "requires vulnerability" is profound — but we must also ask: vulnerable to what? To the truth that the state was an active agent of harm. His journey is a case study in what it costs individuals when institutions refuse accountability.',
    },
  },
  {
    name: 'Rolanda Murphy-McPhee',
    nation: 'Ojibway, taken at 8 months old',
    year: '2022',
    initials: 'RM',
    tags: ['Language', 'Teaching', 'Community'],
    story:
      'She and her two-year-old sister Kati were taken from their birth family. She did not learn about her Indigenous heritage until much later in life. She is now a teacher at the Pearson Electrotechnology Centre, an army reservist, a cadet officer, and an artist. She works with youth aged 12–18 and shares her story publicly. She holds an eagle feather gifted by former Chief Donovan Fontaine for her efforts to reconnect with her community. She is learning Ojibway, her language. She says: "Education is key. People need to hear the stories."',
    timeline: [
      { phase: 'Taken', label: 'Removed at 8 months with sister Kati' },
      { phase: 'Disconnected', label: 'Grew up unaware of Indigenous heritage' },
      { phase: 'Reconnected', label: 'Honoured with eagle feather by Chief Fontaine' },
      { phase: 'Teaching', label: 'Educator, artist, language learner, community builder' },
    ],
    analysis: {
      impact: 'Rolanda\'s story demonstrates the intergenerational dimension of the Sixties Scoop: taken at 8 months, she had no conscious memory of family, land, or language to hold onto. Her reconnection had to be built from nothing — not recovered, but re-learned. The eagle feather she was gifted is significant: it represents recognition from the community she was stolen from, welcoming her back.',
      lens: 'An anti-oppressive framework sees Rolanda not as an exceptional individual who "overcame" her circumstances, but as evidence of what communities lose when children are taken. Every student she teaches, every time she speaks Ojibway, every piece of art she creates — these are acts of repair that the state made necessary. Her statement that "education is key" inverts the colonial logic: the same system that used schooling to erase Indigenous identity is now being asked to teach its history of harm. Survivors like Rolanda are leading that work.',
    },
  },
];

export default function TestimoniesSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.15 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState('next');
  const [showTimeline, setShowTimeline] = useState(false);
  const [analysisVisible, setAnalysisVisible] = useState(false);

  const current = testimonies[currentIndex];

  const go = (dir) => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setShowTimeline(false);
    setAnalysisVisible(false);
    setTimeout(() => {
      if (dir === 'next') setCurrentIndex((p) => (p + 1) % testimonies.length);
      else setCurrentIndex((p) => (p - 1 + testimonies.length) % testimonies.length);
      setAnimating(false);
    }, 280);
  };

  const goTo = (i) => {
    if (i === currentIndex || animating) return;
    setDirection(i > currentIndex ? 'next' : 'prev');
    setAnimating(true);
    setShowTimeline(false);
    setAnalysisVisible(false);
    setTimeout(() => { setCurrentIndex(i); setAnimating(false); }, 280);
  };

  // Auto-reveal analysis after a moment on each card
  useEffect(() => {
    const t = setTimeout(() => setAnalysisVisible(true), 600);
    return () => clearTimeout(t);
  }, [currentIndex]);

  return (
    <>
      <style>{`
        @keyframes slideInNext {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInPrev {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOut {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; }
        }
        @keyframes fadeUpStagger {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes timelineGrow {
          from { width: 0; }
          to   { width: 100%; }
        }
        @keyframes dotPop {
          0%   { transform: scale(0); }
          70%  { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        @keyframes glowPulse {
          0%,100% { opacity: 0.35; }
          50%      { opacity: 0.8; }
        }
        @keyframes quoteFloat {
          0%,100% { transform: translateY(0) rotate(-4deg); }
          50%      { transform: translateY(-6px) rotate(-4deg); }
        }
        @keyframes analysisReveal {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes borderPulse {
          0%,100% { border-color: rgba(200,135,58,0.2); }
          50%      { border-color: rgba(200,135,58,0.5); }
        }
        @keyframes shimmerSlide {
          from { transform: translateX(-100%); }
          to   { transform: translateX(100%); }
        }

        .card-next { animation: slideInNext 0.32s cubic-bezier(0.16,1,0.3,1) both; }
        .card-prev { animation: slideInPrev 0.32s cubic-bezier(0.16,1,0.3,1) both; }
        .card-out  { animation: slideOut 0.25s ease both; }

        .timeline-bar { animation: timelineGrow 0.8s cubic-bezier(0.16,1,0.3,1) both; }
        .dot-pop      { animation: dotPop 0.4s cubic-bezier(0.34,1.56,0.64,1) both; }
        .quote-float  { animation: quoteFloat 5s ease-in-out infinite; }
        .glow-pulse   { animation: glowPulse 3s ease-in-out infinite; }
        .analysis-in  { animation: analysisReveal 0.6s cubic-bezier(0.16,1,0.3,1) both; }

        .tag-chip {
          display: inline-flex;
          align-items: center;
          padding: 0.2rem 0.65rem;
          border-radius: 999px;
          font-family: sans-serif;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border: 1px solid rgba(200,135,58,0.3);
          color: rgba(200,135,58,0.85);
          background: rgba(200,135,58,0.08);
        }

        .nav-btn {
          display: flex; align-items: center; gap: 6px;
          background: transparent;
          border: 1px solid rgba(200,135,58,0.2);
          border-radius: 8px;
          padding: 0.5rem 1rem;
          color: rgba(245,240,232,0.6);
          font-family: sans-serif;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .nav-btn:hover {
          border-color: rgba(200,135,58,0.5);
          color: #c8873a;
          background: rgba(200,135,58,0.06);
        }

        .toggle-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent;
          border: 1px solid rgba(200,135,58,0.25);
          border-radius: 6px;
          padding: 0.4rem 0.9rem;
          color: rgba(200,135,58,0.75);
          font-family: sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .toggle-btn:hover, .toggle-btn.active {
          background: rgba(200,135,58,0.12);
          border-color: rgba(200,135,58,0.5);
          color: #c8873a;
        }

        .analysis-card {
          position: relative;
          overflow: hidden;
        }
        .analysis-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(200,135,58,0.4), transparent);
        }
        .analysis-card .shimmer {
          position: absolute;
          top: 0; bottom: 0;
          width: 60%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.02), transparent);
          animation: shimmerSlide 3s ease-in-out infinite;
          pointer-events: none;
        }
      `}</style>

      <section
        id="testimonies"
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
        {/* Background elements */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(200,135,58,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />
        <div
          className="glow-pulse"
          style={{
            position: 'absolute', top: '10%', left: '-10%',
            width: '50vw', height: '50vh',
            background: 'radial-gradient(ellipse, rgba(160,82,45,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          className="glow-pulse"
          style={{
            position: 'absolute', bottom: '10%', right: '-10%',
            width: '40vw', height: '40vh',
            background: 'radial-gradient(ellipse, rgba(200,135,58,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
            animationDelay: '1.5s',
          }}
        />

        {/* Floating large quote mark */}
        <div
          className="quote-float"
          style={{
            position: 'absolute', top: '6rem', right: '4rem',
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(8rem, 15vw, 16rem)',
            color: 'rgba(200,135,58,0.04)',
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          "
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* HEADER */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              marginBottom: '1.25rem',
            }}>
              <div style={{ width: 32, height: 1, background: '#c8873a', opacity: 0.5 }} />
              <span style={{
                fontFamily: 'sans-serif', fontSize: '0.68rem',
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: '#c8873a', fontWeight: 600, opacity: 0.8,
              }}>
                Their Words. Their Truth.
              </span>
              <div style={{ width: 32, height: 1, background: '#c8873a', opacity: 0.5 }} />
            </div>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(2.6rem, 6vw, 5rem)',
              color: '#f5f0e8',
              marginBottom: '1.25rem',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
            }}>
              Survivor Testimonies
            </h2>
            <div style={{
              width: 60, height: 2,
              background: 'linear-gradient(90deg, transparent, #c8873a, transparent)',
              margin: '0 auto 1.5rem',
            }} />
            <p style={{
              fontFamily: 'sans-serif', fontSize: '1.05rem',
              color: 'rgba(245,240,232,0.58)',
              maxWidth: 520, margin: '0 auto',
              lineHeight: 1.7,
            }}>
              These are not statistics. These are people. These are lives. These stories matter.
            </p>
          </div>

          {/* PROGRESS BAR */}
          <div style={{
            display: 'flex', gap: 4, marginBottom: '2rem', justifyContent: 'center',
          }}>
            {testimonies.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  height: 3,
                  width: i === currentIndex ? 48 : 16,
                  borderRadius: 2,
                  background: i === currentIndex ? '#c8873a' : 'rgba(200,135,58,0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0,
                }}
                aria-label={`Go to testimony ${i + 1}`}
              />
            ))}
          </div>

          {/* MAIN CARD */}
          <div
            className={animating ? 'card-out' : direction === 'next' ? 'card-next' : 'card-prev'}
            style={{
              background: 'rgba(22,18,14,0.85)',
              border: '1px solid rgba(200,135,58,0.18)',
              borderRadius: 16,
              overflow: 'hidden',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
              marginBottom: '2rem',
            }}
          >
            {/* Card top bar */}
            <div style={{
              height: 3,
              background: `linear-gradient(90deg, #b85c2a, #d4963f, #b85c2a)`,
              backgroundSize: '200% 100%',
              animation: 'shimmerSlide 3s linear infinite',
            }} />

            <div style={{ padding: 'clamp(1.5rem, 4vw, 3rem)' }}>
              {/* Person header */}
              <div style={{
                display: 'flex', alignItems: 'flex-start',
                gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap',
              }}>
                {/* Avatar */}
                <div style={{
                  width: 72, height: 72, flexShrink: 0,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(184,92,42,0.4), rgba(212,150,63,0.2))',
                  border: '2px solid rgba(200,135,58,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 20px rgba(200,135,58,0.1)',
                }}>
                  <span style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '1.4rem',
                    color: '#c8873a',
                    fontWeight: 700,
                  }}>
                    {current.initials}
                  </span>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: '0.3rem' }}>
                    <h3 style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                      color: '#f5f0e8',
                      margin: 0,
                    }}>
                      {current.name}
                    </h3>
                  </div>
                  <p style={{
                    fontFamily: 'sans-serif', fontSize: '0.9rem',
                    color: '#c8873a', margin: '0 0 0.25rem',
                  }}>
                    {current.nation}
                  </p>
                  <p style={{
                    fontFamily: 'sans-serif', fontSize: '0.72rem',
                    color: 'rgba(245,240,232,0.35)', margin: '0 0 0.75rem',
                    letterSpacing: '0.05em',
                  }}>
                    Source: {current.year}
                  </p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {current.tags.map((tag) => (
                      <span key={tag} className="tag-chip">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Toggle timeline button */}
                <button
                  className={`toggle-btn ${showTimeline ? 'active' : ''}`}
                  onClick={() => setShowTimeline((p) => !p)}
                >
                  <Eye size={13} />
                  {showTimeline ? 'Hide Journey' : 'View Journey'}
                </button>
              </div>

              {/* TIMELINE (collapsible) */}
              {showTimeline && (
                <div style={{
                  marginBottom: '2rem',
                  padding: '1.25rem 1.5rem',
                  background: 'rgba(200,135,58,0.05)',
                  border: '1px solid rgba(200,135,58,0.15)',
                  borderRadius: 10,
                  animation: 'fadeUpStagger 0.4s ease both',
                }}>
                  <p style={{
                    fontFamily: 'sans-serif', fontSize: '0.68rem',
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'rgba(200,135,58,0.6)', marginBottom: '1.25rem',
                  }}>
                    Life Journey
                  </p>
                  <div style={{ position: 'relative' }}>
                    {/* Connecting line */}
                    <div style={{
                      position: 'absolute',
                      top: 10, left: 9,
                      width: 1,
                      height: `calc(100% - 20px)`,
                      background: 'linear-gradient(180deg, #c8873a, rgba(200,135,58,0.1))',
                    }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                      {current.timeline.map((step, i) => (
                        <div
                          key={i}
                          className="dot-pop"
                          style={{
                            display: 'flex', alignItems: 'flex-start', gap: '1rem',
                            animationDelay: `${i * 100}ms`,
                          }}
                        >
                          <div style={{
                            width: 20, height: 20, flexShrink: 0,
                            borderRadius: '50%',
                            background: i === 0
                              ? '#b85c2a'
                              : i === current.timeline.length - 1
                                ? '#d4963f'
                                : 'rgba(200,135,58,0.3)',
                            border: '2px solid rgba(200,135,58,0.4)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            {i === current.timeline.length - 1 && (
                              <div style={{
                                width: 6, height: 6,
                                borderRadius: '50%', background: '#f5f0e8',
                              }} />
                            )}
                          </div>
                          <div>
                            <span style={{
                              fontFamily: 'sans-serif', fontSize: '0.68rem',
                              fontWeight: 700, letterSpacing: '0.1em',
                              textTransform: 'uppercase', color: '#c8873a',
                              display: 'block', marginBottom: 2,
                            }}>
                              {step.phase}
                            </span>
                            <span style={{
                              fontFamily: 'sans-serif', fontSize: '0.85rem',
                              color: 'rgba(245,240,232,0.65)', lineHeight: 1.4,
                            }}>
                              {step.label}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STORY */}
              <div style={{ position: 'relative', marginBottom: '2rem' }}>
                <Quote
                  size={28}
                  color="rgba(200,135,58,0.2)"
                  style={{ position: 'absolute', top: -8, left: -4, flexShrink: 0 }}
                />
                <p style={{
                  fontFamily: 'Georgia, serif',
                  fontStyle: 'italic',
                  fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
                  color: 'rgba(245,240,232,0.82)',
                  lineHeight: 1.85,
                  paddingLeft: '1.5rem',
                  margin: 0,
                }}>
                  {current.story}
                </p>
              </div>

              {/* NAVIGATION */}
              <div style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(245,240,232,0.07)',
              }}>
                <button className="nav-btn" onClick={() => go('prev')}>
                  <ChevronLeft size={15} />
                  Previous
                </button>
                <span style={{
                  fontFamily: 'sans-serif', fontSize: '0.72rem',
                  color: 'rgba(245,240,232,0.3)',
                  letterSpacing: '0.1em',
                }}>
                  {currentIndex + 1} / {testimonies.length}
                </span>
                <button className="nav-btn" onClick={() => go('next')}>
                  Next
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* ANALYSIS SECTION */}
          {analysisVisible && (
            <div
              className="analysis-card analysis-in"
              style={{
                background: 'rgba(16,12,10,0.9)',
                border: '1px solid rgba(200,135,58,0.15)',
                borderRadius: 14,
                overflow: 'hidden',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div className="shimmer" />

              {/* Two-column analysis */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 0,
              }}>
                {/* Impact */}
                <div style={{
                  padding: 'clamp(1.25rem, 3vw, 2.25rem)',
                  borderRight: '1px solid rgba(200,135,58,0.1)',
                }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    marginBottom: '1rem',
                  }}>
                    <div style={{
                      width: 24, height: 24,
                      borderRadius: '50%',
                      background: 'rgba(184,92,42,0.2)',
                      border: '1px solid rgba(184,92,42,0.4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#b85c2a' }} />
                    </div>
                    <span style={{
                      fontFamily: 'sans-serif', fontSize: '0.65rem',
                      letterSpacing: '0.2em', textTransform: 'uppercase',
                      color: '#b85c2a', fontWeight: 700,
                    }}>
                      Historical Impact
                    </span>
                  </div>
                  <p style={{
                    fontFamily: 'sans-serif',
                    fontSize: '0.88rem',
                    color: 'rgba(245,240,232,0.62)',
                    lineHeight: 1.8,
                    margin: 0,
                  }}>
                    {current.analysis.impact}
                  </p>
                </div>

                {/* Anti-oppressive lens */}
                <div style={{ padding: 'clamp(1.25rem, 3vw, 2.25rem)' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    marginBottom: '1rem',
                  }}>
                    <div style={{
                      width: 24, height: 24,
                      borderRadius: '50%',
                      background: 'rgba(212,150,63,0.2)',
                      border: '1px solid rgba(212,150,63,0.4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#d4963f' }} />
                    </div>
                    <span style={{
                      fontFamily: 'sans-serif', fontSize: '0.65rem',
                      letterSpacing: '0.2em', textTransform: 'uppercase',
                      color: '#d4963f', fontWeight: 700,
                    }}>
                      Anti-Oppressive Lens
                    </span>
                  </div>
                  <p style={{
                    fontFamily: 'sans-serif',
                    fontSize: '0.88rem',
                    color: 'rgba(245,240,232,0.62)',
                    lineHeight: 1.8,
                    margin: 0,
                  }}>
                    {current.analysis.lens}
                  </p>
                </div>
              </div>

              {/* Bottom label */}
              <div style={{
                borderTop: '1px solid rgba(200,135,58,0.08)',
                padding: '0.75rem 2rem',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#c8873a', opacity: 0.5,
                }} />
                <span style={{
                  fontFamily: 'sans-serif', fontSize: '0.65rem',
                  color: 'rgba(245,240,232,0.25)',
                  letterSpacing: '0.1em',
                }}>
                  ANALYSIS · CONTEXTUAL FRAMING · ANTI-OPPRESSIVE SOCIAL WORK PERSPECTIVE
                </span>
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
