import { createRoot, hydrateRoot } from 'react-dom/client';
import { PostHogProvider } from 'posthog-js/react';
import {
  hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import App from './App.tsx';
import './index.css';
import { RenderTimeContext } from './hooks/useRenderTime';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const state = document.getElementById('page-state');
const pageState = state ? JSON.parse(state.textContent!) : undefined;
if (pageState) hydrate(queryClient, pageState);

const app = (
  <RenderTimeContext.Provider value={pageState?.renderedAt}>
    <QueryClientProvider client={queryClient}>
      <PostHogProvider
        apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
        options={{
          api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
          debug: import.meta.env.MODE === 'development',
        }}
      >
        <App
          notFoundPath={
            state?.dataset.status === '404'
              ? window.location.pathname
              : undefined
          }
        />
      </PostHogProvider>
    </QueryClientProvider>
  </RenderTimeContext.Provider>
);

const root = document.getElementById('root')!;
if (state && root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
