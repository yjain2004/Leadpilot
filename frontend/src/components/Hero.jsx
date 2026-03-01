import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center text-white">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/60 to-slate-900/80"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Find the Right Property<br />Without the Hassle
        </h1>
        <p className="text-xl md:text-2xl mb-10 text-gray-200 font-light">
          Personalized property recommendations from local market experts
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={scrollToForm}
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Enquire Now
          </button>
          <button
            onClick={() => document.getElementById('trust-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 border border-white/30"
          >
            How It Works
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-white/70" />
      </div>
    </section>
  );
}
