
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface Place {
  name: string;
  distance: string;
}

interface LocationSuggestionsProps {
  places: Place[];
}

const LocationSuggestions = ({ places }: LocationSuggestionsProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 font-display">Location & Nearby Places</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-lg overflow-hidden shadow-md h-96">
          {/* This would be replaced with an actual Google Map component */}
          <div className="bg-blue-50 h-full w-full flex items-center justify-center relative">
            <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Sri+Lanka&zoom=7&size=800x600&key=YOUR_API_KEY')] bg-cover opacity-70"></div>
            <div className="relative z-10 text-center p-6 bg-white/80 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
              <p className="text-gray-600">
                In the actual implementation, a Google Maps component would be integrated here 
                showing event locations and nearby attractions.
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-display">Nearby Places</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {places.map((place, index) => (
                  <li key={index} className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-0">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-[#1E90FF]" />
                      <span>{place.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{place.distance}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LocationSuggestions;
