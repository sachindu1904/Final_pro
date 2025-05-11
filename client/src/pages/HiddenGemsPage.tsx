import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Star, MapPin, Check, Award, UtensilsCrossed, Wifi, Bed, Bike, Calendar, User, Users, Heart } from 'lucide-react';

const HiddenGemsPage = () => {
  const navigate = useNavigate();
  const [budgetRange, setBudgetRange] = useState([5000, 30000]);
  const [activeTab, setActiveTab] = useState("villas");
  const [selectedLocation, setSelectedLocation] = useState("");

  const locations = [
    "All Locations", "Galle", "Ella", "Trincomalee", "Mirissa", "Unawatuna", "Kandy", "Colombo"
  ];

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const formatPrice = (price: number) => {
    return `LKR ${price.toLocaleString()}`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <Carousel className="w-full h-full">
          <CarouselContent>
            <CarouselItem>
              <div className="relative w-full h-[70vh]">
                <img 
                  src="/lovable-uploads/e1fbd532-d204-4205-88e4-3f33cdb60c7d.png" 
                  alt="Nine Arch Bridge Railway in Ella" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative w-full h-[70vh]">
                <img 
                  src="/lovable-uploads/fd6c4d0f-c13f-43ab-9a2a-8067717bbe38.png" 
                  alt="Secluded jungle villa" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative w-full h-[70vh]">
                <img 
                  src="/lovable-uploads/4d68e596-671d-4536-b657-819dfcce57a8.png" 
                  alt="Beachside café at sunset" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-white/80" />
          <CarouselNext className="right-4 bg-white/80" />
        </Carousel>
        
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10 px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-display">
              Beyond the Tourist Trail
              <span className="block text-eventuraa-orange">Sri Lanka's Best Hidden Gems!</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto">
              Experience the iconic railway journey through lush hills and discover authentic stays, eateries & local adventures
            </p>
          </div>
          
          {/* Search/Filter Bar */}
          <div className="bg-white rounded-lg shadow-lg p-5 w-full max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
              {/* Location dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              
              {/* Category tabs */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="villas">Villas</TabsTrigger>
                    <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
                    <TabsTrigger value="experiences">Experiences</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              {/* Budget slider */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Budget: {formatPrice(budgetRange[0])} - {formatPrice(budgetRange[1])}
                </label>
                <Slider 
                  defaultValue={[5000, 30000]}
                  min={5000}
                  max={50000}
                  step={1000}
                  value={budgetRange}
                  onValueChange={setBudgetRange}
                  className="py-4"
                />
              </div>
            </div>
            
            <Button className="w-full bg-eventuraa-orange hover:bg-orange-600 text-white">
              Explore Hidden Gems
            </Button>
          </div>
        </div>
      </section>
      
      {/* Why Hidden Gems Section */}
      <section className="py-12 bg-eventuraa-softPurple/20">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center font-display">Why Discover Hidden Gems?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
              <div className="bg-eventuraa-softPurple p-3 rounded-full mb-4">
                <Users className="text-eventuraa-purple w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Locally owned, authentic experiences</h3>
              <p className="text-gray-600">Support local businesses and enjoy genuine Sri Lankan hospitality</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
              <div className="bg-eventuraa-softPurple p-3 rounded-full mb-4">
                <Award className="text-eventuraa-purple w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Budget-friendly but high-quality</h3>
              <p className="text-gray-600">Great value for money without compromising on comfort</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
              <div className="bg-eventuraa-softPurple p-3 rounded-full mb-4">
                <Heart className="text-eventuraa-purple w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Rarely found on other platforms</h3>
              <p className="text-gray-600">Exclusive listings you won't find on mainstream travel sites</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
              <div className="bg-eventuraa-softPurple p-3 rounded-full mb-4">
                <Bike className="text-eventuraa-purple w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Extra perks: Free tuk-tuks & more!</h3>
              <p className="text-gray-600">Enjoy complimentary extras like scooter rentals or cooking classes</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Villas Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-display">Featured Hidden Gem Villas</h2>
            <Link to="/hidden-gems/villas" className="text-eventuraa-purple hover:underline">
              View all villas
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Villa Card 1 */}
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-200">
              <div className="relative">
                <img 
                  src="/lovable-uploads/c0345ab3-5c66-4001-8dca-4164369fc2cf.png" 
                  alt="Seaview Jungle Villa" 
                  className="h-60 w-full object-cover"
                />
                <Badge className="absolute top-3 right-3 bg-eventuraa-purple">
                  Eventuraa Certified Gem
                </Badge>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">Seaview Jungle Villa</h3>
                    <div className="flex items-center mt-1">
                      <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                      <span className="text-gray-500 text-sm">Mirissa</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 font-medium">4.9</span>
                    <span className="text-gray-500 text-xs ml-1">(120+)</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">Private beach access</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">Free scooter rental!</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">Organic home-cooked meals</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-500 text-sm">From</span>
                    <div className="font-bold text-lg">LKR 8,500/night</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-eventuraa-orange hover:bg-orange-600 text-white">
                  View Details
                </Button>
              </CardFooter>
            </Card>
            
            {/* Villa Card 2 */}
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-200">
              <div className="relative">
                <img 
                  src="/lovable-uploads/0c38344b-f01a-400f-9dec-0f7f75b5d3a7.png" 
                  alt="Tea Country Cottage" 
                  className="h-60 w-full object-cover"
                />
                <Badge className="absolute top-3 right-3 bg-eventuraa-purple">
                  Eventuraa Certified Gem
                </Badge>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">Tea Country Cottage</h3>
                    <div className="flex items-center mt-1">
                      <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                      <span className="text-gray-500 text-sm">Ella</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 font-medium">4.8</span>
                    <span className="text-gray-500 text-xs ml-1">(86)</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">Panoramic mountain views</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">Daily tea plantation tours</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">Traditional Sri Lankan breakfasts</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-500 text-sm">From</span>
                    <div className="font-bold text-lg">LKR 12,000/night</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-eventuraa-orange hover:bg-orange-600 text-white">
                  View Details
                </Button>
              </CardFooter>
            </Card>
            
            {/* Villa Card 3 */}
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-200">
              <div className="relative">
                <img 
                  src="/lovable-uploads/b6a9d026-333c-4874-b98f-150846df292c.png" 
                  alt="Lakeside Retreat Villa" 
                  className="h-60 w-full object-cover"
                />
                <Badge className="absolute top-3 right-3 bg-eventuraa-purple">
                  Eventuraa Certified Gem
                </Badge>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">Lakeside Retreat Villa</h3>
                    <div className="flex items-center mt-1">
                      <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                      <span className="text-gray-500 text-sm">Kandy</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 font-medium">4.7</span>
                    <span className="text-gray-500 text-xs ml-1">(92)</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">Private lakefront garden</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">Complimentary tuk-tuk service</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">Weekly cultural performances</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-500 text-sm">From</span>
                    <div className="font-bold text-lg">LKR 9,800/night</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-eventuraa-orange hover:bg-orange-600 text-white">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Local Restaurants Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-display">Hidden Gem Restaurants</h2>
            <Link to="/hidden-gems/restaurants" className="text-eventuraa-purple hover:underline">
              View all restaurants
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Restaurant Card 1 */}
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-200">
              <div className="relative">
                <img 
                  src="/lovable-uploads/a2effcba-e241-46f7-908d-8df11b65d7fd.png" 
                  alt="Mama's Kitchen" 
                  className="h-60 w-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">Mama's Kitchen</h3>
                    <div className="flex items-center mt-1">
                      <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                      <span className="text-gray-500 text-sm">Unawatuna</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 font-medium">4.9</span>
                    <span className="text-gray-500 text-xs ml-1">(205)</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-sm text-gray-600">Authentic Sri Lankan • Vegan Options</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <UtensilsCrossed className="w-4 h-4 text-orange-500 mr-2" />
                    <span className="text-sm">Best hoppers in town!</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-orange-500 mr-2" />
                    <span className="text-sm">Family-run since 1985</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-orange-500 mr-2" />
                    <span className="text-sm">Rooftop sunset views</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-eventuraa-orange hover:bg-orange-600 text-white">
                  Reserve a Table
                </Button>
              </CardFooter>
            </Card>
            
            {/* Restaurant Card 2 */}
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-200">
              <div className="relative">
                <img 
                  src="/lovable-uploads/fd6c4d0f-c13f-43ab-9a2a-8067717bbe38.png" 
                  alt="The Spice Garden" 
                  className="h-60 w-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">The Spice Garden</h3>
                    <div className="flex items-center mt-1">
                      <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                      <span className="text-gray-500 text-sm">Galle</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 font-medium">4.7</span>
                    <span className="text-gray-500 text-xs ml-1">(156)</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-sm text-gray-600">Fusion • Seafood Specialties</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <UtensilsCrossed className="w-4 h-4 text-orange-500 mr-2" />
                    <span className="text-sm">Fresh-caught seafood daily</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-orange-500 mr-2" />
                    <span className="text-sm">Secret spice blends</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-orange-500 mr-2" />
                    <span className="text-sm">Garden seating available</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-eventuraa-orange hover:bg-orange-600 text-white">
                  Reserve a Table
                </Button>
              </CardFooter>
            </Card>
            
            {/* Restaurant Card 3 */}
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-200">
              <div className="relative">
                <img 
                  src="/lovable-uploads/4d68e596-671d-4536-b657-819dfcce57a8.png" 
                  alt="Coconut Tree Café" 
                  className="h-60 w-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">Coconut Tree Café</h3>
                    <div className="flex items-center mt-1">
                      <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                      <span className="text-gray-500 text-sm">Mirissa</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 font-medium">4.8</span>
                    <span className="text-gray-500 text-xs ml-1">(112)</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-sm text-gray-600">Café • Vegetarian-Friendly</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <UtensilsCrossed className="w-4 h-4 text-orange-500 mr-2" />
                    <span className="text-sm">Best coconut coffee in town</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-orange-500 mr-2" />
                    <span className="text-sm">Beachfront location</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-orange-500 mr-2" />
                    <span className="text-sm">Live music on weekends</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-eventuraa-orange hover:bg-orange-600 text-white">
                  Reserve a Table
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Experiences Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 font-display">Unique Experiences</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="overflow-hidden hover:shadow-md transition-all duration-200 border-eventuraa-purple border-2">
              <div className="p-6 flex flex-col items-center text-center">
                <Bike className="w-12 h-12 text-eventuraa-purple mb-3" />
                <h3 className="font-bold text-lg mb-2">Villa Tuk-Tuk Tour</h3>
                <p className="text-gray-600 text-sm mb-4">Explore local villages with your villa's complimentary tuk-tuk service</p>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Free for guests!</Badge>
              </div>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-md transition-all duration-200 border-eventuraa-purple border-2">
              <div className="p-6 flex flex-col items-center text-center">
                <UtensilsCrossed className="w-12 h-12 text-eventuraa-purple mb-3" />
                <h3 className="font-bold text-lg mb-2">Local Cooking Class</h3>
                <p className="text-gray-600 text-sm mb-4">Learn authentic Sri Lankan recipes from local chefs</p>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">From LKR 2,500/person</Badge>
              </div>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-md transition-all duration-200 border-eventuraa-purple border-2">
              <div className="p-6 flex flex-col items-center text-center">
                <MapPin className="w-12 h-12 text-eventuraa-purple mb-3" />
                <h3 className="font-bold text-lg mb-2">Secret Waterfall Hike</h3>
                <p className="text-gray-600 text-sm mb-4">Guided tours to hidden natural wonders</p>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Guided by villa owners</Badge>
              </div>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-md transition-all duration-200 border-eventuraa-purple border-2">
              <div className="p-6 flex flex-col items-center text-center">
                <Calendar className="w-12 h-12 text-eventuraa-purple mb-3" />
                <h3 className="font-bold text-lg mb-2">Cultural Immersion</h3>
                <p className="text-gray-600 text-sm mb-4">Traditional music, dance, and craft demonstrations</p>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Weekly Events</Badge>
              </div>
            </Card>
          </div>
        </div>
      </section>
      
      {/* User Reviews Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center font-display">What Travelers Say</h2>
          
          <Carousel>
            <CarouselContent>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="bg-white p-6 rounded-xl shadow-sm mx-2">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-eventuraa-softPurple rounded-full flex items-center justify-center mr-4">
                      <User className="w-6 h-6 text-eventuraa-purple" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Sarah T.</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                    "Stayed at a Hidden Gem villa in Ella—best decision ever! The owner arranged a private tea plantation tour. The authentic Sri Lankan breakfast was incredible. 10/10!"
                  </p>
                </div>
              </CarouselItem>
              
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="bg-white p-6 rounded-xl shadow-sm mx-2">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-eventuraa-softPurple rounded-full flex items-center justify-center mr-4">
                      <User className="w-6 h-6 text-eventuraa-purple" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Michael J.</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                    "Mama's Kitchen in Unawatuna was the culinary highlight of our trip! Family-run with recipes passed down for generations. The hoppers were incredible and the sunset view was magical."
                  </p>
                </div>
              </CarouselItem>
              
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="bg-white p-6 rounded-xl shadow-sm mx-2">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-eventuraa-softPurple rounded-full flex items-center justify-center mr-4">
                      <User className="w-6 h-6 text-eventuraa-purple" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Elena R.</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                    "The complimentary tuk-tuk service at our villa made exploring so much easier! Our host showed us hidden spots tourists never find. This is how travel should be!"
                  </p>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-eventuraa-softPurple/20">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center font-display">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-eventuraa-purple text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Browse Hidden Gems</h3>
              <p className="text-gray-600">
                Discover curated villas, restaurants, and unique experiences that are off the typical tourist path.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-eventuraa-purple text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Book Directly</h3>
              <p className="text-gray-600">
                Secure your stay or experience with no middleman fees. Direct communication with owners.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-eventuraa-purple text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Enjoy VIP Local Treatment</h3>
              <p className="text-gray-600">
                Experience authentic Sri Lankan hospitality with personalized service and local insights.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 bg-eventuraa-purple text-white">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-display">Know a Hidden Gem?</h2>
          <p className="mb-8 text-white/90 max-w-2xl mx-auto">
            Help us showcase Sri Lanka's best-kept secrets. If you know a family-run villa, local restaurant, or unique experience that deserves recognition, let us know!
          </p>
          <Button className="bg-white text-eventuraa-purple hover:bg-gray-100">
            Suggest a Hidden Gem
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HiddenGemsPage;
