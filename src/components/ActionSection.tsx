import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { BookOpen, Volume2, DollarSign, MessageCircle } from 'lucide-react';

export default function ActionSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section
      id="action"
      ref={ref}
      className={`py-32 px-6 bg-charcoal transition-all duration-1000 ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-6xl md:text-7xl text-cream mb-8 text-center">
          What You Can Do
        </h2>

        <p className="font-sans text-xl text-cream/70 text-center mb-20 max-w-3xl mx-auto">
          Knowledge without action is incomplete. Here's how you can be part of the change.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-sienna/20 to-sienna/10 border border-sienna/30 rounded-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-ochre/20 p-3 rounded-lg">
                <BookOpen className="text-ochre" size={32} />
              </div>
              <h3 className="font-serif text-3xl text-cream">Learn</h3>
            </div>
            <ul className="space-y-4 font-sans text-cream/90">
              <li className="flex items-start gap-3">
                <span className="text-ochre mt-1">→</span>
                <span>
                  Visit the 60s Scoop Network mapping platform at{' '}
                  <span className="text-ochre">sixtiesscoop.geoforms.ca</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-ochre mt-1">→</span>
                <span>
                  Read <span className="italic">These Are the Stories</span> by Christine Miskonoodinkwe Smith
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-ochre mt-1">→</span>
                <span>Watch <span className="italic">Little Bird</span> on Crave</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-ochre mt-1">→</span>
                <span>Listen to survivor testimonies and centre Indigenous voices</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-sienna/20 to-sienna/10 border border-sienna/30 rounded-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-ochre/20 p-3 rounded-lg">
                <Volume2 className="text-ochre" size={32} />
              </div>
              <h3 className="font-serif text-3xl text-cream">Amplify</h3>
            </div>
            <ul className="space-y-4 font-sans text-cream/90">
              <li className="flex items-start gap-3">
                <span className="text-ochre mt-1">→</span>
                <span>Follow and share Indigenous voices—@sixtiesscoopnetwork</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-ochre mt-1">→</span>
                <span>Share survivor testimony with your networks</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-ochre mt-1">→</span>
                <span>Do not let this be a single-day conversation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-ochre mt-1">→</span>
                <span>Challenge harmful narratives when you hear them</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-sienna/20 to-sienna/10 border border-sienna/30 rounded-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-ochre/20 p-3 rounded-lg">
                <DollarSign className="text-ochre" size={32} />
              </div>
              <h3 className="font-serif text-3xl text-cream">Support</h3>
            </div>
            <ul className="space-y-4 font-sans text-cream/90">
              <li className="flex items-start gap-3">
                <span className="text-ochre mt-1">→</span>
                <span>
                  Donate to the National Sixties Scoop Healing Foundation at{' '}
                  <span className="text-ochre">sixtiesscoophealingfoundation.ca</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-ochre mt-1">→</span>
                <span>Support Indigenous-led child welfare organizations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-ochre mt-1">→</span>
                <span>Support Bill C-92 implementation in your community</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-sienna/20 to-sienna/10 border border-sienna/30 rounded-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-ochre/20 p-3 rounded-lg">
                <MessageCircle className="text-ochre" size={32} />
              </div>
              <h3 className="font-serif text-3xl text-cream">Advocate</h3>
            </div>
            <ul className="space-y-4 font-sans text-cream/90">
              <li className="flex items-start gap-3">
                <span className="text-ochre mt-1">→</span>
                <span>Contact your MP and demand full implementation of TRC Calls to Action 1–5</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-ochre mt-1">→</span>
                <span>Support the end of birth alerts</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-ochre mt-1">→</span>
                <span>Demand Indigenous-led child welfare at every level</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-sienna/10 via-ochre/10 to-sienna/10 border border-ochre/30 rounded-lg p-12">
          <p className="font-serif text-4xl text-cream mb-6 max-w-4xl mx-auto leading-relaxed">
            This is not someone else's history. This is our present. And we all have a responsibility to do better.
          </p>
          <p className="font-sans text-cream/80 text-lg max-w-3xl mx-auto">
            Reconciliation is not a moment. It is a practice. It requires action, not just acknowledgment.
          </p>
        </div>
      </div>
    </section>
  );
}
