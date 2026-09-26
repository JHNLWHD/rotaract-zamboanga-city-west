import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Index from './pages/Index';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Officers from './pages/Officers';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import FoundationGiving from './pages/FoundationGiving';
import Recognition from './pages/Recognition';
import NotFound from './pages/NotFound';

export const AppContent = ({ notFoundPath }: { notFoundPath?: string }) => {
  const { pathname } = useLocation();
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ScrollToTop />
      {pathname === notFoundPath ? (
        <NotFound />
      ) : (
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/officers" element={<Officers />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:date/:slug" element={<EventDetail />} />
          <Route path="/foundation-giving" element={<FoundationGiving />} />
          <Route path="/recognition" element={<Recognition />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </TooltipProvider>
  );
};

const App = ({ notFoundPath }: { notFoundPath?: string }) => (
  <BrowserRouter>
    <AppContent notFoundPath={notFoundPath} />
  </BrowserRouter>
);

export default App;
