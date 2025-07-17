import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReviewDialogProps {
  ventureTitle: string;
  bookingId: string;
  triggerButton: React.ReactNode;
}

export function ReviewDialog({ ventureTitle, bookingId, triggerButton }: ReviewDialogProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a star rating before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Review submitted!",
      description: `Thank you for reviewing ${ventureTitle}. Your feedback helps other adventurers!`,
    });
    
    setIsSubmitting(false);
    setIsOpen(false);
    setRating(0);
    setReview("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Leave a Review</DialogTitle>
          <DialogDescription>
            Share your experience with <span className="font-semibold">{ventureTitle}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Star Rating */}
          <div className="space-y-2">
            <Label htmlFor="rating" className="text-sm font-medium">
              Rating
            </Label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="transition-colors"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    } transition-colors`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {rating > 0 && `${rating} out of 5 stars`}
              </span>
            </div>
          </div>

          {/* Review Text */}
          <div className="space-y-2">
            <Label htmlFor="review" className="text-sm font-medium">
              Your Review
            </Label>
            <Textarea
              id="review"
              placeholder="Tell us about your experience..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || rating === 0}
            className="bg-venture-coral hover:bg-venture-coral/90"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}