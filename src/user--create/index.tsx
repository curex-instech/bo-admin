import * as React from 'react';
import { FluidPage, FluidContent } from '../_shared/components/PageContent';
import { useRoute } from '@mymind/banh-mi';

const PageHome = (): JSX.Element => {
  const { routeParams } = useRoute();
  console.table(routeParams);
  return (
    <FluidPage>
      <FluidContent>
        <h1>User</h1>
        <p>Welcome to User Create!</p>
      </FluidContent>
    </FluidPage>
  );
};

export default PageHome;
