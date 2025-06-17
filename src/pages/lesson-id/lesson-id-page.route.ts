import { RouteObject } from 'react-router-dom'
import { createElement } from 'react'

import { pathKeys } from '../../shared/lib/react-router'
import { LessonIDPage } from './lesson-id-page.ui'

export const lessonIDPageRoute: RouteObject = {
  path: pathKeys.lessonId.byId(':lessonId'), // '/lessonID/:lessonId/'
  element: createElement(LessonIDPage),
}
