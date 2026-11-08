import { beforeEach, describe, expect, it, vi } from 'vitest';

const client = vi.hoisted(() => ({ getEntries: vi.fn() }));
vi.mock('../contentfulClient', () => ({ default: { client } }));

import { fetchFoundationGiving } from './fetchFoundationGiving';

describe('foundation giving Contentful fetcher', () => {
  beforeEach(() => client.getEntries.mockReset());

  it('returns null when no report is published', async () => {
    client.getEntries.mockResolvedValue({ items: [] });

    await expect(fetchFoundationGiving()).resolves.toBeNull();
  });

  it('maps the report and linked rows', async () => {
    client.getEntries.mockResolvedValue({
      items: [
        {
          fields: {
            reportTitle: 'Five-year giving',
            subtitle: 'Official club record',
            currencyLabel: 'USD',
            asOfDate: '2026-04-10',
            rows: [
              {
                fields: {
                  rotaryYearLabel: 'RY 2025-2026',
                  sortOrder: 5,
                  annualFund: 0,
                  polioPlusFund: 100,
                  otherFund: 725,
                  endowmentFund: 0,
                  totalFund: 825,
                },
              },
            ],
            faqAnnualFund: 'Annual Fund details',
            faqPolioPlus: 'PolioPlus details',
            faqOther: 'Other Fund details',
            faqEndowment: 'Endowment details',
          },
        },
      ],
    });

    const result = await fetchFoundationGiving();

    expect(client.getEntries).toHaveBeenCalledWith({
      content_type: 'foundationGivingReport',
      limit: 1,
      include: 2,
    });
    expect(result).toEqual({
      reportTitle: 'Five-year giving',
      subtitle: 'Official club record',
      currencyLabel: 'USD',
      asOfDate: '2026-04-10',
      rows: [
        expect.objectContaining({
          rotaryYearLabel: 'RY 2025-2026',
          totalFund: 825,
        }),
      ],
      faq: {
        annualFund: 'Annual Fund details',
        polioPlus: 'PolioPlus details',
        other: 'Other Fund details',
        endowment: 'Endowment details',
      },
    });
  });

  it('uses safe report defaults', async () => {
    client.getEntries.mockResolvedValue({
      items: [{ fields: { rows: [], currencyLabel: undefined } }],
    });

    await expect(fetchFoundationGiving()).resolves.toEqual({
      reportTitle: '',
      subtitle: '',
      currencyLabel: 'USD',
      asOfDate: '',
      rows: [],
      faq: { annualFund: '', polioPlus: '', other: '', endowment: '' },
    });
  });
});
