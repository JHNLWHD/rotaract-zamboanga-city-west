type EventDate = { date: string; time: string };

// Contentful stores a calendar date and a separate local-time label.
export function eventStartDate(event: EventDate): string {
  const day = event.date.slice(0, 10);
  const clock = event.time
    .trim()
    .match(/^(\d{1,2})(?::([0-5]\d))?\s*(AM|PM)\b/i);
  if (!clock) {
    const clock24 = event.time
      .trim()
      .match(/^([01]?\d|2[0-3]):([0-5]\d)(?=\s|$)/);
    return clock24
      ? `${day}T${clock24[1].padStart(2, '0')}:${clock24[2]}:00+08:00`
      : day;
  }
  const hour = Number(clock[1]);
  if (hour < 1 || hour > 12) return day;
  const hours = (hour % 12) + (clock[3].toUpperCase() === 'PM' ? 12 : 0);
  return `${day}T${String(hours).padStart(2, '0')}:${clock[2] || '00'}:00+08:00`;
}

export function isPastEvent(event: EventDate, now = Date.now()): boolean {
  const start = eventStartDate(event);
  if (start.length > 10) return new Date(start).getTime() < now;
  // An unknown start time must not turn today's activity into a past event.
  const today = new Date(now + 8 * 60 * 60 * 1000).toISOString().slice(0, 10);
  return start < today;
}
