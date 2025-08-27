import {
  RouterProvider,
  createBrowserRouter,
  useRouteError,
} from 'react-router-dom'

import {
  GenericLayout,
  IntroLayout,
  MentorLayout,
  RoleBasedLayout,
} from '@/pages/layout/layout.ui'

import { loginPageRoute } from '@/pages/shared/login'
import { scannerPageRoute } from '@/pages/student/scanner/scanner-page.route'
import { lessonIDPageRoute } from '@/pages/student/lesson-id'
import { subjectPageRoute } from '@/pages/mentor/subject'
import { groupPageRoute } from '@/pages/mentor/group'
import { studentGradePageRoute } from '@/pages/student/student-grade'
import { ratingPageRoute } from '@/pages/student/rating'
import { studentHomePageRoute } from '@/pages/student/home'
import { mentorHomePageRoute } from '@/pages/mentor/home'
import { morePageRoute } from '@/pages/student/more'
import { learnPageRoute } from '@/pages/student/learn'
import { studentprofilePageRoute } from '@/pages/student/profile'
import { mentorprofilePageRoute } from '@/pages/mentor/profile'
import { timetablePageRoute } from '@/pages/mentor/timetable'
import { schedulePageRoute } from '@/pages/admin/schedule'
import { subjectIDPageRoute } from '@/pages/student/subject-id'
import { HomeRedirect } from '@/pages/home/home-redirect'
import { subjectsPageRoute } from '@/pages/mentor/subjects'

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
        path: '/',
        element: <HomeRedirect />,
      },
      {
        element: <RoleBasedLayout />, // <-- твои Layout остаются нетронутыми
        children: [
          {
            path: '/student',
            children: [
              studentHomePageRoute,
              morePageRoute,
              learnPageRoute,
              scannerPageRoute,
              studentprofilePageRoute,
              ratingPageRoute,
              lessonIDPageRoute,
              groupPageRoute,
              studentGradePageRoute,
              subjectIDPageRoute,
            ],
          },
          {
            path: '/mentor',
            children: [
              mentorHomePageRoute,
              mentorprofilePageRoute,
              timetablePageRoute,
              subjectPageRoute,
              groupPageRoute,
              subjectsPageRoute,
            ],
          },
          {
            path: '/admin',
            children: [schedulePageRoute],
          },
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
