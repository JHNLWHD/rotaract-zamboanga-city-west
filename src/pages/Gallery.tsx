
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Gallery = () => {
  const galleryCategories = [
    {
      title: "Community Service",
      description: "Photos from our various community service projects and activities",
      images: [
        "/lovable-uploads/4c7af23b-7105-44f3-8635-b19d0fb84c79.png",
        "/lovable-uploads/77e591d9-27b0-4497-b290-8fa95806ace4.png"
      ]
    },
    {
      title: "Club Activities",
      description: "Memorable moments from our club meetings and social events",
      images: [
        "/lovable-uploads/e48a4b78-bd32-41b7-b192-969232e8378f.png"
      ]
    },
    {
      title: "Special Events",
      description: "Highlights from our major events and celebrations",
      images: []
    }
  ];

  return (
    <>
      <Helmet>
        <title>Gallery - Rotaract Club of Zamboanga City West</title>
        <meta name="description" content="Browse through our photo gallery showcasing community service projects, club activities, and special events." />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-rotaract-navy mb-4">
                Gallery
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Capturing moments of service, fellowship, and community impact through our photo gallery.
              </p>
            </div>

            <div className="space-y-12">
              {galleryCategories.map((category, index) => (
                <section key={index}>
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle className="text-2xl text-rotaract-navy">{category.title}</CardTitle>
                      <CardDescription className="text-base">{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {category.images.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {category.images.map((image, imgIndex) => (
                            <div key={imgIndex} className="aspect-video rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                              <img 
                                src={image} 
                                alt={`${category.title} ${imgIndex + 1}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                          <p className="text-gray-500">Photos coming soon! Stay tuned for updates.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </section>
              ))}
            </div>

            <div className="text-center mt-12 bg-rotaract-navy text-white rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4">Share Your Photos</h3>
              <p className="mb-6">
                Have photos from our events? We'd love to feature them in our gallery!
              </p>
              <a 
                href="mailto:raczambowest1@gmail.com" 
                className="inline-block bg-rotaract-pink text-white px-6 py-3 rounded-lg font-medium hover:bg-rotaract-pink/90 transition-colors"
              >
                Send Your Photos
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Gallery;
