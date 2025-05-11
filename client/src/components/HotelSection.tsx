
import React from 'react';
import { Button } from '@/components/ui/button';

const HotelCard = ({ name, location, rating, image, price, features }: {
  name: string;
  location: string;
  rating: number;
  image: string;
  price: string;
  features: string[];
}) => {
  return (
    <div className="flex flex-col lg:flex-row bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-100">
      <div className="lg:w-1/3 h-48 lg:h-auto overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold mb-1">{name}</h3>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-eventuraa-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </div>
          </div>
          <div className="flex items-center bg-yellow-50 text-yellow-700 px-2 py-1 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span className="font-medium">{rating}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 my-3">
          {features.map((feature, i) => (
            <span key={i} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
              {feature}
            </span>
          ))}
        </div>
        
        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="block text-gray-500 text-sm">Per night</span>
            <span className="font-bold text-lg text-eventuraa-blue">{price}</span>
          </div>
          <Button className="bg-eventuraa-blue hover:bg-blue-600">Book Room</Button>
        </div>
      </div>
    </div>
  );
};

const HotelSection = () => {
  // Sample hotel data
  const hotels = [
    {
      name: "Cinnamon Grand Colombo",
      location: "Colombo",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGx1eHVyeSUyMGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      price: "LKR 32,000",
      features: ["Free WiFi", "Pool", "Spa", "Restaurant"]
    },
    {
      name: "The Grand Kandyan",
      location: "Kandy",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGx1eHVyeSUyMGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      price: "LKR 25,000",
      features: ["Mountain Views", "Breakfast Included", "Pool", "Spa"]
    }
  ];

  return (
    <section id="hotels" className="bg-white py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">Premium Accommodations</h2>
          <p className="section-subtitle">
            Find perfect stays across Sri Lanka - from beachfront resorts to mountain retreats
          </p>
        </div>

        <div className="space-y-6">
          {hotels.map((hotel, index) => (
            <HotelCard key={index} {...hotel} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="text-eventuraa-blue border-eventuraa-blue hover:bg-eventuraa-blue hover:text-white">
            Explore All Hotels
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HotelSection;
