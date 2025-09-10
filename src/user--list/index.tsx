import * as React from 'react';
import { FluidPage, FluidContent } from '../_shared/components/PageContent';

const PageHome = (): JSX.Element => {
  return (
    <FluidPage>
      <FluidContent>
        <h1>User</h1>
        <p>Welcome to User Manage!</p>
      </FluidContent>
    </FluidPage>
  );
};

export default PageHome;
