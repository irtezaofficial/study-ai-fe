import {lazy} from 'react';

// AUTH
const Onboarding = lazy(
  () => import('~/src/pages/AuthScreens/Onboarding/Onboarding'),
);

// APP
const Dashboard = lazy(() => import('@Pages/AppScreens/Dashboard/Dashboard'));
const SearchResult = lazy(
  () => import('@Pages/AppScreens/SearchResult/SearchResult'),
);
const Summary = lazy(() => import('@Pages/AppScreens/Summary/Summary'));
const Quiz = lazy(() => import('@Pages/AppScreens/Quiz/Quiz'));

export {Dashboard, SearchResult, Onboarding, Summary, Quiz};
