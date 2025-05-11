
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { BarChart as Chart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SalesAnalytics: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<string>("all");
  const [timeRange, setTimeRange] = useState<string>("7days");
  
  // Mock data - in a real app, this would come from an API
  const events = [
    { id: "1", name: "Colombo Music Festival" },
    { id: "2", name: "Beach Volleyball Tournament" },
    { id: "3", name: "Cultural Dance Show" }
  ];
  
  const salesData = {
    "7days": [
      { name: 'Mon', sales: 12, revenue: 30000 },
      { name: 'Tue', sales: 19, revenue: 47500 },
      { name: 'Wed', sales: 15, revenue: 37500 },
      { name: 'Thu', sales: 27, revenue: 67500 },
      { name: 'Fri', sales: 32, revenue: 80000 },
      { name: 'Sat', sales: 49, revenue: 122500 },
      { name: 'Sun', sales: 35, revenue: 87500 },
    ],
    "30days": [
      { name: 'Week 1', sales: 75, revenue: 187500 },
      { name: 'Week 2', sales: 120, revenue: 300000 },
      { name: 'Week 3', sales: 90, revenue: 225000 },
      { name: 'Week 4', sales: 140, revenue: 350000 },
    ],
    "90days": [
      { name: 'May', sales: 320, revenue: 800000 },
      { name: 'Jun', sales: 450, revenue: 1125000 },
      { name: 'Jul', sales: 380, revenue: 950000 },
    ]
  };
  
  const salesByTicketType = [
    { name: 'General', sales: 320, revenue: 800000 },
    { name: 'VIP', sales: 150, revenue: 750000 },
    { name: 'Group', sales: 75, revenue: 262500 },
  ];
  
  const exportData = () => {
    // In a real app, this would generate a CSV file with the sales data
    alert("Exporting data...");
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Sales Analytics</h1>
      <p className="text-gray-600 mb-8">Track and analyze your ticket sales</p>
      
      <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-64">
            <Select value={selectedEvent} onValueChange={setSelectedEvent}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                {events.map(event => (
                  <SelectItem key={event.id} value={event.id}>{event.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-48">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button variant="outline" onClick={exportData} className="whitespace-nowrap">
          Export Data
        </Button>
      </div>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <Chart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">545</div>
            <p className="text-xs text-muted-foreground">
              +12% from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Chart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">LKR 1,812,500</div>
            <p className="text-xs text-muted-foreground">
              +8% from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Sale Value</CardTitle>
            <Chart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">LKR 3,325</div>
            <p className="text-xs text-muted-foreground">
              -2% from previous period
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Sales Over Time</CardTitle>
          <CardDescription>
            Number of tickets sold and revenue generated
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={salesData[timeRange as keyof typeof salesData]}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="sales" fill="#8884d8" name="Tickets Sold" />
                <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue (LKR)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales by Ticket Type</CardTitle>
            <CardDescription>
              Breakdown of sales by ticket category
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesByTicketType}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#7E69AB" name="Tickets Sold" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Ticket Type</CardTitle>
            <CardDescription>
              Breakdown of revenue by ticket category
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesByTicketType}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#FF9843" name="Revenue (LKR)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesAnalytics;
