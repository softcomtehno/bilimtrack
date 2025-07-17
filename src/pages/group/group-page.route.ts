import { RouteObject } from 'react-router-dom'
import { createElement } from 'react'
import { GroupPage } from './group-page.ui'

export const groupPageRoute: RouteObject = {
  path: 'subjects/:subjectId/groups/:groupId',
  element: createElement(GroupPage),
}
