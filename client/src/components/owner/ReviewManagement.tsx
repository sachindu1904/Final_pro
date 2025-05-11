
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Flag, Check, Clock, Star, Award } from 'lucide-react';
import { toast } from 'sonner';

const ReviewManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [responseText, setResponseText] = useState<string>('');
  const [reviewToRespond, setReviewToRespond] = useState<number | null>(null);

  const handleResponseSubmit = (reviewId: number) => {
    if (!responseText.trim()) {
      toast.error('Please enter a response');
      return;
    }
    
    toast.success('Response submitted successfully');
    setResponseText('');
    setReviewToRespond(null);
  };

  const handleReportReview = (reviewId: number) => {
    toast.success('Review reported for moderation');
  };

  const reviews = [
    {
      id: 1,
      guest: 'Sarah Brown',
      rating: 5,
      date: '2023-06-01',
      content: 'The villa was absolutely stunning! The views of the mountains from our balcony were breathtaking. Our host was incredibly welcoming and helped us arrange a tuk-tuk tour of the area. The breakfast was delicious with fresh local fruits. Will definitely return!',
      response: "Thank you for your lovely review, Sarah! We're so glad you enjoyed the views and our tuk-tuk tour. We look forward to welcoming you back soon!",
      status: 'responded',
      listing: 'Ella Forest Retreat',
    },
    {
      id: 2,
      guest: 'Michael Chen',
      rating: 4,
      date: '2023-05-28',
      content: 'Beautiful property with excellent views. The staff was very friendly and helpful. Only minor complaint is that the WiFi was a bit spotty, but otherwise a fantastic stay.',
      response: null,
      status: 'pending',
      listing: 'Ella Forest Retreat',
    },
    {
      id: 3,
      guest: 'Elena Rodriguez',
      rating: 5,
      date: '2023-05-20',
      content: "Our cooking class was the highlight of our trip! The chef was patient and taught us authentic Sri Lankan curry recipes that I can't wait to try at home. The restaurant atmosphere was so charming too.",
      response: null,
      status: 'pending',
      listing: 'Spice Garden Restaurant',
    },
  ];

  const filteredReviews = reviews.filter(review => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return review.response === null;
    if (activeTab === 'responded') return review.response !== null;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Guest Reviews</h1>
        <div className="text-sm text-gray-500">
          Average Rating: 
          <span className="ml-1 font-bold text-amber-500 flex items-center">
            4.7/5 
            <Star className="h-4 w-4 ml-1 fill-amber-500 text-amber-500" />
          </span>
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 max-w-md mb-6">
          <TabsTrigger value="all">All Reviews</TabsTrigger>
          <TabsTrigger value="pending">
            Pending <Badge className="ml-1 bg-eventuraa-blue">{reviews.filter(r => r.response === null).length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="responded">Responded</TabsTrigger>
        </TabsList>

        <div className="space-y-6">
          {filteredReviews.length > 0 ? (
            filteredReviews.map(review => (
              <Card key={review.id} className={review.response === null ? "border-l-4 border-l-eventuraa-blue" : ""}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center mb-1">
                        <h3 className="font-bold">{review.guest}</h3>
                        <Badge className="ml-2" variant="outline">
                          {review.listing}
                        </Badge>
                      </div>
                      <div className="flex items-center">
                        <div className="flex mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                    </div>
                    
                    <Badge 
                      className={`${
                        review.response 
                          ? "bg-green-100 text-green-800 hover:bg-green-200" 
                          : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                      }`}
                      variant="outline"
                    >
                      {review.response 
                        ? <Check className="h-3 w-3 mr-1" /> 
                        : <Clock className="h-3 w-3 mr-1" />
                      }
                      {review.response ? "Responded" : "Awaiting Response"}
                    </Badge>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-700">{review.content}</p>
                  </div>
                  
                  {review.response && (
                    <div className="bg-gray-50 p-4 rounded-md mb-4">
                      <div className="flex items-center mb-2">
                        <MessageSquare className="h-4 w-4 text-eventuraa-purple mr-2" />
                        <h4 className="font-medium text-sm">Your Response</h4>
                      </div>
                      <p className="text-gray-600 text-sm">{review.response}</p>
                    </div>
                  )}
                  
                  {reviewToRespond === review.id ? (
                    <div className="mt-4 space-y-3">
                      <Textarea 
                        placeholder="Write your response to this review..."
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setReviewToRespond(null);
                            setResponseText('');
                          }}
                        >
                          Cancel
                        </Button>
                        <Button 
                          size="sm"
                          className="bg-eventuraa-purple hover:bg-eventuraa-darkPurple"
                          onClick={() => handleResponseSubmit(review.id)}
                        >
                          Submit Response
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end space-x-2">
                      {!review.response && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setReviewToRespond(review.id)}
                          className="text-eventuraa-purple border-eventuraa-purple hover:bg-eventuraa-softPurple"
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Respond
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleReportReview(review.id)}
                        className="text-red-500"
                      >
                        <Flag className="h-4 w-4 mr-1" />
                        Report
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <MessageSquare className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium mb-2">No Reviews Found</h3>
                <p className="text-gray-500 text-center mb-6 max-w-md">
                  There are no reviews matching your current filter.
                </p>
                <Button 
                  variant="outline"
                  onClick={() => setActiveTab('all')}
                >
                  View All Reviews
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </Tabs>
      
      <Card className="bg-eventuraa-softPurple border-eventuraa-purple">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2 text-eventuraa-purple" /> 
            Gem of the Month Contest
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            Properties with the most positive reviews qualify for our "Gem of the Month" contest. 
            Respond to reviews promptly to improve your ranking and guest satisfaction!
          </p>
          <div className="mt-4 bg-white p-3 rounded-md">
            <h4 className="font-medium text-sm mb-2">Your Review Stats</h4>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-sm text-gray-500">Total Reviews</p>
                <p className="font-bold text-lg">{reviews.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Response Rate</p>
                <p className="font-bold text-lg">
                  {Math.round((reviews.filter(r => r.response !== null).length / reviews.length) * 100)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg. Rating</p>
                <p className="font-bold text-lg flex items-center justify-center">
                  4.7 <Star className="h-4 w-4 ml-1 fill-amber-500 text-amber-500" />
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewManagement;
