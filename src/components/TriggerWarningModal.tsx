import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

export default function TriggerWarningModal() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenWarning = sessionStorage.getItem('hasSeenTriggerWarning');
    if (!hasSeenWarning) {
      setIsVisible(true);
    }
  }, []);

  const handleContinue = () => {
    sessionStorage.setItem('hasSeenTriggerWarning', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-charcoal/95 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-gradient-to-br from-sienna/20 to-ochre/10 border-2 border-ochre/40 rounded-2xl p-12 max-w-2xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-ochre/20 p-4 rounded-full">
            <AlertCircle className="text-ochre" size={40} />
          </div>
          <h2 className="font-serif text-4xl text-cream">Content Advisory</h2>
        </div>

        <div className="space-y-4 font-sans text-cream/90 text-lg leading-relaxed mb-8">
          <p>
            This website discusses the Sixties Scoop and the ongoing removal of Indigenous children from their families.
          </p>
          <p>
            The content includes discussions of:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-cream/80">
            <li>Child removal and family separation</li>
            <li>Abuse and trauma</li>
            <li>Cultural genocide and intergenerational harm</li>
            <li>Mental health challenges including suicide</li>
          </ul>
          <p>
            Please take care of yourself as you engage with this material.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            className="bg-ochre hover:bg-ochre/80 text-charcoal font-sans font-semibold px-12 py-4 rounded-lg transition-all duration-300 text-lg"
          >
            I Understand, Continue
          </button>
        </div>

        <p className="font-sans text-cream/60 text-sm text-center mt-6">
          This advisory will only appear once per session
        </p>
      </div>
    </div>
  );
}
