import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ShareModal from '../components/ShareModal';
import EventNotFound from '../components/events/EventNotFound';
import EventDetailHeader from '../components/events/EventDetailHeader';
import EventInvitation from '../components/events/EventInvitation';
import EventRegistration from '../components/events/EventRegistration';
import EventContent from '../components/events/EventContent';
import EventGallery from '../components/events/EventGallery';
import BackToEventsButton from '../components/events/BackToEventsButton';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useEventBySlug } from '../hooks/events/useEventBySlug';
import { markdownToPlainText } from '../utils/richText';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import DownloadPlugin from 'yet-another-react-lightbox/plugins/download';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';

const EventDetail = () => {
  const { date, slug } = useParams();
  const { data: event, isLoading, isError } = useEventBySlug(slug);
  const [showShareModal, setShowShareModal] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-cranberry-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading event details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !event) {
    return <EventNotFound />;
  }

  const shareEvent = () => {
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
  };

  const descriptionPlain = markdownToPlainText(event.description);

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

  return (
    <>
      <Helmet>
        <title>
          {event.title} | Great West in Action - Rotaract Club of Zamboanga City
          West
        </title>
        <meta
          name="title"
          content={`${event.title} | Great West in Action - Rotaract Club of Zamboanga City West`}
        />
        <meta
          name="description"
          content={`${descriptionPlain} Join the Great West in Action on ${new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at ${event.venue}. ${event.status === 'upcoming' ? 'Register now and be part of our dynamic community!' : event.status === 'registration_open' ? 'Registration is open - join us!' : 'See event highlights and photos from this memorable Great West gathering.'}`}
        />
        <meta
          name="keywords"
          content={`${event.title}, Great West in Action, Rotaract ${event.category.toLowerCase()}, ${event.venue}, Zamboanga City West, ${event.date}, ${event.category.toLowerCase()} event Philippines, Rotaract club activities, fellowship events`}
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

        <meta
          name="event:start_date"
          content={`${event.date}T${event.time.split(' - ')[0].replace(' ', '').toLowerCase()}`}
        />
        <meta
          name="event:end_date"
          content={`${event.date}T${event.time.split(' - ')[1]?.replace(' ', '').toLowerCase() || '23:59'}`}
        />
        <meta name="event:location" content={event.venue} />
        <meta name="event:status" content={event.status} />

        <meta property="og:type" content="event" />
        <meta property="og:url" content={event.shareableLink} />
        <meta
          property="og:title"
          content={`${event.title} | Great West in Action - Rotaract Club of Zamboanga City West`}
        />
        <meta
          property="og:description"
          content={`${descriptionPlain} Join the Great West in Action on ${new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at ${event.venue}.`}
        />
        <meta
          property="og:image"
          content={
            (event.invitationImage || event.image).startsWith('http')
              ? event.invitationImage || event.image
              : `https://rotaract.rotaryzcwest.org${event.invitationImage || event.image}`
          }
        />
        <meta
          property="og:image:alt"
          content={`${event.title} - Great West in Action event`}
        />
        <meta
          property="og:site_name"
          content="Rotaract Club of Zamboanga City West"
        />
        <meta property="og:locale" content="en_PH" />
        <meta
          property="event:start_time"
          content={`${event.date}T${event.time.split(' - ')[0].replace(/[^0-9:]/g, '')}`}
        />
        <meta
          property="event:end_time"
          content={`${event.date}T${event.time.split(' - ')[1]?.replace(/[^0-9:]/g, '') || '23:59'}`}
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@RotaractZCWest" />
        <meta name="twitter:creator" content="@RotaractZCWest" />
        <meta name="twitter:url" content={event.shareableLink} />
        <meta
          name="twitter:title"
          content={`${event.title} | Great West in Action - Rotaract Club of Zamboanga City West`}
        />
        <meta
          name="twitter:description"
          content={`${descriptionPlain} Join the Great West in Action on ${new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at ${event.venue}.`}
        />
        <meta
          name="twitter:image"
          content={
            (event.invitationImage || event.image).startsWith('http')
              ? event.invitationImage || event.image
              : `https://rotaract.rotaryzcwest.org${event.invitationImage || event.image}`
          }
        />
        <meta
          name="twitter:image:alt"
          content={`${event.title} - Great West in Action event`}
        />
        <meta name="twitter:label1" content="Date" />
        <meta
          name="twitter:data1"
          content={new Date(event.date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        />
        <meta name="twitter:label2" content="Location" />
        <meta name="twitter:data2" content={event.venue} />

        <meta name="theme-color" content="#BE185D" />
        <meta name="msapplication-TileColor" content="#BE185D" />
        <meta name="application-name" content="Rotaract ZC West" />

        <link rel="canonical" href={event.shareableLink} />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <script type="application/ld+json">
          {JSON.stringify(
            {
              '@context': 'https://schema.org',
              '@type': 'Event',
              name: event.title,
              description: descriptionPlain,
              startDate: `${event.date}T${event.time.split(' - ')[0].replace(/[^0-9:]/g, '')}`,
              endDate: `${event.date}T${event.time.split(' - ')[1]?.replace(/[^0-9:]/g, '') || '23:59'}`,
              eventStatus:
                event.status === 'past'
                  ? 'https://schema.org/EventCompleted'
                  : event.status === 'upcoming'
                    ? 'https://schema.org/EventScheduled'
                    : 'https://schema.org/EventScheduled',
              eventAttendanceMode:
                'https://schema.org/OfflineEventAttendanceMode',
              location: {
                '@type': 'Place',
                name: event.venue,
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: event.venue,
                  addressLocality: 'Zamboanga City',
                  addressRegion: 'Zamboanga Peninsula',
                  postalCode: '7000',
                  addressCountry: 'PH',
                },
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: '6.9214',
                  longitude: '122.0790',
                },
              },
              image: [
                (event.invitationImage || event.image).startsWith('http')
                  ? event.invitationImage || event.image
                  : `https://rotaract.rotaryzcwest.org${event.invitationImage || event.image}`,
              ],
              organizer: {
                '@type': 'Organization',
                name: 'Rotaract Club of Zamboanga City West',
                alternateName: 'Great West',
                url: 'https://rotaract.rotaryzcwest.org',
                logo: 'https://rotaract.rotaryzcwest.org/images/logo.png',
                sameAs: [
                  'https://www.facebook.com/RotaractClubZamboWest',
                  'https://www.instagram.com/raczambowest1',
                ],
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Zamboanga City',
                  addressRegion: 'Zamboanga Peninsula',
                  addressCountry: 'PH',
                  postalCode: '7000',
                },
              },
              performer: {
                '@type': 'Organization',
                name: 'Rotaract Club of Zamboanga City West',
                alternateName: 'Great West',
              },
              offers: event.registrationUrl
                ? {
                    '@type': 'Offer',
                    url: event.registrationUrl,
                    price: '0',
                    priceCurrency: 'PHP',
                    availability:
                      event.status === 'past'
                        ? 'https://schema.org/SoldOut'
                        : 'https://schema.org/InStock',
                    validFrom: new Date().toISOString(),
                  }
                : undefined,
              category: event.category,
              keywords: `${event.category}, Great West in Action, Rotaract, Zamboanga City West, community service, leadership, fellowship`,
              url: event.shareableLink,
              identifier: event.id,
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': event.shareableLink,
              },
              potentialAction: event.registrationUrl
                ? {
                    '@type': 'ReserveAction',
                    target: {
                      '@type': 'EntryPoint',
                      urlTemplate: event.registrationUrl,
                      actionPlatform: [
                        'http://schema.org/DesktopWebPlatform',
                        'http://schema.org/MobileWebPlatform',
                      ],
                    },
                    result: {
                      '@type': 'Reservation',
                      name: `Registration for ${event.title}`,
                    },
                  }
                : undefined,
            },
            null,
            2
          )}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
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
              {
                '@type': 'ListItem',
                position: 3,
                name: event.title,
                item: event.shareableLink,
              },
            ],
          })}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main id="main-content" role="main" className="flex-1">
          <BackToEventsButton />

          <section className="py-12 px-6 bg-white">
            <EventDetailHeader event={event} onShare={shareEvent} />

            <EventRegistration event={event} />
          </section>

          <EventInvitation event={event} onDownload={downloadInvitation} />

          <EventContent event={event} />

          {event.gallery && event.gallery.length > 0 && (
            <section className="py-12 px-6">
              <div className="max-w-4xl mx-auto">
                <EventGallery
                  event={event}
                  onImageClick={index => {
                    setLightboxIndex(index);
                    setLightboxOpen(true);
                  }}
                />
              </div>
            </section>
          )}
        </main>
        <Footer />
        <ShareModal
          isOpen={showShareModal}
          onClose={closeShareModal}
          content={
            event
              ? {
                  title: event.title,
                  description: descriptionPlain,
                  date: event.date,
                  venue: event.venue,
                  shareableLink: event.shareableLink,
                  time: event.time,
                  category: event.category,
                }
              : null
          }
          contentType="event"
        />
        <Lightbox
          open={lightboxOpen}
          index={lightboxIndex}
          close={() => setLightboxOpen(false)}
          slides={event.gallery?.map(photo => ({
            src: photo.url,
            alt: photo.caption,
            download: photo.url,
            description: photo.caption,
          }))}
          plugins={[Captions, DownloadPlugin, Thumbnails]}
          captions={{
            descriptionTextAlign: 'center',
            descriptionMaxLines: 3,
          }}
        />
      </div>
    </>
  );
};

export default EventDetail;
