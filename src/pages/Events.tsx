import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ShareModal from '../components/ShareModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, ExternalLink, Share2 } from 'lucide-react';
import { events, Event } from '../data/events';

const Events = () => {
  const navigate = useNavigate();
  const [showShareModal, setShowShareModal] = useState(false);
  const [currentShareEvent, setCurrentShareEvent] = useState<Event | null>(null);

  const handleShareEvent = (event: Event) => {
    setCurrentShareEvent(event);
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
    setCurrentShareEvent(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Upcoming</Badge>;
      case 'registration_open':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Registration Open</Badge>;
      case 'past':
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Past Event</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Event</Badge>;
    }
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Great West in Action - Club Events & Activities | Rotaract Club of Zamboanga City West</title>
        <meta name="title" content="Great West in Action - Club Events & Activities | Rotaract Club of Zamboanga City West" />
        <meta name="description" content="Join the Great West in Action! Discover purposeful meetings, leadership trainings, social gatherings, and special fellowship ceremonies that strengthen our Rotaract community in Zamboanga City West." />
        <meta name="keywords" content="Rotaract events Zamboanga City West, Great West in Action, fellowship meetings Philippines, leadership training Zamboanga, club activities, Rotaract community events, youth organization activities, volunteer events Philippines" />
        <meta name="author" content="Rotaract Club of Zamboanga City West" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="geo.region" content="PH-ZAM" />
        <meta name="geo.placename" content="Zamboanga City" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rotaract.rotaryzcwest.org/events" />
        <meta property="og:title" content="Great West in Action - Club Events & Activities | Rotaract Club of Zamboanga City West" />
        <meta property="og:description" content="Join the Great West in Action! Discover purposeful meetings, leadership trainings, social gatherings, and special fellowship ceremonies that strengthen our Rotaract community in Zamboanga City West." />
        <meta property="og:image" content="https://rotaract.rotaryzcwest.org/og-image.png" />
        <meta property="og:image:alt" content="Great West in Action - Rotaract Club of Zamboanga City West Events" />
        <meta property="og:site_name" content="Rotaract Club of Zamboanga City West" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@RotaractZCWest" />
        <meta name="twitter:creator" content="@RotaractZCWest" />
        <meta name="twitter:url" content="https://rotaract.rotaryzcwest.org/events" />
        <meta name="twitter:title" content="Great West in Action - Club Events & Activities | Rotaract Club of Zamboanga City West" />
        <meta name="twitter:description" content="Join the Great West in Action! Discover purposeful meetings, leadership trainings, social gatherings, and special fellowship ceremonies that strengthen our Rotaract community in Zamboanga City West." />
        <meta name="twitter:image" content="https://rotaract.rotaryzcwest.org/images/events-og-image.jpg" />
        <meta name="twitter:image:alt" content="Great West in Action - Rotaract Club of Zamboanga City West Events" />

        {/* Additional SEO Tags */}
        <meta name="theme-color" content="#BE185D" />
        <meta name="msapplication-TileColor" content="#BE185D" />
        <meta name="application-name" content="Rotaract ZC West" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://rotaract.rotaryzcwest.org/events" />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Enhanced Structured Data for Events */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Great West in Action - Club Events & Activities",
            "description": "Comprehensive list of Rotaract Club of Zamboanga City West events including purposeful meetings, leadership training, and fellowship activities that strengthen our community",
            "url": "https://rotaract.rotaryzcwest.org/events",
            "mainEntity": {
              "@type": "EventSeries",
              "name": "Great West in Action - Rotaract Club of Zamboanga City West Events",
              "description": "Purposeful meetings, leadership trainings, social gatherings, and special fellowship ceremonies that strengthen our Rotaract community",
              "organizer": {
                "@type": "Organization",
                "name": "Rotaract Club of Zamboanga City West",
                "alternateName": "Great West",
                "url": "https://rotaract.rotaryzcwest.org",
                "logo": "https://rotaract.rotaryzcwest.org/images/logo.png",
                "sameAs": [
                  "https://www.facebook.com/RotaractClubZamboWest",
                  "https://www.instagram.com/rotaractzcwest"
                ],
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Zamboanga City",
                  "addressRegion": "Zamboanga Peninsula",
                  "addressCountry": "PH",
                  "postalCode": "7000"
                }
              },
              "location": {
                "@type": "Place",
                "name": "Various venues in Zamboanga City",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Zamboanga City",
                  "addressRegion": "Zamboanga Peninsula",
                  "postalCode": "7000",
                  "addressCountry": "PH"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "6.9214",
                  "longitude": "122.0790"
                }
              },
              "eventSchedule": {
                "@type": "Schedule",
                "description": "Regular club meetings and special events throughout the year"
              }
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://rotaract.rotaryzcwest.org"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Great West in Action",
                  "item": "https://rotaract.rotaryzcwest.org/events"
                }
              ]
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main id="main-content" role="main" className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-cranberry-600 via-cranberry-700 to-cranberry-800 text-white pt-32 pb-20 px-6" role="banner">
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Great West in Action
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-cranberry-100 max-w-3xl mx-auto">
                Join us for purposeful meetings, leadership trainings, social gatherings, and special fellowship ceremonies that strengthen our Rotaract community
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-cranberry-600 hover:bg-cranberry-50 font-semibold"
                  onClick={() => document.getElementById('all-events')?.scrollIntoView({ behavior: 'smooth' })}
                  aria-label="Scroll to view all events section"
                >
                  <Calendar className="w-5 h-5 mr-2" aria-hidden="true" />
                  View All Events
                </Button>
              </div>
            </div>
          </section>

          {/* All Events Section */}
          <section id="all-events" className="py-16 px-6 bg-gray-50" role="main" aria-labelledby="events-heading">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 id="events-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Club Highlights
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Get a glimpse of our innovative projects, leadership milestones, and dynamic community networks— stay connected with our vibrant Rotaract community
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" role="list" aria-label="List of club events">
                {events
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((event) => (
                    <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full" role="listitem">
                      <div className="aspect-square bg-gradient-to-br from-cranberry-100 to-cranberry-200 flex items-center justify-center overflow-hidden" aria-hidden="true">
                        <img
                          src={event.invitationImage}
                          alt={`${event.title} invitation`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <Calendar className="w-16 h-16 text-cranberry-500 hidden" />
                      </div>
                      <CardHeader className="pb-3 flex-shrink-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex gap-2" role="group" aria-label="Event badges">
                            {getStatusBadge(event.status)}
                            <Badge className="bg-gray-100 text-gray-700 border-gray-200">
                              {event.category}
                            </Badge>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleShareEvent(event)}
                            className="flex items-center gap-2"
                            aria-label={`Share ${event.title} event`}
                          >
                            <Share2 className="w-4 h-4" aria-hidden="true" />
                            Share
                          </Button>
                        </div>
                        <CardTitle className="text-xl mb-2 min-h-[3.5rem] flex items-start">
                          <h3>{event.title}</h3>
                        </CardTitle>
                        <p className="text-gray-600 text-sm line-clamp-3">{event.description}</p>
                      </CardHeader>
                      <CardContent className="pt-0 flex flex-col flex-grow">
                        <div className="space-y-3 mb-4 flex-grow" role="group" aria-label="Event details">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" aria-hidden="true" />
                            <span aria-label={`Event date: ${new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`}>
                              {new Date(event.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="w-4 h-4 mr-2" aria-hidden="true" />
                            <span aria-label={`Event time: ${event.time}`}>{event.time}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" aria-hidden="true" />
                            <span aria-label={`Event venue: ${event.venue}`}>{event.venue}</span>
                          </div>
                        </div>

                        <div className="space-y-2 mt-auto">
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => navigate(`/events/${event.date}/${event.slug}`)}
                            aria-label={`View detailed information about ${event.title}`}
                          >
                            View Event Details
                          </Button>
                          {event.status !== 'past' && event.registrationUrl && (
                            <Button
                              className="w-full bg-cranberry-600 hover:bg-cranberry-700"
                              onClick={() => window.open(event.registrationUrl, '_blank')}
                              aria-label={`Register for ${event.title}`}
                            >
                              <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
                              Register Now
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <ShareModal
          isOpen={showShareModal}
          onClose={closeShareModal}
          content={currentShareEvent ? {
            title: currentShareEvent.title,
            description: currentShareEvent.description,
            date: currentShareEvent.date,
            venue: currentShareEvent.venue,
            shareableLink: currentShareEvent.shareableLink,
            time: currentShareEvent.time,
            category: currentShareEvent.category
          } : null}
          contentType="event"
        />
      </div>
    </>
  );
};

export default Events; 