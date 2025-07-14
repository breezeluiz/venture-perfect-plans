import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-venture-cream">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-sunset rounded-full flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-venture-coral">Venture</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-venture-coral transition-colors">
              Home
            </a>
            <a href="#plan" className="text-foreground hover:text-venture-coral transition-colors">
              Plan Builder
            </a>
            <a href="#packs" className="text-foreground hover:text-venture-coral transition-colors">
              Venture Packs
            </a>
            <a href="#inspiration" className="text-foreground hover:text-venture-coral transition-colors">
              Inspiration
            </a>
            <a href="#about" className="text-foreground hover:text-venture-coral transition-colors">
              About
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-venture-coral hover:bg-venture-cream">
              Sign In
            </Button>
            <Button className="bg-venture-coral hover:bg-venture-coral/90">
              Start Planning
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-venture-coral"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-venture-cream py-4">
            <div className="flex flex-col space-y-4">
              <a 
                href="#home" 
                className="text-foreground hover:text-venture-coral transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="#plan" 
                className="text-foreground hover:text-venture-coral transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Plan Builder
              </a>
              <a 
                href="#packs" 
                className="text-foreground hover:text-venture-coral transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Venture Packs
              </a>
              <a 
                href="#inspiration" 
                className="text-foreground hover:text-venture-coral transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Inspiration
              </a>
              <a 
                href="#about" 
                className="text-foreground hover:text-venture-coral transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <div className="px-4 pt-4 border-t border-venture-cream space-y-2">
                <Button variant="ghost" className="w-full text-venture-coral hover:bg-venture-cream">
                  Sign In
                </Button>
                <Button className="w-full bg-venture-coral hover:bg-venture-coral/90">
                  Start Planning
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}