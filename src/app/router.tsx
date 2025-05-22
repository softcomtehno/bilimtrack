import {
  RouterProvider,
  createBrowserRouter,
  useRouteError,
} from 'react-router-dom';
import { getCookie } from 'typescript-cookie';
import {
  mentorHomePageRoute,
  rootHomePageRoute,
  studentHomePageRoute,
} from '@/pages/home';
import {
  GenericLayout,
  IntroLayout,
  MentorLayout,
} from '@/pages/layout/layout.ui';
import { loginPageRoute } from '@/pages/login';
import { profilePageRoute } from '@/pages/profile';
import { scannerPageRoute } from '@/pages/scanner/scanner-page.route';
import { timetablePageRoute } from '@/pages/timetable';
import { subjectPageRoute } from '@/pages/subject/subject-page.route';
import { gradePageRoute } from '@/pages/grade';

function BubbleError() {
  const error = useRouteError();

  if (error) throw error;

  return null;
}

const isAuth = !!getCookie('access');

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
        ],
      },
      {
        element: <MentorLayout />,
        children: [mentorHomePageRoute, timetablePageRoute, subjectPageRoute, gradePageRoute],
      },
      { element: <IntroLayout />, children: [loginPageRoute] },
    ],
  },
]);

export function BrowserRouter() {
  return <RouterProvider router={router} />;
}
