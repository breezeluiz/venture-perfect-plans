import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock, Users, Star, Search, Filter, Calendar, Heart } from "lucide-react";
import { venturePacks, VenturePack } from "@/data/venturePacks";

export default function VenturePacksPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const categories = Array.from(new Set(venturePacks.map(pack => pack.category)));
  const durations = Array.from(new Set(venturePacks.map(pack => pack.duration)));

  const filteredPacks = venturePacks
    .filter(pack => {
      const matchesSearch = pack.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pack.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pack.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || pack.category === selectedCategory;
      const matchesDuration = selectedDuration === "all" || pack.duration === selectedDuration;
      
      return matchesSearch && matchesCategory && matchesDuration;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "price-low":
          return parseInt(a.price.slice(1)) - parseInt(b.price.slice(1));
        case "price-high":
          return parseInt(b.price.slice(1)) - parseInt(a.price.slice(1));
        case "reviews":
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });

  const toggleFavorite = (packId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(packId)) {
      newFavorites.delete(packId);
    } else {
      newFavorites.add(packId);
    }
    setFavorites(newFavorites);
  };

  const handleViewDetails = (packId: string) => {
    navigate(`/venture-packs/${packId}`);
  };

  const handleBookNow = (packId: string) => {
    navigate(`/booking?venture=${packId}`);
  };

  const handleCardClick = (packId: string, e: React.MouseEvent) => {
    // Don't navigate if clicking on buttons or interactive elements
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('[role="button"]')) {
      return;
    }
    navigate(`/venture-packs/${packId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
        <div className="container mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-venture-coral mb-4 mt-8">
            Venture Packs
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Expertly curated experiences ready to book. From romantic getaways to adventure safaris, 
            find your perfect experience crafted by local experts.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-lg shadow-soft p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search adventures..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDuration} onValueChange={setSelectedDuration}>
              <SelectTrigger>
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Durations</SelectItem>
                {durations.map(duration => (
                  <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center text-sm text-muted-foreground">
              <Filter className="h-4 w-4 mr-2" />
              {filteredPacks.length} of {venturePacks.length} adventures
            </div>
          </div>
        </div>

        {/* Venture Packs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPacks.map((pack) => (
            <Card 
              key={pack.id} 
              className="shadow-soft hover:shadow-medium transition-all duration-300 group overflow-hidden cursor-pointer"
              onClick={(e) => handleCardClick(pack.id, e)}
            >
              <CardHeader className="relative">
                <div className="absolute top-4 right-4 z-10">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 bg-background/80 hover:bg-background"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(pack.id);
                    }}
                  >
                    <Heart 
                      className={`h-4 w-4 ${favorites.has(pack.id) ? 'text-red-500 fill-current' : 'text-muted-foreground'}`} 
                    />
                  </Button>
                </div>

                <div className="text-center mb-4">
                  <div className="text-6xl mb-2">{pack.image}</div>
                  {pack.originalPrice && (
                    <Badge variant="destructive" className="mb-2">
                      Save ${parseInt(pack.originalPrice.slice(1)) - parseInt(pack.price.slice(1))}!
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {pack.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {pack.duration}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-semibold">{pack.rating}</span>
                      </div>
                      <span className="text-muted-foreground text-sm">({pack.reviews} reviews)</span>
                    </div>
                    <Badge variant="outline" className={`text-xs ${
                      pack.difficulty === 'Easy' ? 'text-green-600' :
                      pack.difficulty === 'Moderate' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {pack.difficulty}
                    </Badge>
                  </div>
                </div>
                
                <CardTitle className="text-xl mt-3">{pack.title}</CardTitle>
                <CardDescription className="line-clamp-2">{pack.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {pack.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Key Activities:
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {pack.activities.slice(0, 3).map((activity, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-venture-coral rounded-full mr-3 flex-shrink-0"></span>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    {pack.groupSize}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="text-2xl font-bold text-venture-coral">{pack.price}</div>
                        {pack.originalPrice && (
                          <div className="text-sm text-muted-foreground line-through">
                            {pack.originalPrice}
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">per person</div>
                    </div>
                    <div className="space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDetails(pack.id);
                        }}
                      >
                        Details
                      </Button>
                      <Button 
                        className="bg-venture-coral hover:bg-venture-coral/90"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookNow(pack.id);
                        }}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPacks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold mb-2">No adventures found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria or browse all adventures
            </p>
            <Button onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setSelectedDuration("all");
            }}>
              Show All Ventures
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12 p-8 bg-gradient-hero rounded-lg text-white">
          <h2 className="text-3xl font-bold mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Let us create a custom venture just for you using our Plan Builder
          </p>
          <Button 
            size="lg" 
            className="bg-background text-venture-coral hover:bg-venture-cream"
            onClick={() => navigate('/?plan=true')}
          >
            Create Custom Venture
          </Button>
        </div>
      </div>
    </div>
  );
}