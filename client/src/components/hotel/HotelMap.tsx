
import React, { useRef, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface HotelOnMap {
  id: string;
  name: string;
  lat: number;
  lng: number;
  price: number;
  image: string;
}

interface HotelMapProps {
  hotels: HotelOnMap[];
}

const HotelMap: React.FC<HotelMapProps> = ({ hotels }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [activeHotel, setActiveHotel] = useState<HotelOnMap | null>(null);
  
  const handleBooking = (hotelName: string) => {
    toast.success("Booking initiated for " + hotelName);
  };

  // This is a placeholder for actual map implementation
  // In a real application, you would integrate Google Maps or similar
  useEffect(() => {
    if (!mapContainer.current) return;
    
    const mapElement = mapContainer.current;
    
    // Create a simple representation of pins 
    hotels.forEach(hotel => {
      const pin = document.createElement('div');
      pin.className = 'absolute w-6 h-6 bg-eventuraa-blue rounded-full flex items-center justify-center text-white transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform';
      pin.style.left = `${50 + (hotel.lng * 5)}%`;
      pin.style.top = `${50 + (hotel.lat * 5)}%`;
      pin.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>';
      
      pin.addEventListener('click', () => {
        setActiveHotel(hotel);
      });
      
      pin.addEventListener('mouseenter', () => {
        const tooltip = document.createElement('div');
        tooltip.className = 'absolute bottom-full mb-2 bg-white p-2 rounded shadow-lg text-sm whitespace-nowrap';
        tooltip.innerHTML = `<div class="flex items-center gap-2">
          <img src="${hotel.image}" alt="${hotel.name}" class="w-10 h-10 object-cover rounded" />
          <div>
            <div class="font-medium">${hotel.name}</div>
            <div class="text-eventuraa-blue">From LKR ${hotel.price.toLocaleString()}</div>
          </div>
        </div>`;
        tooltip.id = `tooltip-${hotel.id}`;
        pin.appendChild(tooltip);
      });
      
      pin.addEventListener('mouseleave', () => {
        const tooltip = document.getElementById(`tooltip-${hotel.id}`);
        if (tooltip) tooltip.remove();
      });
      
      mapElement.appendChild(pin);
    });
    
    // Add some event venues and hospitals for demonstration
    const addSpecialPin = (lat: number, lng: number, type: 'event' | 'hospital') => {
      const pin = document.createElement('div');
      const color = type === 'event' ? 'bg-orange-500' : 'bg-red-600';
      pin.className = `absolute w-6 h-6 ${color} rounded-full flex items-center justify-center text-white transform -translate-x-1/2 -translate-y-1/2`;
      pin.style.left = `${50 + (lng * 5)}%`;
      pin.style.top = `${50 + (lat * 5)}%`;
      
      // Different icons based on type
      if (type === 'event') {
        pin.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>';
      } else {
        pin.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" x2="4" y1="22" y2="15"></line></svg>';
      }
      
      mapElement.appendChild(pin);
    };
    
    // Add some event venues and hospitals
    addSpecialPin(-0.5, 0.3, 'event');
    addSpecialPin(0.8, -0.5, 'event');
    addSpecialPin(0.2, 0.7, 'hospital');
    addSpecialPin(-0.7, -0.2, 'hospital');
    
    return () => {
      while (mapElement.firstChild) {
        mapElement.removeChild(mapElement.firstChild);
      }
    };
  }, [hotels]);

  return (
    <div className="relative bg-blue-50 rounded-lg overflow-hidden h-[calc(100vh-200px)]">
      <div className="absolute top-4 left-4 z-10 bg-white rounded-md shadow-md p-4 w-64">
        <h3 className="font-medium text-lg mb-2">Sort by</h3>
        <div className="flex flex-col gap-2">
          <Button variant="outline" className="justify-start">
            Closest to Event
          </Button>
          <Button variant="outline" className="justify-start">
            Best Rated
          </Button>
          <Button variant="outline" className="justify-start">
            Price: Low to High
          </Button>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h3 className="font-medium mb-2">Map Legend</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-eventuraa-blue rounded-full mr-2"></div>
              <span>Hotels</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-orange-500 rounded-full mr-2"></div>
              <span>Event Venues</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-600 rounded-full mr-2"></div>
              <span>Hospitals</span>
            </div>
          </div>
        </div>
      </div>
      
      <div ref={mapContainer} className="w-full h-full bg-[url('https://img.freepik.com/free-vector/abstract-city-map-with-pins-navigation-app_23-2148593320.jpg?w=1380&t=st=1714934839~exp=1714935439~hmac=1e56ff377d0582fe742663297c7665c86dda3e6eec4f26a04d3cb9b9fc39722c')] bg-cover bg-center relative">
        {/* Map pins will be added here by useEffect */}
      </div>
      
      {activeHotel && (
        <Card className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-4 shadow-lg flex gap-4 w-80">
          <img 
            src={activeHotel.image} 
            alt={activeHotel.name} 
            className="w-20 h-20 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="font-bold">{activeHotel.name}</h3>
            <p className="text-eventuraa-blue font-medium">LKR {activeHotel.price.toLocaleString()}</p>
            <div className="mt-2 flex gap-2">
              <Button 
                size="sm" 
                onClick={() => handleBooking(activeHotel.name)}
                className="bg-eventuraa-blue hover:bg-blue-600"
              >
                Book Now
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                asChild
              >
                <Link to={`/hotels/${activeHotel.id}`}>View Details</Link>
              </Button>
            </div>
          </div>
          <button 
            onClick={() => setActiveHotel(null)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </Card>
      )}
    </div>
  );
};

export default HotelMap;
