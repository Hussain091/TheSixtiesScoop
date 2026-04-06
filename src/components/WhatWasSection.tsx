import { useEffect, useState, useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ExternalLink, ArrowRight } from 'lucide-react';

// ── Animated counter with custom easing ──────────────────────────────────
function AnimatedNumber({ target, duration = 2200, prefix = '', suffix = '', started }) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (!started) return;
    startRef.current = null;
    const animate = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [started, target, duration]);

  return (
    <span style={{ fontVariantNumeric: 'tabular-nums' }}>
      {prefix}{display.toLocaleString()}{suffix}
    </span>
  );
}

// ── Typewriter ────────────────────────────────────────
function TypewriterStat({ text, started, delay = 0 }) {
  const [shown, setShown] = useState('');
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(t);
  }, [started, delay]);

  useEffect(() => {
    if (!active) return;
    if (shown.length >= text.length) return;
    const t = setTimeout(() => {
      setShown(text.slice(0, shown.length + 1));
    }, 55);
    return () => clearTimeout(t);
  }, [active, shown, text]);

  return (
    <span style={{ fontVariantNumeric: 'tabular-nums' }}>
      {shown}
      {shown.length < text.length && <span style={{ animation: 'cursorBlink 0.7s steps(1) infinite' }}>|</span>}
    </span>
  );
}

export default function WhatWasSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.15 });
  const [started, setStarted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (isIntersecting && !started) setStarted(true);
  }, [isIntersecting]);

  const contextCards = [
    {
      label: 'The Legal Mechanism',
      text: 'Section 88 of the Indian Act (1951) extended provincial laws — including child welfare — to reserves. This gave provinces authority to remove children without federal oversight or Indigenous consent.',
    },
    {
      label: 'Named in 1983',
      text: 'Patrick Johnston coined the term "Sixties Scoop" in his 1983 report Native Children and the Child Welfare System — the first time the practice was formally named and documented.',
    },
    {
      label: 'Global Reach',
      text: 'Children were not only placed across Canada — some were sent to the United States and Europe. Families had no legal recourse and were rarely told where their children had gone.',
    },
  ];

  return (
    <section ref={ref}>
      <h2>What Was the Sixties Scoop</h2>

      <p>
        "It was common practice to 'scoop' newborns from their mothers on reserves."
      </p>

      <p>
        In 1951, the government amended the Indian Act to give provincial governments power
        over Indigenous child welfare. As residential schools faced mounting criticism,
        a new mechanism emerged to pursue assimilation under a different name.
      </p>

      <p>
        Children were taken without consent, without warning, without families being told
        where their children went.
      </p>

      <p>
        Between the 1950s and 1980s, over <strong>20,000 Indigenous children</strong> were removed.
      </p>

      {contextCards.map((card, i) => (
        <div key={i}>
          <strong>{card.label}</strong>
          <p>{card.text}</p>
        </div>
      ))}

      <div>
        {started && <AnimatedNumber target={1400} started={started} />}
        <p>Indigenous children in B.C. provincial care in 1964</p>
      </div>

      <div>
        {started && <AnimatedNumber target={3400} started={started} />}
        <p>Indigenous children adopted in Manitoba</p>
      </div>

      <div>
        <p>
          Aboriginal children were{' '}
          {started
            ? <TypewriterStat text="4.5 times more likely" started={started} />
            : '4.5 times more likely'}{' '}
          to be in care.
        </p>
      </div>
    </section>
  );
}
