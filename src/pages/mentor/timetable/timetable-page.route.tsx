import { RouteObject } from 'react-router-dom';
import { createElement } from 'react';

import { pathKeys } from '@/shared/lib/react-router';
import { Timetablepage } from './timetable-page.ui';


export const timetablePageRoute: RouteObject = {
  path: pathKeys.timetable(),
  element: <Timetablepage />,
};
