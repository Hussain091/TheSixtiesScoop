import { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { User, Languages, Users, Heart, BookOpen, Scale } from 'lucide-react';

const impactAreas = [
  {
    icon: User,
    title: 'Identity',
    content:
      'Many children who were taken did not learn they were Indigenous until adulthood. Birth records were sealed and could only be opened with consent of both parties which meant that survivors grew up not knowing their language, their nation, their family. Identity is not just a name or a status number, it is belonging. It is knowing where you come from and who your people are and the Scoop stole that.',
  },
  {
    icon: Languages,
    title: 'Language',
    content:
      'Indigenous languages are not just words but they carry worldview, law, medicine, spirituality and the removal of children broke intergenerational language transmission. Over 60 Indigenous languages in Canada are now endangered. When a language dies, an entire way of understanding the world disappears and an entire community loses a part of their identity . The Scoop silenced thousands of voices before they could learn to speak.',
  },
  {
    icon: Users,
    title: 'Family and Kinship',
    content:
      'Indigenous cultures are built around kinship networks. Removing a child does not just affect one family but it affects the connection across entire communities. Many families searched for decades but never found them. Siblings were separated and never saw each other again. Grandparents lost the chance to pass on knowledge. The Scoop didn\'t just remove children. It tore apart the foundations of a community.',
  },
  {
    icon: Heart,
    title: 'Mental Health',
    content:
      'The scoop also led to long-term effects that include loss of cultural identity, low self-esteem, shame, loneliness, confusion, depression and PTSD. Many survivors reported abuse in adoptive homes. Which led to an increase in suicide rates, substance use, and mental health crises for survivors. These are not individual failures. They are the predictable result of systemic trauma.',
  },
  {
    icon: BookOpen,
    title: 'Community Continuity',
    content:
      'The knowledge that was passed through oral tradition, through Elders, through lived community experience was ruined. The Scoop disrupted not just individual lives but the transmission of knowledge across generations. How do you teach a ceremony if the children are gone? How do you pass on stories? How do you keep a culture alive when its future is taken?',
  },
  {
    icon: Scale,
    title: 'Legal Status',
    content:
      'For status the removal of First Nations children resulted in loss of Indian status stripping them of treaty rights, land rights, and the ability to return to their communities. Even when survivors reconnected with their nations, they often found themselves legally excluded from the communities they belonged to. The colonial legal system created another barrier to coming home.',
  },
];

export default function ImpactSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  return (
    <section
      id="impact"
      ref={ref}
      className={`py-32 px-6 bg-gradient-to-b from-charcoal/95 to-charcoal transition-all duration-1000 ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-6xl md:text-7xl text-cream mb-8 text-center">
          What Was Taken
        </h2>

        <p className="font-sans text-xl text-cream/70 text-center mb-20 max-w-3xl mx-auto">
          The Sixties Scoop didn't just remove children from their homes. It severed connections that define what it means to be human.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {impactAreas.map((area, index) => {
            const Icon = area.icon;
            const isExpanded = expandedCard === index;

            return (
              <div
                key={index}
                className={`bg-sienna/10 border border-sienna/30 rounded-lg p-6 cursor-pointer transition-all duration-300 hover:bg-sienna/20 ${
                  isExpanded ? 'md:col-span-2 lg:col-span-3' : ''
                }`}
                onClick={() => setExpandedCard(isExpanded ? null : index)}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-ochre/20 p-3 rounded-lg">
                    <Icon className="text-ochre" size={24} />
                  </div>
                  <h3 className="font-serif text-2xl text-cream flex-1">{area.title}</h3>
                </div>

                <p
                  className={`font-sans text-cream/90 leading-relaxed transition-all duration-300 ${
                    isExpanded ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'
                  }`}
                >
                  {area.content}
                </p>

                <div className="text-ochre font-sans text-sm mt-4">
                  {isExpanded ? 'Click to collapse' : 'Click to expand'}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <p className="font-serif text-3xl text-sienna max-w-4xl mx-auto leading-relaxed">
            They took everything that makes a person. And then they called it progress or welfare.
          </p>
        </div>
      </div>
    </section>
  );
}
