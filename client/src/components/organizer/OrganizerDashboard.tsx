
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Users, BarChart, Ticket, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface OrganizerDashboardProps {
  organizer: {
    name: string;
    company: string;
    profileImage: string;
    verified: boolean;
    memberSince: string;
  };
}

const OrganizerDashboard: React.FC<OrganizerDashboardProps> = ({ organizer }) => {
  // Mock data - in a real app, this would come from an API
  const dashboardStats = {
    totalEvents: 8,
    activeEvents: 3,
    totalTicketsSold: 1256,
    totalRevenue: 385000,
    upcomingEvents: [
      {
        id: 1,
        title: "Colombo Music Festival",
        date: "May 15, 2025",
        location: "Colombo",
        ticketsSold: 450,
        totalTickets: 500,
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
      },
      {
        id: 2,
        title: "Beach Volleyball Tournament",
        date: "Jun 22, 2025",
        location: "Negombo",
        ticketsSold: 120,
        totalTickets: 300,
        image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
      }
    ],
    recentSales: [
      {
        id: 1,
        event: "Colombo Music Festival",
        tickets: 2,
        amount: 5000,
        date: "2 hours ago"
      },
      {
        id: 2,
        event: "Beach Volleyball Tournament",
        tickets: 4,
        amount: 8000,
        date: "5 hours ago"
      },
      {
        id: 3,
        event: "Cultural Dance Show",
        tickets: 1,
        amount: 2500,
        date: "Yesterday"
      }
    ]
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {organizer.name.split(' ')[0]}!</h1>
          <p className="text-gray-600">Here's what's happening with your events today.</p>
        </div>
        <Link to="/organizer-portal/events/new">
          <Button className="bg-[#7E69AB] hover:bg-[#6E59A5]">
            <Plus size={16} className="mr-2" />
            Create Event
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{dashboardStats.totalEvents}</div>
            <p className="text-sm text-gray-500">
              {dashboardStats.activeEvents} currently active
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tickets Sold</CardTitle>
            <Ticket className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{dashboardStats.totalTicketsSold}</div>
            <p className="text-sm text-gray-500">
              Across all events
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <BarChart className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">LKR {dashboardStats.totalRevenue.toLocaleString()}</div>
            <p className="text-sm text-gray-500">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Attendees</CardTitle>
            <Users className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,024</div>
            <p className="text-sm text-gray-500">
              85% ticket scan rate
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Your next events that are scheduled</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {dashboardStats.upcomingEvents.map(event => (
                <div key={event.id} className="flex gap-4 items-center">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-20 h-20 object-cover rounded-lg" 
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{event.title}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {event.date}
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Tickets Sold</span>
                        <span>{event.ticketsSold}/{event.totalTickets}</span>
                      </div>
                      <Progress value={(event.ticketsSold / event.totalTickets) * 100} />
                    </div>
                  </div>
                  <Link to={`/organizer-portal/events/${event.id}`}>
                    <Button variant="outline">Manage</Button>
                  </Link>
                </div>
              ))}
              
              <Link to="/organizer-portal/events" className="inline-block text-[#7E69AB] hover:underline text-sm mt-2">
                View all events →
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>Your latest ticket purchases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {dashboardStats.recentSales.map(sale => (
                <div key={sale.id} className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="font-medium">{sale.event}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Ticket className="w-3 h-3 mr-1" />
                      {sale.tickets} tickets
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">LKR {sale.amount}</div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {sale.date}
                    </div>
                  </div>
                </div>
              ))}
              
              <Link to="/organizer-portal/analytics" className="inline-block text-[#7E69AB] hover:underline text-sm mt-2">
                View all transactions →
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Plus = ({ size, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14"/>
    <path d="M12 5v14"/>
  </svg>
);

export default OrganizerDashboard;
