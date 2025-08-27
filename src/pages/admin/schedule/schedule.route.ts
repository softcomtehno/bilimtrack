import { RouteObject } from 'react-router-dom';
import { createElement } from 'react';
import { pathKeys } from '@/shared/lib/react-router';
import { SchedulePage } from './schedulePage';

export const schedulePageRoute: RouteObject = {
  path: pathKeys.schedule(),
  element: createElement(SchedulePage),
};
