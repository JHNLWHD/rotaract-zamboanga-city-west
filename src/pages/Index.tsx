import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import Credentials from '../components/home/Credentials';
import About from '../components/home/About';
import Join from '../components/home/Join';
import Contact from '../components/home/Contact';

const description =
  'Official club record of the Rotaract Club of Zamboanga City West, including projects, events, officers, recognition, and Rotary Foundation giving.';

const Index = () => (
  <>
    <Helmet>
      <title>Rotaract Club of Zamboanga City West | Official Club Record</title>
      <meta
        name="title"
        content="Rotaract Club of Zamboanga City West | Official Club Record"
      />
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="Rotaract Club of Zamboanga City West, Great West, Rotary District 3850, Zamboanga City community projects, Rotaract officers"
      />
      <meta name="author" content="Rotaract Club of Zamboanga City West" />
      <meta name="robots" content="index, follow" />
      <meta name="geo.region" content="PH-ZAM" />
      <meta name="geo.placename" content="Zamboanga City" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://rotaract.rotaryzcwest.org/" />
      <meta
        property="og:title"
        content="Rotaract Club of Zamboanga City West | Official Club Record"
      />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content="https://rotaract.rotaryzcwest.org/og-image.png"
      />
      <meta
        property="og:image:alt"
        content="Rotaract Club of Zamboanga City West"
      />
      <meta
        property="og:site_name"
        content="Rotaract Club of Zamboanga City West"
      />
      <meta property="og:locale" content="en_PH" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Rotaract Club of Zamboanga City West | Official Club Record"
      />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content="https://rotaract.rotaryzcwest.org/og-image.png"
      />

      <meta name="theme-color" content="#faf9f7" />
      <link rel="canonical" href="https://rotaract.rotaryzcwest.org/" />

      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Rotaract Club of Zamboanga City West',
          alternateName: ['Great West', 'RAC Zamboanga City West'],
          url: 'https://rotaract.rotaryzcwest.org',
          logo: 'https://rotaract.rotaryzcwest.org/lovable-uploads/e48a4b78-bd32-41b7-b192-969232e8378f.png',
          email: 'raczambowest1@gmail.com',
          foundingDate: '2010-01-06',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Zamboanga City',
            addressRegion: 'Zamboanga Peninsula',
            addressCountry: 'PH',
          },
          memberOf: {
            '@type': 'Organization',
            name: 'Rotary International',
            url: 'https://www.rotary.org',
          },
          sponsor: {
            '@type': 'Organization',
            name: 'Rotary Club of Zamboanga City West',
            url: 'https://rotaryzcwest.org/',
          },
          sameAs: [
            'https://www.facebook.com/RotaractClubZamboWest',
            'https://www.instagram.com/raczambowest1',
          ],
        })}
      </script>
    </Helmet>

    <div className="min-h-screen bg-[#faf9f7]">
      <Navbar />
      <main id="main-content">
        <Hero />
        <Credentials />
        <About />
        <Contact />
        <Join />
      </main>
      <Footer />
    </div>
  </>
);

export default Index;
