import { RouteObject } from 'react-router-dom';
import { createElement } from 'react';

import { pathKeys } from '../../../shared/lib/react-router';
import { SubjectIDPage } from './subject-id.ui';

export const subjectIDPageRoute: RouteObject = {
  path: pathKeys.subjectIdStudent.byId(':subjectID'), // '/lessonID/:lessonId/'
  element: createElement(SubjectIDPage),
};
