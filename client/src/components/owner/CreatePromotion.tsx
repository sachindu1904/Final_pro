
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Calendar as CalendarDays, Gift, Percent, Clock, TrendingUp, Award } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CreatePromotion: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date(new Date().setDate(new Date().getDate() + 14)));
  
  const handleCreatePromotion = () => {
    toast.success('Promotion created successfully!');
  };

  const activePromotions = [
    {
      id: 1,
      title: "Valentine's Special",
      description: "20% off for couples + complimentary bottle of wine",
      startDate: "2025-02-10",
      endDate: "2025-02-16",
      discount: 20,
      type: "Percentage",
      listing: "Ella Forest Retreat",
      status: "Active",
    },
    {
      id: 2,
      title: "Weekday Deal",
      description: "15% off for stays between Monday and Thursday",
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      discount: 15,
      type: "Percentage",
      listing: "Ella Forest Retreat",
      status: "Active",
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Special Offers & Promotions</h1>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-6">
          {activePromotions.map(promo => (
            <Card key={promo.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/6 bg-eventuraa-yellow flex items-center justify-center p-6">
                  <Percent className="h-12 w-12 text-eventuraa-orange" />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold">{promo.title}</h3>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <CalendarDays className="h-4 w-4 mr-1" />
                        {promo.startDate} to {promo.endDate}
                      </p>
                    </div>
                    <Badge className="bg-green-500">{promo.status}</Badge>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{promo.description}</p>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">
                        {promo.discount}% Off
                      </Badge>
                      <span className="text-gray-500 text-sm">Applied to: {promo.listing}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500">
                        End Early
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Clock className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium mb-2">No Scheduled Promotions</h3>
              <p className="text-gray-500 text-center mb-6 max-w-md">
                You don't have any scheduled promotions that will begin in the future.
              </p>
              <Button className="bg-eventuraa-purple hover:bg-eventuraa-darkPurple">
                Create New Promotion
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create New Special Offer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Promotion Title</Label>
                    <Input id="title" placeholder="e.g., Summer Special, Holiday Deal" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="listing">Apply to Listing</Label>
                    <Select defaultValue="villa">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Listing" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="villa">Ella Forest Retreat (Villa)</SelectItem>
                        <SelectItem value="cottage">Coconut Bay Cottage</SelectItem>
                        <SelectItem value="restaurant">Spice Garden Restaurant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Promotion Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe your special offer (e.g., what's included, conditions)"
                    className="h-24"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Promotion Type</Label>
                    <Select defaultValue="percentage">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage Discount</SelectItem>
                        <SelectItem value="fixed">Fixed Amount Off</SelectItem>
                        <SelectItem value="free">Free Add-on</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="discount">Discount Amount (%)</Label>
                    <Input id="discount" type="number" placeholder="e.g., 15" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Promo Code (Optional)</Label>
                    <Input placeholder="e.g., SUMMER25" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Add Extras (Optional)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center p-3 border rounded-md">
                      <input type="checkbox" id="wine" className="mr-3" />
                      <Label htmlFor="wine" className="cursor-pointer">Complimentary Wine</Label>
                    </div>
                    <div className="flex items-center p-3 border rounded-md">
                      <input type="checkbox" id="breakfast" className="mr-3" />
                      <Label htmlFor="breakfast" className="cursor-pointer">Free Breakfast</Label>
                    </div>
                    <div className="flex items-center p-3 border rounded-md">
                      <input type="checkbox" id="tuktuk" className="mr-3" />
                      <Label htmlFor="tuktuk" className="cursor-pointer">Free Tuk-Tuk Ride</Label>
                    </div>
                    <div className="flex items-center p-3 border rounded-md">
                      <input type="checkbox" id="cooking" className="mr-3" />
                      <Label htmlFor="cooking" className="cursor-pointer">Cooking Class</Label>
                    </div>
                  </div>
                </div>
                
                <Card className="bg-gray-50 border-dashed">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <TrendingUp className="h-6 w-6 text-eventuraa-purple" />
                      <div>
                        <h4 className="font-medium text-sm">Boost Your Promotion</h4>
                        <p className="text-gray-500 text-sm mt-1">
                          For 2% additional commission, feature your promotion on the Eventuraa homepage
                        </p>
                        <div className="flex items-center mt-3">
                          <input type="checkbox" id="boost" className="mr-3" />
                          <Label htmlFor="boost" className="cursor-pointer text-sm">Add Homepage Boost (+2% commission)</Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline">Cancel</Button>
                  <Button 
                    className="bg-eventuraa-purple hover:bg-eventuraa-darkPurple"
                    onClick={handleCreatePromotion}
                  >
                    <Gift className="h-4 w-4 mr-2" /> Create Special Offer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6 bg-gradient-to-r from-amber-100 to-amber-50 border-amber-200">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <Award className="h-6 w-6 text-amber-500 mt-1" />
                <div>
                  <h4 className="font-medium">Gem of the Month Competition</h4>
                  <p className="text-gray-700 text-sm mt-1">
                    Properties with special offers tend to receive more reviews and bookings, 
                    boosting your chances of winning the "Gem of the Month" award!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreatePromotion;
