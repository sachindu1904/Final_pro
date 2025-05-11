
import React from 'react';
import { Button } from '@/components/ui/button';

const UniqueFeatures = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-eventuraa-softPurple to-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">What Makes Eventuraa.lk Unique</h2>
          <p className="section-subtitle">
            Our platform offers exclusive features designed specifically for travelers in Sri Lanka
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Triple Integration System */}
          <div className="feature-card">
            <div className="w-14 h-14 mb-4 bg-eventuraa-softPurple rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-eventuraa-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Triple-Integration System</h3>
            <p className="text-gray-600 mb-4">
              A unique combination of event booking, hotel reservations, and emergency medical services - all in one seamless platform.
            </p>
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <p className="text-sm italic text-gray-600">
                "Book a Kandy Perahera ticket, reserve a nearby hotel, and have medical support on standby - all in one booking flow."
              </p>
            </div>
            <Button variant="outline" className="text-eventuraa-purple border-eventuraa-purple hover:bg-eventuraa-purple hover:text-white w-full">
              See How It Works
            </Button>
          </div>

          {/* Hyper-Local Focus */}
          <div className="feature-card">
            <div className="w-14 h-14 mb-4 bg-eventuraa-yellow rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Hyper-Local Focus</h3>
            <p className="text-gray-600 mb-4">
              We support Sri Lankan payment methods and curate niche local events that global platforms typically overlook.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">eZ Cash</div>
              <div className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Sampath Vishwa</div>
              <div className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Local Debit Cards</div>
              <div className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Village Festivals</div>
              <div className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Adventure Sports</div>
            </div>
            <Button variant="outline" className="text-amber-600 border-amber-600 hover:bg-amber-600 hover:text-white w-full">
              Explore Local Offerings
            </Button>
          </div>

          {/* Emergency Features */}
          <div className="feature-card">
            <div className="w-14 h-14 mb-4 bg-red-100 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Emergency Features</h3>
            <p className="text-gray-600 mb-4">
              Our "Doctor Dispatch" button shares your live location with nearby physicians, and our First Aid AR Guide provides critical instructions during emergencies.
            </p>
            <div className="bg-red-50 p-3 rounded-lg border border-red-100 mb-4">
              <p className="text-sm flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-red-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="text-red-800">
                  Average response time for Doctor Dispatch: <strong>15-30 minutes</strong> in major tourist areas.
                </span>
              </p>
            </div>
            <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white w-full">
              Learn About Safety Features
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniqueFeatures;
