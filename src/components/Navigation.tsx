import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X, User } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-venture-cream">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 transition-all duration-300 hover:scale-105">
            <Heart className="h-8 w-8 text-venture-coral animate-pulse" />
            <span className="text-2xl font-script font-bold text-venture-coral tracking-wider">Amour</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!user && (
              <Link to="/" className={`transition-colors ${location.pathname === '/' ? 'text-venture-coral' : 'text-foreground hover:text-venture-coral'}`}>
                Home
              </Link>
            )}
            {user && (
              <Link to="/dashboard" className={`transition-colors ${location.pathname === '/dashboard' ? 'text-venture-coral' : 'text-foreground hover:text-venture-coral'}`}>
                Dashboard
              </Link>
            )}
            <Link to="/venture-packs" className={`transition-colors ${location.pathname === '/venture-packs' ? 'text-venture-coral' : 'text-foreground hover:text-venture-coral'}`}>
              Venture Packs
            </Link>
            {user && (
              <Link to="/bookings" className={`transition-colors ${location.pathname === '/bookings' ? 'text-venture-coral' : 'text-foreground hover:text-venture-coral'}`}>
                My Bookings
              </Link>
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            
            {user && (
              <Button
                variant="ghost"
                size="sm"
                className="p-2"
                onClick={() => window.location.reload()}
                title="Refresh recommendations"
              >
                🔄
              </Button>
            )}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile">
                  <Button variant="ghost" className="text-venture-coral hover:bg-venture-cream">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  onClick={() => signOut()}
                  className="text-venture-coral hover:bg-venture-cream"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Link to="/signin">
                  <Button variant="ghost" className="text-venture-coral hover:bg-venture-cream hover-scale">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-venture-coral hover:bg-venture-coral/90 hover-scale">
                    Create Account
                  </Button>
                </Link>
              </>
            )}
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
          <div className="md:hidden bg-background border-t border-venture-cream py-4">
            <div className="flex flex-col space-y-4">
              {!user && (
                <Link 
                  to="/" 
                  className={`transition-colors px-4 py-2 ${location.pathname === '/' ? 'text-venture-coral' : 'text-foreground hover:text-venture-coral'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              )}
              {user && (
                <Link 
                  to="/dashboard" 
                  className={`transition-colors px-4 py-2 ${location.pathname === '/dashboard' ? 'text-venture-coral' : 'text-foreground hover:text-venture-coral'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              <Link 
                to="/venture-packs" 
                className={`transition-colors px-4 py-2 ${location.pathname === '/venture-packs' ? 'text-venture-coral' : 'text-foreground hover:text-venture-coral'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Venture Packs
              </Link>
              {user && (
                <Link 
                  to="/bookings" 
                  className={`transition-colors px-4 py-2 ${location.pathname === '/bookings' ? 'text-venture-coral' : 'text-foreground hover:text-venture-coral'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Bookings
                </Link>
              )}
              {user && (
                <Link 
                  to="/profile" 
                  className={`transition-colors px-4 py-2 ${location.pathname === '/profile' ? 'text-venture-coral' : 'text-foreground hover:text-venture-coral'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
              )}
              <div className="px-4 pt-4 border-t border-venture-cream space-y-2">
                {user ? (
                  <Button 
                    variant="ghost" 
                    className="w-full text-venture-coral hover:bg-venture-cream"
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign Out
                  </Button>
                ) : (
                  <>
                    <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full text-venture-coral hover:bg-venture-cream">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-venture-coral hover:bg-venture-coral/90">
                        Create Account
                      </Button>
                    </Link>
                  </>
                )}
                <div className="pt-2">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}