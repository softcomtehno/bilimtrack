import { createElement } from 'react'
import { RouteObject } from 'react-router-dom'
import { MentorHomePage } from './mentor-home-page.ui'
import { pathKeys } from '@/shared/lib/react-router'

export const mentorHomePageRoute: RouteObject = {
  path: pathKeys.mentor(),
  element: createElement(MentorHomePage),
}
