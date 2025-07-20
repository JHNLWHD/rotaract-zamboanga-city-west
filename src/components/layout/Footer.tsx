import React from 'react';
import { Facebook, Instagram, Mail, MapPin, Phone, Heart, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'About Us', href: '/#about' },
    { label: 'Our Programs', href: '/#programs' },
    { label: 'Join Us', href: '/#join' },
    { label: 'Contact', href: '/#contact' }
  ];

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Location",
      content: "Zamboanga City"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      content: "raczambowest1@gmail.com"
    }
  ];

  const socialLinks = [
    {
      icon: <Facebook className="h-5 w-5" />,
      label: "Facebook",
      href: "https://www.facebook.com/RotaractClubZamboWest",
      color: "hover:text-blue-500"
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      label: "Instagram",
      href: "https://www.instagram.com/rotaractzcwest",
      color: "hover:text-pink-500"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      href: "mailto:raczambowest1@gmail.com",
      color: "hover:text-cranberry-500"
    }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Modern background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cranberry-500/50 to-transparent"></div>
        <div className="absolute top-20 -left-32 w-96 h-96 bg-cranberry-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-32 w-80 h-80 bg-cranberry-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto py-16 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src="/lovable-uploads/e48a4b78-bd32-41b7-b192-969232e8378f.png"
                    alt="Rotaract Club of Zamboanga City West"
                    className="h-12 w-auto"
                  />
                  <div className="absolute inset-0 bg-cranberry-500/20 rounded-full blur-xl"></div>
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-white">
                    Rotaract Club
                  </h3>
                  <p className="text-cranberry-300 text-sm font-medium">
                    Zamboanga City West
                  </p>
                </div>
              </div>

              <p className="text-gray-300 max-w-md leading-relaxed text-justify">
                Empowering young leaders through fellowship, service, and professional growth, we proudly advance
                Rotary's mission of lasting global impact while honouring the rich culture of Zamboanga City since 2010.
              </p>

              {/* Social links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-white/10 rounded-xl text-white transition-all duration-300 hover:bg-white/20 hover:scale-110 ${social.color}`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="space-y-6">
              <h4 className="font-semibold text-lg text-white">Quick Links</h4>
              <nav className="grid grid-cols-1 gap-3">
                {quickLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-gray-300 hover:text-cranberry-300 transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </nav>
            </div>

            {/* Contact info */}
            <div className="space-y-6">
              <h4 className="font-semibold text-lg text-white">Get in Touch</h4>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="p-2 bg-cranberry-500/20 rounded-lg text-cranberry-400 mt-0.5">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{info.title}</p>
                      <p className="text-sm text-gray-300">{info.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto py-8 px-6">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <span>© {currentYear} Rotaract Club of Zamboanga City West.</span>
                <span>Made with</span>
                <Heart className="h-4 w-4 text-cranberry-400" />
                <span>for our community.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
