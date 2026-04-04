export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-sienna/20 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-6">
          <p className="font-serif text-3xl text-cream">Stolen</p>

          <p className="font-sans text-cream/70 leading-relaxed max-w-2xl mx-auto">
            This project was created on the traditional territory of the Haudenosaunee, Anishinaabe, and Mississaugas of the Credit. We acknowledge this land and the ongoing impacts of colonialism with responsibility.
          </p>

          <div className="border-t border-cream/20 pt-6 mt-6">
            <p className="font-sans text-cream/60 text-sm">
              Created for NBE 3U Indigenous Studies English Course
            </p>
            <p className="font-sans text-cream/60 text-sm mt-2">
              All content researched and cited from survivor testimonies, academic sources, and Indigenous-led organizations
            </p>
          </div>

          <div className="pt-6">
            <p className="font-sans text-cream/50 text-xs">
              This is a living history. The work continues.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
