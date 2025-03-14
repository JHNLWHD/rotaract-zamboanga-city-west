
import React from 'react';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="text-white relative bg-gradient-to-b from-rotaract-navy to-rotaract-blue wave-bg"
    >
      {/* Decorative wave pattern */}
      <div className="absolute top-0 left-0 w-full overflow-hidden h-10">
        <svg preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 50, transform: 'rotate(180deg)' }}>
          <path 
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" 
            fill="#FFFFFF" 
            opacity="0.1"
          ></path>
        </svg>
      </div>

      {/* Colored circles to mimic the design style */}
      <div className="absolute bottom-40 left-10 w-32 h-32 bg-rotaract-pink/10 rounded-full blur-3xl"></div>
      <div className="absolute top-20 right-10 w-40 h-40 bg-vinta-yellow/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                <span className="text-rotaract-pink font-display font-bold text-lg">R</span>
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
