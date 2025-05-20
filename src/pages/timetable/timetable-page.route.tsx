import { RouteObject } from 'react-router-dom';
import { createElement } from 'react';
import { TimetablePage } from './timetable-page.ui';
import { pathKeys } from '../../shared/lib/react-router';

export const timetablePageRoute: RouteObject = {
  path: pathKeys.timetable(),
  element: createElement(TimetablePage),
};
