import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { RecommendationService } from "@/services/RecommendationService";
import { KenyaVenuesService } from "@/services/KenyaVenuesService";
import { Sparkles, MapPin, Star, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface RecommendedVenture {
  id: string;
  title: string;
  location: string;
  rating: number;
  price: number;
  category: string;
  tags: string[];
  image: string;
  description: string;
}

export function RecommendationsWidget() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState<RecommendedVenture[]>([]);
  const [kenyaVenues, setKenyaVenues] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const loadRecommendations = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Simulate user preferences based on user data
      const userPreferences = {
        occasionTypes: ['romantic', 'adventure'],
        budgetRange: 'mid-range',
        vibes: ['Romantic', 'Adventure', 'Nature'],
        locations: ['Nairobi', 'Mombasa', 'Diani'],
        activities: ['Wildlife viewing', 'Beach activities', 'Cultural tours'],
        pastBookings: ['1', '2'],
        ratings: { '1': 5, '2': 4 }
      };

      // Sample venture data (in production, this would come from your API)
      const ventures = [
        {
          id: '1',
          title: 'Romantic Lamu Getaway',
          category: 'Romantic',
          location: 'Lamu Island',
          price: 280,
          rating: 4.9,
          tags: ['Romantic', 'Cultural', 'Beach'],
          activities: ['Dhow sailing', 'Cultural tour', 'Sunset cruise'],
          popularity: 85,
          seasonality: ['all-year']
        },
        {
          id: '2', 
          title: 'Maasai Mara Safari',
          category: 'Safari',
          location: 'Maasai Mara',
          price: 450,
          rating: 4.8,
          tags: ['Adventure', 'Wildlife', 'Photography'],
          activities: ['Game drive', 'Hot air balloon', 'Cultural visit'],
          popularity: 95,
          seasonality: ['dry-season']
        },
        {
          id: '3',
          title: 'Diani Beach Adventure',
          category: 'Beach',
          location: 'Diani Beach',
          price: 120,
          rating: 4.7,
          tags: ['Beach', 'Adventure', 'Water Sports'],
          activities: ['Snorkeling', 'Kite surfing', 'Dolphin watching'],
          popularity: 78,
          seasonality: ['all-year']
        }
      ];

      // Get AI-powered recommendations
      const aiRecommendations = RecommendationService.generateRecommendations(
        ventures,
        userPreferences,
        [], // In production, this would be other users' data
        6
      );

      // Load Kenya venues data
      const venuesData = await KenyaVenuesService.scrapeKenyaVenues();
      setKenyaVenues(venuesData);

      // Convert to UI format
      const formattedRecommendations = aiRecommendations.map(venture => ({
        id: venture.id,
        title: venture.title || 'Untitled Adventure',
        location: venture.location || 'Kenya',
        rating: venture.rating || 4.0,
        price: venture.price || 100,
        category: venture.category || 'Adventure',
        tags: venture.tags || [],
        image: getImageForCategory(venture.category || 'Adventure'),
        description: `Experience the best of ${venture.location || 'Kenya'} with this amazing ${venture.category?.toLowerCase() || 'adventure'}.`
      }));

      setRecommendations(formattedRecommendations);
      setLastUpdate(new Date());
      
      toast({
        title: "Recommendations Updated! 🎯",
        description: `Found ${formattedRecommendations.length} perfect matches for you based on AI analysis.`,
      });

    } catch (error) {
      console.error('Error loading recommendations:', error);
      toast({
        title: "Error",
        description: "Failed to load recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRecommendations();
  }, [user]);

  const getImageForCategory = (category: string): string => {
    const categoryImages: { [key: string]: string } = {
      'Romantic': '💕',
      'Safari': '🦁',
      'Beach': '🏖️',
      'Adventure': '🏔️',
      'Cultural': '🏛️',
      'Wildlife': '🦒',
      'Nature': '🌲',
      'Marine': '🐠'
    };
    return categoryImages[category] || '🌍';
  };

  const handleExploreVenture = (venture: RecommendedVenture) => {
    navigate(`/booking?venture=${venture.id}&recommended=true`);
  };

  if (!user) return null;

  return (
    <Card className="w-full shadow-soft hover:shadow-medium transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-venture-coral" />
            <CardTitle className="text-xl font-display">AI Recommendations</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={loadRecommendations}
            disabled={isLoading}
            className="hover-scale"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        <CardDescription>
          Powered by advanced algorithms analyzing your preferences and Kenya's best destinations
          {lastUpdate && (
            <span className="block text-xs text-muted-foreground mt-1">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {recommendations.slice(0, 4).map((venture) => (
              <div key={venture.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{venture.image}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm group-hover:text-venture-coral transition-colors">
                        {venture.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{venture.location}</span>
                        <Star className="h-3 w-3 text-yellow-500 ml-2" />
                        <span>{venture.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        {venture.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs px-1 py-0">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-venture-coral text-sm">
                      ${venture.price}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-1 text-xs h-6 hover-scale"
                      onClick={() => handleExploreVenture(venture)}
                    >
                      Explore
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {kenyaVenues.length > 0 && (
              <>
                <div className="border-t pt-4 mt-4">
                  <h5 className="font-semibold text-sm mb-3 flex items-center">
                    🇰🇪 Fresh from Kenya Tourism Data
                  </h5>
                  {kenyaVenues.slice(0, 2).map((venue, index) => (
                    <div key={index} className="p-3 border rounded-lg mb-2 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{venue.image}</span>
                          <div>
                            <h6 className="font-medium text-xs">{venue.name}</h6>
                            <p className="text-xs text-muted-foreground">{venue.location}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              <span className="text-xs">{venue.rating}</span>
                              <Badge variant="outline" className="text-xs px-1 py-0 ml-2">
                                {venue.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-venture-coral font-medium">
                          {venue.priceRange}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            
            <Button 
              className="w-full mt-4 bg-gradient-hero text-white hover:opacity-90 transition-all hover-scale"
              onClick={() => navigate('/venture-packs')}
            >
              View All Recommendations
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}