import { RouteObject } from 'react-router-dom'
import { createElement } from 'react'

import { pathKeys } from '../../shared/lib/react-router'
import { StudentGradePage } from './student-grade-page.ui'

export const studentGradePageRoute: RouteObject = {
  path: pathKeys.studentGrade.byId(':id'),
  element: createElement(StudentGradePage),
}
