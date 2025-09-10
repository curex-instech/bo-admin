import * as React from 'react';
import { FluidPage, CardContent } from '../_shared/components/PageContent';
import { ENV, LOCALE, PUBLIC_PATH } from '../environment';
import { useSiderCollapseState, useUser } from '@mymind/banh-mi';
import styles from './styles.module.scss';

const PageHome = (): JSX.Element => {
  const collapsed = useSiderCollapseState();
  const { loading, loginInfo } = useUser();

  console.table({
    ENV,
    LOCALE,
    PUBLIC_PATH,
    loading,
    collapsed,
  });

  console.log('loginInfo', loginInfo);

  return (
    <FluidPage>
      <CardContent>
        <span className={styles.title}>Home</span>
        <p>Welcome to this admin portal!</p>
      </CardContent>
    </FluidPage>
  );
};

export default PageHome;
