
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar, MapPin, Music, Search } from 'lucide-react';

interface EventSearchProps {
  onFilter: (filters: {
    category: string;
    location: string;
    date: string;
    priceRange: string;
  }) => void;
}

const EventSearch = ({ onFilter }: EventSearchProps) => {
  const [category, setCategory] = useState('all');
  const [location, setLocation] = useState('all');
  const [date, setDate] = useState('');
  const [priceRange, setPriceRange] = useState('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({
      category,
      location,
      date,
      priceRange
    });
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
      <h3 className="text-xl font-semibold mb-4 font-display">Find Events</h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <div className="relative">
            <Music className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full pl-9">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="music">Music & Concerts</SelectItem>
                <SelectItem value="cultural">Cultural Festivals</SelectItem>
                <SelectItem value="sports">Sports & Adventure</SelectItem>
                <SelectItem value="food">Food & Culinary</SelectItem>
                <SelectItem value="arts">Arts & Crafts</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-full pl-9">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="colombo">Colombo</SelectItem>
                <SelectItem value="kandy">Kandy</SelectItem>
                <SelectItem value="galle">Galle</SelectItem>
                <SelectItem value="nuwara-eliya">Nuwara Eliya</SelectItem>
                <SelectItem value="arugam-bay">Arugam Bay</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
            <Input 
              type="date" 
              className="pl-9" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select price range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="low">Under LKR 2,000</SelectItem>
              <SelectItem value="medium">LKR 2,000 - 5,000</SelectItem>
              <SelectItem value="high">Above LKR 5,000</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-end">
          <Button 
            type="submit" 
            className="w-full md:w-auto bg-[#1E90FF] hover:bg-blue-600"
          >
            <Search size={16} className="mr-2" />
            Search Events
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EventSearch;
