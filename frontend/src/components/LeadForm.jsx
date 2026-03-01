import { useState } from 'react';
import { Send } from 'lucide-react';
import axios from "axios";

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    lookingFor: '',
    propertyType: '',
    location: '',
    budget: '',
    timeline: '',
    source: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      await axios.post("http://localhost:3000/api/leads", formData, { withCredentials: true });
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        lookingFor: '',
        propertyType: '',
        location: '',
        budget: '',
        timeline: '',
        source: '',
        message: ''
      });
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to submit lead");
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="enquiry-form" className="py-20 bg-gradient-to-b from-stone-50 to-stone-100">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Start Your Property Journey
            </h2>
            <p className="text-lg text-gray-600">
              Fill in your details and our AI assistant will guide you.
            </p>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 border border-green-200 rounded-lg text-center font-medium">
              Thank you! Your inquiry has been submitted successfully.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Looking For
                </label>
                <select
                  name="lookingFor"
                  value={formData.lookingFor}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none bg-white"
                >
                  <option value="">Select option</option>
                  <option value="buy">Buy</option>
                  <option value="rent">Rent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Property Type
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none bg-white"
                >
                  <option value="">Select type</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="independent-house">Independent House</option>
                  <option value="plot">Plot</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                  placeholder="e.g., Bandra, Mumbai"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Budget Range
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none bg-white"
                >
                  <option value="">Select budget</option>
                  <option value="20-40">₹20L - ₹40L</option>
                  <option value="40-60">₹40L - ₹60L</option>
                  <option value="60-1cr">₹60L - ₹1Cr</option>
                  <option value="1-2cr">₹1Cr - ₹2Cr</option>
                  <option value="2cr+">₹2Cr+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Move-in Timeline
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none bg-white"
                >
                  <option value="">Select timeline</option>
                  <option value="immediate">Immediate (Within 1 month)</option>
                  <option value="1-3months">1-3 months</option>
                  <option value="3-6months">3-6 months</option>
                  <option value="6months+">6+ months</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                How did you hear about us?
              </label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none bg-white"
              >
                <option value="">Select option</option>
                <option value="google">Google Search</option>
                <option value="social-media">Social Media</option>
                <option value="friend-referral">Friend Referral</option>
                <option value="advertisement">Advertisement</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Additional Requirements
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none resize-none"
                placeholder="Any specific requirements or preferences..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
            >
              {loading ? "Submitting..." : "Submit Enquiry"}
              {!loading && <Send className="w-5 h-5" />}
            </button>

            <p className="text-sm text-gray-500 text-center">
              By submitting this form, you agree to our Privacy Policy and Terms of Service
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
