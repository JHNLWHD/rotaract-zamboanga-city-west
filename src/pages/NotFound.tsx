import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Page Not Found (404) - Rotaract Club of Zamboanga City West</title>
        <meta name="title" content="Page Not Found (404) - Rotaract Club of Zamboanga City West" />
        <meta name="description" content="The page you're looking for doesn't exist. Return to the Great West homepage to explore our fellowship, service, and leadership programs." />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rotaract.rotaryzcwest.org/404" />
        <meta property="og:title" content="Page Not Found (404) - Rotaract Club of Zamboanga City West" />
        <meta property="og:description" content="The page you're looking for doesn't exist. Return to the Great West homepage to explore our fellowship, service, and leadership programs." />
        <meta property="og:site_name" content="Rotaract Club of Zamboanga City West" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:title" content="Page Not Found (404) - Rotaract Club of Zamboanga City West" />
        <meta property="twitter:description" content="The page you're looking for doesn't exist. Return to the Great West homepage to explore our fellowship, service, and leadership programs." />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://rotaract.rotaryzcwest.org/404" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-cranberry-50 via-white to-pink-50 px-6">
          <div className="text-center max-w-md">
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-bold text-cranberry-600 mb-4">404</h1>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Oops! Page Not Found
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                The page you're looking for doesn't exist. Let's get you back to exploring the Great West!
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.location.href = '/'}
                className="bg-cranberry-600 hover:bg-cranberry-700 text-white px-8 py-3"
              >
                <Home className="w-5 h-5 mr-2" />
                Return to Home
              </Button>
              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className="border-cranberry-200 text-cranberry-600 hover:bg-cranberry-50 px-8 py-3"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go Back
              </Button>
            </div>
            
            <div className="mt-12 text-sm text-slate-500">
              <p>Looking for something specific? Try these popular pages:</p>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                <a href="/events" className="text-cranberry-600 hover:text-cranberry-700 underline">
                  Great West in Action
                </a>
                <a href="/projects" className="text-cranberry-600 hover:text-cranberry-700 underline">
                  Community Impact
                </a>
                <a href="/officers" className="text-cranberry-600 hover:text-cranberry-700 underline">
                  Leadership Team
                </a>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default NotFound;
