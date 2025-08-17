import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { pathKeys } from '@/shared/lib/react-router';
import { MentorHomePage } from './mentor-home-page.ui';

export const mentorHomePageRoute: RouteObject = {
  path: pathKeys.home(),
  element: createElement(MentorHomePage),
};
