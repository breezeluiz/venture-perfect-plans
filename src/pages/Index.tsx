import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { PlanBuilder } from "@/components/PlanBuilder";
import { VentureCard } from "@/components/VentureCard";
import { VenturePacks } from "@/components/VenturePacks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Heart, Star, MapPin, Users, Sparkles } from "lucide-react";

const Index = () => {
  const [showPlanBuilder, setShowPlanBuilder] = useState(false);
  const [generatedVenture, setGeneratedVenture] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePlanComplete = (planData: any) => {
    // Simulate generating a venture based on plan data
    const sampleVenture = {
      title: "A Swahili Coast Sunset & Spice Experience",
      description: "An unforgettable evening sailing the Tudor Creek at sunset, followed by a gourmet seafood dinner prepared right on the dhow. The perfect blend of romance, luxury, and coastal charm.",
      totalCost: "$$$ (~24,000 KSh)",
      vibes: ["Romantic", "Relaxing", "Foodie"],
      location: "Mombasa, Kenya",
      activities: [
        {
          time: "6:30 PM",
          title: "Boarding & Aperitif",
          description: "Arrive at the Tamarind Jetty. Welcome aboard with a 'Dawa' cocktail as the sun begins to set.",
          location: "Tamarind Mombasa, Cement Silo Road",
          cost: "Included",
          notes: "Arrive 15 minutes early for the magical sunset atmosphere"
        },
        {
          time: "7:00 PM",
          title: "Sunset Cruise & Dinner",
          description: "The dhow sets sail with live coastal music. Four-course gourmet meal featuring grilled lobster and fresh seafood.",
          location: "Tudor Creek",
          cost: "22,000 KSh for two",
          notes: "Vegetarian options available upon request"
        },
        {
          time: "9:00 PM",
          title: "Coffee & Liqueurs",
          description: "Enjoy Swahili coffee and liqueurs under the stars as we sail back to the jetty.",
          location: "On the dhow",
          cost: "Included"
        }
      ]
    };
    
    setGeneratedVenture(sampleVenture);
    setShowPlanBuilder(false);
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
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section id="home">
        <Hero />
      </section>

      {/* Plan Builder Section */}
      <section id="plan" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {!showPlanBuilder && !generatedVenture && (
            <div className="text-center">
              <h2 className="text-4xl font-bold text-venture-coral mb-4">
                Ready to Plan Your Perfect Experience?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Answer a few quick questions and we'll create a personalized itinerary just for you.
              </p>
              <Button 
                size="lg" 
                onClick={() => user ? setShowPlanBuilder(true) : navigate('/auth')}
                className="bg-venture-coral hover:bg-venture-coral/90 px-8 py-6 text-lg shadow-medium"
              >
                Start Planning Your Venture <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {showPlanBuilder && (
            <div className="animate-fade-in">
              <PlanBuilder onComplete={handlePlanComplete} />
            </div>
          )}

          {generatedVenture && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-venture-coral mb-4">
                  Your Perfect Venture Awaits! ✨
                </h2>
                <p className="text-xl text-muted-foreground">
                  We've crafted something special just for you
                </p>
              </div>
              <VentureCard {...generatedVenture} />
              <div className="text-center mt-8">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setGeneratedVenture(null);
                    setShowPlanBuilder(false);
                  }}
                  className="border-venture-coral text-venture-coral hover:bg-venture-cream mr-4"
                >
                  Plan Another Venture
                </Button>
                <Button className="bg-venture-ocean hover:bg-venture-ocean/90">
                  Save This Venture
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Venture Packs Section */}
      <section id="packs">
        <VenturePacks />
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-venture-coral mb-4">
              How Venture Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From planning to execution, we handle everything so you can focus on making memories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-sunset rounded-full flex items-center justify-center mx-auto mb-6 shadow-soft">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Tell Us Your Vision</h3>
              <p className="text-muted-foreground">
                Share your occasion, mood, interests, and budget through our simple wizard.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-ocean rounded-full flex items-center justify-center mx-auto mb-6 shadow-soft">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Get Your Custom Plan</h3>
              <p className="text-muted-foreground">
                Our local experts craft a detailed itinerary with timing, locations, and booking links.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-venture-coral rounded-full flex items-center justify-center mx-auto mb-6 shadow-soft">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Book & Enjoy</h3>
              <p className="text-muted-foreground">
                One-click booking for reservations and activities. All you have to do is show up!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-venture-cream/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-venture-coral mb-4">
              Love Stories from Our Adventurers
            </h2>
            <p className="text-xl text-muted-foreground">
              Real experiences from real couples who trusted Venture with their special moments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-soft hover:shadow-medium transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {testimonial.location}
                      </CardDescription>
                    </div>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                  <Badge variant="outline" className="text-venture-coral border-venture-coral">
                    {testimonial.occasion}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">
              Stop Planning, Start Experiencing
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of couples who've discovered the joy of stress-free date planning. 
              Your next unforgettable experience is just a few clicks away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-venture-coral hover:bg-venture-cream px-8 py-6 text-lg font-semibold"
                onClick={() => user ? setShowPlanBuilder(true) : navigate('/auth')}
              >
                Plan Your First Venture <Sparkles className="ml-2 h-5 w-5" />
              </Button>
              <Link to="/venture-packs">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-venture-coral px-8 py-6 text-lg"
                >
                  Explore Venture Packs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-venture-coral text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6" />
                <span className="text-2xl font-bold">Venture</span>
              </div>
              <p className="opacity-90">
                Creating unforgettable experiences, one perfectly planned adventure at a time.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Plan</h3>
              <ul className="space-y-2 opacity-90">
                <li><a href="#" className="hover:opacity-100 transition-opacity">Date Ideas</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Weekend Getaways</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Special Occasions</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Group Adventures</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Explore</h3>
              <ul className="space-y-2 opacity-90">
                <li><a href="#" className="hover:opacity-100 transition-opacity">Nairobi</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Mombasa</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Diani Beach</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">All Locations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 opacity-90">
                <li><a href="#" className="hover:opacity-100 transition-opacity">About Us</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">How It Works</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Partner With Us</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center opacity-90">
            <p>&copy; 2024 Venture. All rights reserved. Made with ❤️ for adventurous hearts.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;