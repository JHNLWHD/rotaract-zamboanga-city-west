
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
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
    { label: 'Events', path: '/events' },
    { label: 'Gallery', path: '/gallery' }
  ];

  return (
      <header
          className={cn(
              'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 px-4 md:px-6',
              isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-rotaract-navy/90 backdrop-blur-sm'
          )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img
                  src="/lovable-uploads/e48a4b78-bd32-41b7-b192-969232e8378f.png"
                  alt="Rotaract Club of Zamboanga City West"
                  className="h-12 w-auto"
              />
              <div className="hidden md:block">
                <h1 className="font-display font-bold text-base leading-tight uppercase tracking-wider">
                  <span className={`${isScrolled ? 'text-rotaract-navy' : 'text-white'}`}>Rotaract Club</span>
                  <br />
                  <span className={`text-xs tracking-wide ${isScrolled ? 'text-rotaract-pink' : 'text-white'}`}>Zamboanga City West</span>
                </h1>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`nav-link text-sm uppercase tracking-wide font-medium transition-colors ${
                  isScrolled 
                    ? 'text-rotaract-navy hover:text-rotaract-pink' 
                    : 'text-white hover:text-rotaract-pink'
                } ${isActiveRoute(item.path) ? (isScrolled ? 'text-rotaract-pink' : 'text-rotaract-pink') : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation Toggle */}
          <button
              className={`lg:hidden transition-colors ${isScrolled ? 'text-rotaract-navy' : 'text-white'}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
            className={cn(
                'fixed top-0 left-0 right-0 bottom-0 z-100 bg-rotaract-navy/95 backdrop-blur-md transform transition-transform duration-300 ease-in-out w-screen h-screen overflow-y-auto',
                mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            )}
        >
          <button
              className="absolute top-4 right-4 text-white z-110"
              onClick={toggleMobileMenu}
              aria-label="Close menu"
          >
            <X size={24} />
          </button>
          <div className="flex justify-center mt-12 mb-6">
            <img
                src="/lovable-uploads/e48a4b78-bd32-41b7-b192-969232e8378f.png"
                alt="Rotaract Club of Zamboanga City West"
                className="h-16 w-auto"
            />
          </div>
          <nav className="flex flex-col items-center space-y-6 p-8">
            {navItems.map((item) => (
              <Link 
                key={item.label}
                to={item.path} 
                className="text-lg uppercase tracking-wide text-white font-medium hover:text-rotaract-pink transition-colors" 
                onClick={toggleMobileMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
  );
};

export default Navbar;
