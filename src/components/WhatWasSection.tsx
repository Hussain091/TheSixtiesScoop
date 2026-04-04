import { useEffect, useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function WhatWasSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.3 });
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  useEffect(() => {
    if (isIntersecting) {
      const duration = 2000;
      const steps = 60;
      const increment1 = 1400 / steps;
      const increment2 = 3400 / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        setCount1(Math.min(Math.floor(increment1 * currentStep), 1400));
        setCount2(Math.min(Math.floor(increment2 * currentStep), 3400));

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isIntersecting]);

  return (
    <section
      id="what"
      ref={ref}
      className={`py-32 px-6 bg-gradient-to-b from-charcoal to-charcoal/95 transition-all duration-1000 ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-6xl md:text-7xl text-cream mb-16 text-center">
          What Was the Sixties Scoop
        </h2>

        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <div className="border-l-4 border-sienna pl-8">
            <p className="font-serif text-3xl text-ochre leading-relaxed italic">
              "It was common practice to 'scoop' newborns from their mothers on reserves."
            </p>
            <p className="font-sans text-cream/70 mt-4">
              — B.C. social worker, describing the practice that Patrick Johnston would name in 1983
            </p>
          </div>

          <div className="font-sans text-cream/90 space-y-6 leading-relaxed">
            <p>
              In 1951, the Indian Act was amended to give provincial governments power over Indigenous child welfare. Residential schools were being phased out, but the goal of assimilation never stopped.
            </p>
            <p>
              When Indian Residential Schools didn't "kill the Indian in the child," Child Welfare agencies stepped in to finish the job.
            </p>
            <p>
              Children were taken without consent. Without warning. Without families being told where their children went.
            </p>
            <p>
              Between the 1950s and 1980s, over 20,000 Indigenous children were removed from their families and communities and placed into non-Indigenous homes across Canada and around the world.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-sienna/10 to-sienna/5 border border-sienna/30 rounded-lg p-10 text-center">
            <div className="font-serif text-7xl text-ochre mb-4">
              {isIntersecting ? count1.toLocaleString() : '30'}
            </div>
            <div className="font-sans text-cream/80 text-lg mb-2">
              Indigenous children in B.C. provincial care in 1964
            </div>
            <div className="font-sans text-cream/60 text-sm">
              Up from approximately 30 in 1951
            </div>
            <div className="font-serif text-4xl text-sienna mt-4">50x increase</div>
            <div className="font-sans text-cream/70 text-sm mt-2">in just 13 years</div>
          </div>

          <div className="bg-gradient-to-br from-sienna/10 to-sienna/5 border border-sienna/30 rounded-lg p-10 text-center">
            <div className="font-serif text-7xl text-ochre mb-4">
              {isIntersecting ? count2.toLocaleString() : '0'}
            </div>
            <div className="font-sans text-cream/80 text-lg mb-2">
              Indigenous children adopted in Manitoba
            </div>
            <div className="font-sans text-cream/60 text-sm">
              Between 1971 and 1981
            </div>
            <div className="font-serif text-4xl text-sienna mt-4">80%</div>
            <div className="font-sans text-cream/70 text-sm mt-2">
              placed into non-Indigenous homes
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="font-sans text-xl text-cream/90 max-w-4xl mx-auto leading-relaxed">
            Aboriginal children were <span className="text-ochre font-semibold">4.5 times more likely</span> than non-Aboriginal children to be in the care of child welfare authorities.
          </p>
        </div>
      </div>
    </section>
  );
}
