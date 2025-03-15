
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 px-4 md:px-6',
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/e48a4b78-bd32-41b7-b192-969232e8378f.png" 
              alt="Rotaract Club of Zamboanga City West" 
              className="h-12 w-auto"
            />
            <div className="hidden md:block">
              <h1 className="font-display font-bold text-base leading-tight uppercase tracking-wider">
                <span className={`${isScrolled ? 'text-rotaract-navy' : 'text-white'}`}>Rotaract Club</span>
                <br />
                <span className={`text-xs tracking-wide ${isScrolled ? 'text-rotaract-pink' : 'text-white/90'}`}>Zamboanga City West</span>
              </h1>
            </div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a 
            href="#" 
            className={`nav-link text-sm uppercase tracking-wide font-medium ${isScrolled ? 'text-foreground/80' : 'text-white/90'} active-nav-link`}
          >
            Home
          </a>
          <a 
            href="#about" 
            className={`nav-link text-sm uppercase tracking-wide font-medium ${isScrolled ? 'text-foreground/80' : 'text-white/90'}`}
          >
            About
          </a>
          <a 
            href="#programs" 
            className={`nav-link text-sm uppercase tracking-wide font-medium ${isScrolled ? 'text-foreground/80' : 'text-white/90'}`}
          >
            Programs
          </a>
          <a 
            href="#join" 
            className={`nav-link text-sm uppercase tracking-wide font-medium ${isScrolled ? 'text-foreground/80' : 'text-white/90'}`}
          >
            Join Us
          </a>
          <a 
            href="#contact" 
            className={`nav-link text-sm uppercase tracking-wide font-medium ${isScrolled ? 'text-foreground/80' : 'text-white/90'}`}
          >
            Contact
          </a>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          className={`md:hidden ${isScrolled ? 'text-foreground' : 'text-white'}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-rotaract-navy/95 transform transition-transform duration-300 ease-in-out pt-20',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex justify-center my-6">
          <img 
            src="/lovable-uploads/e48a4b78-bd32-41b7-b192-969232e8378f.png" 
            alt="Rotaract Club of Zamboanga City West" 
            className="h-16 w-auto"
          />
        </div>
        <nav className="flex flex-col items-center space-y-6 p-8">
          <a href="#" className="text-lg uppercase tracking-wide text-white font-medium" onClick={toggleMobileMenu}>Home</a>
          <a href="#about" className="text-lg uppercase tracking-wide text-white font-medium" onClick={toggleMobileMenu}>About</a>
          <a href="#programs" className="text-lg uppercase tracking-wide text-white font-medium" onClick={toggleMobileMenu}>Programs</a>
          <a href="#join" className="text-lg uppercase tracking-wide text-white font-medium" onClick={toggleMobileMenu}>Join Us</a>
          <a href="#contact" className="text-lg uppercase tracking-wide text-white font-medium" onClick={toggleMobileMenu}>Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
