import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function WhySection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section
      id="why"
      ref={ref}
      className={`py-32 px-6 bg-charcoal transition-all duration-1000 ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-6xl md:text-7xl text-cream mb-8 text-center">
          This Was Not About Child Welfare
        </h2>

        <p className="font-sans text-xl text-cream/70 text-center mb-20 max-w-4xl mx-auto leading-relaxed">
          Poverty caused by the Indian Act and colonial dispossession was then used as justification to remove children, creating a deliberate circular trap.
        </p>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div className="space-y-8">
            <div className="border-l-4 border-sienna pl-8">
              <p className="font-sans text-cream/90 leading-relaxed mb-6">
                Social workers had no required training in Indigenous culture or colonial history. Children were removed because of race and poverty, not abuse.
              </p>
              <blockquote className="font-serif text-2xl text-ochre italic leading-relaxed">
                "Child apprehensions were approved at the discretion of the social worker who was not required to receive any formal, professional training and was often unfamiliar with the complex history of colonialism."
              </blockquote>
            </div>

            <div className="bg-sienna/10 border border-sienna/30 rounded-lg p-8">
              <h3 className="font-serif text-2xl text-cream mb-4">The AIM Program</h3>
              <p className="font-sans text-cream/90 leading-relaxed mb-4">
                The Adopt Indian and Métis (AIM) program in Saskatchewan literally ran newspaper advertisements offering Indigenous children for adoption.
              </p>
              <p className="font-sans text-ochre font-medium">
                Children were advertised like products.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-2xl text-cream">Sent Around the World</h3>
              <p className="font-sans text-cream/90 leading-relaxed">
                Children were sent not just across Canada but internationally to the United States, the United Kingdom, Germany, the Netherlands, New Zealand, India, and Botswana.
              </p>
              <p className="font-sans text-ochre">
                In 1981, 45–55% of adoptees were sent to American families.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="bg-cream p-8 rounded-lg shadow-2xl max-w-md border-4 border-ochre/30">
              <div className="border-b-4 border-double border-charcoal pb-4 mb-4">
                <p className="font-serif text-3xl text-charcoal text-center">
                  The Saskatchewan Star
                </p>
                <p className="font-sans text-sm text-charcoal/70 text-center">
                  Saturday, June 1970
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-2xl text-charcoal text-center mb-4">
                  CHILDREN AVAILABLE FOR ADOPTION
                </h3>

                <div className="border-2 border-charcoal/20 p-4 bg-ochre/10">
                  <p className="font-sans text-charcoal/90 text-sm leading-relaxed">
                    <span className="font-bold">BOY, 3 years.</span> Indian. Alert, active child. Needs a home where he can receive individual attention.
                  </p>
                </div>

                <div className="border-2 border-charcoal/20 p-4 bg-ochre/10">
                  <p className="font-sans text-charcoal/90 text-sm leading-relaxed">
                    <span className="font-bold">GIRL, 2 years.</span> Métis. Pleasant disposition. Would do well in a family setting.
                  </p>
                </div>

                <div className="border-2 border-charcoal/20 p-4 bg-ochre/10">
                  <p className="font-sans text-charcoal/90 text-sm leading-relaxed">
                    <span className="font-bold">SIBLINGS, 5 and 7 years.</span> Indian children. Healthy, well-behaved. Prefer placement together.
                  </p>
                </div>

                <p className="font-sans text-xs text-charcoal/60 text-center mt-6 italic">
                  Contact: Adopt Indian and Métis Program
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="font-serif text-4xl text-sienna mb-4">
            This was cultural genocide by another name.
          </p>
          <p className="font-sans text-cream/80 text-lg max-w-3xl mx-auto leading-relaxed">
            The deliberate destruction of Indigenous families, cultures, and communities through the forced removal of children under the guise of child welfare.
          </p>
        </div>
      </div>
    </section>
  );
}
