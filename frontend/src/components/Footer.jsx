import { Building2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-amber-600 p-2 rounded-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">LeadPilot</h3>
              <p className="text-sm text-gray-400">Your Trusted Property Advisor</p>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-gray-400 mb-2">
              Serving Mumbai, Pune, Bangalore
            </p>
            <p className="text-xs text-gray-500">
              All properties are verified and sourced from trusted partners
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} LeadPilot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
