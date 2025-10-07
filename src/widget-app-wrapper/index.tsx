import { useUser } from '@mymind/banh-mi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import type { ReactNode } from 'react';
import LoginPage from './login';
import GoogleAuthWrapper from './providers/auth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
    },
  },
});

export default function WidgetAppWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const { loginInfo } = useUser();
  console.log('loginInfo', loginInfo);

  if (loginInfo) {
    return (
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          theme={{
            components: {
              Modal: {
                wireframe: true,
              },
            },
          }}
        >
          {children}
        </ConfigProvider>
      </QueryClientProvider>
    );
  }
  return (
    <GoogleAuthWrapper>
      <LoginPage />
    </GoogleAuthWrapper>
  );
}
