import { Breadcrumb } from 'antd';

import { CardContent, FluidPage } from '../_shared/components/PageContent';

const PageSales = (): JSX.Element => {
  return (
    <FluidPage>
      <Breadcrumb
        items={[
          {
            title: 'Agents',
          },
          {
            title: 'Sales',
          },
        ]}
      />
      <CardContent>
        <h1>Customers</h1>
        <p>Welcome to Sales Management!</p>
      </CardContent>
    </FluidPage>
  );
};

export default PageSales;
