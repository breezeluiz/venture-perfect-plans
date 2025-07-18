import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { PlanBuilder } from "@/components/PlanBuilder";
import { VentureCard } from "@/components/VentureCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PlanBuilderPage = () => {
  const [generatedVenture, setGeneratedVenture] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  }, [user, navigate]);

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
    // Smooth scroll to top to show the result
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    navigate('/', { replace: true });
  };

  const handlePlanAnother = () => {
    setGeneratedVenture(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background transition-all duration-500 ease-in-out">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={handleBackToHome}
            className="text-venture-coral hover:text-venture-coral/80 hover:bg-venture-cream transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </div>

        {!generatedVenture ? (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-venture-coral mb-4 font-crimson">
                Create Your Perfect Experience
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Answer a few quick questions and we'll craft a personalized itinerary just for you.
              </p>
            </div>
            <PlanBuilder onComplete={handlePlanComplete} />
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-venture-coral mb-4 font-crimson">
                Your Perfect Venture Awaits! ✨
              </h1>
              <p className="text-xl text-muted-foreground">
                We've crafted something special just for you
              </p>
            </div>
            <VentureCard {...generatedVenture} />
            <div className="text-center mt-8 space-x-4">
              <Button 
                variant="outline" 
                onClick={handlePlanAnother}
                className="border-venture-coral text-venture-coral hover:bg-venture-cream hover-scale transition-all duration-300"
              >
                Plan Another Venture
              </Button>
              <Button 
                className="bg-venture-ocean hover:bg-venture-ocean/90 hover-scale transition-all duration-300"
                onClick={() => navigate('/bookings')}
              >
                Save This Venture
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanBuilderPage;