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
import { Calendar, Search, AlertCircle, Loader2, Eye, CheckCircle, XCircle } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import api from '@/lib/axios';
import { format } from 'date-fns';

interface Event {
  _id: string;
  title: string;
  date: string;
  location: string;
  organizer: {
    name: string;
  } | null;
  createdAt: string;
}

const PendingEvents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchPendingEvents();
  }, []);
  
  const fetchPendingEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get('/admin/events/pending');
      
      if (response.data.success) {
        setEvents(response.data.data || []);
      } else {
        setError(response.data.message || 'Failed to load pending events');
        toast.error(response.data.message || 'Failed to load pending events');
      }
    } catch (error: any) {
      console.error('Error fetching pending events:', error);
      setError(error.response?.data?.message || 'An error occurred while fetching pending events');
      toast.error('Failed to load pending events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (event.organizer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
  );
  
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMM d, yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };
  
  const handleQuickAction = async (eventId: string, status: 'approved' | 'rejected') => {
    try {
      const feedback = status === 'rejected' 
        ? prompt('Please provide feedback for the rejection:') 
        : '';
      
      if (status === 'rejected' && !feedback) {
        toast.error('Feedback is required for rejections');
        return;
      }
      
      const response = await api.put(`/admin/events/${eventId}/review`, {
        status,
        reviewNotes: feedback || ''
      });
      
      if (response.data.success) {
        toast.success(`Event ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
        // Remove the event from the list
        setEvents(events.filter(event => event._id !== eventId));
      } else {
        toast.error(response.data.message || `Failed to ${status} event`);
      }
    } catch (error: any) {
      console.error(`Error ${status}ing event:`, error);
      toast.error(error.response?.data?.message || `An error occurred while ${status}ing the event`);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Pending Events</h1>
          <p className="text-gray-600">Review and approve or reject events</p>
        </div>
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
          <Button variant="outline" onClick={fetchPendingEvents}>
            <Calendar className="mr-2 h-4 w-4" />
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
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2 text-gray-600">Loading pending events...</span>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Organizer</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    {events.length === 0 ? (
                      'No pending events found. All events have been reviewed!'
                    ) : (
                      'No events match your search. Try a different search term.'
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                filteredEvents.map((event) => (
                  <TableRow key={event._id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>{formatDate(event.date)}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>{event.organizer ? event.organizer.name : 'Unknown'}</TableCell>
                    <TableCell>{formatDate(event.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          asChild
                        >
                          <Link to={`/admin/events/${event._id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => handleQuickAction(event._id, 'approved')}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleQuickAction(event._id, 'rejected')}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default PendingEvents; 