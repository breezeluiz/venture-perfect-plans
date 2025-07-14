import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, DollarSign, ExternalLink, Calendar } from "lucide-react";

interface VentureActivity {
  time: string;
  title: string;
  description: string;
  location: string;
  cost: string;
  notes?: string;
}

interface VentureCardProps {
  title: string;
  description: string;
  totalCost: string;
  vibes: string[];
  activities: VentureActivity[];
  location: string;
}

export function VentureCard({ title, description, totalCost, vibes, activities, location }: VentureCardProps) {
  return (
    <Card className="shadow-medium hover:shadow-strong transition-all duration-300 bg-gradient-card">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-2xl text-venture-coral mb-2">{title}</CardTitle>
            <CardDescription className="text-base leading-relaxed mb-4">{description}</CardDescription>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {vibes.map((vibe) => (
                <Badge key={vibe} variant="secondary" className="bg-venture-cream text-venture-coral">
                  {vibe}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-venture-coral">{totalCost}</div>
            <div className="text-sm text-muted-foreground">for two</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center text-muted-foreground mb-4">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">{location}</span>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-venture-coral" />
              Itinerary & Timeline
            </h3>
            
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex gap-4 p-4 bg-white/50 rounded-lg border border-venture-cream">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-venture-coral text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      {activity.time}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-venture-coral mb-1">{activity.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {activity.location}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-3 w-3 mr-1" />
                        {activity.cost}
                      </div>
                    </div>
                    
                    {activity.notes && (
                      <p className="text-xs text-venture-ocean mt-2 bg-blue-50 p-2 rounded">
                        💡 {activity.notes}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button className="flex-1 bg-venture-coral hover:bg-venture-coral/90">
              <ExternalLink className="h-4 w-4 mr-2" />
              Book This Venture
            </Button>
            <Button variant="outline" className="border-venture-coral text-venture-coral hover:bg-venture-cream">
              View on Map
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}