import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageHeader from '../components/layout/PageHeader';
import ShareModal from '../components/ShareModal';
import EventsGrid from '../components/events/EventsGrid';
import LoadingState from '../components/events/LoadingState';
import ErrorState from '../components/events/ErrorState';
import { fetchEvents, type Event } from '../hooks/events/fetchEvents';
import { cacheConfig } from '../config/cache';

const Events = () => {
  const [currentShareEvent, setCurrentShareEvent] = useState<Event | null>(
    null
  );
  const {
    data: events,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['events'],
    queryFn: () => fetchEvents(),
    ...cacheConfig.monthly,
  });

  const now = Date.now();
  const upcomingEvents =
    events?.filter(event => new Date(event.date).getTime() >= now) || [];
  const pastEvents =
    events?.filter(event => new Date(event.date).getTime() < now) || [];
  const description =
    'A chronological record of meetings, service activities, trainings, and fellowship events published by the Rotaract Club of Zamboanga City West.';

  return (
    <>
      <Helmet>
        <title>Events | Rotaract Club of Zamboanga City West</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://rotaract.rotaryzcwest.org/events"
        />
        <meta
          property="og:title"
          content="Events | Rotaract Club of Zamboanga City West"
        />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content="https://rotaract.rotaryzcwest.org/og-image.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Events | Rotaract Club of Zamboanga City West"
        />
        <meta name="twitter:description" content={description} />
        <link rel="canonical" href="https://rotaract.rotaryzcwest.org/events" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Events of the Rotaract Club of Zamboanga City West',
            description,
            url: 'https://rotaract.rotaryzcwest.org/events',
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: events?.length || 0,
              itemListElement: (events || []).map((event, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: event.title,
                url: `https://rotaract.rotaryzcwest.org/events/${event.date.split('T')[0]}/${event.slug}`,
              })),
            },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-[#faf9f7]">
        <Navbar />
        <main id="main-content">
          <PageHeader
            eyebrow="Activity record"
            title="Events and club activities"
            description="A date-led archive of upcoming and completed club activity, using the details and images published by the club."
            asOf={
              events ? `${events.length} published event records` : undefined
            }
          />

          <div className="editorial-shell py-10 md:py-14">
            {isLoading && <LoadingState />}

            {isError && (
              <ErrorState
                error={error}
                onRetry={() => refetch()}
                isRetrying={isFetching}
              />
            )}

            {!isLoading && !isError && (
              <div className="space-y-14">
                <section aria-labelledby="upcoming-events-heading">
                  <div className="mb-5 flex items-end justify-between gap-5">
                    <div>
                      <p className="editorial-kicker">Next</p>
                      <h2
                        id="upcoming-events-heading"
                        className="mt-2 text-3xl font-semibold text-slate-950"
                      >
                        Upcoming events
                      </h2>
                    </div>
                    <p className="text-sm text-slate-500">
                      {upcomingEvents.length}{' '}
                      {upcomingEvents.length === 1 ? 'event' : 'events'}
                    </p>
                  </div>
                  {upcomingEvents.length > 0 ? (
                    <EventsGrid
                      events={upcomingEvents}
                      onShareEvent={setCurrentShareEvent}
                    />
                  ) : (
                    <p className="border-y border-slate-300 py-7 text-sm text-slate-600">
                      No upcoming event has been published. The completed
                      activity archive remains available below.
                    </p>
                  )}
                </section>

                {pastEvents.length > 0 && (
                  <section aria-labelledby="past-events-heading">
                    <div className="mb-5 flex items-end justify-between gap-5">
                      <div>
                        <p className="editorial-kicker">Archive</p>
                        <h2
                          id="past-events-heading"
                          className="mt-2 text-3xl font-semibold text-slate-950"
                        >
                          Completed activities
                        </h2>
                      </div>
                      <p className="text-sm text-slate-500">
                        {pastEvents.length}{' '}
                        {pastEvents.length === 1 ? 'record' : 'records'}
                      </p>
                    </div>
                    <EventsGrid
                      events={pastEvents}
                      onShareEvent={setCurrentShareEvent}
                    />
                  </section>
                )}

                {!events?.length && (
                  <p className="border-y border-slate-300 py-8 text-sm text-slate-600">
                    No event records have been published yet.
                  </p>
                )}
              </div>
            )}
          </div>
        </main>
        <Footer />
        <ShareModal
          isOpen={Boolean(currentShareEvent)}
          onClose={() => setCurrentShareEvent(null)}
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
