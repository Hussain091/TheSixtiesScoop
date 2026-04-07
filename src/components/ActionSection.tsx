import { useState, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import {
  BookOpen, Volume2, DollarSign, MessageCircle,
  ExternalLink, ChevronDown, ArrowRight, Globe,
} from 'lucide-react';
 
/* ─────────────── DATA ─────────────── */
const categories = [
  { id: 'learn',    label: 'Learn',    color: 'rgba(120,170,200,0.8)' },
  { id: 'amplify',  label: 'Amplify',  color: 'rgba(200,135,58,0.8)' },
  { id: 'donate',   label: 'Donate',   color: 'rgba(140,180,130,0.8)' },
  { id: 'advocate', label: 'Advocate', color: 'rgba(200,100,80,0.8)' },
];
 
const actions = [
  {
    cat: 'learn',
    icon: BookOpen,
    title: 'Learn',
    tagline: 'Start with Indigenous-led sources. Accurate history is the foundation of solidarity.',
    resources: [
      { label: 'APTN News — Canada\'s national Indigenous broadcaster', url: 'https://aptnnews.ca', tag: 'TV & Online' },
      { label: 'CBC Indigenous — dedicated Indigenous news desk', url: 'https://www.cbc.ca/news/indigenous', tag: 'News' },
      { label: 'Windspeaker — oldest Indigenous national newspaper (est. 1983)', url: 'https://windspeaker.com', tag: 'Print & Digital' },
      { label: '60s Scoop Mapping Platform — survivor stories across Canada', url: 'https://sixtiesscoop.geoforms.ca', tag: null },
      { label: 'IndigiNews — Indigenous-led community journalism', url: 'https://indiginews.com', tag: 'Online' },
    ],
    accent: 'rgba(120,170,200,0.18)',
    borderAccent: 'rgba(120,170,200,0.35)',
    iconColor: 'rgba(140,190,220,0.9)',
  },
  {
    cat: 'amplify',
    icon: Volume2,
    title: 'Amplify',
    tagline: 'What you platform matters. Algorithms reward what you engage with consistently.',
    resources: [
      { label: '@sixtiesscoopnetwork on Instagram — follow and share', url: 'https://www.instagram.com/sixtiesscoopnetwork', tag: 'Instagram' },
      { label: '@aptnnews — ongoing Indigenous news coverage', url: 'https://www.instagram.com/aptnnews', tag: 'Instagram' },
      { label: '@cbcindigenous — stories centred on Indigenous voices', url: 'https://www.instagram.com/cbcindigenous', tag: 'Instagram' },
      { label: 'Challenge harmful narratives — in your family, your feed, your school', url: null, tag: null },
      { label: 'Do not limit this to September 30. Reconciliation is year-round.', url: null, tag: null },
    ],
    accent: 'rgba(200,135,58,0.15)',
    borderAccent: 'rgba(200,135,58,0.35)',
    iconColor: '#c8873a',
  },
  {
    cat: 'donate',
    icon: DollarSign,
    title: 'Donate',
    tagline: 'Direct financial support to survivor-led organizations makes a measurable difference.',
    resources: [
      { label: 'National Sixties Scoop Healing Foundation — survivor-led, registered charity', url: 'https://www.sixtiesscoophealingfoundation.ca', tag: 'Charity' },
      { label: 'Sixties Scoop Network — grassroots survivor-founded advocacy', url: 'https://sixtiesscoopnetwork.org', tag: null },
      { label: 'Southern Chiefs\' Organization — funds healing programs in Manitoba', url: 'https://scoinc.mb.ca', tag: null },
      { label: 'Find your local Indigenous Friendship Centre via NAFC', url: 'https://nafc.ca/en/friendship-centres/', tag: 'Directory' },
    ],
    accent: 'rgba(140,180,130,0.12)',
    borderAccent: 'rgba(140,180,130,0.3)',
    iconColor: 'rgba(160,200,150,0.9)',
  },
  {
    cat: 'advocate',
    icon: MessageCircle,
    title: 'Advocate',
    tagline: 'Political pressure matters. Demand accountability on Indigenous child welfare.',
    resources: [
      { label: 'Contact your MP — demand full implementation of TRC Calls to Action 1–5', url: 'https://www.ourcommons.ca/Members/en', tag: null },
      { label: 'TRC Calls to Action 1–5 — read them yourself', url: 'https://www.rcaanc-cirnac.gc.ca/eng/1524494530110/1557511412801', tag: null },
      { label: 'Bill C-92 — An Act Respecting First Nations, Inuit and Métis Children', url: 'https://laws-lois.justice.gc.ca/eng/acts/S-20.2/index.html', tag: null },
      { label: 'Demand the end of birth alerts across all provinces', url: null, tag: null },
      { label: 'Support Indigenous-led child welfare at every level of government', url: null, tag: null },
    ],
    accent: 'rgba(200,100,80,0.12)',
    borderAccent: 'rgba(200,100,80,0.3)',
    iconColor: 'rgba(220,120,100,0.9)',
  },
  {
    cat: 'learn',
    icon: Globe,
    title: 'Listen & Watch',
    tagline: 'Centre Indigenous voices in the media you consume every day.',
    resources: [
      { label: 'Unreserved — CBC Radio One, hosted by Falen Johnson', url: 'https://www.cbc.ca/radio/unreserved', tag: 'Podcast' },
      { label: 'Missing & Murdered — CBC podcast by Connie Walker on MMIWG', url: 'https://www.cbc.ca/listen/cbc-podcasts/203-missing-and-murdered', tag: 'Podcast' },
      { label: 'Little Bird — drama from a Sixties Scoop survivor\'s perspective (Crave)', url: null, tag: 'TV' },
      { label: 'These Are the Stories — Christine Miskonoodinkwe Smith', url: null, tag: 'Book' },
    ],
    accent: 'rgba(120,170,200,0.15)',
    borderAccent: 'rgba(120,170,200,0.3)',
    iconColor: 'rgba(140,190,220,0.9)',
  },
  {
    cat: 'amplify',
    icon: ArrowRight,
    title: 'In Your Community',
    tagline: 'Reconciliation happens locally. These actions take under 10 minutes.',
    resources: [
      { label: 'Acknowledge the territory you\'re on — find yours at native-land.ca', url: 'https://native-land.ca', tag: null },
      { label: 'Bring Sixties Scoop education to your school or workplace', url: null, tag: null },
      { label: 'Attend local Indigenous-led events when you are welcomed', url: null, tag: null },
      { label: 'Support Indigenous-owned local businesses and artists in your city', url: null, tag: null },
    ],
    accent: 'rgba(200,135,58,0.12)',
    borderAccent: 'rgba(200,135,58,0.28)',
    iconColor: '#c8873a',
  },
];
 
const trcItems = [
  { label: 'Reduce overrepresentation in care', pct: 18 },
  { label: 'End birth alerts nationally', pct: 42 },
  { label: 'Indigenous-led child welfare', pct: 31 },
  { label: 'Bill C-92 full implementation', pct: 55 },
];
 
/* ─────────────── COMPONENT ─────────────── */
export default function ActionSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [activeFilter, setActiveFilter] = useState('all');
  const [openCard, setOpenCard] = useState(null);
  const [barsVisible, setBarsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const barsRef = useRef(null);
  const particlesRef = useRef(null);
 
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setBarsVisible(true); },
      { threshold: 0.3 }
    );
    if (barsRef.current) obs.observe(barsRef.current);
    return () => obs.disconnect();
  }, []);
 
  const filtered = activeFilter === 'all'
    ? actions
    : actions.filter(a => a.cat === activeFilter);
 
  return (
    <>
      <style>{`
        @keyframes fadeUpIn {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowPulse {
          0%,100% { opacity: 0.25; }
          50%      { opacity: 0.65; }
        }
        @keyframes glowPulse2 {
          0%,100% { opacity: 0.15; }
          50%      { opacity: 0.5; }
        }
        @keyframes shimmer {
          from { background-position: -200% center; }
          to   { background-position: 200% center; }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes borderPulse {
          0%,100% { opacity: 0.2; }
          50%      { opacity: 0.55; }
        }
        @keyframes float {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          33%      { transform: translateY(-10px) rotate(1deg); }
          66%      { transform: translateY(-5px) rotate(-0.5deg); }
        }
        @keyframes iconRotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes barGrow {
          from { width: 0%; }
          to   { width: var(--pct); }
        }
        @keyframes ripple {
          0%   { transform: scale(0.8); opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes typeIn {
          from { width: 0; }
          to   { width: 100%; }
        }
        @keyframes expandDown {
          from { max-height: 0; opacity: 0; transform: translateY(-8px); }
          to   { max-height: 700px; opacity: 1; transform: translateY(0); }
        }
        @keyframes particleDrift {
          0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0.6; }
          50%  { opacity: 1; }
          100% { transform: translateY(-60px) translateX(20px) scale(0); opacity: 0; }
        }
        @keyframes lineSweep {
          from { transform: scaleX(0); transform-origin: left; }
          to   { transform: scaleX(1); transform-origin: left; }
        }
 
        .action-fade-up { animation: fadeUpIn 0.75s cubic-bezier(0.16,1,0.3,1) both; }
 
        .action-glow-a {
          animation: glowPulse 5s ease-in-out infinite;
        }
        .action-glow-b {
          animation: glowPulse2 7s ease-in-out infinite;
          animation-delay: 2.5s;
        }
 
        .filter-tab {
          background: rgba(22,18,14,0.7);
          border: 1px solid rgba(200,135,58,0.15);
          color: rgba(245,240,232,0.45);
          padding: 8px 20px;
          border-radius: 30px;
          cursor: pointer;
          font-family: sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .filter-tab::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(200,135,58,0.15) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .filter-tab:hover::before { opacity: 1; }
        .filter-tab:hover {
          border-color: rgba(200,135,58,0.35);
          color: rgba(245,240,232,0.75);
        }
        .filter-tab.active {
          background: rgba(200,135,58,0.12);
          border-color: rgba(200,135,58,0.5);
          color: #c8873a;
        }
 
        .action-card {
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          position: relative;
          overflow: hidden;
        }
        .action-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .action-card:hover::before,
        .action-card.open::before { transform: scaleX(1); }
 
        .action-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 24px 48px rgba(0,0,0,0.35);
        }
 
        .card-body {
          overflow: hidden;
          transition: max-height 0.55s cubic-bezier(0.16,1,0.3,1),
                      opacity 0.4s ease;
        }
        .card-body.open { animation: expandDown 0.55s cubic-bezier(0.16,1,0.3,1) both; }
 
        .resource-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 9px 0;
          border-bottom: 1px solid rgba(200,135,58,0.07);
          transition: all 0.2s ease;
        }
        .resource-row:last-child { border-bottom: none; }
        .resource-row:hover { padding-left: 6px; }
 
        .resource-link {
          color: rgba(245,240,232,0.72);
          text-decoration: none;
          font-family: sans-serif;
          font-size: 0.875rem;
          line-height: 1.55;
          transition: color 0.2s ease;
        }
        .resource-link:hover { color: #c8873a; }
        .resource-link.no-url {
          cursor: default;
        }
        .resource-link.no-url:hover { color: rgba(245,240,232,0.72); }
 
        .res-tag {
          font-family: sans-serif;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 2px 7px;
          border-radius: 20px;
          flex-shrink: 0;
          margin-top: 2px;
        }
 
        .trc-bar {
          height: 5px;
          border-radius: 3px;
          background: rgba(242,232,213,0.08);
          overflow: hidden;
          position: relative;
        }
        .trc-bar-fill {
          height: 100%;
          border-radius: 3px;
          width: 0%;
          transition: width 1.6s cubic-bezier(0.16,1,0.3,1);
          position: relative;
          overflow: hidden;
        }
        .trc-bar-fill::after {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 20px; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35));
          animation: shimmer 2s linear infinite;
          background-size: 200% auto;
        }
 
        .quote-shimmer {
          background: linear-gradient(90deg, #c8873a 0%, #f5f0e8 40%, #c8873a 60%, #d4963f 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 5s linear infinite;
        }
 
        .scanline {
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(200,135,58,0.12), transparent);
          animation: scanline 8s linear infinite;
          pointer-events: none;
        }
 
        .particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(200,135,58,0.6);
          pointer-events: none;
          animation: particleDrift linear infinite;
        }
 
        .hover-ripple {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(200,135,58,0.4);
          animation: ripple 1.2s ease-out forwards;
          pointer-events: none;
        }
 
        .icon-wrap {
          transition: transform 0.3s ease;
        }
        .action-card:hover .icon-wrap {
          transform: rotate(8deg) scale(1.1);
        }
 
        .line-sweep {
          animation: lineSweep 0.8s cubic-bezier(0.16,1,0.3,1) both;
        }
      `}</style>
 
      <section
        id="action"
        ref={ref}
        style={{
          padding: '8rem 1.5rem',
          background: 'linear-gradient(180deg, #1c1510 0%, #1a1208 50%, #1e160a 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
        className={`transition-all duration-1000 ${
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* ── BACKGROUND EFFECTS ── */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(200,135,58,0.035) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />
 
        <div className="scanline" />
 
        {/* Particles */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className="particle" style={{
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
            left: `${10 + i * 11}%`,
            bottom: `${15 + (i * 7) % 40}%`,
            animationDuration: `${4 + (i * 1.3) % 5}s`,
            animationDelay: `${(i * 0.7) % 4}s`,
            opacity: 0.4 + (i * 0.05),
          }} />
        ))}
 
        {/* Glow orbs */}
        <div className="action-glow-a" style={{
          position: 'absolute', top: '10%', left: '-20%',
          width: '60vw', height: '60vw', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(160,82,45,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="action-glow-b" style={{
          position: 'absolute', bottom: '5%', right: '-15%',
          width: '50vw', height: '50vw', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(200,135,58,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '80vw', height: '80vw', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(139,69,19,0.04) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
 
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
 
          {/* ── HEADER ── */}
          <div className="action-fade-up" style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: '1.5rem',
            }}>
              <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, transparent, rgba(200,135,58,0.6))' }} />
              <span style={{
                fontFamily: 'sans-serif', fontSize: '0.65rem',
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: '#c8873a', fontWeight: 700, opacity: 0.85,
              }}>
                How to Move Forward
              </span>
              <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, rgba(200,135,58,0.6), transparent)' }} />
            </div>
 
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(2.6rem, 6vw, 5rem)',
              color: '#f5f0e8',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              marginBottom: '1.25rem',
            }}>
              What You Can Do
            </h2>
 
            <div style={{
              width: 60, height: 2,
              background: 'linear-gradient(90deg, transparent, #c8873a, transparent)',
              margin: '0 auto 1.5rem',
            }} className="line-sweep" />
 
            <p style={{
              fontFamily: 'sans-serif', fontSize: '1.05rem',
              color: 'rgba(245,240,232,0.55)',
              maxWidth: 560, margin: '0 auto',
              lineHeight: 1.75,
            }}>
              Knowledge without action is incomplete. Here is how you can show up — for survivors, for truth, and for lasting reconciliation.
            </p>
          </div>
 
          {/* ── FILTER TABS ── */}
          <div className="action-fade-up" style={{
            display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap',
            marginBottom: '3rem', animationDelay: '0.15s',
          }}>
            <button className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}>All</button>
            {categories.map(c => (
              <button key={c.id}
                className={`filter-tab ${activeFilter === c.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(c.id)}
                style={activeFilter === c.id ? { color: c.color, borderColor: c.color } : {}}
              >
                {c.label}
              </button>
            ))}
          </div>
 
          {/* ── ACTION CARDS ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem',
            marginBottom: '5rem',
          }}>
            {filtered.map((item, i) => {
              const Icon = item.icon;
              const isOpen = openCard === `${item.cat}-${item.title}`;
              const key = `${item.cat}-${item.title}`;
 
              return (
                <div
                  key={key}
                  className={`action-card ${isOpen ? 'open' : ''}`}
                  onClick={() => setOpenCard(isOpen ? null : key)}
                  onMouseEnter={() => setHoveredCard(key)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: isOpen
                      ? `rgba(26,20,12,0.95)`
                      : 'rgba(22,16,10,0.7)',
                    border: `1px solid ${isOpen ? item.borderAccent : 'rgba(200,135,58,0.12)'}`,
                    boxShadow: isOpen ? `0 0 0 1px ${item.borderAccent}, 0 24px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(200,135,58,0.08)` : 'none',
                    animation: `fadeUpIn 0.6s ease ${i * 90}ms both`,
                    '--card-accent': item.borderAccent,
                  }}
                >
                  {/* card top accent bar */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                    background: `linear-gradient(90deg, transparent, ${item.iconColor}, transparent)`,
                    transform: isOpen ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.4s ease',
                    borderRadius: '12px 12px 0 0',
                  }} />
 
                  {/* card header */}
                  <div style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.4rem 1.5rem',
                    gap: '1rem',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div className="icon-wrap" style={{
                        width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                        background: isOpen ? item.accent : 'rgba(200,135,58,0.06)',
                        border: `1px solid ${isOpen ? item.borderAccent : 'rgba(200,135,58,0.12)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                      }}>
                        {/* ripple on hover */}
                        {hoveredCard === key && !isOpen && (
                          <div style={{
                            position: 'absolute', inset: 0,
                            borderRadius: 10,
                            border: `1px solid ${item.iconColor}`,
                            animation: 'ripple 0.9s ease-out forwards',
                          }} />
                        )}
                        <Icon size={18} color={item.iconColor} />
                      </div>
                      <div>
                        <h3 style={{
                          fontFamily: 'Georgia, serif',
                          fontSize: '1.2rem',
                          color: isOpen ? '#f5f0e8' : 'rgba(245,240,232,0.75)',
                          margin: 0, marginBottom: 2,
                          transition: 'color 0.3s ease',
                        }}>
                          {item.title}
                        </h3>
                        <p style={{
                          fontFamily: 'sans-serif',
                          fontSize: '0.72rem',
                          color: 'rgba(245,240,232,0.3)',
                          margin: 0,
                          lineHeight: 1.4,
                          maxWidth: 180,
                        }}>
                          {item.tagline}
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      size={16}
                      color={isOpen ? '#c8873a' : 'rgba(200,135,58,0.35)'}
                      style={{
                        flexShrink: 0,
                        transition: 'transform 0.35s ease',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                      }}
                    />
                  </div>
 
                  {/* card body */}
                  <div
                    className={`card-body ${isOpen ? 'open' : ''}`}
                    style={{
                      maxHeight: isOpen ? 700 : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div style={{
                      padding: '0 1.5rem 1.5rem',
                      borderTop: `1px solid ${item.accent}`,
                      paddingTop: '1.25rem',
                    }}>
                      {item.resources.map((res, ri) => (
                        <div key={ri} className="resource-row">
                          <ArrowRight
                            size={12}
                            color={item.iconColor}
                            style={{ flexShrink: 0, marginTop: 4 }}
                          />
                          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', gap: 8, flexWrap: 'wrap' }}>
                            {res.url ? (
                              <a
                                href={res.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="resource-link"
                                onClick={e => e.stopPropagation()}
                              >
                                {res.label}
                                <ExternalLink size={10} style={{ display: 'inline', marginLeft: 4, opacity: 0.5, verticalAlign: 'middle' }} />
                              </a>
                            ) : (
                              <span className="resource-link no-url">{res.label}</span>
                            )}
                            {res.tag && (
                              <span className="res-tag" style={{
                                background: item.accent,
                                color: item.iconColor,
                                border: `1px solid ${item.borderAccent}`,
                              }}>
                                {res.tag}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
 
          {/* ── TRC PROGRESS ── */}
          <div
            ref={barsRef}
            className="action-fade-up"
            style={{
              marginBottom: '5rem',
              background: 'rgba(16,12,8,0.7)',
              border: '1px solid rgba(200,135,58,0.15)',
              borderRadius: 14,
              padding: '2rem 2.5rem',
              position: 'relative',
              overflow: 'hidden',
              animationDelay: '0.3s',
            }}
          >
            {/* top bar shimmer */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(200,135,58,0.4), transparent)',
            }} />
 
            <div style={{
              fontFamily: 'sans-serif', fontSize: '0.65rem',
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(200,135,58,0.6)', fontWeight: 700,
              textAlign: 'center', marginBottom: '2rem',
            }}>
              TRC Calls to Action 1–5 — Progress as of 2024
            </div>
 
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {trcItems.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    fontFamily: 'sans-serif', fontSize: '0.78rem',
                    color: 'rgba(245,240,232,0.45)',
                    minWidth: 175, flexShrink: 0,
                    lineHeight: 1.4,
                  }}>
                    {item.label}
                  </div>
                  <div className="trc-bar" style={{ flex: 1 }}>
                    <div
                      className="trc-bar-fill"
                      style={{
                        width: barsVisible ? `${item.pct}%` : '0%',
                        background: item.pct > 45
                          ? 'linear-gradient(90deg, #8b5a20, #c8873a)'
                          : 'linear-gradient(90deg, #6b3a14, #a05c28)',
                        transitionDelay: `${i * 0.15}s`,
                      }}
                    />
                  </div>
                  <div style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '0.9rem',
                    color: item.pct > 45 ? '#c8873a' : 'rgba(200,135,58,0.6)',
                    minWidth: 36,
                    textAlign: 'right',
                    fontWeight: 600,
                  }}>
                    {item.pct}%
                  </div>
                </div>
              ))}
            </div>
 
            <p style={{
              fontFamily: 'sans-serif', fontSize: '0.68rem',
              color: 'rgba(242,232,213,0.2)',
              textAlign: 'center', marginTop: '1.5rem', lineHeight: 1.5,
            }}>
              Estimates based on advocacy organization reports and RCAANC progress audits. Much work remains.
            </p>
          </div>
 
          {/* ── CLOSING STATEMENT ── */}
          <div style={{
            position: 'relative',
            background: 'rgba(14,10,6,0.9)',
            border: '1px solid rgba(200,135,58,0.2)',
            borderRadius: 16,
            padding: 'clamp(2rem, 5vw, 4rem)',
            textAlign: 'center',
            overflow: 'hidden',
          }}>
            {/* shimmer top border */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 2,
              background: 'linear-gradient(90deg, transparent, #c8873a, #d4963f, #c8873a, transparent)',
            }} />
 
            {/* faint background text */}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'none', overflow: 'hidden',
            }}>
              <span style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(4rem, 11vw, 11rem)',
                color: 'rgba(200,135,58,0.025)',
                fontWeight: 700, whiteSpace: 'nowrap', userSelect: 'none',
                letterSpacing: '-0.02em',
              }}>
                RECONCILIATION
              </span>
            </div>
 
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                width: 40, height: 2,
                background: 'linear-gradient(90deg, transparent, rgba(200,135,58,0.5), transparent)',
                margin: '0 auto 2rem',
              }} />
 
              <p className="quote-shimmer" style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(1.3rem, 2.8vw, 2rem)',
                lineHeight: 1.6,
                maxWidth: 780, margin: '0 auto 1.5rem',
                fontStyle: 'italic',
              }}>
                "This is not someone else's history. This is our present. And we all have a responsibility to do better."
              </p>
 
              <p style={{
                fontFamily: 'sans-serif', fontSize: '0.9rem',
                color: 'rgba(245,240,232,0.45)',
                maxWidth: 560, margin: '0 auto 2.5rem',
                lineHeight: 1.75,
              }}>
                Reconciliation is not a moment — it is a daily practice. The Sixties Scoop did not end in the past. Its effects are alive in families and communities right now.
              </p>
 
              {/* Timeline strip */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1px',
                background: 'rgba(200,135,58,0.08)',
                borderRadius: 10,
                overflow: 'hidden',
                border: '1px solid rgba(200,135,58,0.12)',
              }}>
                {[
                  { label: 'Indian Act', note: '1876 — the legal foundation of removal' },
                  { label: 'Residential Schools', note: '1876 – 1996' },
                  { label: 'Sixties Scoop', note: '1951 – 1984' },
                  { label: 'Overrepresentation Today', note: 'The same logic, ongoing' },
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: '1.1rem 1.25rem',
                    background: 'rgba(24,18,10,0.75)',
                    textAlign: 'center',
                    transition: 'background 0.2s ease',
                    cursor: 'default',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,135,58,0.07)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(24,18,10,0.75)'; }}
                  >
                    <div style={{
                      fontFamily: 'Georgia, serif', fontSize: '0.95rem',
                      color: '#f5f0e8', marginBottom: '0.3rem',
                    }}>
                      {item.label}
                    </div>
                    <div style={{
                      fontFamily: 'sans-serif', fontSize: '0.68rem',
                      color: 'rgba(200,135,58,0.55)', letterSpacing: '0.04em',
                      lineHeight: 1.4,
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
 
