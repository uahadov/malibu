import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Single optimized bundle — fewer HTTP requests = faster on all connections
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        // Keep vendor code separate for caching, but don't over-split
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});
