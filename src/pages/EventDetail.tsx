import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { serializeJson } from '../utils/seo';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  ArrowLeft,
  Download,
  ExternalLink,
  Loader2,
  Share2,
} from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageHeader from '../components/layout/PageHeader';
import ShareModal from '../components/ShareModal';
import EventNotFound from '../components/events/EventNotFound';
import RecordUnavailable from '../components/RecordUnavailable';
import { useEventBySlug } from '../hooks/events/useEventBySlug';
import { markdownToPlainText } from '../utils/richText';
import { eventStartDate, isPastEvent } from '../utils/eventDate';
import { useRenderTime } from '../hooks/useRenderTime';
import { responsiveImage } from '../utils/contentful';

import 'yet-another-react-lightbox/styles.css';

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-US', {
    timeZone: 'Asia/Manila',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const EventDetail = () => {
  const now = useRenderTime();
  const { slug } = useParams();
  const {
    data: event,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useEventBySlug(slug);
  const [showShareModal, setShowShareModal] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#faf9f7]">
        <Navbar />
        <main
          id="main-content"
          className="editorial-shell flex min-h-[24rem] items-center gap-3 text-sm text-slate-600"
        >
          <Loader2
            className="h-5 w-5 animate-spin text-cranberry-700"
            aria-hidden="true"
          />
          Loading event record…
        </main>
        <Footer />
      </div>
    );
  }

  if (isError && !event)
    return (
      <RecordUnavailable
        kind="Event"
        onRetry={refetch}
        isRetrying={isFetching}
      />
    );
  if (!event) return <EventNotFound />;

  const isPast = isPastEvent(event, now);
  const status = isPast
    ? 'Past event'
    : event.status === 'registration_open'
      ? 'Registration open'
      : 'Upcoming';
  const descriptionPlain = markdownToPlainText(event.description).replace(
    /\s+/g,
    ' '
  );
  const summary =
    descriptionPlain.length > 220
      ? `${descriptionPlain.slice(0, 217).trim()}…`
      : descriptionPlain;
  const canonical = `https://rotaract.rotaryzcwest.org/events/${event.date.split('T')[0]}/${event.slug}`;
  const invitationImage = event.invitationImage;
  const featureImage = event.image || invitationImage || '';
  const slides = event.gallery.map(image => ({
    src: image.url,
    alt: image.caption || `${event.title} gallery image`,
  }));

  const downloadInvitation = (imageUrl: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${event.slug}-invitation`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <>
      <Helmet>
        <title>{event.title} | Rotaract Club of Zamboanga City West</title>
        <meta name="description" content={summary} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={event.title} />
        <meta property="og:description" content={summary} />
        <meta
          property="og:image"
          content={
            featureImage || 'https://rotaract.rotaryzcwest.org/og-image.png'
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={event.title} />
        <meta name="twitter:description" content={summary} />
        <meta
          name="twitter:image"
          content={
            featureImage || 'https://rotaract.rotaryzcwest.org/og-image.png'
          }
        />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">
          {serializeJson({
            '@context': 'https://schema.org',
            '@type': 'Event',
            name: event.title,
            description: descriptionPlain,
            startDate: eventStartDate(event),
            eventAttendanceMode:
              'https://schema.org/OfflineEventAttendanceMode',
            location: {
              '@type': 'Place',
              name: event.venue,
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Zamboanga City',
                addressCountry: 'PH',
              },
            },
            image: [
              featureImage,
              ...event.gallery.map(image => image.url),
            ].filter(Boolean),
            organizer: {
              '@type': 'Organization',
              name: 'Rotaract Club of Zamboanga City West',
              url: 'https://rotaract.rotaryzcwest.org',
            },
            offers:
              !isPast && event.registrationUrl
                ? {
                    '@type': 'Offer',
                    url: event.registrationUrl,
                    availability: 'https://schema.org/InStock',
                  }
                : undefined,
            url: canonical,
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-[#faf9f7]">
        <Navbar />
        <main id="main-content">
          <PageHeader
            eyebrow={event.category || 'Event record'}
            title={event.title}
            asOf={`${formatDate(event.date)} · ${status}`}
          />

          <div className="editorial-shell py-8 md:py-12">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link to="/events" className="editorial-link">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Event archive
              </Link>
              <button
                type="button"
                onClick={() => setShowShareModal(true)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-950"
              >
                <Share2 className="h-4 w-4" aria-hidden="true" />
                Share record
              </button>
            </div>

            {featureImage && (
              <img
                {...responsiveImage(
                  featureImage,
                  '(min-width: 1024px) 960px, calc(100vw - 40px)'
                )}
                alt={`${event.title} event record`}
                className="mt-7 max-h-[32rem] w-full bg-[#f4f1ec] object-contain"
              />
            )}

            <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
              <article>
                <section aria-labelledby="event-narrative-heading">
                  <p className="editorial-kicker">Event narrative</p>
                  <h2
                    id="event-narrative-heading"
                    className="mt-2 text-3xl font-semibold text-slate-950"
                  >
                    About this event
                  </h2>
                  <div className="prose prose-lg prose-slate mt-5 max-w-none prose-headings:font-display prose-a:text-cranberry-700">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {event.description}
                    </ReactMarkdown>
                  </div>
                </section>

                {event.highlights.length > 0 && (
                  <section
                    className="mt-10"
                    aria-labelledby="event-highlights-heading"
                  >
                    <h2
                      id="event-highlights-heading"
                      className="text-2xl font-semibold text-slate-950"
                    >
                      Published highlights
                    </h2>
                    <ul className="mt-4 divide-y divide-slate-200 border-y border-slate-300">
                      {event.highlights.map((highlight, index) => (
                        <li
                          key={`${highlight}-${index}`}
                          className="py-3 text-sm leading-6 text-slate-700"
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {event.agenda.length > 0 && (
                  <section
                    className="mt-10"
                    aria-labelledby="event-agenda-heading"
                  >
                    <h2
                      id="event-agenda-heading"
                      className="text-2xl font-semibold text-slate-950"
                    >
                      Published agenda
                    </h2>
                    <ol className="mt-4 divide-y divide-slate-200 border-y border-slate-300">
                      {event.agenda.map((item, index) => (
                        <li
                          key={`${item}-${index}`}
                          className="grid grid-cols-[2rem_1fr] gap-3 py-3 text-sm leading-6 text-slate-700"
                        >
                          <span className="font-semibold tabular-nums text-cranberry-700">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ol>
                  </section>
                )}

                {event.gallery.length > 0 && (
                  <section
                    className="mt-12"
                    aria-labelledby="event-gallery-heading"
                  >
                    <p className="editorial-kicker">Supporting images</p>
                    <h2
                      id="event-gallery-heading"
                      className="mt-2 text-3xl font-semibold text-slate-950"
                    >
                      Event gallery
                    </h2>
                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                      {event.gallery.map((image, index) => (
                        <button
                          key={image.id}
                          type="button"
                          aria-label={`Open image ${index + 1}: ${image.caption || `${event.title} gallery image`}`}
                          aria-haspopup="dialog"
                          onClick={() => setLightboxIndex(index)}
                          className="text-left"
                        >
                          <img
                            {...responsiveImage(
                              image.url,
                              '(min-width: 1024px) 440px, (min-width: 640px) 50vw, calc(100vw - 40px)'
                            )}
                            alt={
                              image.caption || `${event.title} gallery image`
                            }
                            className="aspect-[4/3] w-full object-cover"
                            loading="lazy"
                          />
                          {image.caption && (
                            <span className="mt-2 block text-xs leading-5 text-slate-500">
                              {image.caption}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </section>
                )}
              </article>

              <aside
                className="border-t-2 border-slate-950 pt-5"
                aria-label="Event record details"
              >
                <h2 className="text-xl font-semibold text-slate-950">
                  Record details
                </h2>
                <dl className="mt-4 divide-y divide-slate-200 border-y border-slate-300 text-sm">
                  <div className="py-3.5">
                    <dt className="text-slate-500">Date</dt>
                    <dd className="mt-1 font-semibold text-slate-900">
                      {formatDate(event.date)}
                    </dd>
                  </div>
                  {event.time && (
                    <div className="py-3.5">
                      <dt className="text-slate-500">Time</dt>
                      <dd className="mt-1 font-semibold text-slate-900">
                        {event.time}
                      </dd>
                    </div>
                  )}
                  <div className="py-3.5">
                    <dt className="text-slate-500">Venue</dt>
                    <dd className="mt-1 font-semibold leading-6 text-slate-900">
                      {event.venue}
                    </dd>
                  </div>
                  <div className="py-3.5">
                    <dt className="text-slate-500">Status</dt>
                    <dd className="mt-1 font-semibold text-slate-900">
                      {status}
                    </dd>
                  </div>
                </dl>

                {!isPast && event.registrationUrl && (
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 bg-cranberry-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-cranberry-800"
                  >
                    Open registration
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}

                {invitationImage && (
                  <section
                    className="mt-8"
                    aria-labelledby="invitation-heading"
                  >
                    <h2
                      id="invitation-heading"
                      className="text-xl font-semibold text-slate-950"
                    >
                      Invitation record
                    </h2>
                    {invitationImage !== featureImage && (
                      <img
                        {...responsiveImage(
                          invitationImage,
                          '(min-width: 1024px) 288px, calc(100vw - 40px)'
                        )}
                        alt={`${event.title} invitation`}
                        className="mt-3 w-full object-cover"
                        loading="lazy"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => downloadInvitation(invitationImage)}
                      className="editorial-link mt-4"
                    >
                      Download invitation
                      <Download className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </section>
                )}

                {event.requirements.length > 0 && (
                  <section
                    className="mt-8"
                    aria-labelledby="requirements-heading"
                  >
                    <h2
                      id="requirements-heading"
                      className="text-xl font-semibold text-slate-950"
                    >
                      Published requirements
                    </h2>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                      {event.requirements.map((requirement, index) => (
                        <li key={`${requirement}-${index}`}>{requirement}</li>
                      ))}
                    </ul>
                  </section>
                )}
              </aside>
            </div>
          </div>
        </main>
        <Footer />
      </div>

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        content={{
          title: event.title,
          description: summary,
          date: event.date,
          venue: event.venue,
          shareableLink: event.shareableLink || canonical,
          time: event.time,
          category: event.category,
        }}
        contentType="event"
      />
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
      />
    </>
  );
};

export default EventDetail;
