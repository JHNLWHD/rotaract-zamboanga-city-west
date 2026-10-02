import path from 'node:path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    css: false,
    environmentOptions: {
      jsdom: { url: 'https://rotaract.test/' },
    },
    setupFiles: ['./src/test/setup.ts'],
    clearMocks: true,
    restoreMocks: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary'],
      reportsDirectory: '/tmp/rotaract-zamboanga-city-west-coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/test/**',
        'src/main.tsx',
        'src/env.d.ts',
        'src/vite-env.d.ts',
        'src/components/ui/**',
        // Legacy redesign leftovers are not imported by the production app.
        'src/components/officers/**',
        'src/components/events/{BackToEventsButton,EventContent,EventDetailHeader,EventInvitation,EventRegistration,EventStatusBadge}.tsx',
        'src/components/projects/{ProjectBreadcrumb,ProjectDetailHeader,ProjectSidebar}.tsx',
      ],
      thresholds: {
        statements: 99,
        branches: 100,
        functions: 100,
        lines: 99,
      },
    },
  },
});
