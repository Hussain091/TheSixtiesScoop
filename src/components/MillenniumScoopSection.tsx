import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function MillenniumScoopSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section
      id="today"
      ref={ref}
      className={`py-32 px-6 bg-charcoal transition-all duration-1000 ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-6xl md:text-7xl text-cream mb-8 text-center">
          The Scoop Never Ended
        </h2>

        <p className="font-sans text-xl text-cream/70 text-center mb-20 max-w-3xl mx-auto">
          This is not history. This is happening right now.
        </p>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div className="space-y-8">
            <div className="bg-sienna/20 border-2 border-sienna/40 rounded-lg p-8">
              <div className="font-serif text-5xl text-ochre mb-2">30%</div>
              <p className="font-sans text-cream/90 leading-relaxed">
                In Ontario today, Indigenous children make up approximately <span className="text-ochre font-semibold">30% of children in foster care</span> despite being only 4.1% of the population under 15.
              </p>
            </div>

            <div className="bg-sienna/20 border-2 border-sienna/40 rounded-lg p-8">
              <div className="font-serif text-5xl text-ochre mb-2">51%</div>
              <p className="font-sans text-cream/90 leading-relaxed">
                In British Columbia, <span className="text-ochre font-semibold">51% of children in care are Indigenous</span>.
              </p>
            </div>

            <div className="bg-sienna/20 border-2 border-sienna/40 rounded-lg p-8">
              <div className="font-serif text-5xl text-ochre mb-2">6x</div>
              <p className="font-sans text-cream/90 leading-relaxed">
                An Indigenous child in BC is <span className="text-ochre font-semibold">6 times more likely</span> to be taken into care than a non-Indigenous child.
              </p>
            </div>

            <div className="border-l-4 border-sienna pl-6">
              <p className="font-sans text-cream/90 leading-relaxed mb-4">
                The term <span className="text-ochre font-semibold">"Millennium Scoop"</span> describes the continuation of the same pattern into the 2000s and 2010s.
              </p>
              <p className="font-sans text-cream/90 leading-relaxed">
                In 2021, in Saskatchewan: <span className="text-ochre font-semibold">22 of 24 child deaths reviewed (92%)</span> and <span className="text-ochre font-semibold">23 of 29 critical injuries (79%)</span> involved Indigenous children and youth.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="font-serif text-3xl text-cream mb-8 text-center">
              Representation in Child Welfare
            </h3>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-sans text-cream/90">Indigenous Children (BC)</span>
                  <span className="font-sans text-ochre font-semibold">51%</span>
                </div>
                <div className="bg-charcoal/50 rounded-full h-8 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-sienna to-ochre h-full transition-all duration-1000 flex items-center justify-end pr-4"
                    style={{ width: isIntersecting ? '51%' : '0%' }}
                  >
                    <span className="font-sans text-xs text-cream font-semibold">51%</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-sans text-cream/90">Non-Indigenous Children (BC)</span>
                  <span className="font-sans text-cream/60">49%</span>
                </div>
                <div className="bg-charcoal/50 rounded-full h-8 overflow-hidden">
                  <div
                    className="bg-cream/30 h-full transition-all duration-1000 flex items-center justify-end pr-4"
                    style={{ width: isIntersecting ? '49%' : '0%' }}
                  >
                    <span className="font-sans text-xs text-cream/80 font-semibold">49%</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-cream/20">
                <div className="flex justify-between mb-2">
                  <span className="font-sans text-cream/90">Indigenous Population (BC)</span>
                  <span className="font-sans text-cream/60">~6%</span>
                </div>
                <div className="bg-charcoal/50 rounded-full h-6 overflow-hidden">
                  <div
                    className="bg-sage/60 h-full transition-all duration-1000"
                    style={{ width: isIntersecting ? '6%' : '0%' }}
                  />
                </div>
              </div>
            </div>

            <p className="font-sans text-cream/70 text-sm mt-8 text-center italic">
              The overrepresentation is not an accident. It is a continuation of the same colonial logic.
            </p>
          </div>
        </div>

        <div className="bg-sienna/10 border border-sienna/30 rounded-lg p-10 mb-12">
          <h3 className="font-serif text-3xl text-cream mb-4">Birth Alerts</h3>
          <p className="font-sans text-cream/90 leading-relaxed mb-4">
            Birth alerts is where hospitals notify child protection services when an Indigenous mother is giving birth, usually done to take the child away and was still legal in many provinces until very recently.
          </p>
          <p className="font-sans text-cream/90 leading-relaxed">
            This meant that Indigenous mothers could give birth and have their newborns taken before they even left the hospital. The practice of "scooping" newborns never stopped.
          </p>
        </div>

        <div className="text-center">
          <p className="font-serif text-4xl text-sienna mb-6 max-w-4xl mx-auto leading-relaxed">
            They changed the name. They did not change the practice.
          </p>
          <p className="font-sans text-cream/80 text-xl max-w-3xl mx-auto leading-relaxed">
            The removal of Indigenous children from their families is not a historical injustice. It is a present-day crisis.
          </p>
        </div>
      </div>
    </section>
  );
}
