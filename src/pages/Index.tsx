import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { VenturePacks } from "@/components/VenturePacks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Heart, Star, MapPin, Users, Sparkles } from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleStartPlanning = () => {
    if (user) {
      navigate('/plan');
    } else {
      navigate('/signin');
    }
  };

  const testimonials = [
    {
      name: "Sarah & James",
      location: "Nairobi",
      rating: 5,
      text: "Venture planned the perfect anniversary dinner! We never would have found that hidden rooftop restaurant on our own. Everything was seamless.",
      occasion: "Anniversary"
    },
    {
      name: "Michael K.",
      location: "Mombasa",
      rating: 5,
      text: "As someone who travels for work constantly, I was tired of the same dinner routine. Venture showed me amazing local spots I'd never heard of.",
      occasion: "Solo Adventure"
    },
    {
      name: "Priya & David",
      location: "Diani",
      rating: 5,
      text: "Our weekend getaway was absolutely magical. From the beach picnic to the sunset dhow cruise - every detail was perfect!",
      occasion: "Weekend Getaway"
    }
  ];

  return (
    <div className="min-h-screen transition-all duration-500 ease-in-out">
      <Navigation />
      
      {/* Hero Section */}
      <section id="home">
        <Hero />
      </section>

      {/* Plan Builder CTA Section */}
      <section id="plan" className="py-24 bg-gradient-surface">
        <div className="container mx-auto px-6">
          <div className="text-center animate-fade-in max-w-4xl mx-auto">
            <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6 font-crimson leading-tight">
              Ready to Plan Your Perfect Experience?
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Answer a few quick questions and we'll create a personalized itinerary that matches your unique style and preferences.
            </p>
            <Button 
              size="lg" 
              onClick={handleStartPlanning}
              className="btn-modern text-white px-10 py-6 text-lg font-semibold hover-scale shadow-strong rounded-2xl"
            >
              Start Planning Your Venture <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Venture Packs Section - Only show for signed in users */}
      {user && (
        <section id="packs">
          <VenturePacks />
        </section>
      )}

      {/* How It Works Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6 font-crimson">
              How Amour Works
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From inspiration to execution, we handle every detail so you can focus on creating unforgettable memories.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="text-center group">
              <div className="relative mx-auto mb-8">
                <div className="w-24 h-24 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-strong group-hover:animate-glow-pulse transition-all duration-300">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <div className="absolute -inset-2 bg-gradient-primary rounded-2xl opacity-20 blur-lg group-hover:opacity-30 transition-all duration-300"></div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Tell Us Your Vision</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Share your dreams, occasion, mood, and preferences through our intuitive planning wizard.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mx-auto mb-8">
                <div className="w-24 h-24 bg-gradient-secondary rounded-2xl flex items-center justify-center mx-auto shadow-strong group-hover:animate-glow-pulse transition-all duration-300">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
                <div className="absolute -inset-2 bg-gradient-secondary rounded-2xl opacity-20 blur-lg group-hover:opacity-30 transition-all duration-300"></div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Get Your Custom Plan</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our AI and local experts craft a personalized itinerary with perfect timing and hidden gems.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mx-auto mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center mx-auto shadow-strong group-hover:animate-glow-pulse transition-all duration-300">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
                <div className="absolute -inset-2 bg-gradient-to-br from-accent to-accent/80 rounded-2xl opacity-20 blur-lg group-hover:opacity-30 transition-all duration-300"></div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Book & Enjoy</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Seamless one-click booking for everything. All you have to do is show up and create memories!
              </p>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-primary opacity-5 rounded-full blur-3xl"></div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-surface">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6 font-crimson">
              Love Stories from Our Adventurers
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Real experiences from real couples who trusted Amour with their most precious moments.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-modern hover-lift p-8 border-0 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-all duration-500"></div>
                
                <CardHeader className="p-0 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <CardTitle className="text-xl font-bold text-foreground">{testimonial.name}</CardTitle>
                      <CardDescription className="flex items-center text-muted-foreground mt-1">
                        <MapPin className="h-4 w-4 mr-2" />
                        {testimonial.location}
                      </CardDescription>
                    </div>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                  <Badge 
                    variant="outline" 
                    className="text-primary border-primary/30 bg-primary/10 px-3 py-1 font-medium"
                  >
                    {testimonial.occasion}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-hero text-white relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 font-crimson leading-tight">
              Stop Planning, Start Experiencing
            </h2>
            <p className="text-xl lg:text-2xl mb-12 opacity-90 leading-relaxed max-w-3xl mx-auto">
              Join thousands of couples who've discovered the joy of stress-free romantic planning. 
              Your next unforgettable experience is just a few clicks away.
            </p>
            <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 px-10 py-6 text-lg font-semibold hover-scale transition-all duration-300 rounded-2xl shadow-strong"
                onClick={handleStartPlanning}
              >
                Plan Your First Adventure <Sparkles className="ml-3 h-6 w-6" />
              </Button>
              <Link to="/venture-packs">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-10 py-6 text-lg hover-scale rounded-2xl font-semibold"
                >
                  Explore Venture Packs
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-primary-foreground" />
                <span className="text-2xl font-bold font-script text-primary-foreground">Nexus</span>
              </div>
              <p className="text-primary-foreground/90">
                Creating unforgettable experiences, one perfectly planned adventure at a time.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-primary-foreground">Plan</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Date Ideas</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Weekend Getaways</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Special Occasions</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Group Adventures</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-primary-foreground">Explore</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Nairobi</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Mombasa</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Diani Beach</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">All Locations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-primary-foreground">Company</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#" className="hover:text-primary-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Partner With Us</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/80">
            <p>&copy; 2024 Nexus. All rights reserved. Made with ❤️ for adventurous hearts.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;