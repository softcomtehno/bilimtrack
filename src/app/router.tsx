import {
  RouterProvider,
  createBrowserRouter,
  useRouteError,
} from 'react-router-dom'
// import { getCookie } from 'typescript-cookie'
import {
  mentorHomePageRoute,
  rootHomePageRoute,
  studentHomePageRoute,
} from '@/pages/home'
import {
  GenericLayout,
  IntroLayout,
  MentorLayout,
} from '@/pages/layout/layout.ui'
import { loginPageRoute } from '@/pages/login'
import { profilePageRoute } from '@/pages/profile'
import { scannerPageRoute } from '@/pages/scanner/scanner-page.route'
import { timetablePageRoute } from '@/pages/timetable'
import { schedulePageRoute } from '@/pages'
import { lessonIDPageRoute } from '@/pages/lesson-id'

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

// const isAuth = !!getCookie('access')

const router = createBrowserRouter([
  {
    errorElement: <BubbleError />,
    children: [
      {
        element: <GenericLayout />,
        children: [
          studentHomePageRoute,
          profilePageRoute,
          scannerPageRoute,
          rootHomePageRoute,
          lessonIDPageRoute,
        ],
      },
      {
        element: <MentorLayout />,
        children: [mentorHomePageRoute, timetablePageRoute, schedulePageRoute],
      },
      { element: <IntroLayout />, children: [loginPageRoute] },
    ],
  },
])

export function BrowserRouter() {
  return <RouterProvider router={router} />
}
