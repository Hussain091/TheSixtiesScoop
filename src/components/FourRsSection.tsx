import { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Shield, Heart, Sparkles, TrendingUp } from 'lucide-react';

const fourRs = [
  {
    id: 'resistance',
    title: 'Resistance',
    icon: Shield,
    color: 'sienna',
    content: [
      {
        title: 'Community Blockades',
        text: 'In 1990 the Wabaseemoong community physically blocked the Children\'s Aid Society from entering their reserve and prevented the removal of more children. This was a direct action to protect their children.',
      },
      {
        title: 'Legal Action',
        text: 'Class action lawsuits began in 2009 in Manitoba, and the first major legal challenge against Canada for failing to protect Aboriginal children\'s cultural identity occured. Survivors used the colonial legal system against itself.',
      },
      {
        title: 'Survivor Networks',
        text: 'The 60s Scoop Network was founded by survivors to demand justice, recognition, and compensation. Colleen Hele Cardinal, Director stated "The trafficking of Indigenous children through the child welfare policies known as the 60s Scoop caused tremendous harm, yet Canada has swept us under the rug without acknowledgement or apology."',
      },
      {
        title: 'Justice Won',
        text: 'Legal resistance resulted in an $800 million settlement in 2017 and a federal apology from Prime Minister Trudeau in 2018. This was not enough but acknowledgment forced this matter into the open.',
      },
    ],
  },
  {
    id: 'resilience',
    title: 'Resilience',
    icon: Heart,
    color: 'ochre',
    content: [
      {
        title: 'Rebuilding Identity',
        text: 'Indigenous Survivors rebuilt their identities that were systematically destroyed. Christine Smith went from being a ward of the state to publishing memoirs and editing anthologies of survivor voices.',
      },
      {
        title: 'Teaching the Next Generation',
        text: 'Rolanda Murphy McPhee is now a teacher and army reservist who shares her story with young people. She turned her pain into a method of teaching ensuring the next generation knows what happened.',
      },
      {
        title: 'Reframing the Narrative',
        text: 'David Mortimer writes: "I survived Canada\'s child welfare system and its failed Sixties Scoop policy" framing survival as strength and not victimhood. ',
      },
      {
        title: 'Cultural Reconnection as Healing',
        text: 'Many survivors describe reconnection with culture as literally life saving. This shows that resilience is not just enduring trauma, rather it is choosing to live your life fully despite it and working to overcome it.',
      },
    ],
  },
  {
    id: 'reclamation',
    title: 'Reclamation',
    icon: Sparkles,
    color: 'sage',
    content: [
      {
        title: 'Coming Home',
        text: 'Survivors returning back to their communities, learning languages, reconnecting with Elders and ceremonies. Reclaiming everything that was stolen.',
      },
      {
        title: 'Bill C-92',
        text: 'The 2019 Act Respecting First Nations, Inuit, and Métis Children, Youth, and Families gives Indigenous communities legal control over their own child welfare for the first time and is a direct reclamation of sovereignty.',
      },
      {
        title: 'Reclaiming Names and Status',
        text: 'Survivors are reclaiming birth names, Indian status, community membership. Legal recognition of who they always were.',
      },
      {
        title: 'Survivor Led Healing',
        text: 'The National Sixties Scoop Healing Foundation supports cultural reclamation and family reuniting.',
      },
      {
        title: 'Mapping the Diaspora',
        text: 'The "In Our Own Words: Mapping the Sixties Scoop Diaspora" project by the 60s Scoop Network lets survivors map their displacement and reclaim their own story one which helped 22,500+ children\'s journeys visualized.',
      },
    ],
  },
  {
    id: 'resurgence',
    title: 'Resurgence',
    icon: TrendingUp,
    color: 'cream',
    content: [
      {
        title: 'Land-Based Healing',
        text: 'Indigenous led healing programs like "Healing on the Land with Horses" in Saskatchewan connecting survivors to land and culture. Healing happens in relationship to the land.',
      },
      {
        title: 'Telling Our Own Stories',
        text: 'Jennifer Podemski (Anishnabe/Ashkenazi), award-winning showrunner, created the TV series Little Bird about a Sixties Scoop survivor telling the story from an Indigenous perspective to a national audience.',
      },
      {
        title: 'Survivor-Led Institutions',
        text: 'The Sixties Scoop Healing Foundation (2020) is survivor-led, Inuit/First Nations/Métis/status/non-status inclusive, and fully independent. Building institutions that serve the community.',
      },
      {
        title: 'Anthology as Resistance',
        text: 'Survivors like Christine Smith editing anthologies likd Silence to Strength (2022) so that the community can tell its own story. Knowledge production in the Indigenous perspective.',
      },
      {
        title: 'Language Revitalization',
        text: 'Language revitalization programs. Rolanda learning Ojibway. Schools teaching Indigenous languages Survivors reconnecting with oral traditions. Resurgence is not going back, it is about carrying forward and regaining what was lost.',
      },
    ],
  },
];

export default function FourRsSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });
  const [activeTab, setActiveTab] = useState('resistance');

  const activeContent = fourRs.find((r) => r.id === activeTab);

  return (
    <section
      id="resistance"
      ref={ref}
      className={`py-32 px-6 bg-gradient-to-b from-charcoal to-charcoal/95 transition-all duration-1000 ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-6xl md:text-7xl text-cream mb-8 text-center">
          They Never Stopped Fighting
        </h2>

        <p className="font-sans text-xl text-cream/70 text-center mb-20 max-w-3xl mx-auto">
          The Four Rs: Resistance, Resilience, Reclamation, Resurgence
        </p>

        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {fourRs.map((r) => {
            const Icon = r.icon;
            const isActive = activeTab === r.id;

            return (
              <button
                key={r.id}
                onClick={() => setActiveTab(r.id)}
                className={`flex items-center gap-3 px-8 py-4 rounded-lg font-sans text-lg transition-all duration-300 ${
                  isActive
                    ? `bg-${r.color} text-charcoal`
                    : 'bg-charcoal/50 text-cream/70 border border-sienna/30 hover:bg-sienna/20'
                }`}
              >
                <Icon size={24} />
                <span className="font-semibold">{r.title}</span>
              </button>
            );
          })}
        </div>

        {activeContent && (
          <div className="bg-sienna/10 border border-sienna/30 rounded-2xl p-12 min-h-[500px]">
            <div className="flex items-center gap-4 mb-8">
              {(() => {
                const Icon = activeContent.icon;
                return <Icon className="text-ochre" size={40} />;
              })()}
              <h3 className="font-serif text-5xl text-cream">{activeContent.title}</h3>
            </div>

            <div className="space-y-8">
              {activeContent.content.map((item, index) => (
                <div
                  key={index}
                  className="border-l-4 border-ochre pl-6 transition-all duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h4 className="font-serif text-2xl text-cream mb-3">{item.title}</h4>
                  <p className="font-sans text-cream/90 leading-relaxed text-lg">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 text-center">
          <p className="font-serif text-3xl text-ochre max-w-4xl mx-auto leading-relaxed">
            Survival is not passive. Rather in this situation it is an act of defiance. It is choosing to carry forward what they tried to destroy.
          </p>
        </div>
      </div>
    </section>
  );
}
