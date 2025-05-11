
import React from 'react';
import EventCard from './EventCard';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
  category: string;
  price: string;
  description?: string;
}

interface EventSuggestionsProps {
  events: Event[];
}

const EventSuggestions = ({ events }: EventSuggestionsProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 font-display">You Might Also Like</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard 
            key={event.id} 
            event={event} 
            onSelect={() => console.log(`Selected suggested event: ${event.title}`)} 
          />
        ))}
      </div>
    </div>
  );
};

export default EventSuggestions;
