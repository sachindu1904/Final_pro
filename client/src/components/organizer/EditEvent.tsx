
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Plus, Trash, Upload, X } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

const EditEvent: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock data - in a real app, you would fetch this from an API based on the ID
  const [event, setEvent] = useState({
    id: parseInt(id || '0'),
    title: "Colombo Music Festival",
    date: new Date(2025, 4, 15),
    time: "19:00",
    location: "Viharamahadevi Park, Colombo",
    category: "music",
    description: "The biggest music festival in Sri Lanka featuring local and international artists performing across multiple stages in the heart of Colombo.",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=500&q=60",
    published: true
  });
  
  const [ticketTypes, setTicketTypes] = useState([
    { name: 'General Admission', price: '2500', quantity: '300', sold: '150' },
    { name: 'VIP Access', price: '5000', quantity: '100', sold: '45' }
  ]);
  
  const handleAddTicketType = () => {
    setTicketTypes([...ticketTypes, { name: '', price: '', quantity: '', sold: '0' }]);
  };
  
  const handleRemoveTicketType = (index: number) => {
    setTicketTypes(ticketTypes.filter((_, i) => i !== index));
  };
  
  const handleTicketChange = (index: number, field: string, value: string) => {
    const newTicketTypes = [...ticketTypes];
    newTicketTypes[index] = { ...newTicketTypes[index], [field]: value };
    setTicketTypes(newTicketTypes);
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEvent({ ...event, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleChange = (field: string, value: any) => {
    setEvent({ ...event, [field]: value });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // This would be an API call in a real application
    setTimeout(() => {
      toast.success('Event updated successfully!');
      navigate('/organizer-portal/events');
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Edit Event</h1>
      <p className="text-gray-600 mb-8">Update your event details</p>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Event Details</h2>
              
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input 
                  id="title" 
                  value={event.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  required 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Event Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(event.date, "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={event.date}
                        onSelect={(date) => date && handleChange('date', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time">Event Time</Label>
                  <Input 
                    id="time" 
                    type="time" 
                    value={event.time}
                    onChange={(e) => handleChange('time', e.target.value)}
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  value={event.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={event.category}
                  onValueChange={(value) => handleChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="culinary">Culinary</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Event Description</Label>
                <Textarea 
                  id="description" 
                  value={event.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="min-h-[120px]" 
                />
              </div>
            </div>
          </div>
          
          <div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Event Image</h2>
              <div className="border rounded-md p-4">
                {event.image ? (
                  <div className="relative">
                    <img 
                      src={event.image} 
                      alt="Event" 
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                      onClick={() => handleChange('image', null)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed rounded-md flex flex-col items-center justify-center h-48 bg-gray-50">
                    <Upload size={32} className="text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-1">Drag and drop an image or</p>
                    <Label 
                      htmlFor="image-upload" 
                      className="cursor-pointer text-[#7E69AB] hover:underline text-sm"
                    >
                      Browse
                    </Label>
                    <Input 
                      id="image-upload" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageUpload}
                    />
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Recommended size: 1200 × 630 pixels (16:9)
                </p>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Publishing Status</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="publish" 
                    checked={event.published}
                    onCheckedChange={(checked) => handleChange('published', !!checked)}
                  />
                  <Label htmlFor="publish" className="text-sm">Published</Label>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Uncheck to save as draft and hide from public view
                </p>
              </div>
              
              <div className="border rounded-md p-4 bg-yellow-50">
                <h3 className="font-medium mb-2">Event Status</h3>
                <p className="text-sm text-yellow-800">
                  This event is currently <strong>scheduled</strong> and will go live on the selected date.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Ticket Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Ticket Information</h2>
          
          <div className="space-y-4">
            {ticketTypes.map((ticket, index) => (
              <div key={index} className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Ticket Type {index + 1}</h3>
                  {ticketTypes.length > 1 && parseInt(ticket.sold) === 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveTicketType(index)}
                    >
                      <Trash size={16} className="text-red-500" />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`ticket-name-${index}`}>Ticket Name</Label>
                    <Input
                      id={`ticket-name-${index}`}
                      value={ticket.name}
                      onChange={(e) => handleTicketChange(index, 'name', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`ticket-price-${index}`}>Price (LKR)</Label>
                    <Input
                      id={`ticket-price-${index}`}
                      type="number"
                      value={ticket.price}
                      onChange={(e) => handleTicketChange(index, 'price', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`ticket-quantity-${index}`}>Total Quantity</Label>
                    <Input
                      id={`ticket-quantity-${index}`}
                      type="number"
                      value={ticket.quantity}
                      onChange={(e) => handleTicketChange(index, 'quantity', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`ticket-sold-${index}`}>Sold</Label>
                    <Input
                      id={`ticket-sold-${index}`}
                      type="number"
                      value={ticket.sold}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                </div>
                
                {parseInt(ticket.sold) > 0 && (
                  <p className="text-xs text-orange-500 mt-4">
                    <strong>Note:</strong> This ticket type has sales and cannot be deleted.
                  </p>
                )}
              </div>
            ))}
          </div>
          
          <Button
            type="button"
            variant="outline"
            onClick={handleAddTicketType}
            className="flex items-center"
          >
            <Plus size={16} className="mr-2" />
            Add Another Ticket Type
          </Button>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/organizer-portal/events')}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="bg-[#7E69AB] hover:bg-[#6E59A5]"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditEvent;
