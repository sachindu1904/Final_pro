
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Calendar, Search, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";

interface HotelFiltersProps {
  onFilter: (filters: any) => void;
  showMap: boolean;
  setShowMap: (show: boolean) => void;
}

const HotelFilters: React.FC<HotelFiltersProps> = ({ onFilter, showMap, setShowMap }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [priceRange, setPriceRange] = useState([5000, 50000]);
  const [amenities, setAmenities] = useState<string[]>([]);

  const locations = ['Colombo', 'Kandy', 'Galle', 'Negombo', 'Ella'];
  const amenitiesList = ['Wi-Fi', 'Pool', 'Breakfast Included', 'Beach Access', 'Spa', 'Gym'];

  const handleAmenityToggle = (amenity: string) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter(a => a !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };

  const handleFilter = () => {
    onFilter({
      location,
      dates: { checkIn, checkOut },
      priceRange,
      amenities
    });
  };

  return (
    <Card className="sticky top-0 z-10 bg-white p-4 shadow-md mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input 
              placeholder="Search location..." 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10"
            />
            <div className={`absolute z-10 bg-white shadow-lg rounded-md w-full mt-1 ${location ? 'block' : 'hidden'}`}>
              {locations
                .filter(loc => loc.toLowerCase().includes(location.toLowerCase()))
                .map(loc => (
                  <div 
                    key={loc} 
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setLocation(loc)}
                  >
                    {loc}
                  </div>
                ))
              }
            </div>
          </div>
        </div>

        <div className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input 
              type="date" 
              className="pl-10"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="relative flex-1">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input 
              type="date" 
              className="pl-10"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            onClick={handleFilter} 
            className="bg-eventuraa-blue hover:bg-blue-600"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(!isOpen)} 
            className="border-eventuraa-purple text-eventuraa-purple hover:bg-purple-50"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="show-map" className="text-sm font-medium">
              Map View
            </Label>
            <Switch 
              id="show-map" 
              checked={showMap} 
              onCheckedChange={setShowMap}
            />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-200">
          <div>
            <h3 className="font-medium mb-3">Price Range (LKR)</h3>
            <div className="px-2">
              <Slider 
                defaultValue={[priceRange[0], priceRange[1]]}
                max={100000}
                min={0}
                step={1000}
                onValueChange={(value: number[]) => setPriceRange(value)}
              />
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>LKR {priceRange[0].toLocaleString()}</span>
                <span>LKR {priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Amenities</h3>
            <div className="grid grid-cols-2 gap-2">
              {amenitiesList.map(amenity => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`amenity-${amenity}`} 
                    checked={amenities.includes(amenity)}
                    onCheckedChange={() => handleAmenityToggle(amenity)}
                  />
                  <Label htmlFor={`amenity-${amenity}`}>{amenity}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Property Type</h3>
            <div className="grid grid-cols-2 gap-2">
              {['Hotel', 'Resort', 'Villa', 'Apartment'].map(type => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox id={`type-${type}`} />
                  <Label htmlFor={`type-${type}`}>{type}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default HotelFilters;
