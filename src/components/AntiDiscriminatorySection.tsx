import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function AntiDiscriminatorySection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className={`py-32 px-6 bg-gradient-to-b from-charcoal/95 to-charcoal transition-all duration-1000 ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-6xl md:text-7xl text-cream mb-8 text-center">
          Seeing It Clearly
        </h2>

        <p className="font-sans text-xl text-cream/70 text-center mb-20 max-w-3xl mx-auto">
          An anti-oppressive lens asks us to see systems, not just individuals. To see power, not just problems.
        </p>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-red-900/20 to-red-800/10 border border-red-600/30 rounded-lg p-8">
            <h3 className="font-serif text-3xl text-red-400 mb-6">Deficit Thinking</h3>
            <ul className="space-y-4 font-sans text-cream/80">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">×</span>
                <span>"Indigenous families are failing their children"</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">×</span>
                <span>"Poverty and dysfunction need intervention"</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">×</span>
                <span>"Removal is in the best interest of the child"</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">×</span>
                <span>"We are saving these children from bad situations"</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">×</span>
                <span>"This is unfortunate but necessary"</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-sage/20 to-sage/10 border border-sage/50 rounded-lg p-8">
            <h3 className="font-serif text-3xl text-sage mb-6">Anti-Oppressive Thinking</h3>
            <ul className="space-y-4 font-sans text-cream/80">
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1">✓</span>
                <span>"The Indian Act created the poverty used to justify removal"</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1">✓</span>
                <span>"Who defined 'dysfunction'? and whose norms are being applied?"</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1">✓</span>
                <span>"Removal destroys identity, language, and community belonging"</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1">✓</span>
                <span>"The saviour narrative is actually secretly assimilation"</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage mt-1">✓</span>
                <span>"This is a deliberate continuation of colonial policy"</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-12">
          <div className="border-l-4 border-ochre pl-8">
            <h3 className="font-serif text-3xl text-cream mb-4">It Was Not a Mistake</h3>
            <p className="font-sans text-cream/90 leading-relaxed text-lg">
              The Sixties Scoop was not a mistake or a misunderstanding. It was a weaponization of child welfare to continue the colonial plan of assimilating Indigenous citizens. When residential schools could no longer be defended, child welfare became the new tool for the same goal assimilation.
            </p>
          </div>

          <div className="border-l-4 border-ochre pl-8">
            <h3 className="font-serif text-3xl text-cream mb-4">The Circular Trap</h3>
            <p className="font-sans text-cream/90 leading-relaxed text-lg">
              Poverty that was caused by the Indian Act was then used as evidence of "unfit parenting" which is a circular trap built into the law. The same system that removed Indigenous peoples of their land and livelihood then judged them for being poor.
            </p>
          </div>

          <div className="border-l-4 border-ochre pl-8">
            <h3 className="font-serif text-3xl text-cream mb-4">Unchecked Power</h3>
            <p className="font-sans text-cream/90 leading-relaxed text-lg">
              Social workers were not trained in Indigenous culture, operated under racist assumptions, and were given unchecked power over Indigenous children's lives. They did not need evidence of abuse. They only needed their own judgment.
            </p>
          </div>

          <div className="border-l-4 border-ochre pl-8">
            <h3 className="font-serif text-3xl text-cream mb-4">Who Benefits?</h3>
            <p className="font-sans text-cream/90 leading-relaxed text-lg">
              An anti-discriminatory lens asks: who benefits from this narrative? Who made the laws? Whose voices were excluded from the room when these decisions were made? The answer is always the same. Colonial power structures benefit from Indigenous dispossession.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center bg-sienna/10 border border-sienna/30 rounded-lg p-12">
          <p className="font-serif text-4xl text-ochre mb-6 max-w-4xl mx-auto leading-relaxed">
            To see this clearly is to understand that the Sixties Scoop was not child welfare. It was colonialism by another name.
          </p>
        </div>
      </div>
    </section>
  );
}
