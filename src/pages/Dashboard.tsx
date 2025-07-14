import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Calendar, MapPin, Clock, Star, Heart, Users } from "lucide-react";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [recentVentures, setRecentVentures] = useState([
    {
      id: '1',
      title: 'Romantic Sunset Dinner',
      description: 'A beautiful evening at Tamarind Dhow with your loved one',
      location: 'Mombasa, Kenya',
      date: '2024-02-14',
      status: 'completed',
      totalCost: '$120',
      rating: 5
    },
    {
      id: '2',
      title: 'Adventure at Diani Beach',
      description: 'Full day of beach activities and water sports',
      location: 'Diani Beach, Kenya',
      date: '2024-02-20',
      status: 'upcoming',
      totalCost: '$95'
    }
  ]);

  const [stats] = useState({
    totalVentures: 12,
    upcomingBookings: 3,
    favoriteLocations: 5,
    totalSpent: 1250
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-venture-coral mb-2">
            Welcome back, {user.user_metadata?.full_name || user.email}! 👋
          </h1>
          <p className="text-xl text-muted-foreground">
            Ready for your next adventure? Let's create something amazing together.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Button 
            asChild
            size="lg" 
            className="h-20 bg-venture-coral hover:bg-venture-coral/90 text-left justify-start p-6"
          >
            <Link to="/?plan=true">
              <div>
                <PlusCircle className="w-6 h-6 mb-2" />
                <div className="text-lg font-semibold">Plan New Venture</div>
                <div className="text-sm opacity-90">Create a custom experience</div>
              </div>
            </Link>
          </Button>
          
          <Button 
            asChild
            variant="outline" 
            size="lg" 
            className="h-20 border-venture-coral text-venture-coral hover:bg-venture-cream text-left justify-start p-6"
          >
            <Link to="/venture-packs">
              <div>
                <Star className="w-6 h-6 mb-2" />
                <div className="text-lg font-semibold">Browse Packs</div>
                <div className="text-sm opacity-70">Curated experiences</div>
              </div>
            </Link>
          </Button>
          
          <Button 
            asChild
            variant="outline" 
            size="lg" 
            className="h-20 border-venture-ocean text-venture-ocean hover:bg-blue-50 text-left justify-start p-6"
          >
            <Link to="/bookings">
              <div>
                <Calendar className="w-6 h-6 mb-2" />
                <div className="text-lg font-semibold">My Bookings</div>
                <div className="text-sm opacity-70">Manage reservations</div>
              </div>
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Ventures</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-venture-coral">{stats.totalVentures}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-venture-ocean">{stats.upcomingBookings}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.favoriteLocations}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">${stats.totalSpent}</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Ventures */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="w-5 h-5 mr-2 text-venture-coral" />
              Your Recent Ventures
            </CardTitle>
            <CardDescription>
              Your latest adventures and upcoming experiences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentVentures.map((venture) => (
                <div key={venture.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{venture.title}</h3>
                      <Badge 
                        variant={venture.status === 'completed' ? 'default' : 'secondary'}
                        className={venture.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}
                      >
                        {venture.status === 'completed' ? 'Completed' : 'Upcoming'}
                      </Badge>
                      {venture.rating && (
                        <div className="flex items-center">
                          {[...Array(venture.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-2">{venture.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {venture.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(venture.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-venture-coral mb-2">
                      {venture.totalCost}
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-6">
              <Button variant="outline" asChild>
                <Link to="/bookings">View All Ventures</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}