import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function SourcesSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });

  const sources = [
    {
      author: 'CBC News',
      title: '"From Eskimo Baby to finding her birth mother: A Sixties Scoop survivor\'s story"',
      publication: 'CBC',
      date: '26 Jan. 2023',
      url: 'https://www.cbc.ca/news/canada/north/60s-scoop-inuit-adoption-1.6726116',
    },
    {
      author: 'Healthy Debate',
      title: '"Sixties Scoop survivors still grapple with decades-old trauma"',
      publication: 'Healthy Debate',
      date: '2020',
      url: 'https://healthydebate.ca/2020/10/topic/sixties-scoop-survivors/',
    },
    {
      author: 'Johnston, Patrick',
      title: 'Native Children and the Child Welfare System',
      publication: 'Canadian Council on Social Development',
      date: '1983',
      url: null,
    },
    {
      author: 'Mortimer, David',
      title: '"I survived Canada\'s child welfare system and its failed Sixties Scoop policy"',
      publication: 'The Globe and Mail',
      date: '15 Jan. 2026',
      url: 'https://www.theglobeandmail.com',
    },
    {
      author: 'Pearson News',
      title: '"Teacher shares her Indigenous story"',
      publication: 'Pearson Centre',
      date: '2022',
      url: null,
    },
    {
      author: 'Smith, Christine Miskonoodinkwe',
      title: 'These Are the Stories: Memories of a 60s Scoop Survivor',
      publication: 'University of Regina Press',
      date: '2021',
      url: null,
    },
    {
      author: 'Smith, Christine Miskonoodinkwe, editor',
      title: 'Silence to Strength: Stories of Sixties Scoop Survivors',
      publication: 'University of Regina Press',
      date: '2022',
      url: null,
    },
    {
      author: 'Sinclair, Raven',
      title: '"Identity lost and found: Lessons from the sixties scoop"',
      publication: 'First Peoples Child & Family Review, vol. 3, no. 1',
      date: '2007',
      url: null,
    },
    {
      author: 'Truth and Reconciliation Commission of Canada',
      title: 'Truth and Reconciliation Commission of Canada: Calls to Action',
      publication: 'TRC',
      date: '2015',
      url: 'https://www2.gov.bc.ca/assets/gov/british-columbians-our-governments/indigenous-people/aboriginal-peoples-documents/calls_to_action_english2.pdf',
    },
    {
      author: 'Government of Canada',
      title: 'An Act respecting First Nations, Inuit and Métis children, youth and families (Bill C-92)',
      publication: 'Justice Laws Website',
      date: '2019',
      url: 'https://laws-lois.justice.gc.ca/eng/acts/F-11.73/',
    },
    {
      author: '60s Scoop Network',
      title: 'In Our Own Words: Mapping the Sixties Scoop Diaspora',
      publication: '60s Scoop Network',
      date: 'Accessed 2026',
      url: 'https://sixtiesscoop.geoforms.ca/',
    },
    {
      author: 'National Sixties Scoop Healing Foundation',
      title: 'About Us',
      publication: 'National Sixties Scoop Healing Foundation',
      date: 'Accessed 2026',
      url: 'https://sixtiesscoophealingfoundation.ca/',
    },
    {
      author: 'Saskatchewan Advocate for Children and Youth',
      title: 'A Breach of Trust: An Investigation into Foster Care Overcrowding',
      publication: 'Saskatchewan Advocate',
      date: '2021',
      url: null,
    },
    {
      author: 'Podemski, Jennifer, creator',
      title: 'Little Bird',
      publication: 'Crave/CBC',
      date: '2023',
      url: null,
    },
  ];

  return (
    <section
      ref={ref}
      className={`py-32 px-6 bg-gradient-to-b from-charcoal to-charcoal/95 transition-all duration-1000 ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-6xl md:text-7xl text-cream mb-8 text-center">
          Works Cited
        </h2>

        <p className="font-sans text-cream/70 text-center mb-16">
          All sources formatted in MLA 9th edition
        </p>

        <div className="space-y-6">
          {sources.map((source, index) => (
            <div
              key={index}
              className="bg-sienna/10 border-l-4 border-ochre rounded-r-lg p-6 hover:bg-sienna/15 transition-all duration-300"
            >
              <p className="font-sans text-cream/90 leading-relaxed">
                {source.author}. {source.title}. <span className="italic">{source.publication}</span>, {source.date}.
                {source.url && (
                  <>
                    {' '}
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ochre hover:text-cream underline"
                    >
                      {source.url}
                    </a>
                  </>
                )}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center border-t border-cream/20 pt-12">
          <p className="font-sans text-cream/70 leading-relaxed max-w-3xl mx-auto">
            This project was created on the traditional territory of the Haudenosaunee, Anishinaabe, and Mississaugas of the Credit. We acknowledge this land and the ongoing impacts of colonialism with responsibility.
          </p>
        </div>
      </div>
    </section>
  );
}
