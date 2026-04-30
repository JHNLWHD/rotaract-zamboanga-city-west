import contentful from '../contentfulClient';
import type { EntrySkeletonType, EntryFieldTypes } from 'contentful';
import { processAsset } from '../../utils/contentful';
import { richTextToMarkdown, type RichText } from '../../utils/richText';

type ProjectSkeleton = EntrySkeletonType & {
  contentTypeId: 'project';
  fields: {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    shortDescription: EntryFieldTypes.Text;
    description: EntryFieldTypes.RichText;
    date: EntryFieldTypes.Date;
    venue: EntryFieldTypes.Symbol;
    impact: EntryFieldTypes.Text;
    partners?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    facebookLink?: EntryFieldTypes.Symbol;
    shareableLink: EntryFieldTypes.Symbol;
    featuredImage: EntryFieldTypes.AssetLink;
    category: EntryFieldTypes.Symbol;
    hashtags?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    highlights?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    gallery?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    bulletPoints?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    partnerLinks?: EntryFieldTypes.Object;
  };
};

export type ProjectPartnerLinks =
  | Record<string, string>
  | Array<{
      name: string;
      url?: string;
    }>;

export type Project = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  date: string;
  venue: string;
  impact: string;
  partners: string[];
  facebookLink?: string;
  shareableLink: string;
  image: string;
  category: string;
  hashtags: string[];
  highlights: string[];
  gallery: Array<{
    id: string;
    url: string;
    caption: string;
    category: string;
  }>;
  bulletPoints: string[];
  partnerLinks?: ProjectPartnerLinks;
};

export async function fetchProjects(
  limit?: number,
  category?: string
): Promise<Project[] | null> {
  try {
    const query: Record<string, string | number> = {
      content_type: 'project',
      order: '-fields.date',
    };

    if (limit) {
      query.limit = limit;
    }

    if (category) {
      query['fields.category'] = category;
    }

    const entries = await contentful.client.getEntries<ProjectSkeleton>(query);

    const projects: Project[] = await Promise.all(
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
              `Could not fetch featured image for project ${fields.title}:`,
              error
            );
          }
        }

        // Process gallery
        const gallery: Project['gallery'] = [];
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
                `Could not fetch gallery image for project ${fields.title}:`,
                error
              );
            }
          }
        }

        // Process partner links
        let partnerLinks: ProjectPartnerLinks | undefined;
        if (
          fields.partnerLinks &&
          typeof fields.partnerLinks === 'object' &&
          'en-US' in fields.partnerLinks
        ) {
          partnerLinks = fields.partnerLinks[
            'en-US'
          ] as unknown as ProjectPartnerLinks;
        }

        return {
          id: entry.sys.id,
          title: fields.title || '',
          slug: fields.slug || '',
          shortDescription: fields.shortDescription || '',
          description: richTextToMarkdown(
            fields.description as unknown as RichText
          ),
          date: fields.date || '',
          venue: fields.venue || '',
          impact: fields.impact || '',
          partners: fields.partners || [],
          facebookLink: fields.facebookLink,
          shareableLink: fields.shareableLink || '',
          image: featuredImageUrl,
          category: fields.category || '',
          hashtags: fields.hashtags || [],
          highlights: fields.highlights || [],
          gallery,
          bulletPoints: fields.bulletPoints || [],
          partnerLinks,
        };
      })
    );

    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return null;
  }
}

export async function fetchProjectBySlug(
  slug: string
): Promise<Project | null> {
  try {
    const entries = await contentful.client.getEntries<ProjectSkeleton>({
      content_type: 'project',
      'fields.slug': slug,
      limit: 1,
    });

    if (entries.items.length === 0) {
      return null;
    }

    const projects = await fetchProjects();
    if (!projects) return null;

    return projects.find(project => project.slug === slug) || null;
  } catch (error) {
    console.error('Error fetching project by slug:', error);
    return null;
  }
}
