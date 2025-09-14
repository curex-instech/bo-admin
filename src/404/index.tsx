import { Link } from '@mymind/banh-mi';
import type * as React from 'react';
import { FluidContent, FluidPage } from '../_shared/components/PageContent';

export const layout = 'fluid';

const Page404: React.ComponentType<{ error?: string }> = ({
  error,
}: {
  error?: string;
}): JSX.Element => {
  if (error) {
    console.error(error);
  }
  return (
    <FluidPage>
      <FluidContent>
        <h1>Not found</h1>
        <p>
          <Link routeId="/">back to home</Link>
        </p>
      </FluidContent>
    </FluidPage>
  );
};

export default Page404;
