// vite.config.ts
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'planka-client/index.ts'),
      name: 'planka-client',
      fileName: 'planka-client',
    },
  },
  plugins: [dts()],
});
