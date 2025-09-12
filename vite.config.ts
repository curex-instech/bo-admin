import { mergeWithDefaultConfig } from '@mymind/duc-banh-mi';
import { defineConfig } from 'vite';

export default defineConfig(
  mergeWithDefaultConfig({
    preview: {
      port: 3000,
    },

    /**
     * @see https://vitejs.dev/config/server-options.html
     */
    /**
      For example:
      - if your backend APIs are hosted on `https://change-to-your-api-server/api`
      - your origin will be `https://change-to-your-api-server`
      - your proxyPath will be `/api`
      - if you fire a request to `/api/getSomeData`,
        the dev server will actually call `https://change-to-your-api-server/api/getSomeData` to get the data
    */

    server: {
      port: process.env.VITE_APP_LOCAL_PORT || (8080 as any),
      proxy: {
        '/api': {
          target: process.env.VITE_API_SERVER,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
      cors: false,
    },
    build: {
      // sourcemap: true,
    },
  })
);
