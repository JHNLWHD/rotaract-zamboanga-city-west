import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { type Event } from '../../hooks/events/fetchEvents';

type EventContentProps = {
  event: Event;
};

const EventContent: React.FC<EventContentProps> = ({ event }) => {
  return (
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>About This Event</CardTitle>
            </CardHeader>
            <CardContent>
              {event.description ? (
                <div className="text-gray-700 leading-relaxed prose prose-slate max-w-none prose-p:text-gray-700 prose-p:text-lg prose-p:leading-relaxed prose-strong:text-gray-900 prose-strong:font-semibold prose-ul:my-2 prose-li:my-1 mb-8">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      a: ({ node, ...props }) => (
                        <a
                          {...props}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cranberry-600 hover:text-cranberry-700 underline inline-flex items-center gap-1"
                        >
                          {props.children}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ),
                    }}
                  >
                    {event.description}
                  </ReactMarkdown>
                </div>
              ) : null}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Event Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {event.highlights?.map((highlight, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-cranberry-500 rounded-full mr-3"></div>
                    <span className="text-gray-600">{highlight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {event.agenda && (
            <Card>
              <CardHeader>
                <CardTitle>Event Agenda</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {event.agenda.map((item, index) => {
                    const parts = item.split(' - ');
                    let timeRange = '';
                    let description = '';

                    // Check if the first part contains a time range (e.g., "4:00 - 5:00 PM")
                    if (
                      parts[0].includes(':') &&
                      parts[1] &&
                      parts[1].includes(':') &&
                      (parts[1].includes('PM') || parts[1].includes('AM'))
                    ) {
                      // Format: "4:00 - 5:00 PM - Description"
                      timeRange = `${parts[0]} - ${parts[1]}`;
                      description = parts.slice(2).join(' - ');
                    } else if (parts[0].includes(':')) {
                      // Format: "5:15 PM - Description"
                      timeRange = parts[0];
                      description = parts.slice(1).join(' - ');
                    } else {
                      // Fallback
                      timeRange = parts[0];
                      description = parts.slice(1).join(' - ');
                    }

                    return (
                      <div
                        key={index}
                        className="flex items-center p-3 bg-cranberry-50 rounded-lg border border-cranberry-100"
                      >
                        <div className="bg-white text-cranberry-600 px-2 py-1 rounded text-sm font-semibold mr-3 min-w-fit border border-cranberry-200">
                          {timeRange}
                        </div>
                        <div className="text-gray-700 text-sm leading-relaxed">
                          {description}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

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
        </div>

        <div className="space-y-6">
          {event.status !== 'past' && event.registrationUrl && (
            <Card className="bg-cranberry-50 border-cranberry-200">
              <CardHeader>
                <CardTitle className="text-cranberry-700">
                  Ready to Join?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-cranberry-600 mb-4 text-sm">
                  Register now to secure your spot at this event.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventContent;
