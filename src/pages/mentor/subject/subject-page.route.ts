import { RouteObject } from 'react-router-dom';
import { createElement } from 'react';
import { SubjectPage } from './subject-page.ui';
import { pathKeys } from '@/shared/lib/react-router';

export const subjectPageRoute: RouteObject = {
  path: pathKeys.subject.byId(':id'),
  element: createElement(SubjectPage),
};
