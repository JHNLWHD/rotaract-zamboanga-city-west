import React from 'react';
import { ArrowRight, ExternalLink, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { type Event } from '../../hooks/events/fetchEvents';
import { isPastEvent } from '../../utils/eventDate';
import { useRenderTime } from '../../hooks/useRenderTime';
import { responsiveImage } from '../../utils/contentful';

type EventCardProps = {
  event: Event;
  onShare: (event: Event) => void;
};

const EventCard: React.FC<EventCardProps> = ({ event, onShare }) => {
  const date = new Date(event.date);
  const detailPath = `/events/${event.date.split('T')[0]}/${event.slug}`;
  const isPast = isPastEvent(event, useRenderTime());
  const status = isPast
    ? 'past'
    : event.status === 'registration_open'
      ? 'registration open'
      : 'upcoming';

  return (
    <article
      className={`editorial-card grid gap-5 p-5 sm:p-6 md:grid-cols-[6rem_minmax(0,1fr)] lg:gap-8 lg:p-7 ${event.image ? 'lg:grid-cols-[6rem_minmax(0,1fr)_15rem]' : ''}`}
      role="listitem"
    >
      <time
        dateTime={event.date}
        className="flex w-fit items-baseline gap-2 self-start rounded-lg border border-cranberry-100 bg-cranberry-50 px-4 py-3 md:block md:w-full md:text-center"
      >
        <span className="block text-xs font-bold uppercase tracking-[0.14em] text-cranberry-700">
          {date.toLocaleDateString('en-US', {
            month: 'short',
            timeZone: 'Asia/Manila',
          })}
        </span>
        <span className="mt-1 block font-display text-4xl font-semibold leading-none text-slate-950">
          {date.toLocaleDateString('en-US', {
            day: '2-digit',
            timeZone: 'Asia/Manila',
          })}
        </span>
        <span className="mt-1 block text-sm text-slate-500">
          {date.toLocaleDateString('en-US', {
            year: 'numeric',
            timeZone: 'Asia/Manila',
          })}
        </span>
      </time>

      <div>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
          {event.category}
          {` · ${status}`}
        </p>
        <h3 className="mt-2 text-2xl font-semibold leading-tight text-slate-950 sm:text-3xl">
          <Link to={detailPath} className="hover:text-cranberry-700">
            {event.title}
          </Link>
        </h3>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-600">
          {event.time && <span>{event.time}</span>}
          {event.venue && <span>{event.venue}</span>}
        </div>
        {event.description && (
          <div className="mt-4 text-sm leading-6 text-slate-600">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="line-clamp-3">{children}</p>,
              }}
            >
              {event.description}
            </ReactMarkdown>
          </div>
        )}
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link to={detailPath} className="editorial-link">
            View event record
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          {!isPast && event.registrationUrl && (
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-link"
            >
              Registration
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
          <button
            type="button"
            onClick={() => onShare(event)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900"
          >
            <Share2 className="h-4 w-4" aria-hidden="true" />
            Share
          </button>
        </div>
      </div>

      {event.image && (
        <Link
          to={detailPath}
          className="md:col-start-2 lg:col-start-3 lg:row-start-1"
        >
          <img
            {...responsiveImage(
              event.image,
              '(min-width: 1024px) 240px, (min-width: 768px) calc(100vw - 224px), calc(100vw - 40px)'
            )}
            alt={`${event.title} event record`}
            className="aspect-[4/3] w-full rounded-lg border border-slate-100 bg-[#f4f1ec] object-contain"
            loading="lazy"
          />
        </Link>
      )}
    </article>
  );
};

export default EventCard;
