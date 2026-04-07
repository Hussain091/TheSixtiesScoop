import { useEffect, useState } from 'react';

export default function Navigation() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-charcoal/80 backdrop-blur-md border-b border-sienna/20">
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-sienna via-ochre to-sienna transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-serif text-2xl text-cream hover:text-ochre transition-colors"
          >
            Stolen
          </button>

          <div className="hidden md:flex items-center gap-8 font-sans text-sm">
            <button
              onClick={() => scrollToSection('what')}
              className="text-cream/80 hover:text-cream transition-colors"
            >
              What
            </button>
            <button
              onClick={() => scrollToSection('why')}
              className="text-cream/80 hover:text-cream transition-colors"
            >
              Why
            </button>
            <button
              onClick={() => scrollToSection('impact')}
              className="text-cream/80 hover:text-cream transition-colors"
            >
              Impact
            </button>
            <button
              onClick={() => scrollToSection('testimonies')}
              className="text-cream/80 hover:text-cream transition-colors"
            >
              Testimonies
            </button>
            <button
              onClick={() => scrollToSection('resistance')}
              className="text-cream/80 hover:text-cream transition-colors"
            >
              The Four Rs
            </button>
            <button
              onClick={() => scrollToSection('today')}
              className="text-cream/80 hover:text-cream transition-colors"
            >
              Today
            </button>
            <button
              onClick={() => scrollToSection('action')}
              className="text-cream/80 hover:text-cream transition-colors"
            >
              Anti-Discriminatory Lens 
            </button>
            <button
              onClick={() => scrollToSection('AntiDiscriminatorySection')}
              className="text-cream/80 hover:text-cream transition-colors"
            >
              Take Action
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
