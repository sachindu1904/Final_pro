import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, AlertCircle, Loader2, Calendar, MapPin, User } from 'lucide-react';
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
  location: string;
  category: string;
  organizer: {
    name: string;
  } | null;
  images: string[];
}

const EventsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'cultural', name: 'Cultural' },
    { id: 'music', name: 'Music' },
    { id: 'sports', name: 'Sports' },
    { id: 'culinary', name: 'Culinary' },
    { id: 'adventure', name: 'Adventure' },
    { id: 'business', name: 'Business' },
    { id: 'other', name: 'Other' }
  ];
  
  useEffect(() => {
    fetchApprovedEvents();
  }, []);
  
  const fetchApprovedEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get('/events');
      
      if (response.data.success) {
        setEvents(response.data.data || []);
        
        if (response.data.count === 0) {
          setError('No approved events found. Please check back later.');
        }
      } else {
        setError(response.data.message || 'Failed to load events');
        toast.error(response.data.message || 'Failed to load events');
      }
    } catch (error: any) {
      console.error('Error fetching events:', error);
      setError(error.response?.data?.message || 'An error occurred while fetching events');
      toast.error('Failed to load events. Please try again later.');
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
  
  const truncateDescription = (text: string, maxLength: number = 150): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  const filteredEvents = events.filter(event => {
    // Filter by search term
    const matchesSearch = 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.organizer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
      
    // Filter by category
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-2">Discover Events</h1>
            <p className="text-gray-600">Find and join amazing events happening around you</p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input 
                placeholder="Search events..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Badge 
                  key={category.id}
                  className={`cursor-pointer px-3 py-1 ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground hover:bg-primary/80'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
          
          {error && (
            <div className="p-4 mb-6 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}
          
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <span className="ml-2 text-gray-600">Loading events...</span>
            </div>
          ) : (
            <>
              {filteredEvents.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                  <h3 className="text-xl font-semibold mb-2">No events found</h3>
                  <p>Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map((event) => (
                    <Card key={event._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="h-48 overflow-hidden bg-gray-100">
                        {event.images && event.images.length > 0 ? (
                          <img
                            src={event.images[0]}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full bg-gray-200">
                            <Calendar className="h-16 w-16 text-gray-400" />
                          </div>
                        )}
                      </div>
                      
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{event.title}</CardTitle>
                            <CardDescription className="text-sm flex items-center mt-1">
                              <Calendar className="mr-1 h-4 w-4" /> 
                              {formatDate(event.date)}
                            </CardDescription>
                          </div>
                          <Badge className="capitalize">{event.category}</Badge>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <MapPin className="mr-1 h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <User className="mr-1 h-4 w-4" />
                          <span>By {event.organizer ? event.organizer.name : 'Unknown'}</span>
                        </div>
                        
                        <p className="text-gray-700">
                          {truncateDescription(event.description)}
                        </p>
                      </CardContent>
                      
                      <CardFooter className="pt-0">
                        <Button asChild className="w-full">
                          <Link to={`/events/${event._id}`}>View Details</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventsList; 