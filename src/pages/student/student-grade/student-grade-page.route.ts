import { RouteObject } from 'react-router-dom'
import { createElement } from 'react'
import { StudentGradePage } from './student-grade-page.ui'
import { pathKeys } from '@/shared/lib/react-router'

export const studentGradePageRoute: RouteObject = {
  path: pathKeys.studentGrade.byId(':id'),
  element: createElement(StudentGradePage),
}
