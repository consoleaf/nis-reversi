import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// import reactRefresh from '@vitejs/plugin-react-refresh';
import { ViteTips } from 'vite-plugin-tips';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // reactRefresh(),
    tsconfigPaths(),
    process.env.NODE_ENV !== 'production' && ViteTips(),
  ],
});
