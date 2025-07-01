import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActiveRoute = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'Officers', path: '/officers' },
  ];

  // Determine navbar styling based on page and scroll state
  const getNavbarClasses = () => {
    if (!isHomePage) {
      // Non-home pages always have white background
      return 'bg-white/95 backdrop-blur-xl shadow-modern border-b border-gray-100/50';
    } else {
      // Home page: transparent when not scrolled, white when scrolled
      return isScrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-modern border-b border-gray-100/50' 
        : 'bg-transparent backdrop-blur-sm';
    }
  };

  // Determine text colors based on page and scroll state
  const getTextColors = () => {
    if (!isHomePage) {
      // Non-home pages always have dark text
      return {
        logo: 'text-slate-800',
        subtitle: 'text-primary',
        nav: 'text-slate-700 hover:text-primary hover:bg-primary/5',
        navActive: 'text-primary bg-primary/5 font-semibold',
        button: 'text-slate-700 hover:bg-primary/5'
      };
    } else {
      // Home page: changes based on scroll
      return isScrolled ? {
        logo: 'text-slate-800',
        subtitle: 'text-primary',
        nav: 'text-slate-700 hover:text-primary hover:bg-primary/5',
        navActive: 'text-primary bg-primary/5 font-semibold',
        button: 'text-slate-700 hover:bg-primary/5'
      } : {
        logo: 'text-white',
        subtitle: 'text-cranberry-300',
        nav: 'text-white/90 hover:text-cranberry-300 hover:bg-white/10',
        navActive: 'text-cranberry-300 bg-white/10 font-semibold',
        button: 'text-white hover:bg-white/10'
      };
    }
  };

  const textColors = getTextColors();

  return (
      <header
          className={cn(
              'fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 px-6',
              getNavbarClasses()
          )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-4 group">
              <div className="relative">
                <img
                    src="/lovable-uploads/e48a4b78-bd32-41b7-b192-969232e8378f.png"
                    alt="Rotaract Club of Zamboanga City West"
                    className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-cranberry-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              </div>
              <div className="hidden md:block">
                <h1 className="font-display font-bold text-base leading-tight uppercase tracking-wider">
                  <span className={cn(
                    "transition-colors duration-300",
                    textColors.logo
                  )}>
                    Rotaract Club
                  </span>
                  <br />
                  <span className={cn(
                    "text-xs tracking-wide font-medium transition-colors duration-300",
                    textColors.subtitle
                  )}>
                    Zamboanga City West
                  </span>
                </h1>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={cn(
                  "nav-link text-sm uppercase tracking-wide font-medium transition-all duration-300 rounded-full px-4 py-2",
                  textColors.nav,
                  isActiveRoute(item.path) ? textColors.navActive : ''
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation Toggle */}
          <button
              className={cn(
                "lg:hidden p-2 rounded-full transition-all duration-300",
                textColors.button
              )}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Modern Mobile Menu */}
        <div
            className={cn(
                'fixed top-0 left-0 right-0 bottom-0 z-[100] transform transition-all duration-500 ease-out bg-white h-screen',
                mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            )}
        >
          <div className="h-full flex flex-col">
            {/* Mobile header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white shadow-sm">
              <div className="flex items-center space-x-3">
                <img
                    src="/lovable-uploads/e48a4b78-bd32-41b7-b192-969232e8378f.png"
                    alt="Rotaract Club of Zamboanga City West"
                    className="h-8 w-auto"
                />
                <div>
                  <h3 className="font-bold text-sm text-slate-800">Rotaract Club</h3>
                  <p className="text-xs text-cranberry-600">Zamboanga City West</p>
                </div>
              </div>
              <button
                  className="p-2 text-slate-700 hover:bg-gray-100 rounded-full transition-colors"
                  onClick={toggleMobileMenu}
                  aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile navigation */}
            <nav className="flex-1 py-8 px-6 bg-white">
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <Link 
                    key={item.label}
                    to={item.path} 
                    className={cn(
                      "block w-full text-left px-4 py-4 text-lg font-semibold rounded-xl transition-all duration-300",
                      isActiveRoute(item.path) 
                        ? 'text-cranberry-600 bg-cranberry-50' 
                        : 'text-slate-700 hover:text-cranberry-600 hover:bg-gray-50'
                    )}
                    onClick={toggleMobileMenu}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              
              {/* Additional info section */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <h4 className="font-semibold text-slate-800 mb-2">Get Involved</h4>
                  <p className="text-sm text-slate-600 mb-4">
                    Join us in making a difference in our community
                  </p>
                  <a 
                    href="https://www.facebook.com/RotaractClubZamboWest" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full bg-cranberry-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-cranberry-700 transition-colors text-center"
                  >
                    Visit us on our Facebook Page
                  </a>
                </div>
              </div>
            </nav>

            {/* Mobile footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <p className="text-slate-600 text-xs text-center">
                Empowering Young Leaders Since 2010
              </p>
            </div>
          </div>
        </div>
      </header>
  );
};

export default Navbar;
