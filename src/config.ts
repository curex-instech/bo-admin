import type { SiteConfig } from '@mymind/banh-mi';
import { fallbackOAuthConfig } from './_shared/auth/fallback';

const siteConfig: SiteConfig = {
  siteName: 'BO Web Admin',
  strictMode: false,
  /** You can have custom top and side navs through widgets */
  // topNavWidgetId: 'widget-customized-topnav',
  // sideNavWidgetId: 'widget-customized-sidenav',

  /** You can define an app level wrapper for things alike Redux provider, global listeners, etc */
  wrapperId: 'widget-app-wrapper',
  topNav: [
    {
      type: 'profile',
      items: [],
    },
  ],
  sideNav: [
    {
      title: 'Home',
      iconType: 'home',
      routeId: '/',
      type: 'link',
    },
    {
      title: 'Agents',
      type: 'folder',
      items: [
        {
          title: 'Sales',
          routeId: '/agents/sales',
          type: 'link',
          iconType: 'User',
        },
        {
          title: 'Customers',
          routeId: '/agents/customers',
          type: 'link',
          iconType: 'UsergroupAdd',
        },
      ],
    },
    {
      title: 'Staff',
      type: 'folder',
      items: [
        {
          title: 'Users',
          routeId: '/staff/users',
          type: 'link',
          iconType: 'User',
        },
        {
          title: 'Roles',
          routeId: '/staff/roles',
          type: 'link',
          iconType: 'FolderAdd',
        },
        {
          title: 'Permissions',
          routeId: '/staff/permissions',
          type: 'link',
          iconType: 'Setting',
        },
      ],
    },
    // {
    //   title: 'User',
    //   iconType: 'user',
    //   type: 'folder',
    //   items: [
    //     {
    //       title: 'List',
    //       routeId: '/user/list',
    //       type: 'link',
    //       routeParams: {
    //         userType: 'user',
    //       },
    //       match: ['userType'],
    //     },
    //     {
    //       title: 'Create',
    //       routeId: '/user/create',
    //       type: 'link',
    //       routeParams: {
    //         userType: 'user',
    //       },
    //       match: ['userType'],
    //     },
    //   ],
    // },
  ],
  authentication: {
    // pathPrefix: API_SERVER,
    endpoints: {
      //   getLoginInfoEndpoint: '/api/v1/auth/login',
      // logoutEndpoint: '/api/auth/logout/',
    },
    fallbackFunctions: fallbackOAuthConfig.fallbackFunctions,
  },
};

export default siteConfig;
