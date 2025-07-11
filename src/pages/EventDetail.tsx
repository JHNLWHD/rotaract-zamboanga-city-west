import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ShareModal from '../components/ShareModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, ExternalLink, Share2, ArrowLeft, Download, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { events, Event } from '../data/events';

const EventDetail = () => {
  const { date, slug } = useParams();
  const navigate = useNavigate();
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<number | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);

  // Find the event based on date and slug
  const event = events.find(e => {
    const eventDate = e.date;
    const eventSlug = e.slug;
    return eventDate === date && eventSlug === slug;
  });

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Event Not Found</h1>
            <p className="text-lg text-gray-600 mb-8">The event you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/events')} className="bg-cranberry-600 hover:bg-cranberry-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const shareEvent = () => {
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
  };

  const downloadInvitation = () => {
    if (event.invitationImage) {
      const link = document.createElement('a');
      link.href = event.invitationImage;
      link.download = `${event.title}-invitation.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Invitation downloaded!');
    }
  };

  const openGalleryModal = (index: number) => {
    setSelectedGalleryImage(index);
  };

  const closeGalleryModal = () => {
    setSelectedGalleryImage(null);
  };

  const navigateGallery = (direction: 'prev' | 'next') => {
    if (selectedGalleryImage === null || !event.gallery) return;
    
    if (direction === 'prev') {
      setSelectedGalleryImage(selectedGalleryImage > 0 ? selectedGalleryImage - 1 : event.gallery.length - 1);
    } else {
      setSelectedGalleryImage(selectedGalleryImage < event.gallery.length - 1 ? selectedGalleryImage + 1 : 0);
    }
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Ceremony':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Social Event':
        return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'Fellowship':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Training':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Conference':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Meeting':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <>
      <Helmet>
        <title>{event.title} | Rotaract Club of Zamboanga City West Events</title>
        <meta name="title" content={`${event.title} | Rotaract Club of Zamboanga City West Events`} />
        <meta name="description" content={`${event.description} Join us on ${new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at ${event.venue}. ${event.status === 'upcoming' ? 'Register now!' : event.status === 'registration_open' ? 'Registration is open!' : 'See event highlights and photos.'}`} />
        <meta name="keywords" content={`${event.title}, Rotaract ${event.category.toLowerCase()}, ${event.venue}, Zamboanga City West, ${event.date}, ${event.category.toLowerCase()} event Philippines, Rotaract club activities`} />
        <meta name="author" content="Rotaract Club of Zamboanga City West" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="geo.region" content="PH-ZMB" />
        <meta name="geo.placename" content="Zamboanga City" />
        <meta name="geo.position" content="6.9214;122.0790" />
        <meta name="ICBM" content="6.9214, 122.0790" />
        
        {/* Event-specific meta tags */}
        <meta name="event:start_date" content={`${event.date}T${event.time.split(' - ')[0].replace(' ', '').toLowerCase()}`} />
        <meta name="event:end_date" content={`${event.date}T${event.time.split(' - ')[1]?.replace(' ', '').toLowerCase() || '23:59'}`} />
        <meta name="event:location" content={event.venue} />
        <meta name="event:status" content={event.status} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="event" />
        <meta property="og:url" content={event.shareableLink} />
        <meta property="og:title" content={`${event.title} | Rotaract Club of Zamboanga City West`} />
        <meta property="og:description" content={`${event.description} Join us on ${new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at ${event.venue}.`} />
        <meta property="og:image" content={`https://rotaract.rotaryzcwest.org${event.invitationImage || event.image}`} />
        <meta property="og:image:alt" content={`${event.title} invitation`} />
        <meta property="og:site_name" content="Rotaract Club of Zamboanga City West" />
        <meta property="og:locale" content="en_US" />
        <meta property="event:start_time" content={`${event.date}T${event.time.split(' - ')[0].replace(/[^0-9:]/g, '')}`} />
        <meta property="event:end_time" content={`${event.date}T${event.time.split(' - ')[1]?.replace(/[^0-9:]/g, '') || '23:59'}`} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@RotaractZCWest" />
        <meta name="twitter:creator" content="@RotaractZCWest" />
        <meta name="twitter:url" content={event.shareableLink} />
        <meta name="twitter:title" content={`${event.title} | Rotaract Club of Zamboanga City West`} />
        <meta name="twitter:description" content={`${event.description} Join us on ${new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at ${event.venue}.`} />
        <meta name="twitter:image" content={`https://rotaract.rotaryzcwest.org${event.invitationImage || event.image}`} />
        <meta name="twitter:image:alt" content={`${event.title} invitation`} />
        <meta name="twitter:label1" content="Date" />
        <meta name="twitter:data1" content={new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} />
        <meta name="twitter:label2" content="Location" />
        <meta name="twitter:data2" content={event.venue} />
        
        {/* Additional SEO Tags */}
        <meta name="theme-color" content="#BE185D" />
        <meta name="msapplication-TileColor" content="#BE185D" />
        <meta name="application-name" content="Rotaract ZC West" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={event.shareableLink} />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Enhanced Structured Data for Event */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": event.title,
            "description": event.description,
            "startDate": `${event.date}T${event.time.split(' - ')[0].replace(/[^0-9:]/g, '')}`,
            "endDate": `${event.date}T${event.time.split(' - ')[1]?.replace(/[^0-9:]/g, '') || '23:59'}`,
            "eventStatus": event.status === 'past' ? "https://schema.org/EventCompleted" : event.status === 'upcoming' ? "https://schema.org/EventScheduled" : "https://schema.org/EventScheduled",
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "location": {
              "@type": "Place",
              "name": event.venue,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": event.venue,
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
            "image": [`https://rotaract.rotaryzcwest.org${event.invitationImage || event.image}`],
            "organizer": {
              "@type": "Organization",
              "name": "Rotaract Club of Zamboanga City West",
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
                "addressCountry": "PH"
              }
            },
            "performer": {
              "@type": "Organization",
              "name": "Rotaract Club of Zamboanga City West"
            },
            "offers": event.registrationUrl ? {
              "@type": "Offer",
              "url": event.registrationUrl,
              "price": "0",
              "priceCurrency": "PHP",
              "availability": event.status === 'past' ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
              "validFrom": new Date().toISOString()
            } : undefined,
            "category": event.category,
            "keywords": `${event.category}, Rotaract, Zamboanga City West, community service, leadership, fellowship`,
            "url": event.shareableLink,
            "identifier": event.id.toString(),
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": event.shareableLink
            },
            "potentialAction": event.registrationUrl ? {
              "@type": "ReserveAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": event.registrationUrl,
                "actionPlatform": [
                  "http://schema.org/DesktopWebPlatform",
                  "http://schema.org/MobileWebPlatform"
                ]
              },
              "result": {
                "@type": "Reservation",
                "name": `Registration for ${event.title}`
              }
            } : undefined
          }, null, 2)}
        </script>
        
        {/* Breadcrumb Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
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
                "name": "Events",
                "item": "https://rotaract.rotaryzcwest.org/events"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": event.title,
                "item": event.shareableLink
              }
            ]
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main id="main-content" role="main" className="flex-1">
          {/* Back Button */}
          <div className="bg-gray-50 py-4 px-6">
            <div className="max-w-4xl mx-auto">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/events')}
                className="text-gray-600 hover:text-cranberry-600"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Events
              </Button>
            </div>
          </div>

          {/* Event Header */}
          <section className="py-12 px-6 bg-white">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start justify-between mb-6">
                <div className="flex gap-3">
                  {getStatusBadge(event.status)}
                  <Badge className={getCategoryColor(event.category)}>
                    {event.category}
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={shareEvent}
                  className="flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share Event
                </Button>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {event.title}
              </h1>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-3 text-cranberry-500" />
                  <div>
                    <div className="font-medium">
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        weekday: 'long',
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-3 text-cranberry-500" />
                  <div>
                    <div className="font-medium">{event.time}</div>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3 text-cranberry-500" />
                  <div>
                    <div className="font-medium">{event.venue}</div>
                  </div>
                </div>
              </div>

              {event.status !== 'past' && event.registrationUrl && (
                <Button 
                  size="lg"
                  className="bg-cranberry-600 hover:bg-cranberry-700 mb-8"
                  onClick={() => window.open(event.registrationUrl, '_blank')}
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Register for this Event
                </Button>
              )}
            </div>
          </section>

          {/* Event Image/Invitation */}
          <section className="px-6">
            <div className="max-w-4xl mx-auto">
              {event.invitationImage ? (
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{event.status === 'past' ? 'Event Invitation' : 'Event Invitation'}</span>
                      {event.status !== 'past' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={downloadInvitation}
                          className="flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-auto max-w-md mx-auto bg-gradient-to-br from-cranberry-100 to-cranberry-200 rounded-lg flex items-center justify-center overflow-hidden">
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
                      <div className="hidden flex-col items-center justify-center text-cranberry-600">
                        <ImageIcon className="w-16 h-16 mb-2" />
                        <span className="text-sm">Invitation Image</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-cranberry-100 to-cranberry-200 rounded-lg flex items-center justify-center mb-8">
                  <Calendar className="w-24 h-24 text-cranberry-500" />
                </div>
              )}
            </div>
          </section>

          {/* Event Content */}
          <section className="py-12 px-6">
            <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>About This Event</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none mb-8">
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Event Highlights */}
                <Card>
                  <CardHeader>
                    <CardTitle>Event Highlights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {event.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-cranberry-500 rounded-full mr-3"></div>
                          <span className="text-gray-600">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Agenda */}
                {event.agenda && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Event Agenda</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {event.agenda.map((item, index) => (
                          <div key={index} className="flex items-start p-3 bg-cranberry-50 rounded-lg border border-cranberry-100">
                            <div className="bg-cranberry-100 text-cranberry-700 px-2 py-1 rounded text-sm font-medium mr-3 min-w-fit">
                              {item.split(' - ')[0]}
                            </div>
                            <div className="text-gray-700 text-sm leading-relaxed">
                              {item.split(' - ').slice(1).join(' - ')}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Requirements */}
                {event.requirements && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Requirements & Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {event.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3 mt-2"></div>
                            <span className="text-gray-600">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Event Gallery */}
                {event.gallery && event.gallery.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Event Gallery</CardTitle>
                      <p className="text-sm text-gray-600">
                        Relive the memories from this amazing event
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {event.gallery.map((photo, index) => (
                          <div 
                            key={photo.id}
                            className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => openGalleryModal(index)}
                          >
                            <img 
                              src={photo.url} 
                              alt={photo.caption}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                            <div className="hidden w-full h-full flex items-center justify-center bg-gray-200">
                              <ImageIcon className="w-8 h-8 text-gray-400" />
                            </div>
                          </div>
                        ))}
                      </div>
                      {event.gallery.length > 6 && (
                        <div className="mt-4 text-center">
                          <p className="text-sm text-gray-600">
                            {event.gallery.length} photos total • Click any photo to view full size
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Registration CTA */}
                {event.status !== 'past' && event.registrationUrl && (
                  <Card className="bg-cranberry-50 border-cranberry-200">
                    <CardHeader>
                      <CardTitle className="text-cranberry-700">Ready to Join?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-cranberry-600 mb-4 text-sm">
                        Register now to secure your spot at this event.
                      </p>
                      <Button 
                        className="w-full bg-cranberry-600 hover:bg-cranberry-700"
                        onClick={() => window.open(event.registrationUrl, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Register Now
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <ShareModal 
          isOpen={showShareModal}
          onClose={closeShareModal}
          event={event}
        />
      </div>

      {/* Gallery Modal */}
      {selectedGalleryImage !== null && event.gallery && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeGalleryModal}
        >
          <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
              onClick={closeGalleryModal}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Navigation Buttons */}
            {event.gallery.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                  onClick={() => navigateGallery('prev')}
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                  onClick={() => navigateGallery('next')}
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>
              </>
            )}

            {/* Image */}
            <img 
              src={event.gallery[selectedGalleryImage].url}
              alt={event.gallery[selectedGalleryImage].caption}
              className="max-w-full max-h-full object-contain"
            />

            {/* Caption */}
            <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 text-white p-4 rounded-lg">
              <p className="text-sm">{event.gallery[selectedGalleryImage].caption}</p>
              <p className="text-xs text-gray-300 mt-1">
                {selectedGalleryImage + 1} of {event.gallery.length} • {event.gallery[selectedGalleryImage].category}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventDetail; 