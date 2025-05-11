
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
import PaymentMethodSelector from '@/components/PaymentMethodSelector';
import { MapPin, Star, Calendar, Wifi, Coffee, Waves, Utensils, Check, Phone } from 'lucide-react';
import { toast } from "sonner";

// Define the PaymentMethod type to match what's expected by the PaymentMethodSelector
type PaymentMethod = 'visa' | 'mastercard' | 'paypal' | 'ezCash' | 'unionpay' | 'alipay';

const HotelDetailPage = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [selectedRoom, setSelectedRoom] = useState('deluxe');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState('2');
  const [addOns, setAddOns] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('visa');
  const [showPayment, setShowPayment] = useState(false);

  // Mock hotel data - in a real app, this would be fetched based on the hotelId
  const hotel = {
    id: hotelId || 'hotel1',
    name: 'Kandy Heritage Resort',
    rating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1200&q=80', // Updated hero image
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGx1eHVyeSUyMGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aG90ZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGx1eHVyeSUyMGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    ],
    location: 'Kandy, Sri Lanka',
    address: '123 Temple Road, Kandy, Sri Lanka',
    description: 'This beautiful heritage resort in Kandy offers stunning views of the sacred Temple of the Tooth and the picturesque Kandy Lake. With its colonial architecture and modern amenities, it provides the perfect blend of tradition and luxury.',
    price: 18500,
    rooms: [
      {
        id: 'deluxe',
        name: 'Deluxe Room',
        price: 18500,
        description: 'Spacious room with a king-sized bed and city view.',
        amenities: ['Air conditioning', 'Free WiFi', 'Flat-screen TV', 'Private bathroom']
      },
      {
        id: 'suite',
        name: 'Heritage Suite',
        price: 25000,
        description: 'Luxurious suite with separate living area and panoramic views of Kandy Lake.',
        amenities: ['Air conditioning', 'Free WiFi', 'Flat-screen TV', 'Private bathroom', 'Balcony', 'Minibar']
      },
      {
        id: 'family',
        name: 'Family Room',
        price: 22000,
        description: 'Comfortable room with two queen beds, perfect for families.',
        amenities: ['Air conditioning', 'Free WiFi', 'Flat-screen TV', 'Private bathroom', 'Extra space']
      }
    ],
    amenities: [
      { name: 'Free WiFi', icon: Wifi },
      { name: 'Breakfast Included', icon: Coffee },
      { name: 'Swimming Pool', icon: Waves },
      { name: 'Restaurant', icon: Utensils }
    ],
    nearestEvent: {
      name: 'Kandy Perahera',
      date: 'August 5-15, 2024',
      distance: '5-min walk'
    },
    highlights: [
      'Best rooftop views of Kandy Perahera',
      'Ayurvedic spa packages available',
      'Free tuk-tuk shuttle to city center'
    ],
    policies: [
      'Free cancellation until 24 hours before check-in',
      'Check-in from 14:00, Check-out by 12:00',
      'No pets allowed',
      'No smoking in rooms'
    ]
  };
  
  const handleRoomChange = (roomId: string) => {
    setSelectedRoom(roomId);
  };
  
  const handleAddOnToggle = (addon: string) => {
    if (addOns.includes(addon)) {
      setAddOns(addOns.filter(a => a !== addon));
    } else {
      setAddOns([...addOns, addon]);
    }
  };
  
  const calculateTotal = () => {
    const room = hotel.rooms.find(r => r.id === selectedRoom);
    let total = room ? room.price : 0;
    
    // Add costs of add-ons
    if (addOns.includes('transport')) total += 2000;
    if (addOns.includes('breakfast')) total += 1500;
    if (addOns.includes('spa')) total += 3500;
    
    return total;
  };

  const handleReservation = () => {
    if (!checkInDate || !checkOutDate) {
      toast.error("Please select check-in and check-out dates");
      return;
    }
    
    setShowPayment(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handlePayment = () => {
    toast.success(`Booking confirmed at ${hotel.name}!`);
    setShowPayment(false);
  };
  
  const handleExternalBooking = () => {
    toast.info("Redirecting to external booking site...");
  };

  const selectedRoomData = hotel.rooms.find(room => room.id === selectedRoom);

  // Currency conversion rates (mock)
  const currencies = [
    { code: 'LKR', symbol: 'Rs', rate: 1 },
    { code: 'USD', symbol: '$', rate: 1/320 },
    { code: 'EUR', symbol: '€', rate: 1/350 },
    { code: 'GBP', symbol: '£', rate: 1/400 },
  ];
  
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

  const convertPrice = (price: number) => {
    const converted = price * selectedCurrency.rate;
    return `${selectedCurrency.symbol} ${converted.toFixed(2)} ${selectedCurrency.code}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {showPayment ? (
          <div className="container-custom py-12 max-w-4xl mx-auto">
            <Button 
              onClick={() => setShowPayment(false)} 
              variant="outline" 
              className="mb-6"
            >
              &larr; Back to Hotel Details
            </Button>
            
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Complete Your Booking</h2>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">Booking Summary</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span>Hotel:</span>
                    <span className="font-medium">{hotel.name}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Room Type:</span>
                    <span className="font-medium">{selectedRoomData?.name}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Check-in Date:</span>
                    <span className="font-medium">{checkInDate}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Check-out Date:</span>
                    <span className="font-medium">{checkOutDate}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Guests:</span>
                    <span className="font-medium">{guests}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Add-ons:</span>
                    <span className="font-medium">{addOns.length > 0 ? 
                      addOns.map(addon => {
                        if (addon === 'transport') return 'Event Transport';
                        if (addon === 'breakfast') return 'Premium Breakfast';
                        if (addon === 'spa') return 'Spa Package';
                        return addon;
                      }).join(', ') 
                      : 'None'}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total Amount:</span>
                      <div className="text-right">
                        <div className="text-eventuraa-blue">LKR {calculateTotal().toLocaleString()}</div>
                        <div className="text-sm text-gray-500">{convertPrice(calculateTotal())}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="text-sm font-medium mb-2 block">Select Currency</label>
                  <div className="flex gap-2 flex-wrap">
                    {currencies.map(currency => (
                      <Button
                        key={currency.code}
                        variant={selectedCurrency.code === currency.code ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCurrency(currency)}
                        className="min-w-[80px]"
                      >
                        {currency.code}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              
              <PaymentMethodSelector 
                onPaymentMethodSelect={setPaymentMethod}
                selectedMethod={paymentMethod}
              />
              
              <div className="mt-8 flex flex-col gap-4">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg"
                  onClick={handlePayment}
                >
                  Complete Payment & Confirm Booking
                </Button>
                
                <div className="flex flex-col space-y-2 bg-gray-50 p-3 rounded-md">
                  <div className="flex items-center text-green-600">
                    <Check className="h-4 w-4 mr-2 text-green-600" />
                    <span className="text-sm font-medium">Tourist-friendly customer support available 24/7</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <Check className="h-4 w-4 mr-2 text-green-600" />
                    <span className="text-sm font-medium">Translation services available</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <Check className="h-4 w-4 mr-2 text-green-600" />
                    <span className="text-sm font-medium">Free airport pickup on bookings over $200</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Hero Section */}
            <div className="relative h-[60vh]">
              <Carousel className="h-full">
                <CarouselContent className="h-full">
                  {hotel.images.map((image, index) => (
                    <CarouselItem key={index} className="h-full">
                      <div className="h-full w-full">
                        <img 
                          src={image} 
                          alt={`${hotel.name} - image ${index + 1}`} 
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
                <div className="container-custom">
                  <h1 className="text-3xl md:text-4xl font-bold mb-1">{hotel.name}</h1>
                  <div className="flex items-center mb-2">
                    <Star className="h-5 w-5 fill-yellow-400 stroke-yellow-400 mr-1" />
                    <span className="font-medium mr-2">{hotel.rating}</span>
                    <span className="text-white/90">Exceptional</span>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{hotel.location}</span>
                    {hotel.nearestEvent && (
                      <div className="ml-4 bg-orange-500 text-white px-2 py-1 rounded-full text-sm flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{hotel.nearestEvent.distance} to {hotel.nearestEvent.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="container-custom py-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content */}
                <div className="lg:w-2/3">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">About This Hotel</h2>
                    <p className="text-gray-700">{hotel.description}</p>
                    
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                      {hotel.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          <amenity.icon className="h-5 w-5 text-eventuraa-blue mr-2" />
                          <span>{amenity.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Select Room Type</h2>
                    <div className="space-y-4">
                      {hotel.rooms.map(room => (
                        <Card 
                          key={room.id} 
                          className={`cursor-pointer transition-all border-2 ${selectedRoom === room.id ? 'border-eventuraa-blue' : 'border-gray-100'}`}
                          onClick={() => handleRoomChange(room.id)}
                        >
                          <CardContent className="p-4 flex flex-col md:flex-row md:items-center gap-4">
                            <div className="md:w-1/4">
                              <img 
                                src={hotel.images[1]} 
                                alt={room.name} 
                                className="w-full h-32 object-cover rounded-md"
                              />
                            </div>
                            
                            <div className="flex-1">
                              <h3 className="text-lg font-bold">{room.name}</h3>
                              <p className="text-gray-600 text-sm mb-2">{room.description}</p>
                              
                              <div className="flex flex-wrap gap-2">
                                {room.amenities.map((amenity, index) => (
                                  <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                                    {amenity}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <p className="font-bold text-lg text-eventuraa-blue">LKR {room.price.toLocaleString()}</p>
                              <p className="text-xs text-gray-500">per night</p>
                              
                              {selectedRoom === room.id && (
                                <div className="mt-2 flex justify-end">
                                  <div className="bg-eventuraa-blue text-white p-1 rounded-full">
                                    <Check className="h-4 w-4" />
                                  </div>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <Tabs defaultValue="highlights">
                      <TabsList className="mb-4">
                        <TabsTrigger value="highlights">Local Highlights</TabsTrigger>
                        <TabsTrigger value="location">Location</TabsTrigger>
                        <TabsTrigger value="reviews">Reviews</TabsTrigger>
                        <TabsTrigger value="policies">Policies</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="highlights">
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="text-xl font-bold mb-4">Why Sri Lankan Tourists Love This Hotel</h3>
                            <ul className="space-y-3">
                              {hotel.highlights.map((highlight, index) => (
                                <li key={index} className="flex items-start">
                                  <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                            
                            <div className="mt-6 pt-6 border-t border-gray-200">
                              <h4 className="font-bold mb-3">Cultural Compatibility</h4>
                              <div className="flex gap-4">
                                <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                                  <span className="text-lg mr-1">☸️</span>
                                  <span className="text-sm">Buddhist-Friendly</span>
                                </div>
                                <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                                  <span className="text-lg mr-1">🥗</span>
                                  <span className="text-sm">Vegetarian Options</span>
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
                            <p className="mb-4">{hotel.address}</p>
                            
                            <div className="aspect-video bg-gray-200 mb-4">
                              {/* Placeholder for map - in a real app this would be an actual map */}
                              <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-800">
                                Interactive Map would be displayed here
                              </div>
                            </div>
                            
                            <h4 className="font-bold mb-2">Nearby Attractions</h4>
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <MapPin className="h-4 w-4 mr-2 mt-1 text-eventuraa-blue" />
                                <div>
                                  <span className="font-medium">Temple of the Tooth</span>
                                  <span className="text-sm text-gray-600 block">0.5 km</span>
                                </div>
                              </li>
                              <li className="flex items-start">
                                <MapPin className="h-4 w-4 mr-2 mt-1 text-eventuraa-blue" />
                                <div>
                                  <span className="font-medium">Kandy Lake</span>
                                  <span className="text-sm text-gray-600 block">0.3 km</span>
                                </div>
                              </li>
                              <li className="flex items-start">
                                <MapPin className="h-4 w-4 mr-2 mt-1 text-eventuraa-blue" />
                                <div>
                                  <span className="font-medium">Perahera Route</span>
                                  <span className="text-sm text-gray-600 block">0.2 km</span>
                                </div>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      
                      <TabsContent value="reviews">
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="text-xl font-bold mb-4">Guest Reviews</h3>
                            <div className="flex items-center mb-6">
                              <div className="bg-green-500 text-white text-xl font-bold w-12 h-12 rounded-full flex items-center justify-center mr-3">
                                4.8
                              </div>
                              <div>
                                <div className="text-green-600 font-medium">Exceptional</div>
                                <div className="text-sm text-gray-600">Based on 245 reviews</div>
                              </div>
                            </div>
                            
                            <div className="space-y-6">
                              {/* Sample review 1 */}
                              <div className="pb-4 border-b border-gray-200">
                                <div className="flex justify-between mb-2">
                                  <div className="font-medium">Nimal P.</div>
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                                    <span className="ml-1">5.0</span>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-600 mb-1">Perfect location for viewing Perahera!</p>
                                <div className="text-xs text-gray-500">Stayed May 2024 • Family trip</div>
                              </div>
                              
                              {/* Sample review 2 */}
                              <div className="pb-4 border-b border-gray-200">
                                <div className="flex justify-between mb-2">
                                  <div className="font-medium">Amali W.</div>
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                                    <span className="ml-1">4.5</span>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-600 mb-1">Excellent service and the ayurvedic spa was wonderful! Would recommend the heritage suite for the lake view.</p>
                                <div className="text-xs text-gray-500">Stayed April 2024 • Couple</div>
                              </div>
                              
                              {/* Sample review 3 */}
                              <div>
                                <div className="flex justify-between mb-2">
                                  <div className="font-medium">James T.</div>
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                                    <span className="ml-1">4.8</span>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-600 mb-1">The free tuk-tuk service made exploring the city so convenient. The breakfast was amazing with both Western and Sri Lankan options.</p>
                                <div className="text-xs text-gray-500">Stayed March 2024 • Business trip</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      
                      <TabsContent value="policies">
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="text-xl font-bold mb-4">Hotel Policies</h3>
                            <ul className="space-y-3">
                              {hotel.policies.map((policy, index) => (
                                <li key={index} className="flex items-start">
                                  <div className="h-5 w-5 text-eventuraa-blue mr-2">•</div>
                                  <span>{policy}</span>
                                </li>
                              ))}
                            </ul>
                            
                            <div className="mt-6 pt-6 border-t border-gray-200">
                              <h4 className="font-bold mb-3">Emergency Information</h4>
                              <div className="flex items-start">
                                <Phone className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                                <div>
                                  <div className="font-medium">Doctor on Call</div>
                                  <div className="text-sm text-gray-600">24/7 medical assistance available</div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </div>
                  
                  {/* Event Package Promotion */}
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200 mb-8">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="inline-block bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded mb-2">Special Package</span>
                        <h3 className="text-xl font-bold mb-2">Book Hotel + Event: Kandy Perahera</h3>
                        <p className="text-gray-700 mb-4">Get 15% off your stay when you book with Perahera premium viewing tickets!</p>
                        <Button className="bg-eventuraa-blue hover:bg-blue-600">
                          View Package Details
                        </Button>
                      </div>
                      <div className="bg-blue-500 text-white font-bold px-3 py-2 rounded-full text-xl">
                        -15%
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Booking Sidebar */}
                <div className="lg:w-1/3">
                  <div className="sticky top-4">
                    <Card className="shadow-lg">
                      <CardContent className="p-6">
                        <h2 className="text-xl font-bold mb-4">Book Your Stay</h2>
                        
                        <div className="space-y-4 mb-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <Label htmlFor="checkin">Check-in</Label>
                              <Input 
                                id="checkin" 
                                type="date" 
                                value={checkInDate}
                                onChange={(e) => setCheckInDate(e.target.value)}
                              />
                            </div>
                            <div className="space-y-1">
                              <Label htmlFor="checkout">Check-out</Label>
                              <Input 
                                id="checkout" 
                                type="date"
                                value={checkOutDate}
                                onChange={(e) => setCheckOutDate(e.target.value)}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <Label htmlFor="guests">Guests</Label>
                            <select 
                              id="guests" 
                              className="w-full p-2 border border-gray-300 rounded-md"
                              value={guests}
                              onChange={(e) => setGuests(e.target.value)}
                            >
                              <option value="1">1 Guest</option>
                              <option value="2">2 Guests</option>
                              <option value="3">3 Guests</option>
                              <option value="4">4 Guests</option>
                            </select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Selected Room</Label>
                            <div className="p-3 bg-gray-50 rounded-md">
                              <div className="font-medium">{selectedRoomData?.name}</div>
                              <div className="text-sm text-gray-600">{selectedRoomData?.description}</div>
                              <div className="font-bold text-eventuraa-blue mt-1">
                                <div>LKR {selectedRoomData?.price.toLocaleString()}</div>
                                <div className="text-sm font-normal text-gray-500">
                                  {selectedRoomData && convertPrice(selectedRoomData.price)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3 mb-6 border-t border-gray-200 pt-4">
                          <Label>Add-ons</Label>
                          
                          <div className="flex items-start space-x-2">
                            <Checkbox 
                              id="addon-transport" 
                              checked={addOns.includes('transport')}
                              onCheckedChange={() => handleAddOnToggle('transport')}
                            />
                            <div>
                              <Label htmlFor="addon-transport" className="font-medium">Event Transport Package</Label>
                              <p className="text-sm text-gray-600">VIP drop-off/pickup for Kandy Perahera</p>
                              <p className="text-xs text-eventuraa-blue">+ LKR 2,000</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-2">
                            <Checkbox 
                              id="addon-breakfast" 
                              checked={addOns.includes('breakfast')}
                              onCheckedChange={() => handleAddOnToggle('breakfast')}
                            />
                            <div>
                              <Label htmlFor="addon-breakfast" className="font-medium">Premium Breakfast</Label>
                              <p className="text-sm text-gray-600">Enhanced breakfast with local specialties</p>
                              <p className="text-xs text-eventuraa-blue">+ LKR 1,500</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-2">
                            <Checkbox 
                              id="addon-spa" 
                              checked={addOns.includes('spa')}
                              onCheckedChange={() => handleAddOnToggle('spa')}
                            />
                            <div>
                              <Label htmlFor="addon-spa" className="font-medium">Ayurvedic Spa Package</Label>
                              <p className="text-sm text-gray-600">60-min traditional treatment</p>
                              <p className="text-xs text-eventuraa-blue">+ LKR 3,500</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4 border-t border-gray-200 pt-4">
                          <div className="flex justify-between">
                            <span>Total:</span>
                            <div className="text-right">
                              <div className="font-bold text-xl">LKR {calculateTotal().toLocaleString()}</div>
                              <div className="text-sm text-gray-500">{convertPrice(calculateTotal())}</div>
                            </div>
                          </div>
                          
                          <Button 
                            className="w-full bg-green-600 hover:bg-green-700"
                            onClick={handleReservation}
                          >
                            Reserve with Eventuraa
                          </Button>
                          
                          <Button 
                            variant="outline"
                            className="w-full border-gray-300 text-gray-700"
                            onClick={handleExternalBooking}
                          >
                            Book on Booking.com
                          </Button>
                          
                          <div className="flex flex-col space-y-2 bg-gray-50 p-3 rounded-md">
                            <div className="flex items-center text-green-600">
                              <Check className="h-4 w-4 mr-2 text-green-600" />
                              <span className="text-sm font-medium">Free cancellation</span>
                            </div>
                            <div className="flex items-center text-green-600">
                              <Check className="h-4 w-4 mr-2 text-green-600" />
                              <span className="text-sm font-medium">Doctor-on-call guaranteed</span>
                            </div>
                            <div className="flex items-center text-green-600">
                              <Check className="h-4 w-4 mr-2 text-green-600" />
                              <span className="text-sm font-medium">Secure payment</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Tourist Info Card */}
                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="font-bold text-blue-800 mb-2">International Tourist Information</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 mr-2 mt-0.5 text-blue-700" />
                          <span>Visa on arrival available for most countries</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 mr-2 mt-0.5 text-blue-700" />
                          <span>Free airport transfer with 3+ night stays</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 mr-2 mt-0.5 text-blue-700" />
                          <span>Multi-lingual staff (English, Chinese, Japanese)</span>
                        </li>
                      </ul>
                    </div>
                    
                    {/* Emergency Card */}
                    <div className="mt-6">
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center">
                        <Phone className="h-4 w-4 mr-2" />
                        Find Nearest Medical Services
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default HotelDetailPage;
