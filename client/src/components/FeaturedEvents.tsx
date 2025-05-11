import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const EventCard = ({ title, date, location, image, category, price }: {
  title: string;
  date: string;
  location: string;
  image: string;
  category: string;
  price: string;
}) => {
  return (
    <div className="rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-all border border-gray-100 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <span className="absolute top-3 left-3 bg-eventuraa-purple text-white px-2 py-1 rounded-md text-xs z-20">
          {category}
        </span>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {date}
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {location}
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="font-semibold text-eventuraa-purple">{price}</div>
          <Button variant="outline" className="text-eventuraa-purple border-eventuraa-purple hover:bg-eventuraa-purple hover:text-white">
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

const FeaturedEvents = () => {
  // Sample event data
  const events = [
    {
      title: "Kandy Esala Perahera",
      date: "Aug 10-20, 2025",
      location: "Kandy",
      image: "https://images.unsplash.com/photo-1625140574538-40bc923f0112?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3JpJTIwbGFua2ElMjBwZXJhaGVyYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      category: "Cultural",
      price: "LKR 3,500"
    },
    {
      title: "Surfing Weekend",
      date: "Jun 15-17, 2025",
      location: "Arugam Bay",
      image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VyZnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      category: "Adventure",
      price: "LKR 8,000"
    },
    {
      title: "Traditional Cooking Class",
      date: "May 25, 2025",
      location: "Colombo",
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3JpJTIwbGFua2ElMjBmb29kfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      category: "Culinary",
      price: "LKR 2,500"
    },
    {
      title: "Tea Plantation Tour",
      date: "Jun 5, 2025",
      location: "Nuwara Eliya",
      image: "https://images.unsplash.com/photo-1576826244583-37e71b99fe8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRlYSUyMHBsYW50YXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      category: "Cultural",
      price: "LKR 4,000"
    }
  ];

  return (
    <section id="events" className="bg-gray-50 py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">Featured Experiences</h2>
          <p className="section-subtitle">
            Discover unique Sri Lankan experiences - from cultural festivals to adventure activities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild className="bg-eventuraa-purple hover:bg-eventuraa-darkPurple">
            <Link to="/events">View All Events</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
