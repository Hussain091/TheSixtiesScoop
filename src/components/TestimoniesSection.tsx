import { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonies = [
  {
    name: 'Christine Miskonoodinkwe Smith',
    nation: 'Saulteaux, Peguis First Nation',
    year: '2021',
    story:
      'She was taken as a child and placed in the child welfare system. In her 2021 memoir These Are the Stories: Memories of a 60s Scoop Survivor, she describes moving through the system, losing connection to her birth mother, and eventually reconnecting before her mother died. She wrote that reconnection allowed her to finally feel "complete, whole, and home." She has since published two books, earned a Master\'s in Education in Social Justice, and edits anthologies of survivor voices. Her work is an act of reclamation and resurgence.',
    color: 'from-sienna/20 to-ochre/10',
  },
  {
    name: 'Christine',
    nation: 'Anishnaabe, Winnipeg',
    year: '2020',
    story:
      '"I am a Sixties Scoop survivor, a Bill C-31 status Anishnaabe woman and a daughter of a Saulteaux mother and a Cree father. I was born in Winnipeg more than 40 years ago... child welfare officials from the city stepped in and took me and three other siblings away from her. When I was 3 years old, my sister and I were adopted together into an affluent Caucasian family and brought to live in Ontario. My childhood was not happy. In fact, it was rather traumatic and has left searing emotional scars on me to this day. My adoptive home was fraught with many emotional, physical, mental and spiritual abuses... I was treated like a prisoner."',
    color: 'from-ochre/20 to-sienna/10',
  },
  {
    name: 'Tauni Sheldon',
    nation: 'Inuit, taken 1970',
    year: '2023',
    story:
      'Taken from her birth mother three hours after birth. Advertised in the Toronto Telegram as an "Eskimo Baby"—the ad described her like a product. Adopted by a white family in southern Ontario. First saw her biological mother at age 23 at the Winnipeg airport. Describes experiencing severe racism growing up, rejecting her own identity, and years of anger: "I experienced a lot of racism... I didn\'t want to be who I was." She has since worked to rebuild the relationship with her biological mother.',
    color: 'from-sage/20 to-sienna/10',
  },
  {
    name: 'David Mortimer',
    nation: 'Winnipeg',
    year: '2026',
    story:
      'Did not know he was adopted or that he was a Sixties Scoop survivor until his sister made a DNA connection through his son. He was taken in 1969. His birth mother Linda had searched for him for over 50 years, having been told he died at birth. He writes: "Everything I had believed to be true in my life was now in question—my name, my family, my heritage. Processing this information was amongst the hardest things I have ever endured." He says reconciliation "is hard and it is personal. It requires vulnerability to accept truths that are difficult to understand and even harder to process."',
    color: 'from-cream/10 to-ochre/10',
  },
  {
    name: 'Rolanda Murphy-McPhee',
    nation: 'Ojibway, taken at 8 months old',
    year: '2022',
    story:
      'She and her two-year-old sister Kati were taken from their birth family. She did not learn about her Indigenous heritage until much later in life. She is now a teacher at the Pearson Electrotechnology Centre, an army reservist, a cadet officer, and an artist. She works with youth aged 12–18 and shares her story publicly. She holds an eagle feather gifted by former Chief Donovan Fontaine for her efforts to reconnect with her community. She is learning Ojibway, her language. She says: "Education is key. People need to hear the stories."',
    color: 'from-sienna/15 to-sage/10',
  },
];

export default function TestimoniesSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimony = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonies.length);
  };

  const prevTestimony = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonies.length) % testimonies.length);
  };

  const current = testimonies[currentIndex];

  return (
    <section
      id="testimonies"
      ref={ref}
      className={`py-32 px-6 bg-charcoal transition-all duration-1000 ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-6xl md:text-7xl text-cream mb-8 text-center">
          Survivor Testimonies
        </h2>

        <p className="font-sans text-xl text-cream/70 text-center mb-20 max-w-3xl mx-auto">
          These are not statistics. These are people. These are lives. These stories matter.
        </p>

        <div className="max-w-5xl mx-auto">
          <div
            className={`bg-gradient-to-br ${current.color} border border-sienna/30 rounded-2xl p-12 mb-8 min-h-[500px] flex flex-col justify-between transition-all duration-500`}
          >
            <div>
              <div className="w-24 h-24 bg-ochre/30 rounded-full mb-8 flex items-center justify-center">
                <div className="w-16 h-16 bg-ochre/50 rounded-full"></div>
              </div>

              <h3 className="font-serif text-4xl text-cream mb-2">{current.name}</h3>
              <p className="font-sans text-ochre text-lg mb-1">{current.nation}</p>
              <p className="font-sans text-cream/60 text-sm mb-8">Source: {current.year}</p>

              <p className="font-sans text-cream/90 text-lg leading-relaxed">{current.story}</p>
            </div>

            <div className="flex items-center justify-between mt-8 pt-8 border-t border-cream/20">
              <button
                onClick={prevTestimony}
                className="flex items-center gap-2 text-cream/80 hover:text-cream transition-colors group"
              >
                <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-sans">Previous</span>
              </button>

              <div className="flex gap-2">
                {testimonies.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-ochre w-8'
                        : 'bg-cream/30 hover:bg-cream/50'
                    }`}
                    aria-label={`Go to testimony ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimony}
                className="flex items-center gap-2 text-cream/80 hover:text-cream transition-colors group"
              >
                <span className="font-sans">Next</span>
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <p className="font-sans text-cream/60 text-center italic">
            {currentIndex + 1} of {testimonies.length}
          </p>
        </div>
      </div>
    </section>
  );
}
