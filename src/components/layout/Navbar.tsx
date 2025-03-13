
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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6',
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-full bg-rotaract-blue flex items-center justify-center">
              <span className="text-white font-display font-bold text-lg">R</span>
            </div>
            <div className="hidden md:block">
              <h1 className="font-display font-bold text-lg leading-tight">
                <span className="text-rotaract-blue">Rotaract Club</span>
                <br />
                <span className="text-sm">Zamboanga City West</span>
              </h1>
            </div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <a href="#" className="nav-link active-nav-link">Home</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#programs" className="nav-link">Programs</a>
          <a href="#join" className="nav-link">Join Us</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out pt-20',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <nav className="flex flex-col items-center space-y-6 p-8">
          <a href="#" className="text-xl font-medium" onClick={toggleMobileMenu}>Home</a>
          <a href="#about" className="text-xl font-medium" onClick={toggleMobileMenu}>About</a>
          <a href="#programs" className="text-xl font-medium" onClick={toggleMobileMenu}>Programs</a>
          <a href="#join" className="text-xl font-medium" onClick={toggleMobileMenu}>Join Us</a>
          <a href="#contact" className="text-xl font-medium" onClick={toggleMobileMenu}>Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
