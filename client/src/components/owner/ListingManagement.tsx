
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Image, Edit, Trash2, Plus, ShieldCheck } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const ListingManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active');

  const handleDeleteListing = () => {
    toast.error('Listing deleted successfully');
  };

  const listings = [
    {
      id: 1,
      name: 'Ella Forest Retreat',
      type: 'Villa',
      location: 'Ella',
      description: 'A beautiful treehouse villa nestled in the misty mountains of Ella with panoramic views.',
      price: 15000,
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      ],
      tags: ['Private Pool', 'Mountain View', 'Free Tuk-Tuk'],
      verified: true,
      active: true,
    },
    {
      id: 2,
      name: 'Coconut Bay Cottage',
      type: 'Cottage',
      location: 'Mirissa',
      description: 'Beachfront cottage with direct access to a private strip of beach.',
      price: 12000,
      images: [
        'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      ],
      tags: ['Beachfront', 'AC', 'Breakfast Included'],
      verified: true,
      active: true,
    },
    {
      id: 3,
      name: 'Spice Garden Restaurant',
      type: 'Restaurant',
      location: 'Kandy',
      description: 'Traditional Sri Lankan cuisine made with fresh ingredients from our own spice garden.',
      price: 0,
      images: [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      ],
      tags: ['Traditional Food', 'Garden Seating', 'Cooking Classes'],
      verified: true,
      active: false,
    },
  ];

  const filteredListings = listings.filter(listing => 
    (activeTab === 'active' && listing.active) || 
    (activeTab === 'draft' && !listing.active)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Your Listings</h1>
        <Button className="bg-eventuraa-purple hover:bg-eventuraa-darkPurple">
          <Plus className="w-4 h-4 mr-2" /> Add New Listing
        </Button>
      </div>

      <Tabs defaultValue="active" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 max-w-md mb-6">
          <TabsTrigger value="active">Active Listings</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {filteredListings.map(listing => (
            <Card key={listing.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                  <img 
                    src={listing.images[0]} 
                    alt={listing.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-xl font-bold">{listing.name}</h3>
                        {listing.verified && (
                          <Badge className="ml-2 bg-green-500">
                            <ShieldCheck className="h-3 w-3 mr-1" /> Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {listing.location} • {listing.type}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{listing.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {listing.tags.map((tag, i) => (
                      <Badge key={i} variant="outline" className="bg-gray-100">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center mt-auto">
                    <div>
                      {listing.type !== 'Restaurant' ? (
                        <>
                          <span className="block text-gray-500 text-sm">Price per night</span>
                          <span className="font-bold text-eventuraa-blue">LKR {listing.price.toLocaleString()}</span>
                        </>
                      ) : (
                        <span className="text-gray-500 text-sm">Restaurant • Menu prices vary</span>
                      )}
                    </div>
                    <div className="flex items-center">
                      <div className="mr-3 text-right">
                        <span className="block text-gray-500 text-sm">Status</span>
                        <Badge className="bg-green-500">Live</Badge>
                      </div>
                      <Switch checked={true} />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="draft" className="space-y-6">
          {filteredListings.length > 0 ? (
            filteredListings.map(listing => (
              <Card key={listing.id} className="overflow-hidden">
                {/* Similar structure as active listings but with draft styling */}
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-48 md:h-auto overflow-hidden relative">
                    <img 
                      src={listing.images[0]} 
                      alt={listing.name} 
                      className="w-full h-full object-cover filter grayscale"
                    />
                    <div className="absolute inset-0 bg-gray-900/30 flex items-center justify-center">
                      <Badge className="bg-gray-700">DRAFT</Badge>
                    </div>
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold">{listing.name}</h3>
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {listing.location} • {listing.type}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500">
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{listing.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {listing.tags.map((tag, i) => (
                        <Badge key={i} variant="outline" className="bg-gray-100">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center mt-auto">
                      <div>
                        {listing.type !== 'Restaurant' ? (
                          <>
                            <span className="block text-gray-500 text-sm">Price per night</span>
                            <span className="font-bold text-eventuraa-blue">LKR {listing.price.toLocaleString()}</span>
                          </>
                        ) : (
                          <span className="text-gray-500 text-sm">Restaurant • Menu prices vary</span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <div className="mr-3 text-right">
                          <span className="block text-gray-500 text-sm">Status</span>
                          <Badge variant="outline">Draft</Badge>
                        </div>
                        <Switch checked={false} />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Image className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium mb-2">No Drafts Found</h3>
                <p className="text-gray-500 text-center mb-6 max-w-md">
                  You don't have any draft listings. Create a new listing to get started.
                </p>
                <Button className="bg-eventuraa-purple hover:bg-eventuraa-darkPurple">
                  <Plus className="w-4 h-4 mr-2" /> Create New Listing
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ListingManagement;
