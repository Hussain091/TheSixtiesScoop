import { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ExternalLink, BookOpen, FileText, Video, Globe } from 'lucide-react';

const sources = [
  {
    author: 'Baswan, Meera, and Sena Yenilmez.',
    title: '"The Sixties Scoop."',
    publication: 'The Indigenous Foundation',
    date: '13 May 2022',
    url: 'https://www.theindigenousfoundation.org/articles/the-sixties-scoop',
    type: 'article',
  },
  {
    author: 'CBC.',
    title: '"Little Bird Showrunner Jennifer Podemski Is Delivering on Her Promise to Tell Authentic Indigenous Stories."',
    publication: 'CBC',
    date: 'June 2023',
    url: 'https://www.cbc.ca/arts/q/jennifer-podemski-q-tom-power-interview-1.6862081',
    type: 'article',
  },
  {
    author: 'CBC News.',
    title: '"Separating Children from Parents: The Sixties Scoop in Canada."',
    publication: 'YouTube',
    date: '22 June 2018',
    url: 'https://www.youtube.com/watch?v=_nmd6HXKXYU',
    type: 'video',
  },
  {
    author: 'Dixon, Alvin.',
    title: '"The Sixties Scoop."',
    publication: 'Indian Residential School History and Dialogue Centre, University of British Columbia',
    date: null,
    url: 'https://irshdc.ubc.ca/learn/the-child-welfare-system-and-the-sixties-scoop/',
    type: 'web',
  },
  {
    author: 'Gladue Rights Research Database.',
    title: '"Sixties Scoop."',
    publication: 'Gladue Rights Research Database',
    date: null,
    url: 'https://gladue.usask.ca/sixties_scoop',
    type: 'web',
  },
  {
    author: 'Hanson, Erin.',
    title: '"Sixties Scoop."',
    publication: 'Indigenous Foundations, University of British Columbia',
    date: '2009',
    url: 'https://indigenousfoundations.arts.ubc.ca/sixties_scoop/',
    type: 'article',
  },
  {
    author: 'James Sinclair, Niigaanwewidam.',
    title: '"Sixties Scoop."',
    publication: 'The Canadian Encyclopedia',
    date: null,
    url: 'https://thecanadianencyclopedia.ca/en/article/sixties-scoop',
    type: 'article',
  },
  {
    author: 'Koch, David Gordon.',
    title: '"The Millennium Scoop: An Ongoing Crisis for Indigenous Families."',
    publication: 'NB Media Co-Op',
    date: '10 June 2025',
    url: 'https://nbmediacoop.org/2025/06/10/the-millennium-scoop-an-ongoing-crisis-for-indigenous-families/',
    type: 'article',
  },
  {
    author: "Mercury, Mike (O'dah ziibing/Heart of the river) Ashkewe Guelph.",
    title: '"What Is the Sixties Scoop? The Story of Indigenous Children Taken from Their Families across Canada."',
    publication: 'Toronto.com',
    date: '3 Jan. 2023',
    url: 'https://www.toronto.com/news/what-is-the-sixties-scoop-the-story-of-indigenous-children-taken-from-their-families-across/article_c6171bfa-de75-5f2d-b204-f008e2f8f956.html',
    type: 'article',
  },
  {
    author: 'Ruivo, Sonia.',
    title: '"60s Scoop Survivor: Rolanda\'s Story."',
    publication: 'The Pearson News',
    date: null,
    url: 'https://pearsonnews.ca/60s-scoop-survivor-rolandas-story/',
    type: 'article',
  },
  {
    author: 'Sinclair, Raven.',
    title: '"Identity Lost and Found: Lessons from the Sixties Scoop."',
    publication: 'First Peoples Child & Family Review, vol. 3, no. 1',
    date: '2007',
    url: 'https://doi.org/10.7202/1069527ar',
    type: 'journal',
    pages: 'pp. 65-82',
  },
  {
    author: 'Smith, Christine Miskonoodinkwe.',
    title: '"We Do Not Want You Anymore: Sixties Scoop Survivor Still Searching for Home."',
    publication: 'Healthy Debate',
    date: '17 June 2020',
    url: 'https://healthydebate.ca/2020/06/topic/sixties-scoop-survivor-home/',
    type: 'article',
  },
  {
    author: 'The Aboriginal Justice Implementation Commission.',
    title: '"Child Welfare."',
    publication: 'Ajic.mb.ca',
    date: '2026',
    url: 'https://ajic.mb.ca/volumel/chapter14.html',
    type: 'web',
    accessed: 'Accessed 7 Apr. 2026',
  },
  {
    author: 'Truth and Reconciliation Commission of Canada.',
    title: 'Truth and Reconciliation Commission of Canada: Calls to Action.',
    publication: 'Truth and Reconciliation Commission of Canada',
    date: '2015',
    url: null,
    type: 'book',
  },
  {
    author: 'Watts, Rachel.',
    title: '"Sixties Scoop Survivor Reconnects with Birth Mom, Discovers Her Culture, Decades after Separation."',
    publication: 'CBC',
    date: '6 Jan. 2023',
    url: 'https://www.cbc.ca/news/canada/montreal/sixties-scoop-survivor-reconnects-with-birth-mom-discovers-her-culture-decades-after-separation-1.6672484',
    type: 'article',
  },
];

