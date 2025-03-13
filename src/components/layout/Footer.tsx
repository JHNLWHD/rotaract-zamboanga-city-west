
import React from 'react';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-rotaract-navy text-white">
      <div className="max-w-7xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                <span className="text-rotaract-blue font-display font-bold text-lg">R</span>
              </div>
              <h3 className="font-display font-bold text-lg">Rotaract Club</h3>
            </div>
            <p className="text-white/80 max-w-xs">
              Zamboanga City West chapter of Rotaract, empowering young professionals through community service and leadership.
            </p>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <a href="#about" className="text-white/80 hover:text-white transition-colors">About Us</a>
              <a href="#programs" className="text-white/80 hover:text-white transition-colors">Programs</a>
              <a href="#join" className="text-white/80 hover:text-white transition-colors">Join Us</a>
              <a href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</a>
            </nav>
          </div>

          <div id="contact">
            <h3 className="font-display font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-vinta-yellow" />
                <span className="text-white/80">Zamboanga City, Philippines</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-vinta-yellow" />
                <span className="text-white/80">rotaract.zcw@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-vinta-yellow" />
                <span className="text-white/80">+63 XXX XXX XXXX</span>
              </div>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © {currentYear} Rotaract Club of Zamboanga City West. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <span className="text-white/60 text-sm">Part of Rotary International</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
