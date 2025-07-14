import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Star } from "lucide-react";

const venturePacks = [
  {
    id: 1,
    title: "The Diani Beach Day Escape",
    description: "A perfect beach day with snorkeling, beachside lunch, and sunset cocktails",
    location: "Diani Beach, Kenya",
    duration: "Full Day",
    price: "$120",
    rating: 4.8,
    reviews: 124,
    tags: ["Beach", "Relaxing", "Romantic"],
    image: "🏖️",
    activities: ["Snorkeling", "Beach Lunch", "Sunset Drinks"]
  },
  {
    id: 2,
    title: "Mombasa Old Town Cultural Tour",
    description: "Explore the rich Swahili heritage with guided tours, spice markets, and local cuisine",
    location: "Mombasa Old Town, Kenya",
    duration: "Half Day",
    price: "$65",
    rating: 4.9,
    reviews: 87,
    tags: ["Cultural", "Foodie", "Historical"],
    image: "🏛️",
    activities: ["Guided Tour", "Spice Market", "Local Dinner"]
  },
  {
    id: 3,
    title: "Wasini Island Adventure",
    description: "Dolphin watching, coral gardens snorkeling, and fresh seafood lunch",
    location: "Wasini Island, Kenya",
    duration: "Full Day",
    price: "$95",
    rating: 4.7,
    reviews: 156,
    tags: ["Adventure", "Nature", "Marine Life"],
    image: "🐬",
    activities: ["Dolphin Watching", "Snorkeling", "Seafood Lunch"]
  },
  {
    id: 4,
    title: "Nairobi Night Out",
    description: "Rooftop dining, live music, and the best nightlife spots in the city",
    location: "Nairobi, Kenya",
    duration: "Evening",
    price: "$80",
    rating: 4.6,
    reviews: 203,
    tags: ["Nightlife", "Music", "Urban"],
    image: "🌃",
    activities: ["Rooftop Dinner", "Live Music", "Night Club"]
  },
  {
    id: 5,
    title: "Karen Blixen Coffee Experience",
    description: "Coffee plantation tour, giraffe center visit, and colonial mansion lunch",
    location: "Karen, Nairobi",
    duration: "Half Day",
    price: "$55",
    rating: 4.8,
    reviews: 91,
    tags: ["Coffee", "History", "Wildlife"],
    image: "☕",
    activities: ["Coffee Tour", "Giraffe Center", "Mansion Lunch"]
  },
  {
    id: 6,
    title: "Lake Nakuru Safari Day Trip",
    description: "Pink flamingos, rhino spotting, and picnic lunch in the national park",
    location: "Lake Nakuru, Kenya",
    duration: "Full Day",
    price: "$140",
    rating: 4.9,
    reviews: 78,
    tags: ["Safari", "Wildlife", "Nature"],
    image: "🦩",
    activities: ["Game Drive", "Flamingo Watching", "Picnic Lunch"]
  }
];

export function VenturePacks() {
  return (
    <section className="py-16 bg-venture-cream/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-venture-coral mb-4">
            Featured Venture Packs
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expertly curated experiences ready to book. Perfect for when you want 
            something amazing without the planning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {venturePacks.map((pack) => (
            <Card key={pack.id} className="shadow-soft hover:shadow-medium transition-all duration-300 group">
              <CardHeader>
                <div className="text-center mb-4">
                  <div className="text-6xl mb-4">{pack.image}</div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {pack.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {pack.duration}
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-semibold">{pack.rating}</span>
                    </div>
                    <span className="text-muted-foreground">({pack.reviews} reviews)</span>
                  </div>
                </div>
                
                <CardTitle className="text-xl text-center mb-2">{pack.title}</CardTitle>
                <CardDescription className="text-center">{pack.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {pack.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Includes:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {pack.activities.map((activity, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-venture-coral rounded-full mr-3 flex-shrink-0"></span>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <div className="text-2xl font-bold text-venture-coral">{pack.price}</div>
                      <div className="text-xs text-muted-foreground">per person</div>
                    </div>
                    <Button className="bg-venture-coral hover:bg-venture-coral/90 group-hover:shadow-soft">
                      Book Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-venture-coral text-venture-coral hover:bg-venture-cream">
            View All Venture Packs
          </Button>
        </div>
      </div>
    </section>
  );
}