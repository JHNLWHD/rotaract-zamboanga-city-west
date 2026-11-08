import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from 'lovable-tagger';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  define: {
    // Preview images must exist on the same deployment as the generated HTML.
    'import.meta.env.VITE_OG_IMAGE_ORIGIN': JSON.stringify(
      process.env.CONTEXT === 'branch-deploy' ||
        process.env.CONTEXT === 'deploy-preview'
        ? process.env.DEPLOY_PRIME_URL || 'https://rotaract.rotaryzcwest.org'
        : 'https://rotaract.rotaryzcwest.org'
    ),
  },
  server: {
    host: '::',
    port: 8080,
  },
  plugins: [react(), mode === 'development' && componentTagger()].filter(
    Boolean
  ),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}));
