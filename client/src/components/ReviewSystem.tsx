
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Star } from "lucide-react";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  venue: string;
}

interface ReviewSystemProps {
  venueId?: string;
  venueName?: string;
  initialReviews?: Review[];
}

const ReviewSystem = ({ venueId, venueName, initialReviews = [] }: ReviewSystemProps) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  const form = useForm({
    defaultValues: {
      name: "",
      rating: 5,
      comment: ""
    }
  });

  const onSubmit = (data) => {
    const newReview = {
      id: Date.now(),
      name: data.name,
      rating: data.rating,
      comment: data.comment,
      date: new Date().toLocaleDateString(),
      venue: venueName || "General"
    };
    
    setReviews([newReview, ...reviews]);
    toast.success("Thanks for your review!");
    form.reset();
  };
  
  const filteredReviews = activeFilter === "all" 
    ? reviews
    : reviews.filter(review => review.rating === parseInt(activeFilter));
  
  const averageRating = reviews.length 
    ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1) 
    : "0.0";

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2 font-display">Reviews & Ratings</h3>
        {reviews.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-eventuraa-blue text-white py-1 px-3 rounded-md font-bold text-lg">
              {averageRating}
            </div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star}
                  className={`h-5 w-5 ${
                    parseFloat(averageRating) >= star 
                      ? "text-yellow-400 fill-yellow-400" 
                      : "text-gray-300"
                  }`} 
                />
              ))}
            </div>
            <span className="text-gray-500">({reviews.length} reviews)</span>
          </div>
        )}
      </div>

      <div className="mb-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => field.onChange(rating)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            field.value >= rating 
                              ? "bg-yellow-400 text-white" 
                              : "bg-gray-100"
                          }`}
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Review</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Share your experience..." 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="bg-eventuraa-purple hover:bg-eventuraa-darkPurple">
              Submit Review
            </Button>
          </form>
        </Form>
      </div>

      {reviews.length > 0 && (
        <>
          <div className="flex gap-2 mb-6">
            <Button
              variant={activeFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("all")}
              className={activeFilter === "all" ? "bg-eventuraa-blue" : ""}
            >
              All Reviews
            </Button>
            {[5, 4, 3, 2, 1].map((rating) => (
              <Button
                key={rating}
                variant={activeFilter === rating.toString() ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(rating.toString())}
                className={activeFilter === rating.toString() ? "bg-eventuraa-blue" : ""}
              >
                {rating} Stars
              </Button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between mb-2">
                  <div className="font-semibold">{review.name}</div>
                  <div className="text-gray-500 text-sm">{review.date}</div>
                </div>
                <div className="flex mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      className={`h-4 w-4 ${
                        review.rating >= star 
                          ? "text-yellow-400 fill-yellow-400" 
                          : "text-gray-300"
                      }`} 
                    />
                  ))}
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewSystem;
