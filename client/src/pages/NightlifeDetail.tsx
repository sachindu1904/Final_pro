import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Star, Calendar, Clock, Music, MartiniIcon, Wifi, Check, Phone, PartyPopper } from 'lucide-react';
import { toast } from "sonner";

const NightlifeDetail = () => {
  const { venueId } = useParams<{ venueId: string }>();
  const [selectedDate, setSelectedDate] = useState('');
  const [guestCount, setGuestCount] = useState('2');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [addOns, setAddOns] = useState(['standard']);

  // Mock venue data - in a real app, this would be fetched based on the venueId
  const venueData = {
    id: venueId || 'on14',
    name: "ON14 Rooftop Lounge & Nightclub",
    type: "Nightclub",
    rating: 4.5,
    images: [
      'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    ],
    location: "Hilton Colombo",
    fullAddress: "Hilton Colombo, 2 Sir Chittampalam A Gardiner Mawatha, Colombo 00200",
    description: "One of the most famous nightclubs, offering a rooftop experience with great views of the city. ON14 is known for its international DJs, premium drinks, and vibrant atmosphere.",
    hours: "7:00 PM - 2:00 AM",
    music: "EDM, Hip-Hop, Bollywood",
    price: "1,500-3,000 LKR",
    amenities: [
      { name: 'Premium Cocktails', icon: MartiniIcon },
      { name: 'International DJs', icon: Music },
      { name: 'VIP Tables', icon: Star },
      { name: 'Rooftop Views', icon: MapPin }
    ],
    upcomingEvents: [
      {
        name: "Summer Beats",
        date: "May 20, 2024",
        dj: "DJ Alex K"
      },
      {
        name: "Ladies Night",
        date: "May 23, 2024",
        dj: "DJ Mari"
      },
      {
        name: "Weekend Party",
        date: "May 25, 2024",
        dj: "DJ Ravin"
      }
    ],
    reviews: [
      {
        name: "Sanjay R.",
        rating: 5,
        date: "April 2024",
        comment: "Amazing rooftop views and great music! The cocktails are a bit pricey but worth it for the experience."
      },
      {
        name: "Priya M.",
        rating: 4,
        date: "March 2024",
        comment: "Great atmosphere and music selection. Gets crowded on weekends so come early to get a good spot."
      },
      {
        name: "Tom H.",
        rating: 4.5,
        date: "February 2024",
        comment: "Visited during a business trip. Professional staff and excellent drinks menu. The city views at night are spectacular."
      }
    ],
    highlights: [
      "Panoramic views of Colombo city",
      "Weekend DJ performances",
      "Premium spirits and cocktails",
      "VIP table reservations available"
    ],
    policies: [
      "Smart casual dress code enforced",
      "Entry fee: LKR 1,000-2,000 depending on event",
      "Age 21+ with valid ID",
      "No outside food or drinks"
    ]
  };

  const handleReservation = () => {
    toast.success(`Table reservation confirmed at ${venueData.name}!`);
  };

  const handleAddReview = () => {
    if (reviewText.trim() === '') {
      toast.error("Please enter your review");
      return;
    }
    
    toast.success("Thank you for your review!");
    setReviewText('');
  };

  const handleAddOnToggle = (addOn) => {
    if (addOns.includes(addOn)) {
      setAddOns(addOns.filter(a => a !== addOn));
    } else {
      setAddOns([...addOns, addOn]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[50vh]">
          <Carousel className="h-full">
            <CarouselContent className="h-full">
              {venueData.images.map((image, index) => (
                <CarouselItem key={index} className="h-full">
                  <div className="h-full w-full">
                    <img 
                      src={image} 
                      alt={`${venueData.name} - image ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-eventuraa-purple text-white px-2 py-1 rounded-md text-sm">
                  {venueData.type}
                </span>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i}
                      className={`h-4 w-4 ${
                        i < venueData.rating 
                          ? "fill-yellow-400 stroke-yellow-400" 
                          : "text-gray-400"
                      }`}
                    />
                  ))}
                  <span className="ml-1">{venueData.rating}</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-1">{venueData.name}</h1>
              
              <div className="flex items-center flex-wrap gap-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{venueData.location}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{venueData.hours}</span>
                </div>
                <div className="flex items-center">
                  <Music className="h-4 w-4 mr-1" />
                  <span>{venueData.music}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">About This Venue</h2>
                <p className="text-gray-700">{venueData.description}</p>
                
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {venueData.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <amenity.icon className="h-5 w-5 text-eventuraa-purple mr-2" />
                      <span>{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {venueData.upcomingEvents.map((event, index) => (
                    <Card key={index} className="bg-gray-50 border border-gray-100">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-eventuraa-blue" />
                          <span className="text-sm font-medium">{event.date}</span>
                        </div>
                        <h3 className="font-bold mb-1">{event.name}</h3>
                        <div className="text-sm text-gray-600">
                          <PartyPopper className="h-3.5 w-3.5 inline mr-1" />
                          {event.dj}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <Tabs defaultValue="reviews">
                  <TabsList className="mb-4">
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="highlights">Highlights</TabsTrigger>
                    <TabsTrigger value="location">Location</TabsTrigger>
                    <TabsTrigger value="policies">Policies</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="reviews">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-4">Guest Reviews</h3>
                        <div className="flex items-center mb-6">
                          <div className="bg-green-500 text-white text-xl font-bold w-12 h-12 rounded-full flex items-center justify-center mr-3">
                            {venueData.rating}
                          </div>
                          <div>
                            <div className="text-green-600 font-medium">Great</div>
                            <div className="text-sm text-gray-600">Based on {venueData.reviews.length} reviews</div>
                          </div>
                        </div>
                        
                        <div className="space-y-6 mb-6">
                          {venueData.reviews.map((review, index) => (
                            <div key={index} className="pb-4 border-b border-gray-200">
                              <div className="flex justify-between mb-2">
                                <div className="font-medium">{review.name}</div>
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                                  <span className="ml-1">{review.rating}</span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mb-1">{review.comment}</p>
                              <div className="text-xs text-gray-500">Visited {review.date}</div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="font-bold">Write a Review</h4>
                          
                          <div className="space-y-1">
                            <Label htmlFor="rating">Your Rating</Label>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <button
                                  key={rating}
                                  type="button"
                                  onClick={() => setReviewRating(rating)}
                                  className={`p-1 rounded-full ${reviewRating >= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                >
                                  <Star className={`h-6 w-6 ${reviewRating >= rating ? 'fill-yellow-400 stroke-yellow-400' : ''}`} />
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <Label htmlFor="review">Your Review</Label>
                            <Textarea
                              id="review"
                              placeholder="Share your experience at this venue..."
                              value={reviewText}
                              onChange={(e) => setReviewText(e.target.value)}
                            />
                          </div>
                          
                          <Button 
                            onClick={handleAddReview}
                            className="bg-eventuraa-purple hover:bg-eventuraa-darkPurple"
                          >
                            Submit Review
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="highlights">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-4">Venue Highlights</h3>
                        <ul className="space-y-3">
                          {venueData.highlights.map((highlight, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <h4 className="font-bold mb-3">Best For</h4>
                          <div className="flex gap-4 flex-wrap">
                            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                              <PartyPopper className="h-4 w-4 mr-1" />
                              <span className="text-sm">Nightlife</span>
                            </div>
                            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                              <MartiniIcon className="h-4 w-4 mr-1" />
                              <span className="text-sm">Cocktail Enthusiasts</span>
                            </div>
                            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                              <Music className="h-4 w-4 mr-1" />
                              <span className="text-sm">EDM Fans</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="location">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-4">Location</h3>
                        <p className="mb-4">{venueData.fullAddress}</p>
                        
                        <div className="aspect-video bg-gray-200 mb-4">
                          {/* Placeholder for map - in a real app this would be an actual map */}
                          <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-800">
                            Interactive Map would be displayed here
                          </div>
                        </div>
                        
                        <h4 className="font-bold mb-2">Nearby</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <MapPin className="h-4 w-4 mr-2 mt-1 text-eventuraa-blue" />
                            <div>
                              <span className="font-medium">Galle Face Green</span>
                              <span className="text-sm text-gray-600 block">0.5 km</span>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <MapPin className="h-4 w-4 mr-2 mt-1 text-eventuraa-blue" />
                            <div>
                              <span className="font-medium">Dutch Hospital Shopping Precinct</span>
                              <span className="text-sm text-gray-600 block">0.9 km</span>
                            </div>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="policies">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-4">Venue Policies</h3>
                        <ul className="space-y-3">
                          {venueData.policies.map((policy, index) => (
                            <li key={index} className="flex items-start">
                              <div className="h-5 w-5 text-eventuraa-purple mr-2">•</div>
                              <span>{policy}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <h4 className="font-bold mb-3">Safety Information</h4>
                          <div className="flex items-start">
                            <Phone className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                            <div>
                              <div className="font-medium">Emergency Contact</div>
                              <div className="text-sm text-gray-600">Security available 24/7</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            {/* Booking Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-4">
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Reserve a Table</h2>
                    
                    <div className="space-y-4 mb-6">
                      <div className="space-y-1">
                        <Label htmlFor="date">Date</Label>
                        <Input 
                          id="date" 
                          type="date" 
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <Label htmlFor="time">Time</Label>
                        <select 
                          id="time" 
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="">Select a time</option>
                          <option value="19:00">7:00 PM</option>
                          <option value="20:00">8:00 PM</option>
                          <option value="21:00">9:00 PM</option>
                          <option value="22:00">10:00 PM</option>
                          <option value="23:00">11:00 PM</option>
                        </select>
                      </div>
                      
                      <div className="space-y-1">
                        <Label htmlFor="guests">Number of Guests</Label>
                        <select 
                          id="guests" 
                          className="w-full p-2 border border-gray-300 rounded-md"
                          value={guestCount}
                          onChange={(e) => setGuestCount(e.target.value)}
                        >
                          <option value="1">1 Person</option>
                          <option value="2">2 People</option>
                          <option value="3">3 People</option>
                          <option value="4">4 People</option>
                          <option value="5">5 People</option>
                          <option value="6">6+ People</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-6 border-t border-gray-200 pt-4">
                      <Label>Table Options</Label>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox 
                          id="option-standard"
                          checked={!!addOns.includes('standard')}
                          onCheckedChange={() => handleAddOnToggle('standard')}
                        />
                        <div>
                          <Label htmlFor="option-standard" className="font-medium">Standard Table</Label>
                          <p className="text-sm text-gray-600">Regular seating, no minimum spend</p>
                          <p className="text-xs text-eventuraa-purple">Free</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox 
                          id="option-vip" 
                          checked={!!addOns.includes('vip')}
                          onCheckedChange={() => handleAddOnToggle('vip')}
                        />
                        <div>
                          <Label htmlFor="option-vip" className="font-medium">VIP Table</Label>
                          <p className="text-sm text-gray-600">Premium location, includes one bottle</p>
                          <p className="text-xs text-eventuraa-purple">LKR 10,000 minimum spend</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox 
                          id="option-booth"
                          checked={!!addOns.includes('booth')}
                          onCheckedChange={() => handleAddOnToggle('booth')} 
                        />
                        <div>
                          <Label htmlFor="option-booth" className="font-medium">Private Booth</Label>
                          <p className="text-sm text-gray-600">Exclusive area for your group</p>
                          <p className="text-xs text-eventuraa-purple">LKR 15,000 minimum spend</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <Button 
                        className="w-full bg-eventuraa-purple hover:bg-eventuraa-darkPurple"
                        onClick={handleReservation}
                      >
                        Reserve Table
                      </Button>
                      
                      <div className="flex flex-col space-y-2 bg-gray-50 p-3 rounded-md">
                        <div className="flex items-center text-green-600">
                          <Check className="h-4 w-4 mr-2 text-green-600" />
                          <span className="text-sm font-medium">Free cancellation up to 24h before</span>
                        </div>
                        <div className="flex items-center text-green-600">
                          <Check className="h-4 w-4 mr-2 text-green-600" />
                          <span className="text-sm font-medium">No prepayment needed</span>
                        </div>
                        <div className="flex items-center text-green-600">
                          <Check className="h-4 w-4 mr-2 text-green-600" />
                          <span className="text-sm font-medium">Confirmation sent instantly</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Events Card */}
                <div className="mt-6">
                  <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2">Special Events This Weekend</h3>
                      <p className="text-sm text-gray-700 mb-4">Don't miss our famous Saturday night DJ showcase with international guest DJs!</p>
                      <Button className="bg-eventuraa-blue hover:bg-blue-600 w-full">
                        View All Events
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NightlifeDetail;
