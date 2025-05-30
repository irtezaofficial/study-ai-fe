import { GetProfile } from "@Api/Personal";
import AppLogo from "@Assets/icons/AppLogo.svg";
import FullPageLoader from "@Components/FullPageLoader/FullPageLoader";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import { setLoggedInUserData, setPageTitle } from "@Utils/utils";
import { Box } from "@mui/material";
import { Suspense, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Content from "./Content/Content";
import Topbar from "./Topbar/Topbar";

export default function AuthenticatedAppRoot() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle(pathname);
  }, [pathname]);

  const data = GetProfile();

  useEffect(() => {
    if (data) {
      setLoggedInUserData(data);
      if (!data?.isOnboarded) {
        navigate(NavigationRoutes.APP_ROUTES.ONBOARDING);
      }
    }
  }, [data]);

  return (
    <Suspense fallback={<FullPageLoader width="100%" />}>
      {!data && <FullPageLoader width="100%" />}
        <Box display="flex" height="100dvh">
          <Topbar />
          <Content />
        </Box>
    </Suspense>
  );
}

export function AppLogoContainer() {
  return (
    <Box
      component={Link}
      to={NavigationRoutes.APP_ROUTES.DASHBOARD}
      flexGrow={1}
    >
      <Box display="flex" alignItems="center" justifyContent="flex-start">
        <AppLogo height={42} width={117} />
      </Box>
    </Box>
  );
}
