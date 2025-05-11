
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SearchSection from '@/components/SearchSection';
import FeaturedEvents from '@/components/FeaturedEvents';
import HotelSection from '@/components/HotelSection';
import MedicalServices from '@/components/MedicalServices';
import UniqueFeatures from '@/components/UniqueFeatures';
import Nightlife from '@/components/Nightlife';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <SearchSection />
        <FeaturedEvents />
        <HotelSection />
        <MedicalServices />
        <UniqueFeatures />
        <Nightlife />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
