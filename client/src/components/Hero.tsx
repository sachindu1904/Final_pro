
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/b6a9d026-333c-4874-b98f-150846df292c.png" 
          alt="Sigiriya Rock in Sri Lanka" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
      </div>
      
      <div className="container-custom relative z-10 h-full flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display text-white mb-6 animate-fade-in">
          Discover Sri Lanka <span className="block text-yellow-300">Your Adventure Awaits!</span>
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-10 max-w-3xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Your all-in-one platform for booking authentic Sri Lankan experiences, comfortable stays, 
          and emergency medical services - all in one place.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Button className="bg-eventuraa-blue hover:bg-blue-600 text-white px-8 py-6 text-lg rounded-lg">
            Explore Events
          </Button>
          <Button className="bg-eventuraa-purple hover:bg-eventuraa-darkPurple text-white px-8 py-6 text-lg rounded-lg">
            Book Accommodation
          </Button>
          <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg rounded-lg">
            Need Medical Help?
          </Button>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <svg className="w-8 h-8 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;
