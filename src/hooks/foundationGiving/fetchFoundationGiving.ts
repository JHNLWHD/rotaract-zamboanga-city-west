import contentful from '../contentfulClient';
import type { Entry, EntrySkeletonType, EntryFieldTypes, UnresolvedLink } from 'contentful';

type RowSkeleton = EntrySkeletonType & {
  contentTypeId: 'foundationGivingRow';
  fields: {
    rotaryYearLabel: EntryFieldTypes.Symbol;
    sortOrder: EntryFieldTypes.Integer;
    annualFund: EntryFieldTypes.Number;
    polioPlusFund: EntryFieldTypes.Number;
    otherFund: EntryFieldTypes.Number;
    endowmentFund: EntryFieldTypes.Number;
    totalFund: EntryFieldTypes.Number;
  };
};

type ReportSkeleton = EntrySkeletonType & {
  contentTypeId: 'foundationGivingReport';
  fields: {
    reportTitle: EntryFieldTypes.Symbol;
    subtitle: EntryFieldTypes.Symbol;
    currencyLabel: EntryFieldTypes.Symbol;
    asOfDate: EntryFieldTypes.Date;
    rows: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<RowSkeleton>>;
    faqAnnualFund: EntryFieldTypes.Text;
    faqPolioPlus: EntryFieldTypes.Text;
    faqOther: EntryFieldTypes.Text;
    faqEndowment: EntryFieldTypes.Text;
  };
};

export type FoundationGivingRow = {
  rotaryYearLabel: string;
  sortOrder: number;
  annualFund: number;
  polioPlusFund: number;
  otherFund: number;
  endowmentFund: number;
  totalFund: number;
};

export type FoundationGivingData = {
  reportTitle: string;
  subtitle: string;
  currencyLabel: string;
  asOfDate: string;
  rows: FoundationGivingRow[];
  faq: {
    annualFund: string;
    polioPlus: string;
    other: string;
    endowment: string;
  };
};

export async function fetchFoundationGiving(): Promise<FoundationGivingData | null> {
  const response = await contentful.client.getEntries<ReportSkeleton>({
    content_type: 'foundationGivingReport',
    limit: 1,
    include: 2,
  });

  if (!response.items.length) return null;

  const report = response.items[0];
  const f = report.fields;

  const rows = f.rows;
  const formattedRows = rows.map((row) => {
    return { ...(row as Entry<RowSkeleton>).fields as unknown as FoundationGivingRow };
  });

  return {
    reportTitle: String(f.reportTitle ?? ''),
    subtitle: String(f.subtitle ?? ''),
    currencyLabel: String(f.currencyLabel ?? 'USD'),
    asOfDate: String(f.asOfDate ?? ''),
    rows: formattedRows,
    faq: {
      annualFund: String(f.faqAnnualFund ?? ''),
      polioPlus: String(f.faqPolioPlus ?? ''),
      other: String(f.faqOther ?? ''),
      endowment: String(f.faqEndowment ?? ''),
    },
  };
}
