import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, User, Clock, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import api from '@/lib/axios';
import { format } from 'date-fns';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
    organizer: {
    name: string;
    email: string;
    organizerProfile?: {
      company: string;
      verified: boolean;
    };
  } | null;
  images: string[];
  tickets: {
    _id: string;
    name: string;
  price: number;
  quantity: number;
    sold: number;
  }[];
}

const EventPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchEventDetails();
  }, [id]);
  
  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!id) {
        setError('Event ID is missing');
        return;
      }
      
      const response = await api.get(`/events/${id}`);
      
      if (response.data.success) {
        setEvent(response.data.data);
      } else {
        setError(response.data.message || 'Failed to load event details');
        toast.error(response.data.message || 'Failed to load event details');
      }
    } catch (error: any) {
      console.error('Error fetching event details:', error);
      setError(error.response?.data?.message || 'An error occurred while fetching event details');
      toast.error('Failed to load event details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return format(date, 'EEEE, MMMM d, yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <span className="ml-2 text-gray-600">Loading event details...</span>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-16">
            <div className="p-6 mb-6 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
            <Button asChild variant="outline">
              <Link to="/events">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Events
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
    }
    
  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
            <p className="mb-8">The event you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/events">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Events
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <Button asChild variant="outline" className="mb-8">
            <Link to="/events">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Link>
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <div className="rounded-lg overflow-hidden h-[400px] bg-gray-100">
                {event.images && event.images.length > 0 ? (
                  <img
                    src={event.images[0]}
                    alt={event.title}
              className="w-full h-full object-cover"
            />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-200">
                    <Calendar className="h-20 w-20 text-gray-400" />
          </div>
                )}
              </div>

              {/* Event Details */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge className="capitalize">{event.category}</Badge>
              </div>

                <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="mr-3 h-5 w-5" />
                    <span>{formatDate(event.date)}</span>
        </div>
        
                  <div className="flex items-center text-gray-600">
                    <Clock className="mr-3 h-5 w-5" />
                    <span>{event.time}</span>
                      </div>
                      
                  <div className="flex items-center text-gray-600">
                    <MapPin className="mr-3 h-5 w-5" />
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <User className="mr-3 h-5 w-5" />
                    <span>By {event.organizer ? event.organizer.name : 'Unknown'}</span>
                  </div>
                </div>
                
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
                  <div className="whitespace-pre-line">{event.description}</div>
                </div>
                  </div>
                </div>
                
                {/* Sidebar */}
            <div className="space-y-6">
              {/* Ticket Information */}
              <div className="bg-white p-6 border rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Tickets</h2>
                
                {event.tickets && event.tickets.length > 0 ? (
                  <div className="space-y-4">
                    {event.tickets.map(ticket => (
                      <div key={ticket._id} className="p-4 border rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">{ticket.name}</h3>
                          <span className="font-semibold">${ticket.price.toFixed(2)}</span>
                        </div>
                        
                        <div className="text-sm text-gray-500 mb-4">
                          {ticket.quantity - ticket.sold} remaining
                        </div>
                        
                        <Button className="w-full" disabled={ticket.quantity <= ticket.sold}>
                          {ticket.quantity <= ticket.sold ? 'Sold Out' : 'Get Tickets'}
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No tickets available for this event.</p>
                )}
              </div>
              
              {/* Organizer Information */}
              {event.organizer && (
                <div className="bg-white p-6 border rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Organizer</h2>
                  
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <User className="h-6 w-6 text-gray-400" />
                    </div>
                    
                      <div>
                      <div className="font-medium">{event.organizer.name}</div>
                      {event.organizer.organizerProfile?.company && (
                        <div className="text-sm text-gray-500">{event.organizer.organizerProfile.company}</div>
                      )}
                    </div>
                    
                    {event.organizer.organizerProfile?.verified && (
                      <Badge className="ml-auto bg-green-100 text-green-800">Verified</Badge>
                    )}
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    View Profile
                  </Button>
                </div>
              )}
            </div>
          </div>
          </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventPage;
