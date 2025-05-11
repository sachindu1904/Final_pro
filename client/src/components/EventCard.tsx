
import React, { useState } from 'react';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
  category: string;
  price: string;
  description?: string;
  ticketTypes?: TicketType[];
}

interface TicketType {
  name: string;
  price: number;
  available: number;
}

interface EventCardProps {
  event: Event;
  onSelect: () => void;
}

const EventCard = ({ event, onSelect }: EventCardProps) => {
  const { toast } = useToast();
  const [showTickets, setShowTickets] = useState(false);
  const [ticketCounts, setTicketCounts] = useState<Record<string, number>>({});
  
  // Default ticket types if none provided
  const ticketTypes = event.ticketTypes || [
    { name: "General Admission", price: 2500, available: 100 }
  ];
  
  const handleTicketChange = (ticketName: string, value: number) => {
    setTicketCounts({
      ...ticketCounts,
      [ticketName]: Math.max(0, Math.min(value, 4)) // Limit to 0-4 tickets
    });
  };
  
  const getTotalAmount = () => {
    return Object.entries(ticketCounts).reduce((total, [name, count]) => {
      const ticketType = ticketTypes.find(t => t.name === name);
      return total + (ticketType ? ticketType.price * count : 0);
    }, 0);
  };
  
  const handleProceedToCheckout = () => {
    const total = getTotalAmount();
    if (total === 0) {
      toast({
        title: "No tickets selected",
        description: "Please select at least one ticket to proceed",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Proceeding to checkout",
      description: `Total: LKR ${total} (+ 5% service fee)`,
    });
    
    // Here we would typically redirect to a checkout page or open a modal
    onSelect();
  };
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg border border-gray-100 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-3 left-3 bg-[#FFA500] hover:bg-orange-600 text-white z-20">
          {event.category}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-display font-bold">{event.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="pb-2 flex-grow">
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Calendar className="h-4 w-4 mr-1" />
          {event.date}
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          {event.location}
        </div>
        {event.description && (
          <CardDescription className="line-clamp-2 text-sm text-gray-500">
            {event.description}
          </CardDescription>
        )}
      </CardContent>
      
      <CardFooter className="pt-0 flex flex-col space-y-3">
        {showTickets ? (
          <div className="w-full">
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-3">
              <h3 className="text-sm font-semibold flex items-center mb-2">
                <Ticket className="h-4 w-4 mr-1" />
                Buy Tickets
              </h3>
              
              {ticketTypes.map((ticket, idx) => (
                <div key={idx} className="flex justify-between items-center py-1">
                  <div>
                    <span className="text-sm">{ticket.name}</span>
                    <p className="text-xs text-gray-500">{ticket.available} available</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">LKR {ticket.price}</span>
                    <input
                      type="number"
                      min="0"
                      max="4"
                      value={ticketCounts[ticket.name] || 0}
                      onChange={(e) => handleTicketChange(ticket.name, parseInt(e.target.value) || 0)}
                      className="w-12 h-7 text-center border rounded"
                    />
                  </div>
                </div>
              ))}
              
              <div className="mt-3 pt-2 border-t border-gray-200 flex justify-between items-center">
                <div className="text-xs text-gray-500">* 5% service fee applies</div>
                <div className="font-semibold text-sm">
                  Total: LKR {getTotalAmount()}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowTickets(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleProceedToCheckout}
                className="bg-[#1E90FF] hover:bg-blue-600 text-white"
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full flex items-center justify-between">
            <div className="font-semibold text-[#1E90FF]">{event.price}</div>
            <Button 
              onClick={() => setShowTickets(true)}
              className="bg-[#1E90FF] hover:bg-blue-600 text-white"
            >
              Buy Tickets
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventCard;
