import { Breadcrumb } from 'antd';

import { CardContent, FluidPage } from '../_shared/components/PageContent';

const PageCustomers = (): JSX.Element => {
  return (
    <FluidPage>
      <Breadcrumb
        items={[
          {
            title: 'Agents',
          },
          {
            title: 'Customers',
          },
        ]}
      />
      <CardContent>
        <h1>Customers</h1>
        <p>Welcome to Customers Management!</p>
      </CardContent>
    </FluidPage>
  );
};

export default PageCustomers;
