
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HotelCard from '@/components/hotel/HotelCard';
import HotelFilters from '@/components/hotel/HotelFilters';
import HotelMap from '@/components/hotel/HotelMap';
import { Button } from '@/components/ui/button';
import { Star, Wifi, UtensilsCrossed, Shield, CreditCard, ThumbsUp, Bath } from 'lucide-react';

const HotelListPage = () => {
  const [showMap, setShowMap] = useState(false);
  const [filters, setFilters] = useState({});
  
  // Mock hotel data
  const hotels = [
    {
      id: 'hotel1',
      name: 'Colombo Seaside Grand',
      rating: 4.5,
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGx1eHVyeSUyMGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1615460549969-36fa19521a4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGx1eHVyeSUyMGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
      ],
      price: 12500,
      originalPrice: 15000,
      location: 'Colombo',
      nearestEvent: {
        name: 'Colombo Jazz Festival',
        distance: '1.2km'
      },
      amenities: ['Free Cancellation', 'Breakfast Included', 'Beach Access'],
      cancellation: 'Free cancellation until May 20',
      eventProximity: '5-min walk to Colombo Jazz Festival',
      medicalService: '24/7 doctor on call',
      lat: -0.2,
      lng: 0.3
    },
    {
      id: 'hotel2',
      name: 'Kandy Heritage Resort',
      rating: 4.8,
      images: [
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGx1eHVyeSUyMGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGx1eHVyeSUyMGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aG90ZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
      ],
      price: 18500,
      location: 'Kandy',
      nearestEvent: {
        name: 'Kandy Perahera',
        distance: '0.5km'
      },
      amenities: ['Free Cancellation', 'Breakfast Included', 'Spa', 'Pool'],
      cancellation: 'Free cancellation until May 15',
      eventProximity: '2-min walk to Kandy Perahera route',
      medicalService: 'In-house medical center',
      lat: 0.5,
      lng: -0.3
    },
    {
      id: 'hotel3',
      name: 'Galle Fort View Hotel',
      rating: 4.6,
      images: [
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
      ],
      price: 22000,
      originalPrice: 25000,
      location: 'Galle',
      nearestEvent: {
        name: 'Galle Literary Festival',
        distance: '0.8km'
      },
      amenities: ['Free Wifi', 'Ocean View', 'Breakfast Included'],
      cancellation: 'Free cancellation until May 25',
      eventProximity: '10-min walk to Galle Literary Festival',
      medicalService: 'Doctor on call',
      lat: -0.6,
      lng: -0.4
    },
    {
      id: 'hotel4',
      name: 'Ella Mountain Retreat',
      rating: 4.7,
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1561501878-aabd62634533?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
      ],
      price: 15000,
      location: 'Ella',
      nearestEvent: {
        name: 'Ella Adventure Fest',
        distance: '2.5km'
      },
      amenities: ['Mountain View', 'Trekking Tours', 'Breakfast Included'],
      cancellation: 'Non-refundable',
      eventProximity: 'Shuttle service to Ella Adventure Fest',
      medicalService: 'First aid and local clinic arrangements',
      lat: 0.4,
      lng: 0.6
    },
    {
      id: 'hotel5',
      name: 'Negombo Beach Resort',
      rating: 4.3,
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGx1eHVyeSUyMGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
      ],
      price: 9800,
      originalPrice: 12000,
      location: 'Negombo',
      nearestEvent: {
        name: 'Beach Music Festival',
        distance: '0.2km'
      },
      amenities: ['Beach Access', 'Free Wifi', 'Water Sports'],
      cancellation: 'Free cancellation until May 10',
      eventProximity: 'Beachfront access to Beach Music Festival',
      medicalService: 'Medical clinic within resort',
      lat: -0.4,
      lng: 0.2
    },
    {
      id: 'hotel6',
      name: 'Sigiriya Lion Rock Hotel',
      rating: 4.9,
      images: [
        'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGx1eHVyeSUyMGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1615460549969-36fa19521a4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGx1eHVyeSUyMGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
      ],
      price: 28000,
      location: 'Sigiriya',
      nearestEvent: {
        name: 'Cultural Heritage Festival',
        distance: '3.5km'
      },
      amenities: ['Heritage Tours', 'Pool', 'Spa', 'Cultural Shows'],
      cancellation: 'Free cancellation until June 1',
      eventProximity: 'Complimentary shuttle to Cultural Heritage Festival',
      medicalService: 'In-house ayurvedic center and doctor on call',
      lat: 0.7,
      lng: -0.1
    }
  ];
  
  const mapHotels = hotels.map(hotel => ({
    id: hotel.id,
    name: hotel.name,
    lat: hotel.lat,
    lng: hotel.lng,
    price: hotel.price,
    image: hotel.images[0]
  }));

  const handleFilter = (newFilters: any) => {
    console.log('Filters applied:', newFilters);
    setFilters(newFilters);
    // In a real app, would filter the hotels based on these filters
  };

  // Featured hotels (top 3)
  const featuredHotels = hotels.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="relative">
          <div className="absolute inset-0 bg-black/40 z-0">
            <img 
              src="/lovable-uploads/a2effcba-e241-46f7-908d-8df11b65d7fd.png" 
              alt="Luxury infinity pool with forest view at sunset"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
            <div className="md:w-2/3 lg:w-1/2">
              {/* Hero Badge */}
              <div className="flex items-center mb-4">
                <span className="bg-eventuraa-blue text-xs font-semibold px-3 py-1 rounded-full text-white">
                  Premium Accommodations
                </span>
              </div>

              {/* Hero Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
                Stay Where the Action Is – Book Hotels Near Your Favorite Events!
              </h1>
              
              {/* Hero Subtitle */}
              <p className="text-xl text-white mb-8">
                Find the perfect accommodation close to Sri Lanka's most exciting events and experiences
              </p>

              {/* CTA Button */}
              <Button className="bg-eventuraa-orange hover:bg-orange-600 px-8 py-6 rounded-lg font-bold text-lg h-auto">
                Explore Hotels
              </Button>
            </div>
          </div>
        </div>
        
        {/* Search & Filter Section */}
        <div className="bg-white py-8 -mt-8 rounded-t-3xl relative z-20 shadow-lg">
          <div className="container mx-auto px-4">
            <HotelFilters onFilter={handleFilter} showMap={showMap} setShowMap={setShowMap} />
          </div>
        </div>
        
        {/* Featured Hotels Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-display mb-2">Top Picks Near Upcoming Events</h2>
            <p className="text-gray-600 mb-8">Exclusive accommodations with easy access to Sri Lanka's best events</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredHotels.map(hotel => (
                <div key={hotel.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative">
                    <img 
                      src={hotel.images[0]} 
                      alt={hotel.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-eventuraa-orange text-white text-xs font-bold px-2 py-1 rounded">
                      {hotel.nearestEvent.distance} to {hotel.nearestEvent.name}
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{hotel.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="ml-1 font-medium">{hotel.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{hotel.location}</p>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <Wifi className="h-4 w-4 text-gray-500" />
                      <Bath className="h-4 w-4 text-gray-500" />
                      <UtensilsCrossed className="h-4 w-4 text-gray-500" />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="block text-lg font-bold text-eventuraa-blue">
                          LKR {hotel.price.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-500">per night</span>
                      </div>
                      <Button className="bg-eventuraa-purple hover:bg-purple-800">
                        View Deal
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <Button variant="outline" className="border-eventuraa-blue text-eventuraa-blue hover:bg-blue-50">
                View All Hotels
              </Button>
            </div>
          </div>
        </section>
        
        {/* Main Hotel Listings */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Sidebar Filters (Desktop) */}
              <div className="hidden md:block w-64 flex-shrink-0">
                <div className="bg-white rounded-lg border border-gray-200 p-5 sticky top-24">
                  <h3 className="font-bold text-lg mb-4">Filter Hotels</h3>
                  
                  {/* Price Range */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Price Range</h4>
                    <div className="px-2">
                      {/* This is a simplified version, you might want to add a real slider here */}
                      <div className="h-2 bg-gray-200 rounded-full mb-2">
                        <div className="h-2 bg-eventuraa-blue rounded-full w-1/2"></div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>LKR 5,000</span>
                        <span>LKR 50,000</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Star Rating */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Star Rating</h4>
                    {[5, 4, 3, 2, 1].map(stars => (
                      <div key={stars} className="flex items-center mb-1">
                        <input type="checkbox" id={`stars-${stars}`} className="mr-2" />
                        <label htmlFor={`stars-${stars}`} className="flex">
                          {Array.from({ length: stars }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          ))}
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  {/* Amenities */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Amenities</h4>
                    {['Wi-Fi', 'Pool', 'Breakfast Included', 'Beach Access', 'Spa'].map(amenity => (
                      <div key={amenity} className="flex items-center mb-1">
                        <input type="checkbox" id={`amenity-${amenity}`} className="mr-2" />
                        <label htmlFor={`amenity-${amenity}`}>{amenity}</label>
                      </div>
                    ))}
                  </div>
                  
                  {/* Apply Filters Button */}
                  <Button className="w-full bg-eventuraa-blue hover:bg-blue-600">
                    Apply Filters
                  </Button>
                </div>
              </div>
              
              {/* Hotel Listings */}
              <div className="flex-1">
                {showMap ? (
                  <HotelMap hotels={mapHotels} />
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">{hotels.length} Hotels Found</h2>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Sort by:</span>
                        <select className="border rounded p-1 text-sm">
                          <option>Best Match</option>
                          <option>Price: Low to High</option>
                          <option>Price: High to Low</option>
                          <option>Distance to Event</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {hotels.map(hotel => (
                        <HotelCard key={hotel.id} {...hotel} />
                      ))}
                    </div>
                    
                    <div className="flex justify-center mt-8 mb-12">
                      <Button variant="outline" className="border-eventuraa-blue text-eventuraa-blue hover:bg-blue-50">
                        Load More Hotels
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Trust & Safety Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Trust & Safety</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="bg-eventuraa-purple/10 p-4 rounded-full mb-4">
                  <Shield className="h-8 w-8 text-eventuraa-purple" />
                </div>
                <h3 className="font-bold text-lg mb-2">Medical Assistance</h3>
                <p className="text-gray-600">24/7 medical assistance available at all our partner hotels for emergencies</p>
                <Button variant="link" className="mt-2 text-eventuraa-blue">
                  Learn More
                </Button>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="bg-eventuraa-blue/10 p-4 rounded-full mb-4">
                  <CreditCard className="h-8 w-8 text-eventuraa-blue" />
                </div>
                <h3 className="font-bold text-lg mb-2">Secure Payments</h3>
                <p className="text-gray-600">All transactions are encrypted and processed through secure payment gateways</p>
                <div className="flex gap-2 mt-2">
                  <img src="https://via.placeholder.com/40x25" alt="Visa" className="h-6" />
                  <img src="https://via.placeholder.com/40x25" alt="Mastercard" className="h-6" />
                </div>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="bg-eventuraa-orange/10 p-4 rounded-full mb-4">
                  <ThumbsUp className="h-8 w-8 text-eventuraa-orange" />
                </div>
                <h3 className="font-bold text-lg mb-2">Verified Reviews</h3>
                <p className="text-gray-600">All reviews are from verified guests who stayed at our partner hotels</p>
                <Button variant="link" className="mt-2 text-eventuraa-blue">
                  Read Reviews
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Special Offers */}
        <div className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Special Offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-block bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded mb-2">Limited Time</span>
                    <h3 className="text-xl font-bold mb-2">Book a Hotel + Sigiriya Festival Tickets</h3>
                    <p className="text-gray-700 mb-4">Get 15% off when you book together with the Cultural Heritage Festival</p>
                    <Button className="bg-eventuraa-blue hover:bg-blue-600">
                      View Package
                    </Button>
                  </div>
                  <div className="bg-blue-500 text-white font-bold px-3 py-2 rounded-full text-xl">
                    -15%
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-block bg-orange-600 text-white text-xs font-medium px-2 py-1 rounded mb-2">Weekend Only</span>
                    <h3 className="text-xl font-bold mb-2">Beach Hotels in Mirissa</h3>
                    <p className="text-gray-700 mb-4">Stay for 2 nights, get the 3rd night free near Beach Music Festival</p>
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      View Deal
                    </Button>
                  </div>
                  <div className="bg-orange-500 text-white font-bold px-3 py-2 rounded-full text-xl">
                    3for2
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Cultural Compatibility Badges */}
        <div className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Cultural Compatibility</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-2">🕌</span>
                  <h3 className="text-xl font-semibold">Muslim-Friendly</h3>
                </div>
                <p className="text-gray-600">Hotels with halal food options, prayer facilities, and alcohol-free dining areas.</p>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-2">☸️</span>
                  <h3 className="text-xl font-semibold">Buddhist-Friendly</h3>
                </div>
                <p className="text-gray-600">Properties that respect Poya day observances with vegetarian options and quiet zones.</p>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-2">🥗</span>
                  <h3 className="text-xl font-semibold">Vegan/Vegetarian</h3>
                </div>
                <p className="text-gray-600">Accommodations with dedicated plant-based dining options and eco-friendly amenities.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HotelListPage;

