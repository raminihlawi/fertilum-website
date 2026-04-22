import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [],
  vite: {
    ssr: {
      external: ['svgo'],
    },
  },
});
