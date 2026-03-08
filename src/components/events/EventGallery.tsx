import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type Event } from '../../hooks/events/fetchEvents';

type EventGalleryProps = {
  event: Event;
  onImageClick: (index: number) => void;
};

const EventGallery: React.FC<EventGalleryProps> = ({ event, onImageClick }) => {
  if (!event.gallery || event.gallery.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Gallery</CardTitle>
        <p className="text-sm text-gray-600">
          Photos and highlights from this event
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {event.gallery.map((photo, index) => (
            <div
              key={photo.id}
              className="bg-gray-100 rounded-lg overflow-hidden"
            >
              <div className="aspect-square relative flex items-center justify-center">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => onImageClick(index)}
                  onError={e => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-gray-900">
                  {photo.caption}
                </p>
                <p className="text-xs text-gray-500 mt-1">{photo.category}</p>
              </div>
            </div>
          ))}
        </div>
        {event.gallery.length > 6 && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              {event.gallery.length} photos total • Click any photo to view full
              size
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventGallery;
