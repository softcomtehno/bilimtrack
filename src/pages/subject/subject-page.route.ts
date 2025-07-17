import { RouteObject } from 'react-router-dom'
import { createElement } from 'react'
import { pathKeys } from '../../shared/lib/react-router'
import { SubjectPage } from './subject-page.ui'

export const subjectPageRoute: RouteObject = {
  path: pathKeys.subject.byId(':id'),
  element: createElement(SubjectPage),
}
