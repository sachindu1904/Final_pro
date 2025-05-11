import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Loader2, CheckCircle, XCircle, Calendar, MapPin, Tag, Clock, User, ArrowLeft, Ticket } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import api from '@/lib/axios';
import { format } from 'date-fns';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  images: string[];
  approvalStatus: 'pending' | 'approved' | 'rejected';
  adminFeedback: string;
  organizer: {
    _id: string;
    name: string;
    email: string;
    organizerProfile: {
      company: string;
      verified: boolean;
      description: string;
    };
  };
  tickets: {
    _id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  createdAt: string;
}

const EventApproval: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  useEffect(() => {
    fetchEventDetails();
  }, [id]);
  
  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get(`/admin/events/${id}`);
      
      if (response.data.success) {
        setEvent(response.data.event);
        setFeedback(response.data.event.adminFeedback || '');
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
  
  const handleReview = async (status: 'approved' | 'rejected') => {
    if (status === 'rejected' && !feedback.trim()) {
      toast.error('Please provide feedback explaining why the event was rejected');
      return;
    }
    
    try {
      setSubmitting(true);
      
      const response = await api.put(`/admin/events/${id}/review`, {
        approvalStatus: status,
        adminFeedback: feedback
      });
      
      if (response.data.success) {
        toast.success(`Event ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
        navigate('/admin/events/pending');
      } else {
        toast.error(response.data.message || `Failed to ${status} event`);
      }
    } catch (error: any) {
      console.error(`Error ${status}ing event:`, error);
      toast.error(error.response?.data?.message || `An error occurred while ${status}ing the event`);
    } finally {
      setSubmitting(false);
    }
  };
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return format(date, 'MMMM d, yyyy');
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-gray-600">Loading event details...</span>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-4 mb-6 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-center gap-2">
        <AlertCircle className="h-5 w-5" />
        <span>{error}</span>
      </div>
    );
  }
  
  if (!event) {
    return (
      <div className="p-4 mb-6 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-md">
        Event not found
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          className="flex items-center text-gray-500"
          onClick={() => navigate('/admin/events/pending')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Pending Events
        </Button>
        
        <Badge className={
          event.approvalStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          event.approvalStatus === 'approved' ? 'bg-green-100 text-green-800' :
          'bg-red-100 text-red-800'
        }>
          {event.approvalStatus.charAt(0).toUpperCase() + event.approvalStatus.slice(1)}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{event.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(event.date)}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {event.time}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Tag className="h-4 w-4 mr-2" />
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </div>
              </div>
              
              <Tabs defaultValue="description">
                <TabsList>
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="tickets">Tickets</TabsTrigger>
                  <TabsTrigger value="images">Images</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="p-4">
                  <p className="whitespace-pre-line">{event.description}</p>
                </TabsContent>
                <TabsContent value="tickets" className="p-4">
                  <div className="space-y-4">
                    {event.tickets.map((ticket) => (
                      <div key={ticket._id} className="p-4 border rounded-md">
                        <div className="flex justify-between items-center">
                          <div className="font-medium">{ticket.name}</div>
                          <div className="text-lg font-bold">LKR {ticket.price.toFixed(2)}</div>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          <Ticket className="h-3 w-3 inline mr-1" />
                          {ticket.quantity} available
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="images" className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    {event.images && event.images.length > 0 ? (
                      event.images.map((img, index) => (
                        <img 
                          key={index} 
                          src={img} 
                          alt={`Event ${index + 1}`}
                          className="rounded-md object-cover h-40 w-full"
                        />
                      ))
                    ) : (
                      <div className="text-gray-500">No images provided</div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          {/* Organizer Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Organizer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="font-medium">{event.organizer.name}</span>
                </div>
                <div className="text-sm text-gray-600">{event.organizer.email}</div>
                {event.organizer.organizerProfile && (
                  <>
                    <div className="text-sm font-medium mt-3">
                      {event.organizer.organizerProfile.company}
                    </div>
                    <div className="flex items-center mt-1">
                      <Badge variant={event.organizer.organizerProfile.verified ? "default" : "outline"}>
                        {event.organizer.organizerProfile.verified ? "Verified" : "Unverified"} Organizer
                      </Badge>
                    </div>
                    {event.organizer.organizerProfile.description && (
                      <div className="text-sm text-gray-600 mt-2">
                        {event.organizer.organizerProfile.description}
                      </div>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Admin Feedback */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Admin Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Provide feedback to the organizer (required for rejections)..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={5}
              />
            </CardContent>
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <Button 
                variant="outline" 
                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 w-[48%]"
                onClick={() => handleReview('rejected')}
                disabled={submitting}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject Event
              </Button>
              <Button 
                className="bg-green-600 hover:bg-green-700 w-[48%]"
                onClick={() => handleReview('approved')}
                disabled={submitting}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Event
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventApproval; 