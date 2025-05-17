
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
        <title>Rotaract Club of Zamboanga City West - Service, Fellowship & Leadership</title>
        <meta name="description" content="Join the Rotaract Club of Zamboanga City West - empowering young leaders through fellowship, community service, and professional development since 2010." />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main id="main-content">
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
