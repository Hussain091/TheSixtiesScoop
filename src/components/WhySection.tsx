import { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { AlertCircle, RotateCcw, ChevronRight } from 'lucide-react';

// ── Survivor Story Simulator data ────────────────────────────────────────
const story = {
  id: 'start',
  year: '1968',
  text: 'You are six years old. A social worker arrives at your home on the reserve. She does not speak your language. She does not know your family. She decides, in a matter of minutes, that your home is not fit. Your mother is crying. You do not understand what is happening.',
  prompt: 'What happens next?',
  choices: [
    { label: 'Adopted into a non-Indigenous home far away', next: 'adopted' },
    { label: 'Placed in the foster care system', next: 'foster' },
  ],
};

const nodes = {
  adopted: {
    year: '1969',
    text: 'You are flown to a city you have never seen. A white family you have never met is now your family. They are not cruel. But they do not know your Nation, your language, or your ceremonies. You are told your name is something else now. When you ask about your real family, you are told not to worry about that.',
    prompt: 'Years pass. You are now a teenager.',
    choices: [
      { label: 'You try to find out who you are', next: 'adopted_search' },
      { label: 'You try to fit in and forget', next: 'adopted_suppress' },
    ],
  },
  foster: {
    year: '1969',
    text: 'You are placed with a foster family. Then another. Then another. In five years you live in seven homes. Some families are kind. Some are not. You learn quickly that you should not get attached to anything, because it will be taken away. You do not know where your sister is. No one will tell you.',
    prompt: 'You are now twelve years old.',
    choices: [
      { label: 'You run away from the latest placement', next: 'foster_run' },
      { label: 'You stay and try to survive the system', next: 'foster_stay' },
    ],
  },
  adopted_search: {
    year: '1985',
    text: 'You request your birth records. You are told they are sealed. You hire a lawyer. It takes three years, two appeals, and most of your savings. Eventually you receive a document with your original name on it. You are Anishnaabe. Your mother is still alive. She never stopped looking for you. She was told you had been adopted but not where.',
    prompt: 'You make contact with your birth mother.',
    choices: [
      { label: 'You meet her for the first time', next: 'reunion' },
      { label: 'You are not ready yet', next: 'not_ready' },
    ],
  },
  adopted_suppress: {
    year: '1984',
    text: 'You graduate. You get a job. You build a life that looks fine from the outside. But something is always missing and you cannot name it. You look in the mirror and do not recognize the person looking back. You do not know your language. You do not know your community. The system erased that before you were old enough to hold onto it.',
    prompt: 'In your thirties, you hear about the Sixties Scoop settlement.',
    choices: [
      { label: 'You come forward as a survivor', next: 'survivor_comes_forward' },
      { label: 'You stay silent', next: 'silence' },
    ],
  },
  foster_run: {
    year: '1976',
    text: 'You sleep in parks. You find a community of other young people who have also been failed by the system. Many of them are Indigenous. You begin to understand that what happened to you was not random. It was a pattern. A policy. You are angry. That anger, for the first time, makes sense.',
    prompt: 'You connect with an Indigenous community center.',
    choices: [
      { label: 'You begin learning who you are', next: 'identity_found' },
    ],
  },
  foster_stay: {
    year: '1978',
    text: 'You age out of the system at eighteen with nothing. No family support. No savings. No record of where you came from. The government that placed you in care provides no transition support. You are expected to simply begin. You were a ward of the state for twelve years. Now you are on your own.',
    prompt: 'You try to rebuild.',
    choices: [
      { label: 'You search for your family', next: 'late_search' },
    ],
  },
  reunion: {
    year: '1988',
    isEnd: true,
    text: 'You meet your mother at an airport. She is older than you imagined. She holds your face in her hands and says your real name, the one you were born with, for the first time in twenty years. You do not speak each other\'s language. You have a translator. But some things do not need translation. This is one of them. Reconnection does not undo the loss. But it is real. And it is yours.',
    tag: 'Reclamation',
  },
  not_ready: {
    year: '1988',
    isEnd: true,
    text: 'You hold onto the address. You are not ready. Maybe you will be next year. The grief of what was taken is real, and healing does not run on anyone else\'s timeline. You are not less of a survivor for needing more time. Many survivors never get the chance at all. You still have it.',
    tag: 'Ongoing',
  },
  survivor_comes_forward: {
    year: '2017',
    isEnd: true,
    text: 'You join the class-action lawsuit. You give a statement. For the first time, someone official writes down what happened to you and calls it what it was. The settlement is $800 million. Your share will not give you back your childhood, your language, or your mother tongue. But being believed, after all this time, is not nothing.',
    tag: 'Justice',
  },
  silence: {
    year: '2017',
    isEnd: true,
    text: 'You stay silent. Not because you have nothing to say, but because you have spent your whole life being asked to perform your pain for people who did not do anything with it. That is a valid choice. Survival does not require a public statement. Many survivors carry their story privately. That story is still true. It still matters.',
    tag: 'Survival',
  },
  identity_found: {
    year: '1980',
    isEnd: true,
    text: 'You learn your Nation. You learn a few words of your language from an Elder who volunteers at the center. You go to your first ceremony. You do not know all the protocols yet. But you belong there, and somewhere in your body, you have always known that. Resurgence is not a straight line. But it starts somewhere, and it starts here.',
    tag: 'Resurgence',
  },
  late_search: {
    year: '1991',
    isEnd: true,
    text: 'You find your community after years of searching. Your mother passed away two years before you found her. Your younger brother, taken at the same time, was sent to a family in the United States. You eventually connect with him over the phone. You speak for four hours. You have the same laugh. The system tried to make you strangers. It did not fully succeed.',
    tag: 'Resilience',
  },
};

const tagColors = {
  Reclamation: '#c8873a',
  Ongoing: '#a0753a',
  Justice: '#d4963f',
  Survival: '#b85c2a',
  Resurgence: '#c8873a',
  Resilience: '#d4963f',
};

function StorySimulator() {
  const [current, setCurrent] = useState('start');
  const [history, setHistory] = useState([]);
  const [entering, setEntering] = useState(false);

  const node = current === 'start' ? story : nodes[current];
  const isEnd = node.isEnd;

  const choose = (next) => {
    setEntering(true);
    setTimeout(() => {
      setHistory(h => [...h, current]);
      setCurrent(next);
      setEntering(false);
    }, 280);
  };

  const restart = () => {
    setEntering(true);
    setTimeout(() => {
      setCurrent('start');
      setHistory([]);
      setEntering(false);
    }, 280);
  };

  const goBack = () => {
    if (history.length === 0) return;
    setEntering(true);
    setTimeout(() => {
      const prev = history[history.length - 1];
      setHistory(h => h.slice(0, -1));
      setCurrent(prev);
      setEntering(false);
    }, 280);
  };

  const progress = history.length;
  const maxDepth = 3;

  return (
    <div style={{
      background: 'rgba(10,8,6,0.95)',
      border: '1px solid rgba(200,135,58,0.25)',
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)',
    }}>
      {/* Top bar */}
      <div style={{
        padding: '1rem 1.5rem',
        borderBottom: '1px solid rgba(200,135,58,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(20,15,10,0.8)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: '#c8873a',
            animation: 'glowPulse 2s ease-in-out infinite',
          }} />
          <span style={{
            fontFamily: 'sans-serif', fontSize: '0.62rem',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'rgba(200,135,58,0.7)', fontWeight: 700,
          }}>
            Survivor Story Simulator
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {history.length > 0 && (
            <button
              onClick={goBack}
              style={{
                fontFamily: 'sans-serif', fontSize: '0.62rem',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'rgba(245,240,232,0.35)',
                background: 'transparent', border: 'none', cursor: 'pointer',
                padding: '0.25rem 0.5rem',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'rgba(245,240,232,0.7)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(245,240,232,0.35)'; }}
            >
              Back
            </button>
          )}
          <span style={{
            fontFamily: 'sans-serif', fontSize: '0.62rem',
            color: 'rgba(245,240,232,0.25)',
            letterSpacing: '0.08em',
          }}>
            {node.year}
          </span>
        </div>
      </div>

      {/* Progress dots */}
      <div style={{
        padding: '0.75rem 1.5rem 0',
        display: 'flex', gap: 5,
      }}>
        {Array.from({ length: maxDepth }).map((_, i) => (
          <div key={i} style={{
            height: 2, flex: 1, borderRadius: 1,
            background: i < progress
              ? 'linear-gradient(90deg, #b85c2a, #d4963f)'
              : 'rgba(255,255,255,0.07)',
            transition: 'background 0.4s ease',
          }} />
        ))}
      </div>

      {/* Story content */}
      <div
        style={{
          padding: 'clamp(1.5rem, 3vw, 2.5rem)',
          opacity: entering ? 0 : 1,
          transform: entering ? 'translateY(10px)' : 'translateY(0)',
          transition: 'opacity 0.28s ease, transform 0.28s ease',
          minHeight: 260,
        }}
      >
        {/* End tag */}
        {isEnd && node.tag && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '0.25rem 0.75rem',
            background: `${tagColors[node.tag]}15`,
            border: `1px solid ${tagColors[node.tag]}35`,
            borderRadius: 999,
            marginBottom: '1.25rem',
          }}>
            <div style={{
              width: 5, height: 5, borderRadius: '50%',
              background: tagColors[node.tag],
            }} />
            <span style={{
              fontFamily: 'sans-serif', fontSize: '0.6rem',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: tagColors[node.tag], fontWeight: 700,
            }}>
              {node.tag}
            </span>
          </div>
        )}

        {/* Story text */}
        <p style={{
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
          fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
          color: 'rgba(245,240,232,0.82)',
          lineHeight: 1.85,
          marginBottom: isEnd ? '1.5rem' : '2rem',
        }}>
          {node.text}
        </p>

        {/* Prompt */}
        {!isEnd && node.prompt && (
          <p style={{
            fontFamily: 'sans-serif', fontSize: '0.8rem',
            color: '#c8873a', fontWeight: 600,
            letterSpacing: '0.02em',
            marginBottom: '1.25rem',
          }}>
            {node.prompt}
          </p>
        )}

        {/* Choices */}
        {!isEnd && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {(current === 'start' ? story.choices : node.choices || []).map((choice, i) => (
              <button
                key={i}
                onClick={() => choose(choice.next)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: '1rem',
                  padding: '0.9rem 1.1rem',
                  background: 'rgba(200,135,58,0.06)',
                  border: '1px solid rgba(200,135,58,0.18)',
                  borderRadius: 9,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.22s ease',
                  width: '100%',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(200,135,58,0.12)';
                  e.currentTarget.style.borderColor = 'rgba(200,135,58,0.4)';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(200,135,58,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(200,135,58,0.18)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <span style={{
                  fontFamily: 'sans-serif', fontSize: '0.88rem',
                  color: 'rgba(245,240,232,0.78)',
                  lineHeight: 1.45,
                }}>
                  {choice.label}
                </span>
                <ChevronRight size={15} color="rgba(200,135,58,0.5)" style={{ flexShrink: 0 }} />
              </button>
            ))}
          </div>
        )}

        {/* End state note + restart */}
        {isEnd && (
          <>
            <div style={{
              padding: '0.85rem 1rem',
              background: 'rgba(200,135,58,0.06)',
              border: '1px solid rgba(200,135,58,0.15)',
              borderRadius: 8,
              marginBottom: '1.5rem',
            }}>
              <p style={{
                fontFamily: 'sans-serif', fontSize: '0.78rem',
                color: 'rgba(245,240,232,0.45)',
                lineHeight: 1.65, margin: 0, fontStyle: 'italic',
              }}>
                This is one path. There were over 20,000 others. Each story is different. Each loss was real. Each person who survived did so on their own terms.
              </p>
            </div>
            <button
              onClick={restart}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '0.6rem 1.2rem',
                background: 'transparent',
                border: '1px solid rgba(200,135,58,0.3)',
                borderRadius: 8,
                color: 'rgba(200,135,58,0.7)',
                fontFamily: 'sans-serif', fontSize: '0.75rem',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(200,135,58,0.55)';
                e.currentTarget.style.color = '#c8873a';
                e.currentTarget.style.background = 'rgba(200,135,58,0.06)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(200,135,58,0.3)';
                e.currentTarget.style.color = 'rgba(200,135,58,0.7)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <RotateCcw size={13} />
              Read another path
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────
export default function WhySection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <>
      <style>{`
        @keyframes fadeUpIn {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowPulse {
          0%,100% { opacity: 0.3; }
          50%      { opacity: 0.8; }
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
          0%,100% { transform: translateY(0) rotate(-0.5deg); }
          50%      { transform: translateY(-7px) rotate(0.5deg); }
        }
        @keyframes newsFlicker {
          0%,97%,100% { opacity: 1; }
          98%          { opacity: 0.85; }
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

        .info-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .info-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 44px rgba(0,0,0,0.4) !important;
        }

        .newspaper-mock {
          animation: newsFlicker 8s ease-in-out infinite;
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
        id="why"
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
          position: 'absolute', bottom: '10%', left: '-12%',
          width: '42vw', height: '42vw', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(200,135,58,0.07) 0%, transparent 70%)',
          pointerEvents: 'none', animationDelay: '2s',
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* ── HEADER ── */}
          <div className="fade-up-1" style={{ textAlign: 'center', marginBottom: '4rem' }}>
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
                The Real Reason
              </span>
              <div style={{
                width: 40, height: 1, background: 'rgba(200,135,58,0.5)',
                animation: 'lineExpand 0.8s ease 0.2s both', transformOrigin: 'left',
              }} />
            </div>

            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)',
              color: '#f5f0e8',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              marginBottom: '1.25rem',
            }}>
              This Was Not About Child Welfare
            </h2>

            <div style={{
              width: 64, height: 2,
              background: 'linear-gradient(90deg, transparent, #c8873a, transparent)',
              margin: '0 auto 1.5rem',
              animation: 'lineExpand 0.9s ease 0.4s both', transformOrigin: 'center',
            }} />

            <p style={{
              fontFamily: 'sans-serif', fontSize: '1rem',
              color: 'rgba(245,240,232,0.6)',
              maxWidth: 640, margin: '0 auto',
              lineHeight: 1.75,
            }}>
              Poverty caused by the Indian Act and colonial laws was used as justification
              to remove children, creating a circular trap. The government created the
              conditions, then punished families for living in them.
            </p>
          </div>

          {/* ── IMAGE + CARDS BLOCK ── */}
          <div className="fade-up-2" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem',
            alignItems: 'stretch',
          }}>
            {/* Image */}
            <div
              className="img-reveal soft-float"
              style={{
                borderRadius: 12, overflow: 'hidden',
                position: 'relative',
                border: '1px solid rgba(200,135,58,0.18)',
                boxShadow: '0 32px 64px rgba(0,0,0,0.55)',
                minHeight: 280,
              }}
            >
              <img
                src="https://scontent.fyyz1-1.fna.fbcdn.net/v/t1.6435-9/37073146_606525883064443_3001433204981760000_n.png?stp=dst-jpg_tt6&_nc_cat=102&ccb=1-7&_nc_sid=a74216&_nc_ohc=FNRVayF8VbEQ7kNvwFIn_oM&_nc_oc=AdqDjzuwFEtOLJvxE1I-dwAaVQ0vcyuJkrlxKfTk5kJUCQ93jycjKeFguA9tNx2cTS_j6jOGLU-3FRt_7haxXtZO&_nc_zt=23&_nc_ht=scontent.fyyz1-1.fna&_nc_gid=79H8UiOht-LR24rrUkcQEw&_nc_ss=7a3a8&oh=00_Af3_gjyNVDYhRG2pBpYNUzazCzfVM0eFKG_vS2c-IOMl4w&oe=69FD2EF2"
                alt="Bureaucratic paperwork representing the machinery of state removal"
                onLoad={() => setImgLoaded(true)}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', display: 'block',
                  filter: 'sepia(35%) contrast(1.05) brightness(0.72)',
                  opacity: imgLoaded ? 1 : 0,
                  transition: 'opacity 0.8s ease',
                  minHeight: 280,
                }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, transparent 40%, rgba(22,18,14,0.88) 100%)',
              }} />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.25rem',
              }}>
                <p style={{
                  fontFamily: 'Georgia, serif', fontStyle: 'italic',
                  fontSize: '0.8rem', color: 'rgba(245,240,232,0.6)',
                  margin: 0, lineHeight: 1.55,
                }}>
                  "Child removal were approved based on the social worker who
                  was not required to receive any formal, professional training and was often
                  unfamiliar with the complex history of colonialism. (James Sinclair)"
                </p>
              </div>
            </div>

            {/* ── RIGHT COLUMN — three info cards ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

              {/* Card 1 — No Training */}
              <div
                className="info-card"
                style={{
                  background: 'rgba(30,22,14,0.95)',
                  border: '1px solid rgba(200,135,58,0.35)',
                  borderRadius: 12,
                  padding: '1.5rem',
                  boxShadow: '0 8px 28px rgba(0,0,0,0.3)',
                }}
              >
                <div style={{
                  fontFamily: 'sans-serif', fontSize: '0.62rem',
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: '#e8a050', fontWeight: 700, marginBottom: '0.75rem',
                }}>
                  No Training. No Accountability.
                </div>
                <p style={{
                  fontFamily: 'sans-serif', fontSize: '0.88rem',
                  color: '#f0ead8',
                  lineHeight: 1.8, margin: 0,
                }}>
                  Social workers who removed children did not need to understand Indigenous
                  cultures, Nations, or languages. They were not required to understand what
                  colonialism had done to the families, they were just judging. They decided,
                  again and again, that Indigenous homes were not good enough (James Sinclair).
                </p>
              </div>

              {/* Card 2 — Race, Not Abuse */}
              <div
                className="info-card"
                style={{
                  background: 'rgba(30,22,14,0.95)',
                  border: '1px solid rgba(184,92,42,0.35)',
                  borderRadius: 12,
                  padding: '1.5rem',
                  boxShadow: '0 8px 28px rgba(0,0,0,0.3)',
                }}
              >
                <div style={{
                  fontFamily: 'sans-serif', fontSize: '0.62rem',
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: '#d4763a', fontWeight: 700, marginBottom: '0.75rem',
                }}>
                  Race, Not Abuse
                </div>
                <p style={{
                  fontFamily: 'sans-serif', fontSize: '0.88rem',
                  color: '#f0ead8',
                  lineHeight: 1.8, margin: 0,
                }}>
                  Children were not being removed because they were in danger, as most families had
                  not been investigated for abuse. The reasons recorded on file were things like
                  poverty, inadequate housing, and neglect, all conditions that the Indian Act
                  itself had created by stripping communities of land, income, and resources.
                  It was a trap. Many cases they blamed the Indigenous families for abuse when,
                  in reality the colonists families were the ones abusing the children. (Dixon)
                </p>
              </div>

              {/* Card 3 — Sent Across the World */}
              <div
                className="info-card"
                style={{
                  background: 'rgba(30,22,14,0.95)',
                  border: '1px solid rgba(212,150,63,0.35)',
                  borderRadius: 12,
                  padding: '1.5rem',
                  boxShadow: '0 8px 28px rgba(0,0,0,0.3)',
                }}
              >
                <div style={{
                  fontFamily: 'sans-serif', fontSize: '0.62rem',
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: '#d4963f', fontWeight: 700, marginBottom: '0.75rem',
                }}>
                  Sent Across the World
                </div>
                <p style={{
                  fontFamily: 'sans-serif', fontSize: '0.88rem',
                  color: '#f0ead8',
                  lineHeight: 1.8, margin: 0,
                }}>
                  Children were not only placed across Canada. They were sent all around the world, even overseas.
                  In 1981, between 45 and 55 percent of adoptees were placed with American families and many sent to countries including the United Kingdom, Germany, India, the Netherlands, New Zealand, and Botswana, which is far away from their traditional lands.
                  Some children had no idea they were Canadian. (James Sinclair)(Baswan and Yenilmez)
                </p>
                <div style={{ marginTop: '0.85rem', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['USA', 'Canada', 'United Kingdom', 'Germany', 'India', 'Netherlands', 'New Zealand', 'Botswana'].map((c) => (
                    <span key={c} style={{
                      fontFamily: 'sans-serif', fontSize: '0.72rem',
                      fontWeight: 700, letterSpacing: '0.1em',
                      padding: '0.25rem 0.75rem',
                      background: 'rgba(200,135,58,0.18)',
                      border: '1px solid rgba(200,135,58,0.5)',
                      borderRadius: 4,
                      color: '#e8a050',
                    }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* ── AIM NEWSPAPER MOCK ── */}
          <div className="fade-up-3" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem',
            alignItems: 'center',
          }}>
            {/* Explanation */}
            <div>
              <div style={{
                fontFamily: 'sans-serif', fontSize: '0.62rem',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: '#c8873a', fontWeight: 700, marginBottom: '0.75rem',
              }}>
                The AIM Program
              </div>
              <h3 style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                color: '#f5f0e8',
                marginBottom: '1rem', lineHeight: 1.2,
              }}>
                Children Were Advertised Like Products
              </h3>
              <p style={{
                fontFamily: 'sans-serif', fontSize: '0.9rem',
                color: 'rgba(245,240,232,0.7)', lineHeight: 1.8,
                marginBottom: '1rem',
              }}>
                The Adopt Indian and Métis (AIM) program in Saskatchewan ran newspaper ads
                that listed Indigenous children who were available for adoption. These were not
                missing children alerts but were advertisements. The children were described
                by race, age, and temperament as if they were being matched to buyers. On the right is an example of a newspaper ad created by me. This shows how inhumane the AIM program really was. (Stevenson)
              </p>
              <p style={{
                fontFamily: 'sans-serif', fontSize: '0.9rem',
                color: 'rgba(245,240,232,0.7)', lineHeight: 1.8,
              }}>
                The program ran through the 1960s and 1970s and was official government policy.
                It had a name, a budget, and a staff. The children listed in those ads had
                families who did not consent to any of it. (Stevenson)
              </p>
            </div>

            {/* Newspaper mock */}
            <div
              className="newspaper-mock"
              style={{
                background: '#f2ead8',
                borderRadius: 4,
                padding: '1.75rem',
                boxShadow: '0 20px 50px rgba(0,0,0,0.55), 0 0 0 1px rgba(200,135,58,0.2)',
                border: '4px solid rgba(160,115,50,0.25)',
                fontFamily: 'Georgia, serif',
              }}
            >
              <div style={{
                borderBottom: '3px double #2a2015',
                paddingBottom: '0.75rem',
                marginBottom: '0.75rem',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1208', letterSpacing: '-0.02em' }}>
                  The Saskatchewan Star
                </div>
                <div style={{ fontSize: '0.7rem', color: '#4a3a20', fontStyle: 'italic', fontFamily: 'sans-serif' }}>
                  Saturday, June 1970
                </div>
              </div>

              <div style={{
                textAlign: 'center', fontSize: '0.9rem',
                fontWeight: 700, color: '#1a1208',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '0.9rem',
                borderBottom: '1px solid rgba(42,32,21,0.3)',
                paddingBottom: '0.5rem',
              }}>
                Children Available for Adoption
              </div>

              {[
                { bold: 'BOY, 3 years.', rest: 'Indian. Alert, active child. Needs a home where he can receive individual attention.' },
                { bold: 'GIRL, 2 years.', rest: 'Métis. Pleasant disposition. Would do well in a family setting.' },
                { bold: 'SIBLINGS, 5 and 7 years.', rest: 'Indian children. Healthy, well-behaved. Prefer placement together.' },
              ].map((ad, i) => (
                <div key={i} style={{
                  background: 'rgba(200,150,50,0.08)',
                  border: '1px solid rgba(42,32,21,0.18)',
                  borderRadius: 2,
                  padding: '0.6rem 0.75rem',
                  marginBottom: '0.5rem',
                  fontSize: '0.78rem',
                  color: '#2a2015',
                  lineHeight: 1.55,
                }}>
                  <strong>{ad.bold}</strong> {ad.rest}
                </div>
              ))}

              <div style={{
                textAlign: 'center',
                fontSize: '0.65rem',
                color: '#4a3a20',
                fontFamily: 'sans-serif',
                marginTop: '0.75rem',
                fontStyle: 'italic',
              }}>
                Contact: Adopt Indian and Métis Program
              </div>
            </div>
          </div>

          {/* ── PURPOSE OF THE SIXTIES SCOOP ── */}
          <div className="fade-up-4" style={{ marginBottom: '3rem' }}>
            <div style={{
              fontFamily: 'sans-serif', fontSize: '0.62rem',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#c8873a', fontWeight: 700, marginBottom: '0.75rem',
            }}>
              Purpose:
            </div>
            <h3 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
              color: '#f5f0e8',
              marginBottom: '1rem', lineHeight: 1.2,
            }}>
              The Purpose Was Assimilation, Not Protection
            </h3>

            <p style={{
              fontFamily: 'sans-serif', fontSize: '0.9rem',
              color: 'rgba(245,240,232,0.7)', lineHeight: 1.8,
              marginBottom: '1rem',
            }}>
              The Sixties Scoop was not about keeping Indigenous children safe but instead, the Canadian government
              wanted to break the connection between Indigenous children and their cultures. If children
              grew up in non-Indigenous homes, they would lose their language, their ceremonies, and
              their identity. Over time, this would result in Indigenous communities would fade away. The government
              believed assimilation was progress. The Indigenous communities demonstrated resislience and fought back to maintain their identity. This will be discussed in more depth below (James Sinclair).
            </p>

            <p style={{
              fontFamily: 'sans-serif', fontSize: '0.9rem',
              color: 'rgba(245,240,232,0.7)', lineHeight: 1.8,
              marginBottom: '1.25rem',
            }}>
              For specific communities like the Anishinaabe, Cree, and the Metis
              this was devastating as these communities had already lost their land
              under the Indian Act. Now they were losing their children too. Many children placed
              in English-speaking homes could not talk to their family or elders. Indigenous kids were
              cut off from ceremonies that had been passed down for generations. The government called
              it child welfare. But the as dicussed above the real goal was assimilation. (Baswan and Yenilmez)
            </p>

            {/* Anti-discriminatory lens callout */}
            <div style={{
              background: 'rgba(200,135,58,0.06)',
              border: '1px solid rgba(200,135,58,0.22)',
              borderLeft: '3px solid #c8873a',
              borderRadius: '0 8px 8px 0',
              padding: '1rem 1.25rem',
            }}>
              <p style={{
                fontFamily: 'sans-serif', fontSize: '0.85rem',
                color: 'rgba(245,240,232,0.75)', lineHeight: 1.75, margin: 0,
              }}>
                <span style={{ color: '#c8873a', fontWeight: 700 }}>Anti-discriminatory lens: </span>
               The lens shows us that the system did not treat all families the same. A white family living in poverty
                was rarely seen as unfit,but an Indigenous family in the same situation was. That
                is systemic racism. =
              </p>
            </div>
          </div>

          {/* ── SURVIVOR STORY SIMULATOR ── */}
          <div className="fade-up-5" style={{ marginBottom: '3rem' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              marginBottom: '1.25rem',
            }}>
              <div style={{
                width: 5, height: 5, borderRadius: '50%', background: '#c8873a',
                animation: 'glowPulse 2s ease-in-out infinite',
              }} />
              <span style={{
                fontFamily: 'sans-serif', fontSize: '0.65rem',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: '#c8873a', fontWeight: 700,
              }}>
                Interactive Feature
              </span>
            </div>
            <h3 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)',
              color: '#f5f0e8',
              marginBottom: '0.6rem',
            }}>
              Walk Through a Survivor's Path
            </h3>
            <p style={{
              fontFamily: 'sans-serif', fontSize: '0.85rem',
              color: 'rgba(245,240,232,0.45)',
              marginBottom: '1.5rem', lineHeight: 1.65,
              maxWidth: 560,
            }}>
              Based on real themes from survivor testimonies found below. These stories are fictionalized
              made, but reflect documented experiences. Every path is different.
              None of them should have happened.
            </p>
            <StorySimulator />
          </div>

          {/* ── CLOSING ── */}
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
                GENOCIDE
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
                  margin: '0 auto 1.25rem',
                  fontStyle: 'italic',
                }}
              >
                This was cultural genocide by another name.
              </p>
              <p style={{
                fontFamily: 'sans-serif',
                fontSize: 'clamp(0.88rem, 1.6vw, 1rem)',
                color: 'rgba(245,240,232,0.55)',
                maxWidth: 580, margin: '0 auto',
                lineHeight: 1.8,
              }}>
                The forced removal of Indigenous children tore apart families, cultures, and
                entire communities. It was called child welfare. It was not.
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
