import {createBrowserRouter, Navigate} from 'react-router-dom';
import {Onboarding} from './LazyImports';
import {NavigationRoutes} from './NavigationRoutes';

export const AuthenticationRouter = createBrowserRouter([
  {
    path: NavigationRoutes.APP_ROUTES.ONBOARDING,
    element: <Onboarding />,
  },
  {
    path: '*',
    element: <Navigate to={NavigationRoutes.APP_ROUTES.ONBOARDING} />,
  },
]);
