import { RouteObject } from 'react-router-dom'
import { createElement } from 'react'
import { pathKeys } from '@/shared/lib/react-router'
import { RootRedirect } from './redirect'

export const rootHomePageRoute: RouteObject = {
  path: pathKeys.home(),
  element: createElement(RootRedirect),
}
