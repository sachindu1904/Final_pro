
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Star, Wifi, Coffee, Waves, MapPin, Clock, Phone } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface HotelCardProps {
  id: string;
  name: string;
  rating: number;
  images: string[];
  price: number;
  originalPrice?: number;
  location: string;
  nearestEvent?: {
    name: string;
    distance: string;
  };
  amenities: string[];
  cancellation?: string;
  eventProximity?: string;
  medicalService?: string;
}

const HotelCard: React.FC<HotelCardProps> = ({
  id,
  name,
  rating,
  images,
  price,
  originalPrice,
  location,
  nearestEvent,
  amenities,
  cancellation,
  eventProximity,
  medicalService
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleBooking = () => {
    toast.success("Booking initiated for " + name);
  };

  const toggleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  return (
    <Card 
      className={`overflow-hidden transition-all duration-300 ${isHovered ? 'shadow-lg translate-y-[-4px]' : 'shadow-md'} ${isExpanded ? 'h-auto' : 'h-[360px]'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        {/* Image Carousel */}
        <div className="relative h-48">
          <Carousel className="w-full">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="h-48">
                    <img 
                      src={image} 
                      alt={`${name} - image ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8" />
            <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8" />
            
            {isHovered && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <Link to={`/hotels/${id}`} className="px-4 py-2 bg-white font-medium text-gray-800 rounded hover:bg-gray-100">
                  View Deal
                </Link>
              </div>
            )}
          </Carousel>
        </div>
        
        {/* Main Content */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-bold">{name}</h3>
              <div className="flex items-center text-yellow-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="ml-1 text-sm">{rating}</span>
              </div>
              <p className="text-gray-600 text-sm flex items-center mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                {location}
              </p>
            </div>
            
            <div className="text-right">
              {originalPrice && (
                <p className="text-gray-500 line-through text-sm">LKR {originalPrice.toLocaleString()}</p>
              )}
              <p className="font-bold text-eventuraa-blue">LKR {price.toLocaleString()}</p>
              <p className="text-xs text-gray-500">per night</p>
            </div>
          </div>
          
          {nearestEvent && (
            <div className="bg-blue-50 text-blue-800 px-2 py-1 rounded text-xs mb-3">
              {nearestEvent.distance} from {nearestEvent.name}
            </div>
          )}
          
          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-3">
            {amenities.map((amenity, index) => (
              <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                {amenity}
              </span>
            ))}
          </div>
          
          {/* Quick View Content */}
          {isExpanded && (
            <div className="mt-2 pt-3 border-t border-gray-200 space-y-2 text-sm">
              {eventProximity && (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-eventuraa-purple" />
                  <p>{eventProximity}</p>
                </div>
              )}
              
              {medicalService && (
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-red-500" />
                  <p>{medicalService}</p>
                </div>
              )}
              
              {cancellation && (
                <div className={`flex items-center ${cancellation.includes('Free') ? 'text-green-600' : 'text-red-600'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>{cancellation}</p>
                </div>
              )}
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="mt-auto pt-3 flex gap-2">
            <Button 
              onClick={handleBooking}
              className="flex-1 bg-eventuraa-blue hover:bg-blue-600"
            >
              Book Now
            </Button>
            <Button 
              variant="outline" 
              onClick={toggleQuickView}
              className="border-eventuraa-blue text-eventuraa-blue hover:bg-blue-50"
            >
              {isExpanded ? 'Hide Details' : 'Quick View'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HotelCard;
