import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, MapPin, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 animate-bounce-gentle">
          <Heart className="h-8 w-8 text-white" />
        </div>
        <div className="absolute top-20 right-20 animate-bounce-gentle" style={{ animationDelay: '0.5s' }}>
          <MapPin className="h-6 w-6 text-white" />
        </div>
        <div className="absolute bottom-20 left-20 animate-bounce-gentle" style={{ animationDelay: '1s' }}>
          <Sparkles className="h-7 w-7 text-white" />
        </div>
        <div className="absolute bottom-32 right-16 animate-bounce-gentle" style={{ animationDelay: '1.5s' }}>
          <Heart className="h-5 w-5 text-white" />
        </div>
      </div>

      <div className="container mx-auto px-4 text-center text-white relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Unforgettable{" "}
            <span className="bg-gradient-to-r from-venture-gold to-white bg-clip-text text-transparent">
              Dates
            </span>
            , <br />
            Perfectly Planned
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed">
            Eliminate the stress of planning. Get personalized, curated itineraries 
            that fit your budget, vibe, and occasion. From romantic dinners to weekend getaways.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-white text-venture-coral hover:bg-venture-cream transition-all duration-300 px-8 py-6 text-lg font-semibold shadow-medium hover:shadow-strong"
            >
              Start Planning <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-venture-coral transition-all duration-300 px-8 py-6 text-lg"
            >
              Browse Ventures
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized</h3>
              <p className="opacity-80">Tailored to your mood, interests, and budget</p>
            </div>
            
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Local Experts</h3>
              <p className="opacity-80">Curated by locals who know the best spots</p>
            </div>
            
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Stress-Free</h3>
              <p className="opacity-80">Complete itineraries with booking links included</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}