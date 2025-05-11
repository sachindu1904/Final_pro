
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Award, Download, TrendingUp, Calendar as CalendarIcon } from 'lucide-react';

const PerformanceAnalytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('30');
  const [listingFilter, setListingFilter] = useState('all');
  
  // Sample data for charts
  const viewsData = [
    { name: '1 Jun', views: 45 },
    { name: '8 Jun', views: 52 },
    { name: '15 Jun', views: 75 },
    { name: '22 Jun', views: 62 },
    { name: '29 Jun', views: 88 },
    { name: '6 Jul', views: 95 },
    { name: '13 Jul', views: 78 },
  ];
  
  const bookingsData = [
    { name: 'Week 1', completed: 3, confirmed: 1, cancelled: 0 },
    { name: 'Week 2', completed: 2, confirmed: 2, cancelled: 1 },
    { name: 'Week 3', completed: 4, confirmed: 3, cancelled: 0 },
    { name: 'Week 4', completed: 3, confirmed: 4, cancelled: 1 },
    { name: 'Week 5', completed: 5, confirmed: 2, cancelled: 0 },
  ];
  
  const revenueData = [
    { name: 'Jun', revenue: 45000, commission: 3375 },
    { name: 'Jul', revenue: 52000, commission: 3900 },
    { name: 'Aug', revenue: 38000, commission: 2850 },
    { name: 'Sep', revenue: 62000, commission: 4650 },
    { name: 'Oct', revenue: 75000, commission: 5625 },
    { name: 'Nov', revenue: 96000, commission: 7200 },
  ];
  
  const sourceData = [
    { name: 'Direct Search', value: 45 },
    { name: 'Gem Listing', value: 25 },
    { name: 'Social Media', value: 20 },
    { name: 'Referrals', value: 10 },
  ];
  
  const COLORS = ['#7E69AB', '#FF7A45', '#0EA5E9', '#10B981'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Performance Analytics</h1>
        <Button variant="outline" className="flex items-center">
          <Download className="w-4 h-4 mr-2" /> Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label>Date Range</Label>
              <Select defaultValue="30" onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="180">Last 6 months</SelectItem>
                  <SelectItem value="365">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label>Filter by Listing</Label>
              <Select defaultValue="all" onValueChange={setListingFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select listing" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Listings</SelectItem>
                  <SelectItem value="villa">Ella Forest Retreat</SelectItem>
                  <SelectItem value="cottage">Coconut Bay Cottage</SelectItem>
                  <SelectItem value="restaurant">Spice Garden Restaurant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid grid-cols-4 max-w-xl mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="sources">Traffic Sources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Profile Views</CardTitle>
              <CardDescription>
                How many people viewed your listings over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[350px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={viewsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="views" 
                    stroke="#7E69AB" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bookingsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" fill="#7E69AB" />
                    <Bar dataKey="confirmed" fill="#0EA5E9" />
                    <Bar dataKey="cancelled" fill="#FF7A45" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Booking Sources</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {sourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6 bg-eventuraa-purple text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Award className="h-10 w-10 mr-4" />
                  <div>
                    <h3 className="text-xl font-bold mb-1">Gem of the Month Status</h3>
                    <p>You're currently in 3rd place! Just 4 more positive reviews to reach 1st place.</p>
                  </div>
                </div>
                <Button className="bg-white text-eventuraa-purple hover:bg-gray-100">View Contest</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Booking Analytics</CardTitle>
              <CardDescription>Detailed view of your booking performance</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bookingsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" name="Completed Stays" fill="#7E69AB" />
                  <Bar dataKey="confirmed" name="Upcoming Bookings" fill="#0EA5E9" />
                  <Bar dataKey="cancelled" name="Cancellations" fill="#FF7A45" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Your earnings and commission breakdown</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => `LKR ${value.toLocaleString()}`} 
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    name="Your Revenue" 
                    stroke="#7E69AB" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="commission" 
                    name="Eventuraa Commission" 
                    stroke="#FF7A45" 
                    strokeWidth={2} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sources">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where your customers are coming from</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={140}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Import the Label component
const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm font-medium">{children}</p>
);

export default PerformanceAnalytics;
