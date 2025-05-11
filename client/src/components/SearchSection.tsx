
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SearchSection = () => {
  const [activeTab, setActiveTab] = useState("events");

  return (
    <div className="bg-white py-8 -mt-8 rounded-t-3xl relative z-20 shadow-lg">
      <div className="container-custom">
        <Tabs defaultValue="events" onValueChange={(value) => setActiveTab(value)} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8 w-full md:w-fit mx-auto">
            <TabsTrigger value="events" className="text-base">Events</TabsTrigger>
            <TabsTrigger value="hotels" className="text-base">Hotels</TabsTrigger>
            <TabsTrigger value="medical" className="text-base">Medical</TabsTrigger>
          </TabsList>
          
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <TabsContent value="events">
              <h3 className="text-xl font-semibold mb-4">Find Events in Sri Lanka</h3>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-eventuraa-purple focus:border-eventuraa-purple">
                    <option>All Events</option>
                    <option>Cultural Festivals</option>
                    <option>Music & Concerts</option>
                    <option>Sports & Adventure</option>
                    <option>Food & Culinary</option>
                    <option>Arts & Crafts</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-eventuraa-purple focus:border-eventuraa-purple">
                    <option>All Locations</option>
                    <option>Colombo</option>
                    <option>Kandy</option>
                    <option>Galle</option>
                    <option>Nuwara Eliya</option>
                    <option>Anuradhapura</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <Input type="date" className="w-full" />
                </div>
                <div className="flex items-end">
                  <Button className="w-full md:w-auto bg-eventuraa-purple hover:bg-eventuraa-darkPurple">
                    Search Events
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="hotels">
              <h3 className="text-xl font-semibold mb-4">Book Your Stay</h3>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                  <Input type="text" placeholder="Where are you going?" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                  <Input type="date" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                  <Input type="date" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-eventuraa-purple focus:border-eventuraa-purple">
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4+ Guests</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button className="w-full md:w-auto bg-eventuraa-blue hover:bg-blue-600">
                    Find Hotels
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="medical">
              <h3 className="text-xl font-semibold mb-4">Medical Assistance</h3>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500">
                    <option>Emergency Doctor</option>
                    <option>Pharmacy Delivery</option>
                    <option>Medical Transport</option>
                    <option>Teleconsultation</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Location</label>
                  <Input type="text" placeholder="Enter your location or use GPS" />
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Level</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500">
                    <option>Non-urgent</option>
                    <option>Urgent</option>
                    <option>Emergency</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button className="w-full md:w-auto bg-red-600 hover:bg-red-700">
                    Get Help Now
                  </Button>
                </div>
              </div>
              <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-lg">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-800">
                    For life-threatening emergencies, please call <strong>1990</strong> (Sri Lanka Emergency Services) immediately.
                  </p>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default SearchSection;
