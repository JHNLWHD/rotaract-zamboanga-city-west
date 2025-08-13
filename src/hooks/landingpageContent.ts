import contentful from "./contentfulClient";
import type { EntrySkeletonType, EntryFieldTypes } from "contentful";

type LandingHeroSkeleton = EntrySkeletonType & {
	contentTypeId: "landingPageHero";
	fields: {
		heroButtonSlogan: EntryFieldTypes.Symbol;
		heroButtonMotto: EntryFieldTypes.Symbol;
		heroTitle: EntryFieldTypes.Symbol;
		heroTitleTwo: EntryFieldTypes.Symbol;
		heroShortDes: EntryFieldTypes.Text;

		heroButtonOne: EntryFieldTypes.Symbol;
		heroButtonTwo: EntryFieldTypes.Symbol;

		heroDivDesOne: EntryFieldTypes.Symbol;
		heroDivDescTwo: EntryFieldTypes.Symbol;
		heroDivDesThree: EntryFieldTypes.Symbol;

		heroDivNumberOne: EntryFieldTypes.Symbol;
		heroDivNumberTwo: EntryFieldTypes.Symbol;
		heroDivNumberThree: EntryFieldTypes.Symbol;

		wordHighLightOne: EntryFieldTypes.Symbol;
		wordHighlightTwo: EntryFieldTypes.Symbol;
		wordHighlightThree: EntryFieldTypes.Symbol;

		wordFillersOne: EntryFieldTypes.Symbol;
		wordFillersTwo: EntryFieldTypes.Symbol;
	};
};

export type LandingHeroFields = {
	heroButtonSlogan?: string;
	heroButtonMotto?: string;
	heroTitle?: string;
	heroTitleTwo?: string;
	heroShortDes?: string;

	heroButtonOne?: string;
	heroButtonTwo?: string;

	heroDivDesOne?: string;
	heroDivDescTwo?: string;
	heroDivDesThree?: string;

	heroDivNumberOne?: string;
	heroDivNumberTwo?: string;
	heroDivNumberThree?: string;

	wordHighLightOne?: string;
	wordHighlightTwo?: string;
	wordHighlightThree?: string;

	wordFillersOne?: string;
	wordFillersTwo?: string;
};

const DEFAULT_HERO_ENTRY_ID = "5O1VUbXjkEBa0NJTYlDqd7";

export async function fetchHeroContent(entryId?: string): Promise<LandingHeroFields | null> {
	try {
		const entry = await contentful.client.getEntry<LandingHeroSkeleton>(entryId || DEFAULT_HERO_ENTRY_ID);
		const f = entry.fields;
		return {
			heroButtonSlogan: f.heroButtonSlogan ?? "",
			heroButtonMotto: f.heroButtonMotto ?? "",
			heroTitle: f.heroTitle ?? "",
			heroTitleTwo: f.heroTitleTwo ?? "",
			heroShortDes: f.heroShortDes ?? "",

			heroButtonOne: f.heroButtonOne ?? "",
			heroButtonTwo: f.heroButtonTwo ?? "",

			heroDivDesOne: f.heroDivDesOne ?? "",
			heroDivDescTwo: f.heroDivDescTwo ?? "",
			heroDivDesThree: f.heroDivDesThree ?? "",

			heroDivNumberOne: f.heroDivNumberOne ?? "",
			heroDivNumberTwo: f.heroDivNumberTwo ?? "",
			heroDivNumberThree: f.heroDivNumberThree ?? "",

			wordHighLightOne: f.wordHighLightOne ?? "",
			wordHighlightTwo: f.wordHighlightTwo ?? "",
			wordHighlightThree: f.wordHighlightThree ?? "",

			wordFillersOne: f.wordFillersOne ?? "",
			wordFillersTwo: f.wordFillersTwo ?? "",
		};
	} catch (error) {
		console.error("Error fetching landing page hero section:", error);
		return null;
	}
}