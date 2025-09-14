import { Layout } from 'antd';
import cx from 'classnames';
import type * as React from 'react';
import s from './s.module.scss';

type Content = {
  children: React.ReactNode;
  className?: string;
};
type Page = {
  children: React.ReactNode;
  className?: string;
  spacing?: 's16' | 's24';
};

export const CardPage = ({
  children,
  className,
  spacing = 's16',
}: Page): JSX.Element => (
  <Layout.Content className={cx(s.page, s[spacing], className)}>
    {children}
  </Layout.Content>
);

export const FluidPage = ({
  children,
  className,
  spacing = 's16',
}: Page): JSX.Element => (
  <Layout.Content className={cx(s.page, s.fluid, s[spacing], className)}>
    {children}
  </Layout.Content>
);

export const CardContent = ({ children, className }: Content): JSX.Element => (
  <section className={cx(className, s.content, s.card)}>{children}</section>
);

export const FluidContent = ({ children, className }: Content): JSX.Element => (
  <section className={cx(className, s.content)}>{children}</section>
);
