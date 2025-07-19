import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X, User, Sparkles } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'glass-effect shadow-medium' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group transition-all duration-500 hover:scale-105"
          >
            <div className="relative">
              <Heart className="h-10 w-10 text-primary transition-all duration-500 group-hover:animate-glow-pulse" />
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-accent animate-float" />
            </div>
            <span className="text-3xl font-script font-bold bg-gradient-primary bg-clip-text text-transparent tracking-wider">
              Amour
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {!user && (
              <Link 
                to="/" 
                className={`nav-item link-modern font-medium ${
                  location.pathname === '/' 
                    ? 'text-primary active' 
                    : 'text-foreground/80 hover:text-primary'
                }`}
              >
                Home
              </Link>
            )}
            {user && (
              <Link 
                to="/dashboard" 
                className={`nav-item link-modern font-medium ${
                  location.pathname === '/dashboard' 
                    ? 'text-primary active' 
                    : 'text-foreground/80 hover:text-primary'
                }`}
              >
                Dashboard
              </Link>
            )}
            <Link 
              to="/venture-packs" 
              className={`nav-item link-modern font-medium ${
                location.pathname === '/venture-packs' 
                  ? 'text-primary active' 
                  : 'text-foreground/80 hover:text-primary'
              }`}
            >
              Venture Packs
            </Link>
            {user && (
              <Link 
                to="/bookings" 
                className={`nav-item link-modern font-medium ${
                  location.pathname === '/bookings' 
                    ? 'text-primary active' 
                    : 'text-foreground/80 hover:text-primary'
                }`}
              >
                My Bookings
              </Link>
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            <ThemeToggle />
            
            {user ? (
              <div className="flex items-center space-x-3">
                <Link to="/profile">
                  <Button 
                    variant="ghost" 
                    className="text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all duration-300"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  onClick={() => signOut()}
                  className="text-foreground/80 hover:text-destructive hover:bg-destructive/10 transition-all duration-300"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/signin">
                  <Button 
                    variant="ghost" 
                    className="text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all duration-300 font-medium"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="btn-modern text-white font-medium px-6 py-2 hover-scale shadow-soft">
                    Create Account
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-3 rounded-xl transition-all duration-300 hover:bg-primary/10 text-primary"
          >
            {isMenuOpen ? 
              <X className="h-6 w-6 transition-transform duration-300 rotate-90" /> : 
              <Menu className="h-6 w-6 transition-transform duration-300" />
            }
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden absolute top-full left-0 right-0 transition-all duration-500 ease-out ${
          isMenuOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}>
          <div className="glass-effect border-t border-border/50 mx-4 mt-2 rounded-2xl overflow-hidden shadow-strong">
            <div className="p-6 space-y-6">
              {/* Mobile Navigation Links */}
              <div className="space-y-3">
                {!user && (
                  <Link 
                    to="/" 
                    className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      location.pathname === '/' 
                        ? 'bg-gradient-primary text-white shadow-soft' 
                        : 'text-foreground/80 hover:bg-primary/10 hover:text-primary'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                )}
                {user && (
                  <Link 
                    to="/dashboard" 
                    className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      location.pathname === '/dashboard' 
                        ? 'bg-gradient-primary text-white shadow-soft' 
                        : 'text-foreground/80 hover:bg-primary/10 hover:text-primary'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                <Link 
                  to="/venture-packs" 
                  className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    location.pathname === '/venture-packs' 
                      ? 'bg-gradient-primary text-white shadow-soft' 
                      : 'text-foreground/80 hover:bg-primary/10 hover:text-primary'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Venture Packs
                </Link>
                {user && (
                  <>
                    <Link 
                      to="/bookings" 
                      className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                        location.pathname === '/bookings' 
                          ? 'bg-gradient-primary text-white shadow-soft' 
                          : 'text-foreground/80 hover:bg-primary/10 hover:text-primary'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Bookings
                    </Link>
                    <Link 
                      to="/profile" 
                      className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                        location.pathname === '/profile' 
                          ? 'bg-gradient-primary text-white shadow-soft' 
                          : 'text-foreground/80 hover:bg-primary/10 hover:text-primary'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                  </>
                )}
              </div>
              
              {/* Mobile Auth Actions */}
              <div className="border-t border-border/50 pt-6 space-y-3">
                {user ? (
                  <Button 
                    variant="ghost" 
                    className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive font-medium py-3"
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign Out
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                      <Button 
                        variant="ghost" 
                        className="w-full text-foreground/80 hover:bg-primary/10 hover:text-primary font-medium py-3"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full btn-modern text-white font-medium py-3">
                        Create Account
                      </Button>
                    </Link>
                  </div>
                )}
                <div className="flex justify-center pt-2">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}