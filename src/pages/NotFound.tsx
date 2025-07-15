import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="text-center py-16">
          <div className="text-8xl mb-6">🗺️</div>
          <h1 className="text-6xl font-bold text-venture-coral mb-4">404</h1>
          <h2 className="text-3xl font-semibold mb-4">Adventure Not Found</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Looks like you've wandered off the beaten path! The page you're looking for 
            doesn't exist, but don't worry - there are plenty of amazing adventures waiting for you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="bg-venture-coral hover:bg-venture-coral/90">
                <Home className="h-5 w-5 mr-2" />
                Go Home
              </Button>
            </Link>
            <Link to="/venture-packs">
              <Button variant="outline" size="lg">
                <Search className="h-5 w-5 mr-2" />
                Browse Adventures
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Need help finding something specific?
            </p>
            <Link to="/" className="text-venture-coral hover:underline">
              <ArrowLeft className="h-4 w-4 inline mr-1" />
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
