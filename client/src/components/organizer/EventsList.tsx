import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Calendar, Plus, Search, MoreVertical, Edit, Trash, BarChart, Eye, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import api from '@/lib/axios';
import { format } from 'date-fns';

interface Ticket {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  sold: number;
}

interface Event {
  _id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  images: string[];
  description: string;
  published: boolean;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  adminFeedback?: string;
  tickets: Ticket[];
  createdAt: string;
  updatedAt: string;
}

const EventsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchEvents();
  }, []);
  
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use the public endpoint for testing
      const response = await api.get('/public/events');
      
      if (response.data.success) {
        setEvents(response.data.events);
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
  
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getEventStatus = (event: Event): 'upcoming' | 'ongoing' | 'completed' => {
    const eventDate = new Date(event.date);
    const today = new Date();
    
    // Set event date hours from the time string (format: "HH:MM")
    if (event.time) {
      const [hours, minutes] = event.time.split(':').map(Number);
      eventDate.setHours(hours, minutes);
    }
    
    // Set to midnight for comparison
    today.setHours(0, 0, 0, 0);
    
    if (eventDate > today) {
      return 'upcoming';
    } else if (eventDate.toDateString() === today.toDateString()) {
      return 'ongoing';
    } else {
      return 'completed';
    }
  };
  
  const getStatusBadge = (event: Event) => {
    // First check the approval status
    if (event.approvalStatus === 'pending') {
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending Approval</Badge>;
    }
    
    if (event.approvalStatus === 'rejected') {
      return <Badge className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
    }
    
    // Next check if the event is a draft
    if (!event.published) {
      return <Badge variant="outline" className="bg-gray-100 text-gray-800">Draft</Badge>;
    }
    
    // If approved and published, show the event status
    const status = getEventStatus(event);
    
    switch(status) {
      case 'upcoming':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Upcoming</Badge>;
      case 'ongoing':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Ongoing</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Completed</Badge>;
      default:
        return null;
    }
  };
  
  const getTotalTicketsSold = (tickets: Ticket[]): number => {
    return tickets.reduce((total, ticket) => total + ticket.sold, 0);
  };
  
  const getTotalTickets = (tickets: Ticket[]): number => {
    return tickets.reduce((total, ticket) => total + ticket.quantity, 0);
  };
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return format(date, 'MMM d, yyyy');
  };
  
  const handleDelete = async (eventId: string, eventTitle: string) => {
    if (window.confirm(`Are you sure you want to delete "${eventTitle}"?`)) {
      try {
        const response = await api.delete(`/events/${eventId}`);
        
        if (response.data.success) {
          // Remove the event from the state
          setEvents(events.filter(event => event._id !== eventId));
          toast.success(`Event "${eventTitle}" has been deleted`);
        } else {
          toast.error(response.data.message || 'Failed to delete event');
        }
      } catch (error: any) {
        console.error('Error deleting event:', error);
        toast.error(error.response?.data?.message || 'An error occurred while deleting the event');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Events</h1>
          <p className="text-gray-600">Manage your events and ticket sales</p>
        </div>
        <Link to="/organizer-portal/events/new">
          <Button className="bg-[#7E69AB] hover:bg-[#6E59A5]">
            <Plus size={16} className="mr-2" />
            Create Event
          </Button>
        </Link>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input 
            placeholder="Search events..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchEvents}>
            <Calendar size={16} className="mr-2" />
            Refresh
          </Button>
        </div>
      </div>
      
      {error && (
        <div className="p-4 mb-6 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}
      
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#7E69AB]" />
          <span className="ml-2 text-gray-600">Loading events...</span>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ticket Sales</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    {events.length === 0 ? (
                      <>
                        No events found. Create your first event!
                        <div className="mt-4">
                          <Link to="/organizer-portal/events/new">
                            <Button size="sm" className="bg-[#7E69AB] hover:bg-[#6E59A5]">
                              <Plus size={16} className="mr-2" />
                              Create Event
                            </Button>
                          </Link>
                        </div>
                      </>
                    ) : (
                      'No events match your search. Try a different search term.'
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                filteredEvents.map((event) => {
                  const totalSold = getTotalTicketsSold(event.tickets);
                  const totalTickets = getTotalTickets(event.tickets);
                  
                  return (
                    <TableRow key={event._id}>
                      <TableCell className="font-medium">{event.title}</TableCell>
                      <TableCell>{formatDate(event.date)}</TableCell>
                      <TableCell>{event.location}</TableCell>
                      <TableCell>{getStatusBadge(event)}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-[#7E69AB] h-2 rounded-full" 
                              style={{ 
                                width: totalTickets > 0 
                                  ? `${Math.round((totalSold / totalTickets) * 100)}%` 
                                  : '0%' 
                              }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">
                            {totalSold}/{totalTickets}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link to={`/organizer-portal/events/${event._id}`} className="cursor-pointer flex items-center">
                                <Edit size={16} className="mr-2" /> Edit Event
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/events/${event._id}`} className="cursor-pointer flex items-center">
                                <Eye size={16} className="mr-2" /> Preview
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/organizer-portal/analytics?event=${event._id}`} className="cursor-pointer flex items-center">
                                <BarChart size={16} className="mr-2" /> View Sales
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600 focus:text-red-600 cursor-pointer flex items-center"
                              onClick={() => handleDelete(event._id, event.title)}
                            >
                              <Trash size={16} className="mr-2" /> Delete Event
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default EventsList;
