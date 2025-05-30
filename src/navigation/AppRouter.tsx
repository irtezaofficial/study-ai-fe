import {Navigate, createBrowserRouter} from 'react-router-dom';
import {NavigationRoutes} from './NavigationRoutes';
import AuthenticatedAppRoot from '@Pages/AppScreens/Layout/AuthenticatedAppRoot';
import {Dashboard, SearchResult} from './LazyImports';
import Summary from '../pages/AppScreens/Summary/Summary';
import Quiz from '../pages/AppScreens/Quiz/Quiz';

export const AppRouter = createBrowserRouter([
  {
    path: NavigationRoutes.APP_ROUTES.DASHBOARD,
    element: <AuthenticatedAppRoot />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: NavigationRoutes.APP_ROUTES.SEARCHRESULT,
        element: <SearchResult />,
      },
      {
        path: NavigationRoutes.APP_ROUTES.SUMMARY,
        element: <Summary />,
      },
      {
        path: NavigationRoutes.APP_ROUTES.QUIZ,
        element: <Quiz />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={NavigationRoutes.APP_ROUTES.DASHBOARD} replace />,
  },
]);
