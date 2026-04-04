import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas';

const phrases = [
  '20,000 children taken.',
  'A generation erased.',
  'They are still here.',
  'This is not history. It is now.',
];

export default function Hero() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = phrases[currentPhrase];
    const typingSpeed = isDeleting ? 30 : 80;

    if (!isDeleting && displayText === currentFullText) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentFullText.substring(0, displayText.length - 1)
          : currentFullText.substring(0, displayText.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPhrase]);

  const scrollToContent = () => {
    const element = document.getElementById('what');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal">
      <ParticleCanvas />

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <h1 className="font-serif text-8xl md:text-9xl text-cream mb-6 tracking-tight">
          Stolen
        </h1>

        <p className="font-sans text-xl md:text-2xl text-cream/90 mb-12 max-w-3xl mx-auto leading-relaxed">
          The Sixties Scoop and the Children Canada Took
        </p>

        <div className="h-16 mb-16">
          <p className="font-sans text-lg md:text-xl text-ochre font-medium">
            {displayText}
            <span className="animate-pulse">|</span>
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-20">
          <div className="bg-sienna/20 backdrop-blur-sm border border-sienna/30 rounded-lg p-6 hover:bg-sienna/30 transition-all duration-300">
            <div className="font-serif text-4xl text-ochre mb-2">20,000+</div>
            <div className="font-sans text-sm text-cream/80">Children taken</div>
          </div>

          <div className="bg-sienna/20 backdrop-blur-sm border border-sienna/30 rounded-lg p-6 hover:bg-sienna/30 transition-all duration-300">
            <div className="font-serif text-4xl text-ochre mb-2">1951–1984</div>
            <div className="font-sans text-sm text-cream/80">Years active</div>
          </div>

          <div className="bg-sienna/20 backdrop-blur-sm border border-sienna/30 rounded-lg p-6 hover:bg-sienna/30 transition-all duration-300">
            <div className="font-serif text-4xl text-ochre mb-2">$800M</div>
            <div className="font-sans text-sm text-cream/80">Settlement</div>
          </div>

          <div className="bg-sienna/20 backdrop-blur-sm border border-sienna/30 rounded-lg p-6 hover:bg-sienna/30 transition-all duration-300">
            <div className="font-serif text-4xl text-ochre mb-2">Ongoing</div>
            <div className="font-sans text-sm text-cream/80">Still happening</div>
          </div>
        </div>

        <button
          onClick={scrollToContent}
          className="text-cream/60 hover:text-cream transition-colors animate-bounce"
          aria-label="Scroll to content"
        >
          <ChevronDown size={40} />
        </button>
      </div>
    </section>
  );
}
