import {
  RouterProvider,
  createBrowserRouter,
  useRouteError,
} from 'react-router-dom'

import {
  mentorHomePageRoute,
  rootHomePageRoute,
  studentHomePageRoute,
} from '@/pages/home'

import { IntroLayout, RoleBasedLayout } from '@/pages/layout/layout.ui'

import { loginPageRoute } from '@/pages/login'
import { profilePageRoute } from '@/pages/profile'
import { scannerPageRoute } from '@/pages/scanner/scanner-page.route'
import { timetablePageRoute } from '@/pages/timetable'
import { schedulePageRoute } from '@/pages'
import { lessonIDPageRoute } from '@/pages/lesson-id'
import { subjectPageRoute } from '@/pages/subject'
import { groupPageRoute } from '@/pages/group'
import { studentGradePageRoute } from '@/pages/student-grade'

function BubbleError() {
  const error = useRouteError()
  if (!error) return null

  return (
    <div>
      <h1>Произошла ошибка!</h1>
      <pre>{JSON.stringify(error)}</pre>
    </div>
  )
}

const router = createBrowserRouter([
  {
    errorElement: <BubbleError />,
    children: [
      {
        element: <RoleBasedLayout />,
        children: [
          studentHomePageRoute,
          mentorHomePageRoute,
          rootHomePageRoute,
          profilePageRoute,
          scannerPageRoute,
          lessonIDPageRoute,
          timetablePageRoute,
          schedulePageRoute,
          subjectPageRoute,
          groupPageRoute,
          studentGradePageRoute,
        ],
      },
      {
        element: <IntroLayout />,
        children: [loginPageRoute],
      },
    ],
  },
])

export function BrowserRouter() {
  return <RouterProvider router={router} />
}
