import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Calendar, Loader2, Clock, User, Users, CheckCircle, XCircle } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import api from '@/lib/axios';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

interface Event {
  _id: string;
  title: string;
  date: string;
  organizer: {
    _id: string;
    name: string;
    email: string;
  } | null;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface DashboardStats {
  events: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  organizers: {
    total: number;
    verified: number;
  };
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentEvents, setRecentEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchDashboardData();
  }, []);
  
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get('/admin/dashboard');
      
      if (response.data.success) {
        // Set stats from response, with default values if missing
        setStats({
          events: {
            total: response.data.data?.events?.total || 0,
            pending: response.data.data?.events?.pending || 0,
            approved: response.data.data?.events?.approved || 0,
            rejected: response.data.data?.events?.rejected || 0,
          },
          organizers: {
            total: response.data.data?.users?.organizers || 0,
            verified: 0, // Default since this is not provided in the response
          }
        });
        
        // Set recent events with a default empty array if missing
        setRecentEvents(response.data.recentEvents || []);
      } else {
        setError(response.data.message || 'Failed to load dashboard data');
        toast.error(response.data.message || 'Failed to load dashboard data');
      }
    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      setError(error.response?.data?.message || 'An error occurred while fetching dashboard data');
      toast.error('Failed to load dashboard data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMM d, yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-gray-600">Loading dashboard...</span>
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage events, organizers, and platform settings</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.events.total || 0}</div>
            <div className="text-xs text-muted-foreground mt-1">Across all categories</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.events.pending || 0}</div>
            <div className="text-xs text-muted-foreground mt-1">Events waiting for review</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Organizers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.organizers.total || 0}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {stats?.organizers.verified || 0} verified
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Approved Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.events.approved || 0}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {stats?.events.rejected || 0} rejected
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              <Button variant="default" className="flex items-center" asChild>
                <Link to="/admin/events/pending">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Review Pending Events
                </Link>
              </Button>
              <Button variant="outline" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Manage Organizers
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Events Needing Approval</CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.events.pending === 0 ? (
              <div className="text-center py-6 text-gray-500">
                No events pending approval
              </div>
            ) : (
              <div className="font-medium">
                You have {stats?.events.pending || 0} events waiting for review
                <Button className="mt-4 w-full" asChild>
                  <Link to="/admin/events/pending">Go to Approval Queue</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Events - Only render if recentEvents exists */}
      {Array.isArray(recentEvents) && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
          </CardHeader>
          <CardContent>
            {recentEvents.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                No events found
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Organizer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentEvents.map((event) => (
                    <TableRow key={event._id}>
                      <TableCell className="font-medium">{event.title}</TableCell>
                      <TableCell>{event.organizer ? event.organizer.name : 'Unknown'}</TableCell>
                      <TableCell>{formatDate(event.date)}</TableCell>
                      <TableCell>
                        {event.approvalStatus === 'pending' && (
                          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                        )}
                        {event.approvalStatus === 'approved' && (
                          <Badge className="bg-green-100 text-green-800">Approved</Badge>
                        )}
                        {event.approvalStatus === 'rejected' && (
                          <Badge className="bg-red-100 text-red-800">Rejected</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminDashboard; 