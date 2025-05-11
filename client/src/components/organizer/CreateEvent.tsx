import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Calendar as CalendarIcon, Plus, Trash, Upload, X, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import api from '@/lib/axios';

interface TicketType {
  name: string;
  price: string;
  quantity: string;
}

interface FormErrors {
  title?: string;
  date?: string;
  time?: string;
  location?: string;
  category?: string;
  description?: string;
  tickets?: string;
  images?: string;
  general?: string;
}

const CreateEvent: React.FC = () => {
  const navigate = useNavigate();
  
  // Form states
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [eventImages, setEventImages] = useState<string[]>([]);
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([
    { name: 'General Admission', price: '', quantity: '100' }
  ]);
  
  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  
  const handleAddTicketType = () => {
    setTicketTypes([...ticketTypes, { name: '', price: '', quantity: '' }]);
  };
  
  const handleRemoveTicketType = (index: number) => {
    setTicketTypes(ticketTypes.filter((_, i) => i !== index));
  };
  
  const handleTicketChange = (index: number, field: string, value: string) => {
    const newTicketTypes = [...ticketTypes];
    newTicketTypes[index] = { ...newTicketTypes[index], [field]: value };
    setTicketTypes(newTicketTypes);
  };
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setIsUploading(true);
      
      // Create form data for the image
      const formData = new FormData();
      formData.append('image', file);
      
      // Upload to Cloudinary via our API
      const response = await api.post('/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.success) {
        // Add the Cloudinary URL to our images array
        setEventImages([...eventImages, response.data.url]);
        toast.success('Image uploaded successfully');
      } else {
        toast.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error uploading image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleRemoveImage = (index: number) => {
    const newImages = [...eventImages];
    newImages.splice(index, 1);
    setEventImages(newImages);
  };
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    
    if (!title.trim()) {
      newErrors.title = 'Event title is required';
      isValid = false;
    }
    
    if (!date) {
      newErrors.date = 'Event date is required';
      isValid = false;
    }
    
    if (!time) {
      newErrors.time = 'Event time is required';
      isValid = false;
    }
    
    if (!location.trim()) {
      newErrors.location = 'Event location is required';
      isValid = false;
    }
    
    if (!category) {
      newErrors.category = 'Event category is required';
      isValid = false;
    }
    
    if (!description.trim()) {
      newErrors.description = 'Event description is required';
      isValid = false;
    }
    
    // Check if at least one ticket type is valid
    let hasValidTicket = false;
    
    for (const ticket of ticketTypes) {
      if (ticket.name && ticket.price && ticket.quantity) {
        hasValidTicket = true;
        break;
      }
    }
    
    if (!hasValidTicket) {
      newErrors.tickets = 'At least one valid ticket type is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Format date for API
      const formattedDate = date ? date.toISOString().split('T')[0] : '';
      
      // Prepare event data
      const eventData = {
        title,
        description,
        date: formattedDate,
        time,
        location,
        category,
        images: eventImages, // These are now Cloudinary URLs
        published: isPublished,
        tickets: ticketTypes.filter(ticket => 
          ticket.name && ticket.price && ticket.quantity
        )
      };
      
      console.log('Sending event data:', eventData);
      
      // Use the public endpoint for testing purposes
      const response = await api.post('/public/events', eventData);
      
      if (response.data.success) {
        toast.success('Event created successfully!');
        navigate('/organizer-portal/events');
      } else {
        setErrors({ general: response.data.message || 'Error creating event' });
        toast.error(response.data.message || 'Error creating event');
      }
    } catch (error: any) {
      console.error('Error creating event:', error);
      
      if (error.response?.data?.errors) {
        // Map backend validation errors to form fields
        const backendErrors: FormErrors = {};
        
        error.response.data.errors.forEach((err: any) => {
          if (err.param.startsWith('tickets')) {
            backendErrors.tickets = err.msg;
          } else if (err.param in errors) {
            backendErrors[err.param as keyof FormErrors] = err.msg;
          } else {
            backendErrors.general = err.msg;
          }
        });
        
        setErrors(backendErrors);
      } else {
        setErrors({ 
          general: error.response?.data?.message || 'Failed to create event. Please try again.' 
        });
      }
      
      toast.error(error.response?.data?.message || 'Failed to create event');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Create New Event</h1>
      <p className="text-gray-600 mb-8">Fill in the details to create a new event</p>
      
      {errors.general && (
        <div className="p-4 mb-6 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <span>{errors.general}</span>
        </div>
      )}
      
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
                  placeholder="Enter event title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={errors.title ? 'border-red-500' : ''}
                  required 
                />
                {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Event Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground",
                          errors.date && "border-red-500"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time">Event Time</Label>
                  <Input 
                    id="time" 
                    type="time" 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className={errors.time ? 'border-red-500' : ''}
                    required 
                  />
                  {errors.time && <p className="text-xs text-red-500 mt-1">{errors.time}</p>}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  placeholder="Enter event location" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={errors.location ? 'border-red-500' : ''}
                  required 
                />
                {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={category}
                  onValueChange={setCategory}
                >
                  <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="culinary">Culinary</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Event Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe your event..." 
                  className={`min-h-[120px] ${errors.description ? 'border-red-500' : ''}`}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
              </div>
            </div>
          </div>
          
          <div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Event Images</h2>
              <div className="border rounded-md p-4">
                {eventImages.length > 0 ? (
                  <div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {eventImages.map((img, index) => (
                        <div key={index} className="relative">
                          <img 
                            src={img} 
                            alt={`Event ${index + 1}`} 
                            className="w-32 h-32 object-cover rounded-md"
                          />
                          <button
                            type="button"
                            className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="border-2 border-dashed rounded-md flex flex-col items-center justify-center h-32 bg-gray-50">
                      {isUploading ? (
                        <div className="flex items-center justify-center">
                          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                          <span className="ml-2 text-sm text-gray-500">Uploading...</span>
                        </div>
                      ) : (
                        <>
                          <Upload size={24} className="text-gray-400 mb-2" />
                          <p className="text-xs text-gray-500 mb-1">Add another image</p>
                          <Label 
                            htmlFor="image-upload" 
                            className="cursor-pointer text-[#7E69AB] hover:underline text-xs"
                          >
                            Browse
                          </Label>
                          <Input 
                            id="image-upload" 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleImageUpload}
                            disabled={isUploading}
                          />
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed rounded-md flex flex-col items-center justify-center h-48 bg-gray-50">
                    {isUploading ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                        <span className="ml-2 text-sm text-gray-500">Uploading...</span>
                      </div>
                    ) : (
                      <>
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
                          disabled={isUploading}
                        />
                      </>
                    )}
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Recommended size: 1200 × 630 pixels (16:9)
                </p>
                {errors.images && <p className="text-xs text-red-500 mt-1">{errors.images}</p>}
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Publishing Options</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="publish" 
                    checked={isPublished}
                    onCheckedChange={(checked) => setIsPublished(!!checked)}
                  />
                  <Label htmlFor="publish" className="text-sm">Publish immediately</Label>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  If unchecked, event will be saved as draft
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Ticket Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Ticket Information</h2>
          
          {errors.tickets && (
            <div className="p-3 mb-2 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
              {errors.tickets}
            </div>
          )}
          
          <div className="space-y-4">
            {ticketTypes.map((ticket, index) => (
              <div key={index} className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Ticket Type {index + 1}</h3>
                  {ticketTypes.length > 1 && (
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
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`ticket-name-${index}`}>Ticket Name</Label>
                    <Input
                      id={`ticket-name-${index}`}
                      placeholder="e.g., General Admission"
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
                      placeholder="0"
                      min="0"
                      value={ticket.price}
                      onChange={(e) => handleTicketChange(index, 'price', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`ticket-quantity-${index}`}>Quantity Available</Label>
                    <Input
                      id={`ticket-quantity-${index}`}
                      type="number"
                      placeholder="100"
                      min="1"
                      value={ticket.quantity}
                      onChange={(e) => handleTicketChange(index, 'quantity', e.target.value)}
                      required
                    />
                  </div>
                </div>
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
            disabled={isSubmitting || isUploading}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Event'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
