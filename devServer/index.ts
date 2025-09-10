// You might need to install `vite-plugin-mock` in your project explicitly if you are using pnpm.
// If you are using yarn, it is included in `@mymind/duc-banh-mi` already.
import { MockMethod } from 'vite-plugin-mock';

// `origin` and `proxyPath` together make up the base url for your backend APIs.
// The dev server will proxy all request URLs that match `${proxyPath}/*` to `${origin}${proxyPath}/*`
// essentially allowing you to call the backend APIs without CORS issues

export default [
  // mock requests will override proxied requests
  {
    url: '/auth/logout',
    method: 'get',
    response: () => {
      return {
        success: true,
        result: 'Logged out successfully',
      };
    },
  },
  {
    url: '/api/v1/auth/login',
    method: 'get',
    response: () => {
      console.log('fasdf')
      return {
        success: true,
        result: {
          user: {
            username: 'John Doe',
            userid: '1234567890',
            email: 'johndoe@example.com',
            // picture: 'https://example.com/johndoe.jpg',
          }
        },
      };
    },
  },
] as MockMethod[];
