import { ShieldCheck, MapPin, IndianRupee, Eye } from 'lucide-react';

export default function TrustSignals() {
  const signals = [
    {
      icon: ShieldCheck,
      title: 'Verified Listings',
      description: 'Every property is verified by our team before recommendations'
    },
    {
      icon: MapPin,
      title: 'Local Expertise',
      description: 'Deep knowledge of neighborhoods, pricing, and market trends'
    },
    {
      icon: IndianRupee,
      title: 'Transparent Pricing',
      description: 'Clear pricing with no hidden charges or surprise fees'
    },
    {
      icon: Eye,
      title: 'Assisted Site Visits',
      description: 'Schedule visits with our advisors at your convenience'
    }
  ];

  return (
    <section id="trust-section" className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {signals.map((signal, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="bg-teal-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <signal.icon className="w-7 h-7 text-teal-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {signal.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {signal.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
