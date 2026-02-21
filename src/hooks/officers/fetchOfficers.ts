import contentful from '../contentfulClient';
import type { EntrySkeletonType, EntryFieldTypes } from 'contentful';
import { processAsset } from '../../utils/contentful';

type OfficerSkeleton = EntrySkeletonType & {
  contentTypeId: 'officer';
  fields: {
    name: EntryFieldTypes.Symbol;
    position: EntryFieldTypes.Symbol;
    term: EntryFieldTypes.Symbol;
    responsibilities: EntryFieldTypes.Text;
    category: EntryFieldTypes.Symbol;
    email?: EntryFieldTypes.Symbol;
    phone?: EntryFieldTypes.Symbol;
    profileImage?: EntryFieldTypes.AssetLink;
    socialMediaLinks?: EntryFieldTypes.Object;
    displayOrder: EntryFieldTypes.Integer;
  };
};

type PastPresidentSkeleton = EntrySkeletonType & {
  contentTypeId: 'pastPresident';
  fields: {
    term: EntryFieldTypes.Symbol;
    name: EntryFieldTypes.Symbol;
    status?: EntryFieldTypes.Symbol;
    displayOrder: EntryFieldTypes.Integer;
  };
};

export type Officer = {
  id: string;
  name: string;
  position: string;
  term: string;
  responsibilities: string;
  category: 'Executive' | 'Director' | 'Advisor';
  email?: string;
  phone?: string;
  profileImage?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  displayOrder: number;
};

export type PastPresident = {
  id: string;
  term: string;
  name: string;
  status?: 'current' | 'president_elect' | 'future';
  displayOrder: number;
};

export async function fetchOfficers(
  term?: string,
  category?: 'Executive' | 'Director' | 'Advisor'
): Promise<Officer[] | null> {
  try {
    const query: Record<string, string | number> = {
      content_type: 'officer',
      order: 'fields.displayOrder',
    };

    if (term) {
      query['fields.term'] = term;
    }

    if (category) {
      query['fields.category'] = category;
    }

    const entries = await contentful.client.getEntries<OfficerSkeleton>(query);

    const officers: Officer[] = await Promise.all(
      entries.items.map(async entry => {
        const fields = entry.fields;

        // Process profile image
        let profileImageUrl = '';
        if (fields.profileImage) {
          try {
            const asset = await contentful.client.getAsset(
              fields.profileImage.sys.id
            );
            profileImageUrl = processAsset(asset);
          } catch (error) {
            console.warn(
              `Could not fetch profile image for officer ${fields.name}:`,
              error
            );
          }
        }

        // Process social media links
        let socialMedia: Officer['socialMedia'] = undefined;
        if (
          fields.socialMediaLinks &&
          typeof fields.socialMediaLinks === 'object'
        ) {
          try {
            socialMedia = fields.socialMediaLinks as Officer['socialMedia'];
          } catch (error) {
            console.warn(
              `Could not process social media links for officer ${fields.name}:`,
              error
            );
          }
        }

        return {
          id: entry.sys.id,
          name: fields.name || '',
          position: fields.position || '',
          term: fields.term || '',
          responsibilities: fields.responsibilities || '',
          category: (fields.category as Officer['category']) || 'Director',
          email: fields.email,
          phone: fields.phone,
          profileImage: profileImageUrl || undefined,
          socialMedia,
          displayOrder: fields.displayOrder || 0,
        };
      })
    );

    return officers;
  } catch (error) {
    console.error('Error fetching officers:', error);
    return null;
  }
}

export async function fetchPastPresidents(): Promise<PastPresident[] | null> {
  try {
    const entries = await contentful.client.getEntries<PastPresidentSkeleton>({
      content_type: 'pastPresident',
      order: 'fields.displayOrder',
    });

    const pastPresidents: PastPresident[] = entries.items.map(entry => {
      const fields = entry.fields;

      return {
        id: entry.sys.id,
        term: fields.term || '',
        name: fields.name || '',
        status: (fields.status as PastPresident['status']) || undefined,
        displayOrder: fields.displayOrder || 0,
      };
    });

    return pastPresidents;
  } catch (error) {
    console.error('Error fetching past presidents:', error);
    return null;
  }
}

// Helper functions for specific officer categories
export async function fetchExecutiveBoard(
  term?: string
): Promise<Officer[] | null> {
  return fetchOfficers(term, 'Executive');
}

export async function fetchDirectors(term?: string): Promise<Officer[] | null> {
  return fetchOfficers(term, 'Director');
}

export async function fetchAdvisors(term?: string): Promise<Officer[] | null> {
  return fetchOfficers(term, 'Advisor');
}

export async function fetchCurrentOfficers(): Promise<Officer[] | null> {
  return fetchOfficers('2025-2026');
}

export async function fetchAllOfficers(term?: string): Promise<{
  executive: Officer[];
  directors: Officer[];
  advisors: Officer[];
} | null> {
  try {
    const [executive, directors, advisors] = await Promise.all([
      fetchExecutiveBoard(term),
      fetchDirectors(term),
      fetchAdvisors(term),
    ]);

    if (!executive || !directors || !advisors) {
      return null;
    }

    return {
      executive,
      directors,
      advisors,
    };
  } catch (error) {
    console.error('Error fetching all officers:', error);
    return null;
  }
}
