// JSON embedded in HTML must not be able to close its script element.
export const serializeJson = (value: unknown): string =>
  JSON.stringify(value).replace(/</g, '\\u003c');

export const editorialImage = (
  page:
    | 'home'
    | 'projects'
    | 'events'
    | 'officers'
    | 'recognition'
    | 'foundation-giving'
): string =>
  new URL(
    `/og/${page}-editorial-v1.png`,
    import.meta.env.VITE_OG_IMAGE_ORIGIN || 'https://rotaract.rotaryzcwest.org'
  ).href;
