import React from 'react';
import { Helmet } from 'react-helmet';
import { format, parseISO } from 'date-fns';
import { Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useFoundationGiving } from '../hooks/foundationGiving/useFoundationGiving';
import type { FoundationGivingRow } from '../hooks/foundationGiving/fetchFoundationGiving';

function formatUsd(n: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

function formatAsOf(iso: string): string {
  if (!iso) return '';
  try {
    return format(parseISO(iso), 'MMMM d, yyyy');
  } catch {
    return iso;
  }
}

const faqMarkdownComponents: Components = {
  ul: ({ children, ...props }) => (
    <ul
      className="my-2 list-disc space-y-1 pl-5 marker:text-slate-500"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="my-2 list-decimal space-y-1 pl-5 marker:text-slate-500"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="text-slate-600 leading-relaxed" {...props}>
      {children}
    </li>
  ),
  h1: ({ children }) => (
    <h4 className="text-sm font-semibold text-slate-900 mt-3 mb-1 first:mt-0">
      {children}
    </h4>
  ),
  h2: ({ children }) => (
    <h4 className="text-sm font-semibold text-slate-900 mt-3 mb-1 first:mt-0">
      {children}
    </h4>
  ),
  h3: ({ children }) => (
    <h5 className="text-sm font-medium text-slate-800 mt-2 mb-1 first:mt-0">
      {children}
    </h5>
  ),
  a: ({ href, children, ...props }) => {
    const external =
      typeof href === 'string' &&
      (href.startsWith('http://') || href.startsWith('https://'));
    return (
      <a
        {...props}
        href={href}
        className="text-cranberry-600 hover:text-cranberry-700 underline"
        {...(external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {children}
      </a>
    );
  },
};

function FaqMarkdownBody({ markdown }: { markdown: string }) {
  if (!markdown.trim()) return null;

  return (
    <div className="prose prose-slate prose-sm max-w-none mt-1.5 text-slate-600 prose-p:leading-relaxed prose-strong:text-slate-800 prose-ul:my-2 prose-li:my-0.5 [&>*:first-child]:mt-0">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={faqMarkdownComponents}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}

function GivingYearCard({
  row,
  currency,
  stripe,
}: {
  row: FoundationGivingRow;
  currency: string;
  stripe: boolean;
}) {
  return (
    <article
      className={`px-4 py-4 ${stripe ? 'bg-slate-50/80' : 'bg-white'}`}
    >
      <h3 className="text-sm font-semibold text-slate-900 mb-3">
        {row.rotaryYearLabel}
      </h3>
      <dl className="space-y-2.5 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-slate-600 shrink-0">Annual Fund</dt>
          <dd className="tabular-nums text-slate-900 text-right">
            {formatUsd(row.annualFund, currency)}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-600 shrink-0">PolioPlus Fund</dt>
          <dd className="tabular-nums text-slate-900 text-right">
            {formatUsd(row.polioPlusFund, currency)}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-600 shrink-0">Other Fund</dt>
          <dd className="tabular-nums text-slate-900 text-right">
            {formatUsd(row.otherFund, currency)}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-600 shrink-0">Endowment Fund</dt>
          <dd className="tabular-nums text-slate-900 text-right">
            {formatUsd(row.endowmentFund, currency)}
          </dd>
        </div>
        <div className="flex justify-between gap-4 pt-1 border-t border-slate-200 font-medium">
          <dt className="text-slate-800 shrink-0">Total</dt>
          <dd className="tabular-nums text-slate-900 text-right">
            {formatUsd(row.totalFund, currency)}
          </dd>
        </div>
      </dl>
    </article>
  );
}

const FoundationGiving = () => {
  const { data, isLoading, isError, error } = useFoundationGiving();

  const jsonLd =
    data &&
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: "https://rotaract.rotaryzcwest.org",
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Foundation Giving',
          item: "https://rotaract.rotaryzcwest.org/foundation-giving",
        },
      ],
    });

  return (
    <>
      <Helmet>
        <title>
          The Rotary Foundation Giving - Rotaract Club of Zamboanga City West
        </title>
        <meta
          name="title"
          content="The Rotary Foundation Giving - Rotaract Club of Zamboanga City West"
        />
        <meta
          name="description"
          content="Five-year Rotary Foundation club giving in USD for the Rotaract Club of Zamboanga City West, with fund types explained."
        />
        <meta
          name="keywords"
          content="Rotary Foundation, TRF giving, PolioPlus, Annual Fund, Rotaract Zamboanga City West, club giving"
        />
        <meta name="author" content="Rotaract Club of Zamboanga City West" />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="geo.region" content="PH-ZAM" />
        <meta name="geo.placename" content="Zamboanga City" />
        <meta name="theme-color" content="#BE185D" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rotaract.rotaryzcwest.org/foundation-giving" />
        <meta
          property="og:title"
          content="The Rotary Foundation Giving - Rotaract Club of Zamboanga City West"
        />
        <meta
          property="og:description"
          content="Five-year Rotary Foundation club giving in USD for the Rotaract Club of Zamboanga City West."
        />
        <meta property="og:image" content="https://rotaract.rotaryzcwest.org/og-image.png" />
        <meta
          property="og:site_name"
          content="Rotaract Club of Zamboanga City West"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="@RotaractZCWest" />
        <meta property="twitter:creator" content="@RotaractZCWest" />
        <meta
          property="twitter:title"
          content="The Rotary Foundation Giving - Rotaract Club of Zamboanga City West"
        />
        <meta
          property="twitter:description"
          content="Five-year Rotary Foundation club giving in USD for the Rotaract Club of Zamboanga City West."
        />
        <meta property="twitter:image" content="https://rotaract.rotaryzcwest.org/og-image.png" />

        <link rel="canonical" href="https://rotaract.rotaryzcwest.org/foundation-giving" />

        {jsonLd && <script type="application/ld+json">{jsonLd}</script>}
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 bg-gradient-to-br from-cranberry-50 via-white to-pink-50 pt-32 pb-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12 max-w-5xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-display">
                The{' '}
                <span className="text-gradient">Rotary Foundation</span> Giving
              </h1>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Transparency in how our club supports The Rotary Foundation
              </p>
            </div>

            <div className="max-w-5xl mx-auto">

            {isLoading && (
              <div className="flex justify-center py-24">
                <Loader2 className="h-10 w-10 animate-spin text-cranberry-600" />
              </div>
            )}

            {isError && (
              <div className="text-center py-16">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                  <p className="text-red-800 font-medium mb-2">
                    Failed to load foundation giving
                  </p>
                  <p className="text-red-600 text-sm">
                    {error instanceof Error
                      ? error.message
                      : 'Please try again later.'}
                  </p>
                </div>
              </div>
            )}

            {!isLoading && !isError && !data && (
              <div className="text-center py-16 text-slate-600">
                <p>No foundation giving report is published yet.</p>
              </div>
            )}

            {data && (
              <>
                <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden mb-10">
                  <div className="bg-pink-100/90 border-b border-pink-200 px-4 py-3 text-center">
                    <p className="font-semibold text-slate-900">
                      Rotaract Club of Zamboanga City West
                    </p>
                  </div>
                  <div className="px-4 py-3 text-center border-b border-slate-100">
                    <p className="text-sm font-medium text-slate-800">
                      {data.reportTitle}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      {data.subtitle}
                    </p>
                  </div>

                  <div className="md:hidden divide-y divide-slate-100 border-t border-slate-100">
                    {data.rows.map((row, i) => (
                      <GivingYearCard
                        key={`${row.rotaryYearLabel}-${i}`}
                        row={row}
                        currency={data.currencyLabel}
                        stripe={i % 2 === 1}
                      />
                    ))}
                  </div>

                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-200">
                          <th className="text-left font-semibold px-3 py-3 whitespace-nowrap">
                            Rotary Year
                          </th>
                          <th className="text-right font-semibold px-3 py-3 whitespace-nowrap">
                            Annual Fund
                          </th>
                          <th className="text-right font-semibold px-3 py-3 whitespace-nowrap">
                            PolioPlus Fund
                          </th>
                          <th className="text-right font-semibold px-3 py-3 whitespace-nowrap">
                            Other Fund
                          </th>
                          <th className="text-right font-semibold px-3 py-3 whitespace-nowrap">
                            Endowment Fund
                          </th>
                          <th className="text-right font-semibold px-3 py-3 whitespace-nowrap">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.rows.map((row, i) => (
                          <tr
                            key={`${row.rotaryYearLabel}-${i}`}
                            className={
                              i % 2 === 0 ? 'bg-white' : 'bg-slate-50/80'
                            }
                          >
                            <td className="px-3 py-2.5 font-medium text-slate-900 whitespace-nowrap border-t border-slate-100">
                              {row.rotaryYearLabel}
                            </td>
                            <td className="px-3 py-2.5 text-right tabular-nums border-t border-slate-100">
                              {formatUsd(row.annualFund, data.currencyLabel)}
                            </td>
                            <td className="px-3 py-2.5 text-right tabular-nums border-t border-slate-100">
                              {formatUsd(row.polioPlusFund, data.currencyLabel)}
                            </td>
                            <td className="px-3 py-2.5 text-right tabular-nums border-t border-slate-100">
                              {formatUsd(row.otherFund, data.currencyLabel)}
                            </td>
                            <td className="px-3 py-2.5 text-right tabular-nums border-t border-slate-100">
                              {formatUsd(row.endowmentFund, data.currencyLabel)}
                            </td>
                            <td className="px-3 py-2.5 text-right font-medium tabular-nums border-t border-slate-100">
                              {formatUsd(row.totalFund, data.currencyLabel)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">
                    <p className="text-xs text-slate-600">
                      All amounts in {data.currencyLabel}. As of{' '}
                      {formatAsOf(data.asOfDate)}.
                    </p>
                  </div>
                </div>

                <section
                  className="space-y-6 border border-slate-200 rounded-lg bg-white/80 p-5 sm:p-6"
                  aria-labelledby="faq-heading"
                >
                  <div>
                    <h2
                      id="faq-heading"
                      className="text-xl font-bold text-slate-900 font-display"
                    >
                      About these funds
                    </h2>
                    <p className="text-slate-600 text-sm mt-1">
                      What each column in the report refers to.
                    </p>
                  </div>
                  <ul className="space-y-5 list-none m-0 p-0">
                    <li>
                      <h3 className="text-base font-semibold text-slate-900">
                        Annual Fund
                      </h3>
                      <FaqMarkdownBody markdown={data.faq.annualFund} />
                    </li>
                    <li>
                      <h3 className="text-base font-semibold text-slate-900">
                        PolioPlus Fund
                      </h3>
                      <FaqMarkdownBody markdown={data.faq.polioPlus} />
                    </li>
                    <li>
                      <h3 className="text-base font-semibold text-slate-900">
                        Other Fund
                      </h3>
                      <FaqMarkdownBody markdown={data.faq.other} />
                    </li>
                    <li>
                      <h3 className="text-base font-semibold text-slate-900">
                        Endowment Fund
                      </h3>
                      <FaqMarkdownBody markdown={data.faq.endowment} />
                    </li>
                  </ul>
                </section>
              </>
            )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default FoundationGiving;
