import { RouteObject } from 'react-router-dom';
import { createElement } from 'react';
import { StudentHomePage } from './dashboard-page.ui';
import { pathKeys } from '@/shared/lib/react-router';

export const studentHomePageRoute: RouteObject = {
  path: pathKeys.home(),
  element: createElement(StudentHomePage),
};
