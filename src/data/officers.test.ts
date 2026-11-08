import { describe, expect, it } from 'vitest';
import {
  getAdvisors,
  getCurrentDirectors,
  getCurrentTerm,
  getExecutiveBoard,
} from './officers';

describe('legacy officer data helpers', () => {
  it('keeps category helpers and the CMS query term consistent', () => {
    expect(
      getExecutiveBoard().every(officer => officer.category === 'Executive')
    ).toBe(true);
    expect(
      getCurrentDirectors().every(officer => officer.category === 'Director')
    ).toBe(true);
    expect(getAdvisors().every(officer => officer.category === 'Advisor')).toBe(
      true
    );
    expect(getCurrentTerm()).toBe('2026-2027');
  });
});
