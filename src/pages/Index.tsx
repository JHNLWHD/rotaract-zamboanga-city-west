import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Programs from '../components/home/Programs';
import Awards from '../components/home/Awards';
import Join from '../components/home/Join';
import Contact from '../components/home/Contact';

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
        <title>Rotaract Club of Zamboanga City West - Fellowship, Service & Leadership Since 2010</title>
        <meta name="title" content="Rotaract Club of Zamboanga City West - Fellowship, Service & Leadership Since 2010" />
        <meta name="description" content="Join the Great West movement! Empowering young Zamboangueño leaders through fellowship, community service, and professional development. Discover our award-winning projects and become part of a dynamic community making lasting impact in Zamboanga City." />
        <meta name="keywords" content="Rotaract Zamboanga City West, young leaders Philippines, community service Zamboanga, fellowship programs, leadership development, Rotary International, Great West, volunteer opportunities, youth organization Philippines, Rotaract club activities" />
        <meta name="author" content="Rotaract Club of Zamboanga City West" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        
        {/* Geographic Meta Tags */}
        <meta name="geo.region" content="PH-ZAM" />
        <meta name="geo.placename" content="Zamboanga City" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rotaract.rotaryzcwest.org/" />
        <meta property="og:title" content="Rotaract Club of Zamboanga City West - Fellowship, Service & Leadership Since 2010" />
        <meta property="og:description" content="Join the Great West movement! Empowering young Zamboangueño leaders through fellowship, community service, and professional development. Discover our award-winning projects and become part of a dynamic community making lasting impact in Zamboanga City." />
        <meta property="og:image" content="https://rotaract.rotaryzcwest.org/og-image.png" />
        <meta property="og:image:alt" content="Rotaract Club of Zamboanga City West - Young leaders making impact" />
        <meta property="og:site_name" content="Rotaract Club of Zamboanga City West" />
        <meta property="og:locale" content="en_PH" />
        <meta property="og:locale:alternate" content="en_US" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="@RotaractZCWest" />
        <meta property="twitter:creator" content="@RotaractZCWest" />
        <meta property="twitter:url" content="https://rotaract.rotaryzcwest.org/" />
        <meta property="twitter:title" content="Rotaract Club of Zamboanga City West - Fellowship, Service & Leadership Since 2010" />
        <meta property="twitter:description" content="Join the Great West movement! Empowering young Zamboangueño leaders through fellowship, community service, and professional development. Discover our award-winning projects and become part of a dynamic community making lasting impact in Zamboanga City." />
        <meta property="twitter:image" content="https://rotaract.rotaryzcwest.org/og-image.png" />
        <meta property="twitter:image:alt" content="Rotaract Club of Zamboanga City West - Young leaders making impact" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#dc2626" />
        <meta name="msapplication-TileColor" content="#dc2626" />
        <meta name="application-name" content="Rotaract ZC West" />
        <meta name="apple-mobile-web-app-title" content="RAC ZC West" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://rotaract.rotaryzcwest.org/" />
        
        {/* Favicons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Enhanced Structured Data for Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Rotaract Club of Zamboanga City West",
            "alternateName": ["RAC Zamboanga City West", "Great West", "Rotaract ZC West"],
            "url": "https://rotaract.rotaryzcwest.org",
            "logo": "https://rotaract.rotaryzcwest.org/lovable-uploads/e48a4b78-bd32-41b7-b192-969232e8378f.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "General Inquiries",
              "email": "raczambowest1@gmail.com",
              "availableLanguage": "English"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Zamboanga City",
              "addressRegion": "Zamboanga Peninsula",
              "addressCountry": "PH",
              "postalCode": "7000"
            },
            "sameAs": [
              "https://www.facebook.com/RotaractClubZamboWest",
              "https://www.instagram.com/rotaractzcwest"
            ],
            "foundingDate": "2010",
            "description": "Empowering young Zamboangueño leaders through fellowship, community service, and professional development since 2010. Part of the Great West movement creating lasting impact in Zamboanga City.",
            "memberOf": {
              "@type": "Organization",
              "name": "Rotary International",
              "url": "https://www.rotary.org"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Rotaract Programs",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Leadership Development",
                    "description": "Professional development and leadership training programs"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Community Service",
                    "description": "Award-winning community service projects and initiatives"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Fellowship Programs",
                    "description": "Building lasting friendships and connections among young leaders"
                  }
                }
              ]
            },
            "award": [
              "EON - Excellence in Outstanding Networks (2023)",
              "GEAR - Global Excellence Achievement Recognition (2022)",
              "ROPA - Rotaract Outstanding Performance Award (2024)"
            ],
            "numberOfEmployees": "50+",
            "areaServed": {
              "@type": "City",
              "name": "Zamboanga City",
              "addressRegion": "Zamboanga Peninsula",
              "addressCountry": "PH"
            }
          })}
        </script>
        
        {/* WebSite Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Rotaract Club of Zamboanga City West",
            "url": "https://rotaract.rotaryzcwest.org",
            "description": "Official website of the Rotaract Club of Zamboanga City West - empowering young leaders through fellowship, service, and leadership since 2010.",
            "publisher": {
              "@type": "Organization",
              "name": "Rotaract Club of Zamboanga City West"
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://rotaract.rotaryzcwest.org/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
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
          <Awards />
          <Join />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
