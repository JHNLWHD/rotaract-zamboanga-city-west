import contentful from "./contentfulClient";
import type { EntrySkeletonType, EntryFieldTypes } from "contentful";

type LandingHeroSkeleton = EntrySkeletonType & {
	contentTypeId: "landingPageHeroSection";
	fields: { 
		heroHeading: EntryFieldTypes.Symbol;
		heroBox: EntryFieldTypes.Array<
			EntryFieldTypes.EntryLink<HeroBoxSkeleton> 
		>; 
	};
};

type HeroBoxSkeleton = EntrySkeletonType & {
	contentTypeId: "heroBox"; 
	fields: {
		number: EntryFieldTypes.Integer;
		description: EntryFieldTypes.Text;	
	}
}

export type HeroBox = {
	number: number; 
	description: string; 
}

export type LandingHeroFields = {
	heroHeading?: string;
	heroBox: HeroBox[];  
}; 


const DEFAULT_HERO_ENTRY_ID = "5O1VUbXjkEBa0NJTYlDqd7";

export async function fetchHeroContent(entryId?: string): Promise<LandingHeroFields | null> {
	try {
		console.log('🔍 Environment check:');
		console.log('- Space ID:', import.meta.env.VITE_CONTENTFUL_SPACE_ID ? 'Set' : 'Missing');
		console.log('- Access Token:', import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN ? 'Set' : 'Missing');
		console.log('- Environment:', import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master');
		
		console.log('🔍 Fetching hero content with entry ID:', entryId || DEFAULT_HERO_ENTRY_ID);
		
		const entry = await contentful.client.getEntry<LandingHeroSkeleton>(entryId || DEFAULT_HERO_ENTRY_ID);
		console.log('✅ Entry fetched:', entry);
		
		const f = entry.fields;
		console.log('📋 Entry fields:', f);
		console.log('📋 Available field keys:', Object.keys(f));
		console.log('📦 HeroBox field raw:', f.heroBox);

    	// Fetch heroBox entries
		const heroBox: HeroBox[] = await Promise.all(
			(f.heroBox || []).map(async (boxLink) => {
				console.log('🔗 Processing box link:', boxLink);
				const boxEntry = await contentful.client.getEntry<HeroBoxSkeleton>(boxLink.sys.id);
				console.log('📦 Box entry fetched:', boxEntry);
				return {
					number: boxEntry.fields.number,
					description: boxEntry.fields.description,
				};
			})
		);

		console.log('✅ Final heroBox array:', heroBox);

		const result = {
			heroHeading: f.heroHeading ?? "",
			heroBox, 
		};
		
		console.log('🎯 Final result:', result);
		return result;
	} catch (error) {
		console.error("❌ Error fetching landing page hero section:", error);
		console.error("❌ Error details:", error.message);
		return null;
	}
}