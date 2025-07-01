import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Programs from '../components/home/Programs';
import Join from '../components/home/Join';

const Index = () => {
  useEffect(() => {
    // Scroll animation for revealing elements
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '0px',
      threshold: 0.1,
    });

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Rotaract Club of Zamboanga City West - Service, Fellowship & Leadership</title>
        <meta name="title" content="Rotaract Club of Zamboanga City West - Service, Fellowship & Leadership" />
        <meta name="description" content="Join the Rotaract Club of Zamboanga City West - empowering young leaders through fellowship, community service, and professional development since 2010." />
        <meta name="keywords" content="Rotaract, Zamboanga City West, community service, young leaders, fellowship, leadership development, volunteer, Philippines, Rotary International" />
        <meta name="author" content="Rotaract Club of Zamboanga City West" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rotaract.rotaryzcwest.org/" />
        <meta property="og:title" content="Rotaract Club of Zamboanga City West - Service, Fellowship & Leadership" />
        <meta property="og:description" content="Join the Rotaract Club of Zamboanga City West - empowering young leaders through fellowship, community service, and professional development since 2010." />
        <meta property="og:image" content="https://rotaract.rotaryzcwest.org/og-image.png" />
        <meta property="og:site_name" content="Rotaract Club of Zamboanga City West" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://rotaract.rotaryzcwest.org/" />
        <meta property="twitter:title" content="Rotaract Club of Zamboanga City West - Service, Fellowship & Leadership" />
        <meta property="twitter:description" content="Join the Rotaract Club of Zamboanga City West - empowering young leaders through fellowship, community service, and professional development since 2010." />
        <meta property="twitter:image" content="https://rotaract.rotaryzcwest.org/og-image.png" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#dc2626" />
        <meta name="msapplication-TileColor" content="#dc2626" />
        <meta name="geo.region" content="PH-ZAM" />
        <meta name="geo.placename" content="Zamboanga City" />
        <meta name="geo.position" content="6.9214;122.0790" />
        <meta name="ICBM" content="6.9214, 122.0790" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://rotaract.rotaryzcwest.org/" />
        
        {/* Favicons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Structured Data for Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Rotaract Club of Zamboanga City West",
            "alternateName": "RAC Zamboanga City West",
            "url": "https://rotaract.rotaryzcwest.org",
            "logo": "https://rotaract.rotaryzcwest.org/lovable-uploads/e48a4b78-bd32-41b7-b192-969232e8378f.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+63-XXX-XXX-XXXX",
              "contactType": "General Inquiries",
              "email": "rotaractzcwest@gmail.com"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Zamboanga City",
              "addressRegion": "Zamboanga Peninsula",
              "addressCountry": "PH"
            },
            "sameAs": [
              "https://www.facebook.com/RotaractClubZamboWest",
              "https://www.instagram.com/rotaractzcwest"
            ],
            "foundingDate": "2010",
            "description": "Empowering young leaders through fellowship, community service, and professional development since 2010.",
            "memberOf": {
              "@type": "Organization",
              "name": "Rotary International"
            }
          })}
        </script>
        
        <script src="https://cdn.botpress.cloud/webchat/v3.0/inject.js"></script>
        <script src="https://files.bpcontent.cloud/2025/06/13/13/20250613130544-A8JNWUH4.js"></script>
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main id="main-content" role="main">
          <Hero />
          <About />
          <Programs />
          <Join />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
