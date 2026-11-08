import { describe, expect, it, vi } from 'vitest';
import { eventStartDate, isPastEvent } from './eventDate';

describe('published event time', () => {
  it.each([
    ['6:00 PM', '18:00'],
    ['12 PM', '12:00'],
    ['12:30 AM', '00:30'],
    ['8:00 AM - 6:00 PM', '08:00'],
    [' 9 am ', '09:00'],
    ['18:00', '18:00'],
    ['00:30', '00:30'],
    ['9:15 - 18:00', '09:15'],
  ])('uses the local start time in %s', (time, expected) => {
    expect(eventStartDate({ date: '2026-08-01T00:00+08:00', time })).toBe(
      `2026-08-01T${expected}:00+08:00`
    );
  });

  it.each(['', 'To be announced', '00 AM', '13 PM', '24:00'])(
    'does not invent a start time for %s',
    time => {
      expect(eventStartDate({ date: '2026-08-01T00:00+08:00', time })).toBe(
        '2026-08-01'
      );
    }
  );

  it('does not mark an evening event past at midnight or before its start', () => {
    const event = { date: '2026-08-01', time: '6:00 PM' };
    expect(isPastEvent(event, Date.parse('2026-08-01T09:00:00+08:00'))).toBe(
      false
    );
    expect(isPastEvent(event, Date.parse('2026-08-01T18:00:00+08:00'))).toBe(
      false
    );
    vi.spyOn(Date, 'now').mockReturnValue(
      Date.parse('2026-08-01T18:01:00+08:00')
    );
    expect(isPastEvent(event)).toBe(true);
  });

  it('keeps a date-only event current through the whole Philippine day', () => {
    const event = { date: '2026-08-01', time: '' };
    expect(isPastEvent(event, Date.parse('2026-08-01T23:59:00+08:00'))).toBe(
      false
    );
    expect(isPastEvent(event, Date.parse('2026-08-02T00:00:00+08:00'))).toBe(
      true
    );
  });
});
