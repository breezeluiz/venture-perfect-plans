import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { 
  MapPin, Clock, Users, Star, Heart, Share2, Calendar as CalendarIcon, 
  Check, X, AlertCircle, Phone, Mail, Globe
} from "lucide-react";
import { venturePacks } from "@/data/venturePacks";
import { toast } from "@/hooks/use-toast";

export default function VentureDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const pack = venturePacks.find(p => p.id === id);

  if (!pack) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold text-venture-coral mb-4">Venture Not Found</h1>
          <p className="text-xl text-muted-foreground mb-8">
            The venture you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/venture-packs')}>
            Browse All Ventures
          </Button>
        </div>
      </div>
    );
  }

  const handleBookNow = () => {
    if (!selectedDate) {
      toast({
        title: "Select a date",
        description: "Please select your preferred date before booking.",
        variant: "destructive",
      });
      return;
    }
    setShowBookingForm(true);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Share this adventure with your friends.",
    });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite ? "Venture removed from your favorites." : "Venture saved to your favorites.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-8xl">{pack.image}</div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className={`${
                      pack.difficulty === 'Easy' ? 'text-green-600 border-green-600' :
                      pack.difficulty === 'Moderate' ? 'text-yellow-600 border-yellow-600' : 
                      'text-red-600 border-red-600'
                    }`}>
                      {pack.difficulty}
                    </Badge>
                    <Badge variant="secondary">{pack.category}</Badge>
                    {pack.originalPrice && (
                      <Badge variant="destructive">
                        Save ${parseInt(pack.originalPrice.slice(1)) - parseInt(pack.price.slice(1))}!
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-4xl font-bold text-venture-coral mb-2">{pack.title}</h1>
                  <div className="flex items-center gap-6 text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      {pack.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      {pack.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      {pack.groupSize}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleFavorite}
                className={isFavorite ? "text-red-500 border-red-500" : ""}
              >
                <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                {isFavorite ? 'Saved' : 'Save'}
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-6 mb-4">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="font-semibold text-lg">{pack.rating}</span>
              <span className="text-muted-foreground ml-2">({pack.reviews} reviews)</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Best time: {pack.bestTime}
            </div>
          </div>

          <p className="text-lg text-muted-foreground max-w-4xl">{pack.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="included">What's Included</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Highlights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {pack.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <Star className="h-5 w-5 text-venture-coral mr-3 mt-0.5 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Key Activities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {pack.activities.map((activity, index) => (
                        <div key={index} className="flex items-center p-3 bg-venture-cream/30 rounded-lg">
                          <div className="w-3 h-3 bg-venture-coral rounded-full mr-3"></div>
                          <span className="font-medium">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="itinerary" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Itinerary</CardTitle>
                    <CardDescription>
                      Your adventure timeline from start to finish
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {pack.activities.map((activity, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 bg-venture-coral text-white rounded-full flex items-center justify-center font-semibold">
                              {index + 1}
                            </div>
                            {index < pack.activities.length - 1 && (
                              <div className="w-0.5 h-12 bg-venture-coral/30 mt-2"></div>
                            )}
                          </div>
                          <div className="flex-1 pb-6">
                            <h3 className="font-semibold text-lg mb-2">{activity}</h3>
                            <p className="text-muted-foreground">
                              Experience the best of {activity.toLowerCase()} with our expert guides and premium service.
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="included" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-green-600">
                        <Check className="h-5 w-5 mr-2" />
                        What's Included
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {pack.included.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-red-600">
                        <X className="h-5 w-5 mr-2" />
                        Not Included
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {pack.notIncluded.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <X className="h-4 w-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Reviews</CardTitle>
                    <CardDescription>
                      {pack.reviews} verified reviews from adventurers like you
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Sample reviews */}
                      {[
                        {
                          name: "Sarah M.",
                          rating: 5,
                          date: "2 weeks ago",
                          comment: "Absolutely incredible experience! Everything was perfectly organized and our guide was amazing. Would definitely recommend this to anyone looking for an unforgettable adventure."
                        },
                        {
                          name: "James K.",
                          rating: 5,
                          date: "1 month ago",
                          comment: "Best money I've ever spent on a vacation. The attention to detail and quality of service exceeded all expectations. Already planning our next venture!"
                        },
                        {
                          name: "Maria L.",
                          rating: 4,
                          date: "2 months ago",
                          comment: "Great experience overall. The activities were well-planned and the locations were stunning. Only minor issue was the weather, but that's beyond anyone's control."
                        }
                      ].map((review, index) => (
                        <div key={index} className="border-b border-border pb-4 last:border-b-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-venture-coral text-white rounded-full flex items-center justify-center font-semibold">
                                {review.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-semibold">{review.name}</div>
                                <div className="text-sm text-muted-foreground">{review.date}</div>
                              </div>
                            </div>
                            <div className="flex">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                              ))}
                            </div>
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-3xl font-bold text-venture-coral">{pack.price}</span>
                      {pack.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          {pack.originalPrice}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">per person</p>
                  </div>
                  <Badge variant="outline" className="text-venture-coral border-venture-coral">
                    {pack.reviews} reviews
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Date</label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border"
                  />
                </div>

                <div className="space-y-2">
                  <Button 
                    className="w-full bg-venture-coral hover:bg-venture-coral/90"
                    size="lg"
                    onClick={handleBookNow}
                  >
                    Book This Adventure
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Call to Book
                  </Button>
                </div>

                <div className="space-y-3 pt-4 border-t text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Free cancellation up to 24 hours
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Check className="h-4 w-4 mr-2" />
                    Instant confirmation
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    Group size: {pack.groupSize}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-2">Need Help?</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>+254 700 123 456</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>hello@venture.co.ke</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Available 24/7</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Ventures */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-venture-coral mb-6">Similar Adventures</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {venturePacks
              .filter(p => p.id !== pack.id && p.category === pack.category)
              .slice(0, 3)
              .map((relatedPack) => (
                <Card 
                  key={relatedPack.id} 
                  className="cursor-pointer hover:shadow-medium transition-all duration-300"
                  onClick={() => navigate(`/venture/${relatedPack.id}`)}
                >
                  <CardHeader>
                    <div className="text-center mb-2">
                      <div className="text-4xl">{relatedPack.image}</div>
                    </div>
                    <CardTitle className="text-lg">{relatedPack.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {relatedPack.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-semibold">{relatedPack.rating}</span>
                      </div>
                      <div className="text-lg font-bold text-venture-coral">
                        {relatedPack.price}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}