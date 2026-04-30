import contentful from '../contentfulClient';
import type { EntrySkeletonType, EntryFieldTypes } from 'contentful';
import { processAsset } from '../../utils/contentful';
import { richTextToMarkdown, type RichText } from '../../utils/richText';

type EventSkeleton = EntrySkeletonType & {
  contentTypeId: 'event';
  fields: {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.RichText;
    date: EntryFieldTypes.Date;
    time: EntryFieldTypes.Symbol;
    venue: EntryFieldTypes.Symbol;
    category: EntryFieldTypes.Symbol;
    status: EntryFieldTypes.Symbol;
    registrationUrl?: EntryFieldTypes.Symbol;
    shareableLink: EntryFieldTypes.Symbol;
    featuredImage: EntryFieldTypes.AssetLink;
    invitationImage?: EntryFieldTypes.AssetLink;
    highlights?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    agenda?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    requirements?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    gallery?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  };
};

export type Event = {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  status: 'upcoming' | 'registration_open' | 'past';
  registrationUrl?: string;
  shareableLink: string;
  image: string;
  invitationImage?: string;
  highlights: string[];
  agenda: string[];
  requirements: string[];
  gallery: Array<{
    id: string;
    url: string;
    caption: string;
    category: string;
  }>;
};

export async function fetchEvents(
  limit?: number,
  status?: 'upcoming' | 'registration_open' | 'past'
): Promise<Event[] | null> {
  try {
    const query: Record<string, string | number> = {
      content_type: 'event',
      order: '-fields.date',
    };

    if (limit) {
      query.limit = limit;
    }

    if (status) {
      query['fields.status'] = status;
    }

    const entries = await contentful.client.getEntries<EventSkeleton>(query);

    const events: Event[] = await Promise.all(
      entries.items.map(async entry => {
        const fields = entry.fields;

        // Process featured image
        let featuredImageUrl = '';
        if (fields.featuredImage) {
          try {
            const asset = await contentful.client.getAsset(
              fields.featuredImage.sys.id
            );
            featuredImageUrl = processAsset(asset);
          } catch (error) {
            console.warn(
              `Could not fetch featured image for event ${fields.title}:`,
              error
            );
          }
        }

        // Process invitation image
        let invitationImageUrl = '';
        if (fields.invitationImage) {
          try {
            const asset = await contentful.client.getAsset(
              fields.invitationImage.sys.id
            );
            invitationImageUrl = processAsset(asset);
          } catch (error) {
            console.warn(
              `Could not fetch invitation image for event ${fields.title}:`,
              error
            );
          }
        }

        // Process gallery
        const gallery: Event['gallery'] = [];
        if (fields.gallery && fields.gallery.length > 0) {
          for (const galleryLink of fields.gallery) {
            try {
              const asset = await contentful.client.getAsset(
                galleryLink.sys.id
              );
              const url = processAsset(asset);
              if (url) {
                gallery.push({
                  id: asset.sys.id,
                  url,
                  caption: asset.fields.description || asset.fields.title || '',
                  category: fields.category || 'General',
                });
              }
            } catch (error) {
              console.warn(
                `Could not fetch gallery image for event ${fields.title}:`,
                error
              );
            }
          }
        }

        return {
          id: entry.sys.id,
          title: fields.title || '',
          slug: fields.slug || '',
          description: richTextToMarkdown(fields.description as unknown as RichText),
          date: fields.date || '',
          time: fields.time || '',
          venue: fields.venue || '',
          category: fields.category || '',
          status: (fields.status as Event['status']) || 'upcoming',
          registrationUrl: fields.registrationUrl,
          shareableLink: fields.shareableLink || '',
          image: featuredImageUrl,
          invitationImage: invitationImageUrl || undefined,
          highlights: fields.highlights || [],
          agenda: fields.agenda || [],
          requirements: fields.requirements || [],
          gallery,
        };
      })
    );

    // Sort events: upcoming first, then past events
    const sortedEvents = events.sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      const now = new Date();

      // Separate upcoming and past events
      const aIsUpcoming = aDate >= now;
      const bIsUpcoming = bDate >= now;

      if (aIsUpcoming && !bIsUpcoming) return -1;
      if (!aIsUpcoming && bIsUpcoming) return 1;

      // Within the same category (upcoming or past), sort by date
      if (aIsUpcoming && bIsUpcoming) {
        return aDate.getTime() - bDate.getTime(); // Upcoming: earliest first
      } else {
        return bDate.getTime() - aDate.getTime(); // Past: most recent first
      }
    });

    return sortedEvents;
  } catch (error) {
    console.error('Error fetching events:', error);
    return null;
  }
}

export async function fetchEventBySlug(slug: string): Promise<Event | null> {
  try {
    const entries = await contentful.client.getEntries<EventSkeleton>({
      content_type: 'event',
      'fields.slug': slug,
      limit: 1,
    });

    if (entries.items.length === 0) {
      return null;
    }

    const entry = entries.items[0];
    const fields = entry.fields;

    // Process featured image
    let featuredImageUrl = '';
    if (fields.featuredImage) {
      try {
        const asset = await contentful.client.getAsset(
          fields.featuredImage.sys.id
        );
        featuredImageUrl = processAsset(asset);
      } catch (error) {
        console.warn(
          `Could not fetch featured image for event ${fields.title}:`,
          error
        );
      }
    }

    // Process invitation image
    let invitationImageUrl = '';
    if (fields.invitationImage) {
      try {
        const asset = await contentful.client.getAsset(
          fields.invitationImage.sys.id
        );
        invitationImageUrl = processAsset(asset);
      } catch (error) {
        console.warn(
          `Could not fetch invitation image for event ${fields.title}:`,
          error
        );
      }
    }

    // Process gallery
    const gallery: Event['gallery'] = [];
    if (fields.gallery && fields.gallery.length > 0) {
      for (const galleryLink of fields.gallery) {
        try {
          const asset = await contentful.client.getAsset(galleryLink.sys.id);
          const url = processAsset(asset);
          if (url) {
            gallery.push({
              id: asset.sys.id,
              url,
              caption: asset.fields.description || asset.fields.title || '',
              category: fields.category || 'General',
            });
          }
        } catch (error) {
          console.warn(
            `Could not fetch gallery image for event ${fields.title}:`,
            error
          );
        }
      }
    }

    return {
      id: entry.sys.id,
      title: fields.title || '',
      slug: fields.slug || '',
      description: richTextToMarkdown(fields.description as unknown as RichText),
      date: fields.date || '',
      time: fields.time || '',
      venue: fields.venue || '',
      category: fields.category || '',
      status: (fields.status as Event['status']) || 'upcoming',
      registrationUrl: fields.registrationUrl,
      shareableLink: fields.shareableLink || '',
      image: featuredImageUrl,
      invitationImage: invitationImageUrl || undefined,
      highlights: fields.highlights || [],
      agenda: fields.agenda || [],
      requirements: fields.requirements || [],
      gallery,
    };
  } catch (error) {
    console.error('Error fetching event by slug:', error);
    return null;
  }
}

export async function fetchUpcomingEvents(
  limit: number = 5
): Promise<Event[] | null> {
  return fetchEvents(limit, 'upcoming');
}

export async function fetchPastEvents(limit?: number): Promise<Event[] | null> {
  return fetchEvents(limit, 'past');
}
