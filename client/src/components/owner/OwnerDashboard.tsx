
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Award, BarChart2, DollarSign, TrendingUp, Users, Percent } from 'lucide-react';
import { Link } from 'react-router-dom';

type OwnerType = {
  name: string;
  business: string;
  email: string;
  phone: string;
  profileImage: string;
  verified: boolean;
  memberSince: string;
  currentEarnings: number;
  pendingPayouts: number;
  commissionRate: number;
};

interface OwnerDashboardProps {
  owner: OwnerType;
}

const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ owner }) => {
  // Sample data for dashboard
  const recentBookings = [
    { id: 1, guest: 'Sarah Johnson', date: '2023-06-15', amount: 15000, status: 'Completed' },
    { id: 2, guest: 'Michael Wong', date: '2023-06-18', amount: 22500, status: 'Upcoming' },
    { id: 3, guest: 'Emma Davis', date: '2023-06-20', amount: 18000, status: 'Confirmed' },
  ];
  
  const insights = {
    views: 238,
    bookings: 12,
    ranking: '#8 in Ella',
    reviewScore: 4.8
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button variant="outline" className="text-eventuraa-purple border-eventuraa-purple hover:bg-eventuraa-softPurple">
          <TrendingUp className="w-4 h-4 mr-2" /> View Full Analytics
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Current Earnings</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              <DollarSign className="h-5 w-5 text-green-500 mr-1" /> 
              {owner.currentEarnings.toLocaleString()} LKR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-500">After {owner.commissionRate}% commission</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Payouts</CardDescription>
            <CardTitle className="text-2xl">{owner.pendingPayouts.toLocaleString()} LKR</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-500">Next payout: June 15</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Booking Conversion</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              <span className="text-green-500 mr-1">5.2%</span>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-500">+1.2% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Gem Status</CardDescription>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 text-amber-500 mr-1" /> 
              <span>Silver Tier</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-500">4 more reviews to Gold!</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Special Offers */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Active Special Offers</CardTitle>
            <Button size="sm" className="bg-eventuraa-purple hover:bg-eventuraa-darkPurple">
              + Create New Offer
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {[1, 2].map((_, i) => (
            <div key={i} className="mb-4 last:mb-0 p-3 border rounded-lg flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-eventuraa-yellow p-2 rounded-md">
                  <Percent className="h-5 w-5 text-eventuraa-orange" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">{i === 0 ? "Valentine's Special" : "Weekday Discount"}</h3>
                  <p className="text-sm text-gray-500">
                    {i === 0 ? "20% off + Wine for couples" : "15% off for Mon-Thu stays"}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Badge variant={i === 0 ? "default" : "outline"} className={i === 0 ? "bg-green-500" : ""}>
                  {i === 0 ? "Active" : "Starting Soon"}
                </Badge>
                <Button variant="ghost" size="sm" className="ml-2">
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-medium">{booking.guest}</p>
                    <p className="text-sm text-gray-500">{booking.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{booking.amount.toLocaleString()} LKR</p>
                    <Badge variant={booking.status === 'Completed' ? "outline" : "default"} className={booking.status !== 'Completed' ? "bg-blue-500" : ""}>
                      {booking.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Performance Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-gray-500 text-sm">Profile Views</span>
                </div>
                <p className="text-2xl font-bold mt-2">{insights.views}</p>
                <p className="text-xs text-green-500 mt-1">+12% this week</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-center">
                  <BarChart2 className="h-5 w-5 text-purple-500 mr-2" />
                  <span className="text-gray-500 text-sm">Bookings</span>
                </div>
                <p className="text-2xl font-bold mt-2">{insights.bookings}</p>
                <p className="text-xs text-green-500 mt-1">+3 from last month</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-500 text-sm">Ranking</span>
                </div>
                <p className="text-2xl font-bold mt-2">{insights.ranking}</p>
                <p className="text-xs text-green-500 mt-1">Top 20% of properties</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-gray-500 text-sm">Review Score</span>
                </div>
                <p className="text-2xl font-bold mt-2">{insights.reviewScore}/5</p>
                <p className="text-xs text-green-500 mt-1">12 new reviews</p>
              </div>
            </div>
            
            <div className="mt-4">
              <Link to="/hidden-gems-owner-portal/analytics">
                <Button variant="outline" className="w-full">View Detailed Analytics</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* "Gem of the Month" Contest */}
      <Card className="bg-gradient-to-r from-eventuraa-purple/90 to-eventuraa-blue/90 text-white">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-6 w-6 mr-2" /> Gem of the Month Contest
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Your property is currently 4 reviews away from qualifying for our "Gem of the Month" contest!</p>
          <div className="bg-white/20 p-3 rounded-md">
            <h4 className="font-medium">🏆 Prize includes:</h4>
            <ul className="list-disc list-inside text-sm mt-2 space-y-1">
              <li>Free homepage feature for 7 days</li>
              <li>Social media spotlight</li>
              <li>"Award Winner" badge for 30 days</li>
            </ul>
          </div>
          <Button className="w-full bg-white text-eventuraa-purple hover:bg-gray-100">
            Share Your Page to Get Reviews
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerDashboard;
