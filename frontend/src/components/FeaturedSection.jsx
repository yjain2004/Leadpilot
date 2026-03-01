import { CheckCircle2 } from 'lucide-react';

export default function FeaturedSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Properties Curated Just for You
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our advisors personally shortlist properties that match your budget,
              preferred location, and timeline. No more scrolling through hundreds
              of irrelevant listings.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Budget-Aligned Options</h4>
                  <p className="text-gray-600">
                    Receive properties that match your financial comfort zone
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Location Intelligence</h4>
                  <p className="text-gray-600">
                    Insights on commute, amenities, and neighborhood growth
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Timeline-Based Service</h4>
                  <p className="text-gray-600">
                    Fast-tracked or relaxed — we work according to your schedule
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
                alt="Modern residential interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
