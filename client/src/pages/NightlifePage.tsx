
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MartiniIcon, Music, PartyPopper, Calendar, SearchIcon, MapIcon, Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface VenueProps {
  id: string;
  name: string;
  type: string;
  image: string;
  location: string;
  rating: number;
  hours?: string;
  music?: string;
  price?: string;
  description: string;
}

const VenueCard = ({ venue }: { venue: VenueProps }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg border border-gray-100 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
        <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
        <span className="absolute top-3 left-3 bg-eventuraa-purple text-white px-2 py-1 rounded-md text-xs z-20">
          {venue.type}
        </span>
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-bold mb-1">{venue.name}</h3>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapIcon className="h-3.5 w-3.5 mr-1" />
          {venue.location}
        </div>
        
        {venue.hours && (
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Clock className="h-3.5 w-3.5 mr-1" />
            {venue.hours}
          </div>
        )}
        
        <div className="flex items-center text-sm mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i}
              className={`h-4 w-4 ${
                i < venue.rating 
                  ? "text-yellow-400 fill-yellow-400" 
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-1 text-gray-600">({venue.rating})</span>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2">{venue.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <Link to={`/nightlife/${venue.id}`} className="w-full">
          <Button className="w-full bg-eventuraa-blue hover:bg-blue-600">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const EventOrganizerCard = ({ organizer }: { organizer: VenueProps }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg border border-gray-100 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
        <img src={organizer.image} alt={organizer.name} className="w-full h-full object-cover" />
        <span className="absolute top-3 left-3 bg-eventuraa-orange text-white px-2 py-1 rounded-md text-xs z-20">
          {organizer.type}
        </span>
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-bold mb-1">{organizer.name}</h3>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Music className="h-3.5 w-3.5 mr-1" />
          {organizer.music || "Various Genres"}
        </div>
        
        <div className="flex items-center text-sm mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i}
              className={`h-4 w-4 ${
                i < organizer.rating 
                  ? "text-yellow-400 fill-yellow-400" 
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-1 text-gray-600">({organizer.rating})</span>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2">{organizer.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <Link to={`/nightlife/${organizer.id}`} className="w-full">
          <Button className="w-full bg-eventuraa-orange hover:bg-orange-600">
            View Events
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const NightlifePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const nightclubVenues = [
    {
      id: "on14",
      name: "ON14 Rooftop Lounge & Nightclub",
      type: "Nightclub",
      image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      location: "Hilton Colombo",
      rating: 4.5,
      hours: "7:00 PM - 2:00 AM",
      music: "EDM, Hip-Hop, Bollywood",
      price: "1,500-3,000 LKR",
      description: "One of the most famous nightclubs, offering a rooftop experience with great views of the city."
    },
    {
      id: "sinclair",
      name: "Sinclair's",
      type: "Lounge & Club",
      image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      location: "Colombo 3",
      rating: 4.3,
      hours: "8:00 PM - 3:00 AM",
      music: "House, R&B, Pop Hits",
      price: "1,000-2,000 LKR",
      description: "A stylish lounge and nightclub with a mix of live music and DJs. Popular among expats and locals."
    },
    {
      id: "b52",
      name: "B52 Lounge & Club",
      type: "Nightclub",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      location: "Colombo 4",
      rating: 4.2,
      hours: "9:00 PM - 3:00 AM",
      music: "EDM, Hip-Hop, Remixes",
      price: "1,500-2,500 LKR",
      description: "A high-energy club with themed parties and international DJs. Known for its vibrant atmosphere."
    },
    {
      id: "kama",
      name: "Kama Colombo",
      type: "Rooftop Lounge",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      location: "Colombo 2",
      rating: 4.0,
      hours: "6:00 PM - 1:00 AM",
      music: "Electronic, Commercial",
      price: "1,500-2,500 LKR",
      description: "A trendy rooftop bar and club with a mix of electronic and commercial music."
    },
    {
      id: "electric",
      name: "Electric Peacock",
      type: "Lounge Club",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      location: "Park Street Mews",
      rating: 4.1,
      hours: "7:00 PM - 2:00 AM",
      music: "Mixed",
      price: "1,200-2,200 LKR",
      description: "A chic lounge that turns into a club at night with great cocktails and music."
    },
    {
      id: "h2o",
      name: "H²O",
      type: "Nightclub",
      image: "https://images.unsplash.com/photo-1556035511-3168381ea4d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      location: "Marino Mall, Colombo",
      rating: 3.9,
      hours: "8:00 PM - 3:00 AM",
      music: "EDM, Hip-Hop, Commercial",
      price: "1,000-2,000 LKR",
      description: "A popular club with a mix of EDM, hip-hop, and commercial hits."
    },
    {
      id: "rodeo",
      name: "Rodeo Pub & Club",
      type: "Pub & Club",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      location: "Negombo",
      rating: 3.8,
      hours: "7:00 PM - 2:00 AM",
      music: "Reggae, Pop, Electronic",
      price: "800-1,500 LKR",
      description: "A lively spot with a mix of locals and tourists, playing reggae, pop, and electronic music."
    },
    {
      id: "soul",
      name: "Soul Bar & Lounge",
      type: "Beach Bar",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      location: "Unawatuna",
      rating: 4.4,
      hours: "5:00 PM - 2:00 AM",
      music: "Beach House, Reggae, Pop",
      price: "800-1,500 LKR",
      description: "A beachfront club with fire shows and DJ parties."
    }
  ];
  
  const eventOrganizers = [
    {
      id: "inthemoment",
      name: "In The Moment (ITM)",
      type: "Event Organizer",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      location: "Various venues across Sri Lanka",
      rating: 4.8,
      music: "EDM, House, Techno",
      description: "Known for high-energy beach parties and club events with top DJs. Popular venues include Sass Ultra Lounge, RK Beach, and The Bay 5."
    },
    {
      id: "subbeat",
      name: "Sub Beat",
      type: "Event Organizer",
      image: "https://images.unsplash.com/photo-1571266752333-31a55580148c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      location: "Various venues across Sri Lanka",
      rating: 4.6,
      music: "Deep House, Techno, Underground",
      description: "Focuses on deep house, techno, and underground music. Hosts events at clubs like Clique, Playtrix, and beach locations."
    },
    {
      id: "lifedance",
      name: "Life Dance",
      type: "Event Organizer",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      location: "Beach locations across Sri Lanka",
      rating: 4.7,
      music: "EDM, Trance, House",
      description: "Famous for massive beach raves in Mirissa, Unawatuna, and Bentota. Features international & local DJs."
    },
    {
      id: "crc",
      name: "Colombo Racing Crew",
      type: "Event Organizer",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      location: "High-end venues in Colombo",
      rating: 4.5,
      music: "EDM, Hip-Hop, Commercial",
      description: "Luxury parties with a mix of EDM, hip-hop, and commercial hits. Events at high-end clubs like Icon, The Library, and rooftop venues."
    },
    {
      id: "sunburn",
      name: "Sunburn Beach Festival",
      type: "Festival Organizer",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      location: "Negombo or Colombo",
      rating: 4.9,
      music: "EDM, House, Trance",
      description: "Sri Lanka's version of the famous Indian EDM festival. Held in Negombo or Colombo with international DJs."
    }
  ];
  
  const filteredVenues = nightclubVenues.filter(venue => 
    venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venue.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredOrganizers = eventOrganizers.filter(org => 
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.music.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Banner - Updated with the new nightclub image */}
        <div className="relative h-96 flex items-center justify-center">
          <img 
            src="/lovable-uploads/d60073b8-962d-45d8-8047-f94815d79b13.png" 
            alt="Nightclub with confetti and crowd" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-purple-900/60"></div>
          <div className="relative z-10 text-center px-4">
            <div className="flex items-center gap-3 justify-center mb-4">
              <MartiniIcon className="h-8 w-8 text-eventuraa-orange" />
              <Music className="h-6 w-6 text-eventuraa-blue" />
              <PartyPopper className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display mb-2">
              Nightlife in Sri Lanka
            </h1>
            <p className="text-white text-xl md:text-2xl max-w-3xl mx-auto">
              Discover the best clubs, bars, and party organizers
            </p>
          </div>
        </div>
        
        {/* Search Section */}
        <div className="bg-white py-8 -mt-8 rounded-t-3xl relative z-20 shadow-lg">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  type="text"
                  placeholder="Search venues, organizers, or locations..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="venues" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="venues" className="text-lg">
                <MartiniIcon className="h-5 w-5 mr-2" />
                Nightlife Venues
              </TabsTrigger>
              <TabsTrigger value="organizers" className="text-lg">
                <PartyPopper className="h-5 w-5 mr-2" />
                Event Organizers
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="venues">
              {filteredVenues.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredVenues.map((venue) => (
                    <VenueCard key={venue.id} venue={venue} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-600">No venues found matching your search criteria.</p>
                  <Button 
                    className="mt-4 bg-eventuraa-blue hover:bg-blue-600"
                    onClick={() => setSearchTerm("")}
                  >
                    Clear Search
                  </Button>
                </div>
              )}
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-12">
                <h3 className="text-xl font-bold mb-4 font-display">Tips for Clubbing in Sri Lanka</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <div className="mt-1 bg-eventuraa-blue rounded-full p-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-700"><span className="font-semibold">Dress Code:</span> Most high-end clubs enforce a smart-casual dress code (no shorts or flip-flops).</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-1 bg-eventuraa-blue rounded-full p-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-700"><span className="font-semibold">Entry Fees:</span> Some clubs charge entry fees (around 1,000–3,000 LKR) or have guest-list systems.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-1 bg-eventuraa-blue rounded-full p-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-700"><span className="font-semibold">Alcohol Rules:</span> Alcohol is not sold on Poya (full moon) days, and some clubs may close early.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-1 bg-eventuraa-blue rounded-full p-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-700"><span className="font-semibold">Safety:</span> Stick to well-known clubs, avoid drugs (strict laws), and use registered taxis (PickMe/Uber) at night.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="organizers">
              {filteredOrganizers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredOrganizers.map((organizer) => (
                    <EventOrganizerCard key={organizer.id} organizer={organizer} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-600">No event organizers found matching your search criteria.</p>
                  <Button 
                    className="mt-4 bg-eventuraa-orange hover:bg-orange-600"
                    onClick={() => setSearchTerm("")}
                  >
                    Clear Search
                  </Button>
                </div>
              )}
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-12">
                <h3 className="text-xl font-bold mb-4 font-display">Tips for Partygoers</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start gap-2">
                    <div className="mt-1 bg-eventuraa-orange rounded-full p-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-700">Check Instagram pages of event organizers for last-minute updates</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-1 bg-eventuraa-orange rounded-full p-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-700">Pre-book tickets (sold via BookMyShow.lk or at the door)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-1 bg-eventuraa-orange rounded-full p-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-700">Beach parties are best in Mirissa & Unawatuna (Dec-April)</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <h3 className="text-xl font-bold mb-6 font-display">Best Monthly Parties & Weekly Events</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
                    <h4 className="font-bold mb-2">Clique (Colombo)</h4>
                    <p className="text-sm text-gray-700">Weekly DJ nights (Thursdays & Fridays)</p>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
                    <h4 className="font-bold mb-2">Sass Ultra Lounge</h4>
                    <p className="text-sm text-gray-700">Weekend parties with guest DJs</p>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
                    <h4 className="font-bold mb-2">The Bay 5 (Mount Lavinia)</h4>
                    <p className="text-sm text-gray-700">Beachfront parties on Saturdays</p>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
                    <h4 className="font-bold mb-2">RK Beach (Hikkaduwa)</h4>
                    <p className="text-sm text-gray-700">Full-moon and seasonal raves</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NightlifePage;
