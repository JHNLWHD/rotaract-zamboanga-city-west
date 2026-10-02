// JSON embedded in HTML must not be able to close its script element.
export const serializeJson = (value: unknown): string =>
  JSON.stringify(value).replace(/</g, '\\u003c');
