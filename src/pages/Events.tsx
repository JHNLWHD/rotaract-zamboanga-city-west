import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ShareModal from '../components/ShareModal';
import EventsGrid from '../components/events/EventsGrid';
import LoadingState from '../components/events/LoadingState';
import ErrorState from '../components/events/ErrorState';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { fetchEvents, type Event } from '../hooks/events/fetchEvents';
import { cacheConfig } from '../config/cache';

const Events = () => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [currentShareEvent, setCurrentShareEvent] = useState<Event | null>(
    null
  );

  const {
    data: events,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['events'],
    queryFn: () => fetchEvents(),
    ...cacheConfig.monthly,
  });

  const handleShareEvent = (event: Event) => {
    setCurrentShareEvent(event);
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
    setCurrentShareEvent(null);
  };

  return (
    <>
      <Helmet>
        <title>
          Great West in Action - Club Events & Activities | Rotaract Club of
          Zamboanga City West
        </title>
        <meta
          name="title"
          content="Great West in Action - Club Events & Activities | Rotaract Club of Zamboanga City West"
        />
        <meta
          name="description"
          content="Join the Great West in Action! Discover purposeful meetings, leadership trainings, social gatherings, and special fellowship ceremonies that strengthen our Rotaract community in Zamboanga City West."
        />
        <meta
          name="keywords"
          content="Rotaract events Zamboanga City West, Great West in Action, fellowship meetings Philippines, leadership training Zamboanga, club activities, Rotaract community events, youth organization activities, volunteer events Philippines"
        />
        <meta name="author" content="Rotaract Club of Zamboanga City West" />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="geo.region" content="PH-ZAM" />
        <meta name="geo.placename" content="Zamboanga City" />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://rotaract.rotaryzcwest.org/events"
        />
        <meta
          property="og:title"
          content="Great West in Action - Club Events & Activities | Rotaract Club of Zamboanga City West"
        />
        <meta
          property="og:description"
          content="Join the Great West in Action! Discover purposeful meetings, leadership trainings, social gatherings, and special fellowship ceremonies that strengthen our Rotaract community in Zamboanga City West."
        />
        <meta
          property="og:image"
          content="https://rotaract.rotaryzcwest.org/og-image.png"
        />
        <meta
          property="og:image:alt"
          content="Great West in Action - Rotaract Club of Zamboanga City West Events"
        />
        <meta
          property="og:site_name"
          content="Rotaract Club of Zamboanga City West"
        />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@RotaractZCWest" />
        <meta name="twitter:creator" content="@RotaractZCWest" />
        <meta
          name="twitter:url"
          content="https://rotaract.rotaryzcwest.org/events"
        />
        <meta
          name="twitter:title"
          content="Great West in Action - Club Events & Activities | Rotaract Club of Zamboanga City West"
        />
        <meta
          name="twitter:description"
          content="Join the Great West in Action! Discover purposeful meetings, leadership trainings, social gatherings, and special fellowship ceremonies that strengthen our Rotaract community in Zamboanga City West."
        />
        <meta
          name="twitter:image"
          content="https://rotaract.rotaryzcwest.org/images/events-og-image.jpg"
        />
        <meta
          name="twitter:image:alt"
          content="Great West in Action - Rotaract Club of Zamboanga City West Events"
        />

        <meta name="theme-color" content="#BE185D" />
        <meta name="msapplication-TileColor" content="#BE185D" />
        <meta name="application-name" content="Rotaract ZC West" />

        <link rel="canonical" href="https://rotaract.rotaryzcwest.org/events" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Great West in Action - Club Events & Activities',
            description:
              'Join the Great West in Action! Discover purposeful meetings, leadership trainings, social gatherings, and special fellowship ceremonies that strengthen our Rotaract community in Zamboanga City West.',
            url: 'https://rotaract.rotaryzcwest.org/events',
            publisher: {
              '@type': 'Organization',
              name: 'Rotaract Club of Zamboanga City West',
              alternateName: 'Great West',
              url: 'https://rotaract.rotaryzcwest.org',
            },
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: (events || []).map((event, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'Event',
                  name: event.title,
                  description: event.description,
                  startDate: `${event.date}T${event.time.split(' - ')[0].replace(' ', '').toLowerCase()}`,
                  endDate: `${event.date}T${event.time.split(' - ')[1]?.replace(' ', '').toLowerCase() || '23:59'}`,
                  location: {
                    '@type': 'Place',
                    name: event.venue,
                    address: {
                      '@type': 'PostalAddress',
                      addressLocality: 'Zamboanga City',
                      addressRegion: 'Zamboanga Peninsula',
                      addressCountry: 'PH',
                    },
                  },
                  organizer: {
                    '@type': 'Organization',
                    name: 'Rotaract Club of Zamboanga City West',
                    url: 'https://rotaract.rotaryzcwest.org',
                  },
                  url: event.shareableLink,
                  image: event.image.startsWith('http')
                    ? event.image
                    : `https://rotaract.rotaryzcwest.org${event.image}`,
                  eventStatus:
                    event.status === 'upcoming'
                      ? 'https://schema.org/EventScheduled'
                      : event.status === 'registration_open'
                        ? 'https://schema.org/EventScheduled'
                        : 'https://schema.org/EventCompleted',
                },
              })),
            },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://rotaract.rotaryzcwest.org',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Great West in Action',
                  item: 'https://rotaract.rotaryzcwest.org/events',
                },
              ],
            },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main id="main-content" role="main" className="flex-1">
          <section
            className="bg-gradient-to-br from-cranberry-600 via-cranberry-700 to-cranberry-800 text-white pt-32 pb-20 px-6"
            role="banner"
          >
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Great West in Action
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-cranberry-100 max-w-3xl mx-auto">
                Join us for purposeful meetings, leadership trainings, social
                gatherings, and special fellowship ceremonies that strengthen
                our Rotaract community
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-cranberry-600 hover:bg-cranberry-50 font-semibold"
                  onClick={() =>
                    document
                      .getElementById('all-events')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                  aria-label="Scroll to view all events section"
                >
                  <Calendar className="w-5 h-5 mr-2" aria-hidden="true" />
                  View All Events
                </Button>
              </div>
            </div>
          </section>

          <section
            id="all-events"
            className="py-16 px-6 bg-gray-50"
            role="main"
            aria-labelledby="events-heading"
          >
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2
                  id="events-heading"
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                >
                  Club Highlights
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Get a glimpse of our innovative projects, leadership
                  milestones, and dynamic community networks— stay connected
                  with our vibrant Rotaract community
                </p>
              </div>

              {isLoading && <LoadingState />}

              {isError && <ErrorState error={error} />}

              {!isLoading && !isError && (
                <EventsGrid events={events} onShareEvent={handleShareEvent} />
              )}
            </div>
          </section>
        </main>
        <Footer />
        <ShareModal
          isOpen={showShareModal}
          onClose={closeShareModal}
          content={
            currentShareEvent
              ? {
                  title: currentShareEvent.title,
                  description: currentShareEvent.description,
                  date: currentShareEvent.date,
                  venue: currentShareEvent.venue,
                  shareableLink: currentShareEvent.shareableLink,
                  time: currentShareEvent.time,
                  category: currentShareEvent.category,
                }
              : null
          }
          contentType="event"
        />
      </div>
    </>
  );
};

export default Events;
