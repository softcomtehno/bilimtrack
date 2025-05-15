import { homePageRoute } from '@/pages/home';
import { GenericLayout, IntroLayout } from '@/pages/layout/layout.ui';
import { loginPageRoute } from '@/pages/login';
import { profilePageRoute } from '@/pages/profile';
import {
  RouterProvider,
  createBrowserRouter,
  useRouteError,
} from 'react-router-dom';
import { getCookie } from 'typescript-cookie';

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
        children: [homePageRoute, profilePageRoute],
      },
      { element: <IntroLayout />, children: [loginPageRoute] },
    ],
  },
]);

export function BrowserRouter() {
  return <RouterProvider router={router} />;
}
