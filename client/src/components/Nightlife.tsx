
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, MartiniIcon, Calendar, PartyPopper, Disc } from "lucide-react";
import { Link } from 'react-router-dom';

const NightlifeCard = ({ 
  name, 
  id,
  type, 
  image, 
  location, 
  hours, 
  description
}: {
  name: string;
  id?: string;
  type: string;
  image: string;
  location: string;
  hours: string;
  description: string;
}) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg border border-gray-100 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <span className="absolute top-3 left-3 bg-eventuraa-purple text-white px-2 py-1 rounded-md text-xs z-20">
          {type}
        </span>
      </div>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription className="flex items-center gap-1 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {location}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <div className="flex items-center mb-3 text-xs text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {hours}
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link to={id ? `/nightlife/${id}` : "/nightlife"} className="w-full">
          <Button className="w-full bg-eventuraa-blue hover:bg-blue-600">
            {id ? "View Details & Reviews" : "Book a Table"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const PartyOrganizerCard = ({
  name,
  id,
  type,
  image,
  venues,
  social,
  description
}: {
  name: string;
  id?: string;
  type: string;
  image: string;
  venues: string[];
  social: string;
  description: string;
}) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg border border-gray-100 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <span className="absolute top-3 left-3 bg-eventuraa-orange text-white px-2 py-1 rounded-md text-xs z-20">
          {type}
        </span>
      </div>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription className="flex items-center gap-1 text-sm">
          <PartyPopper className="h-4 w-4" />
          {social}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-700 mb-1">Popular Venues:</p>
          <div className="flex flex-wrap gap-1">
            {venues.map((venue, idx) => (
              <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                {venue}
              </span>
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link to={id ? `/nightlife/${id}` : "/nightlife"} className="w-full">
          <Button className="w-full bg-eventuraa-orange hover:bg-orange-600">
            {id ? "View Events & Reviews" : "View Events"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const EventCard = ({
  name,
  date,
  image,
  venue,
  organizer,
  description
}: {
  name: string;
  date: string;
  image: string;
  venue: string;
  organizer: string;
  description: string;
}) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg border border-gray-100 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3 bg-eventuraa-blue text-white px-3 py-2 rounded-lg text-xs font-semibold z-20 flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          {date}
        </div>
      </div>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription className="flex items-center gap-1 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {venue}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <div className="flex items-center mb-3 text-xs text-gray-600">
          <PartyPopper className="h-4 w-4 mr-1" />
          <span>By {organizer}</span>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link to="/nightlife" className="w-full">
          <Button className="w-full bg-eventuraa-blue hover:bg-blue-600">
            Book Tickets
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const Nightlife = () => {
  const nightlifeVenues = [
    {
      id: "on14",
      name: "In The Moment",
      type: "Nightclub",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      location: "Colombo 03",
      hours: "10:00 PM - 4:00 AM",
      description: "A high-energy nightclub with top DJs, premium drinks, and an electric atmosphere perfect for dancing the night away."
    },
    {
      id: "sinclair",
      name: "La Foresta",
      type: "Brunch & Bar",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      location: "Colombo 07",
      hours: "11:00 AM - 2:00 AM",
      description: "Upscale dining venue that transforms into a vibrant bar in the evenings, featuring live music and craft cocktails."
    },
    {
      id: "b52",
      name: "Rhythm & Blues",
      type: "Lounge Bar",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      location: "Mount Lavinia",
      hours: "7:00 PM - 3:00 AM",
      description: "A sophisticated lounge with beach views, featuring signature cocktails and regular live music performances."
    },
    {
      id: "h2o",
      name: "Silk Colombo",
      type: "Nightclub",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      location: "Colombo 02",
      hours: "9:00 PM - 4:00 AM",
      description: "Premier nightlife destination with international DJs, VIP sections, and a state-of-the-art sound system."
    }
  ];

  const partyOrganizers = [
    {
      id: "inthemoment",
      name: "In The Moment (ITM)",
      type: "Event Organizer",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      venues: ["Sass Ultra Lounge", "RK Beach", "The Bay 5"],
      social: "@inthemoment.lk",
      description: "Known for high-energy beach parties and club events featuring top DJs from around the world."
    },
    {
      id: "subbeat",
      name: "Sub Beat",
      type: "Event Organizer",
      image: "https://images.unsplash.com/photo-1571266752333-31a55580148c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      venues: ["Clique", "Playtrix", "Beach Locations"],
      social: "@subbeat.lk",
      description: "Specializes in deep house, techno, and underground music events at top clubs and unique venues."
    },
    {
      id: "lifedance",
      name: "Life Dance",
      type: "Event Organizer",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      venues: ["Mirissa Beach", "Unawatuna", "Bentota"],
      social: "@lifedancesl",
      description: "Famous for massive beach raves featuring international and local DJs in Sri Lanka's most beautiful coastal locations."
    },
    {
      id: "crc",
      name: "Colombo Racing Crew",
      type: "Event Organizer",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      venues: ["Icon", "The Library", "Rooftop Venues"],
      social: "@colomboracingcrew",
      description: "Luxury parties with a mix of EDM, hip-hop, and commercial hits in Colombo's most exclusive venues."
    }
  ];

  const upcomingEvents = [
    {
      name: "Summer Beach Rave",
      date: "May 15, 2024",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      venue: "RK Beach, Hikkaduwa",
      organizer: "In The Moment",
      description: "An all-night beach party featuring international DJs, fire dancers, and beachside bars."
    },
    {
      name: "Underground Techno Night",
      date: "June 3, 2024",
      image: "https://images.unsplash.com/photo-1544616326-a85a9a456b7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      venue: "Clique, Colombo",
      organizer: "Sub Beat",
      description: "Experience the best of underground techno music with guest DJs from Europe."
    },
    {
      name: "Sunset Sessions",
      date: "May 22, 2024",
      image: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      venue: "The Bay 5, Mount Lavinia",
      organizer: "Life Dance",
      description: "A beachfront party starting at sunset and continuing into the night with top local DJs."
    },
    {
      name: "VIP Club Night",
      date: "June 10, 2024",
      image: "https://images.unsplash.com/photo-1545128485-c400ce7b23d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      venue: "Icon, Colombo",
      organizer: "Colombo Racing Crew",
      description: "An exclusive club night with bottle service, VIP areas, and the best commercial and EDM hits."
    }
  ];

  return (
    <section id="nightlife" className="py-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container-custom">
        <div className="flex items-center gap-3 justify-center mb-4">
          <MartiniIcon className="h-8 w-8 text-eventuraa-purple" />
          <Music className="h-6 w-6 text-eventuraa-blue" />
        </div>
        <div className="text-center mb-12">
          <h2 className="section-title text-white">Nightlife in Sri Lanka</h2>
          <p className="section-subtitle text-gray-300">
            Experience the vibrant nightlife scene with exclusive clubs, lounges, and dining experiences
          </p>
          <div className="mt-4">
            <Link to="/nightlife">
              <Button className="bg-eventuraa-blue hover:bg-blue-600">
                Explore All Venues & Reviews
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {nightlifeVenues.map((venue, index) => (
            <NightlifeCard key={index} {...venue} />
          ))}
        </div>

        <div className="mt-20 mb-4">
          <div className="flex items-center gap-3 justify-center mb-4">
            <PartyPopper className="h-8 w-8 text-eventuraa-orange" />
            <Disc className="h-6 w-6 text-eventuraa-blue" />
          </div>
          <div className="text-center mb-12">
            <h2 className="section-title text-white">Party Life in Sri Lanka</h2>
            <p className="section-subtitle text-gray-300">
              Discover the vibrant party scene with top event organizers hosting unforgettable experiences
            </p>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <PartyPopper className="h-5 w-5 text-eventuraa-orange" />
            Top Event Organizers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partyOrganizers.map((organizer, index) => (
              <PartyOrganizerCard key={index} {...organizer} />
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-eventuraa-blue" />
            Upcoming Events
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingEvents.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>
        </div>

        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 mt-12">
          <h3 className="text-xl font-semibold text-white mb-4">Tips for Partygoers</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-2">
              <div className="mt-1 bg-eventuraa-orange rounded-full p-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm text-gray-300">Check Instagram pages of event organizers for last-minute updates</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-1 bg-eventuraa-orange rounded-full p-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm text-gray-300">Pre-book tickets (sold via BookMyShow.lk or at the door)</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-1 bg-eventuraa-orange rounded-full p-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm text-gray-300">Beach parties are best in Mirissa & Unawatuna (Dec-April)</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link to="/nightlife">
            <Button className="bg-eventuraa-purple hover:bg-eventuraa-darkPurple">
              Explore All Nightlife Venues & Share Your Reviews
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Nightlife;
