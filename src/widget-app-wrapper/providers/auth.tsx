import { GoogleOAuthProvider } from '@react-oauth/google';
import type { ReactNode } from 'react';
import { GOOGLE_CLIENT_ID } from 'src/environment';

export default function GoogleAuthWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="fixed w-[100vw] h-[100vh] top-0 left-0 z-999 bg-white">
        <div className="relative w-full h-full flex items-center justify-center">
          {children}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