const typeIcon = {
  article: FileText,
  journal: BookOpen,
  book: BookOpen,
  video: Video,
  web: Globe,
};

const typeLabel = {
  article: 'Article',
  journal: 'Journal',
  book: 'Book',
  video: 'Video',
  web: 'Web',
};

const typeColor = {
  article: '#c8873a',
  journal: '#b85c2a',
  book: '#a0753a',
  video: '#d4963f',
  web: '#c8873a',
};

export default function SourcesSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [filter, setFilter] = useState('all');

  const types = ['all', 'article', 'journal', 'book', 'video', 'web'];
  const filtered = filter === 'all' ? sources : sources.filter(s => s.type === filter);

  return (
    <>
      <style>{`
        @keyframes fadeUpIn {
          from { opacity: 0; transform: translateY(20px); }
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
        @keyframes numberPop {
          0%   { transform: scale(0.8); opacity: 0; }
          70%  { transform: scale(1.06); }
          100% { transform: scale(1); opacity: 1; }
        }

        .fade-up-1 { animation: fadeUpIn 0.85s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .fade-up-2 { animation: fadeUpIn 0.85s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
        .fade-up-3 { animation: fadeUpIn 0.85s cubic-bezier(0.16,1,0.3,1) 0.35s both; }
        .fade-up-4 { animation: fadeUpIn 0.85s cubic-bezier(0.16,1,0.3,1) 0.5s both; }

        .glow-orb { animation: glowPulse 4.5s ease-in-out infinite; }

        .source-row {
          transition: all 0.25s ease;
          cursor: default;
          position: relative;
        }
        .source-row:hover {
          transform: translateX(5px);
          border-color: rgba(200,135,58,0.38) !important;
          background: rgba(200,135,58,0.06) !important;
        }

        .filter-btn {
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .filter-btn:hover {
          border-color: rgba(200,135,58,0.45) !important;
          color: #c8873a !important;
        }
        .filter-btn.active {
          background: rgba(200,135,58,0.15) !important;
          border-color: rgba(200,135,58,0.5) !important;
          color: #c8873a !important;
        }

        .url-link {
          transition: color 0.2s ease;
          word-break: break-all;
        }
        .url-link:hover { color: #f5f0e8 !important; }

        .mla-shimmer {
          background: linear-gradient(90deg, #c8873a 0%, #f0c070 40%, #c8873a 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerMove 4s linear infinite;
        }

        .num-pop { animation: numberPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
      `}</style>

      <section
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
          width: '50vw', height: '50vw', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(160,82,45,0.09) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="glow-orb" style={{
          position: 'absolute', bottom: '5%', right: '-15%',
          width: '40vw', height: '40vw', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(200,135,58,0.06) 0%, transparent 70%)',
          pointerEvents: 'none', animationDelay: '2s',
        }} />

        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* ── HEADER ── */}
          <div className="fade-up-1" style={{ textAlign: 'center', marginBottom: '1rem' }}>
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
                MLA 9th Edition
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
              Works Cited
            </h2>

            <div style={{
              width: 64, height: 2,
              background: 'linear-gradient(90deg, transparent, #c8873a, transparent)',
              margin: '0 auto 1.5rem',
              animation: 'lineExpand 0.9s ease 0.4s both', transformOrigin: 'center',
            }} />

            <p style={{
              fontFamily: 'sans-serif', fontSize: '0.88rem',
              color: 'rgba(245,240,232,0.45)',
              lineHeight: 1.6,
            }}>
              All sources formatted in MLA 9th edition
            </p>
          </div>

          {/* ── SOURCE COUNT + FILTER ── */}
          <div className="fade-up-2" style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '1rem',
            marginBottom: '2rem',
            padding: '1.1rem 1.5rem',
            background: 'rgba(20,16,12,0.7)',
            border: '1px solid rgba(200,135,58,0.14)',
            borderRadius: 12,
            backdropFilter: 'blur(8px)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                className="num-pop"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '2.2rem',
                  color: '#c8873a',
                  lineHeight: 1,
                }}
              >
                {filtered.length}
              </div>
              <div>
                <div style={{
                  fontFamily: 'sans-serif', fontSize: '0.72rem',
                  fontWeight: 700, color: 'rgba(245,240,232,0.6)',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                }}>
                  {filter === 'all' ? 'Total Sources' : `${typeLabel[filter]} Sources`}
                </div>
                <div style={{
                  fontFamily: 'sans-serif', fontSize: '0.65rem',
                  color: 'rgba(245,240,232,0.28)',
                }}>
                  {sources.length} total across all categories
                </div>
              </div>
            </div>

            {/* Filter buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`filter-btn ${filter === t ? 'active' : ''}`}
                  style={{
                    fontFamily: 'sans-serif', fontSize: '0.65rem',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    fontWeight: 600,
                    padding: '0.3rem 0.75rem',
                    borderRadius: 999,
                    border: '1px solid rgba(200,135,58,0.18)',
                    background: 'transparent',
                    color: 'rgba(245,240,232,0.45)',
                    cursor: 'pointer',
                  }}
                >
                  {t === 'all' ? 'All' : typeLabel[t]}
                </button>
              ))}
            </div>
          </div>

          {/* ── SOURCE LIST ── */}
          <div className="fade-up-3" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '4rem' }}>
            {filtered.map((source, i) => {
              const Icon = typeIcon[source.type] || FileText;
              const color = typeColor[source.type] || '#c8873a';

              return (
                <div
                  key={i}
                  className="source-row"
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    background: 'rgba(20,16,12,0.72)',
                    border: '1px solid rgba(200,135,58,0.13)',
                    borderLeft: `3px solid ${color}`,
                    borderRadius: '0 10px 10px 0',
                    padding: '1.1rem 1.25rem',
                    backdropFilter: 'blur(6px)',
                    animation: `fadeUpIn 0.5s ease ${i * 45}ms both`,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                  }}
                >
                  {/* Type icon */}
                  <div style={{
                    width: 32, height: 32, flexShrink: 0,
                    borderRadius: 7,
                    background: `${color}12`,
                    border: `1px solid ${color}28`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginTop: 2,
                  }}>
                    <Icon size={14} color={color} />
                  </div>

                  {/* MLA citation */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontFamily: 'sans-serif',
                      fontSize: '0.87rem',
                      color: 'rgba(245,240,232,0.8)',
                      lineHeight: 1.75,
                      margin: 0,
                    }}>
                      {source.author}{' '}
                      <span style={{ color: 'rgba(245,240,232,0.9)' }}>{source.title}</span>{' '}
                      <em style={{ color: 'rgba(245,240,232,0.65)' }}>{source.publication}</em>
                      {source.date ? `, ${source.date}` : ''}
                      {source.pages ? `, ${source.pages}` : ''}
                      {source.accessed ? `, ${source.accessed}` : ''}
                      {source.url ? (
                        <>
                          {', '}
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="url-link"
                            style={{
                              color: color,
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 3,
                              verticalAlign: 'middle',
                            }}
                          >
                            {source.url.replace('https://', '').replace('http://', '')}
                            <ExternalLink size={10} style={{ flexShrink: 0 }} />
                          </a>
                        </>
                      ) : '.'}
                    </p>

                    {/* Type badge */}
                    <div style={{ marginTop: '0.4rem' }}>
                      <span style={{
                        fontFamily: 'sans-serif', fontSize: '0.58rem',
                        letterSpacing: '0.14em', textTransform: 'uppercase',
                        color: color, fontWeight: 700,
                        opacity: 0.7,
                      }}>
                        {typeLabel[source.type]}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── LAND ACKNOWLEDGEMENT ── */}
          <div className="fade-up-4" style={{
            background: 'rgba(14,11,8,0.88)',
            border: '1px solid rgba(200,135,58,0.18)',
            borderRadius: 14,
            padding: 'clamp(1.75rem, 4vw, 2.75rem)',
            textAlign: 'center',
            position: 'relative', overflow: 'hidden',
            backdropFilter: 'blur(10px)',
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
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                color: 'rgba(200,135,58,0.025)',
                fontWeight: 700, whiteSpace: 'nowrap', userSelect: 'none',
              }}>
                TERRITORY
              </span>
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem',
              }}>
                <div style={{
                  width: 24, height: 1, background: 'rgba(200,135,58,0.4)',
                }} />
                <span style={{
                  fontFamily: 'sans-serif', fontSize: '0.6rem',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'rgba(200,135,58,0.6)', fontWeight: 600,
                }}>
                  Land Acknowledgement
                </span>
                <div style={{
                  width: 24, height: 1, background: 'rgba(200,135,58,0.4)',
                }} />
              </div>

              <p style={{
                fontFamily: 'sans-serif',
                fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
                color: 'rgba(245,240,232,0.62)',
                lineHeight: 1.85,
                maxWidth: 640,
                margin: '0 auto',
              }}>
                This project was created on the traditional territory of the Haudenosaunee,
                Anishinaabe, and Mississaugas of the Credit. We acknowledge this land and the
                ongoing impacts of colonialism with responsibility.
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
