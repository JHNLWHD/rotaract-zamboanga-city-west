import { Helmet } from 'react-helmet';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';

const RecordUnavailable = ({
  kind,
  onRetry,
  isRetrying,
}: {
  kind: 'Project' | 'Event';
  onRetry: () => void;
  isRetrying: boolean;
}) => (
  <div className="min-h-screen bg-[#faf9f7]">
    <Helmet>
      <title>
        {kind} temporarily unavailable | Rotaract Club of Zamboanga City West
      </title>
    </Helmet>
    <Navbar />
    <main
      id="main-content"
      className="editorial-shell py-16"
      aria-live="polite"
    >
      <h1 className="text-3xl font-semibold">{kind} temporarily unavailable</h1>
      <p className="mt-4 text-slate-600">
        We could not load this record. Please try again.
      </p>
      <button
        type="button"
        className="editorial-link mt-5"
        onClick={onRetry}
        disabled={isRetrying}
      >
        {isRetrying ? 'Trying again…' : 'Try again'}
      </button>
    </main>
    <Footer />
  </div>
);

export default RecordUnavailable;
