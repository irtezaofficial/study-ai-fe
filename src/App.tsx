import ApiClientProvider from "@Api/Client";
import FullPageLoader from "@Components/FullPageLoader/FullPageLoader";
import ToastContainer from "@Components/ToastContainer/ToastContainer";
import { AppRouter } from "@Navigation/AppRouter";
import { AuthenticationRouter } from "@Navigation/AuthenticationRouter";
import { useAuthStore } from "@Store/authStore";
import { globalStyles, theme } from "@Theme/GlobalStyles";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";

export default function App() {
  const { isAuth } = useAuthStore();

  return (
    <ApiClientProvider>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <CssBaseline />
        <GlobalStyles {...globalStyles} />
        <Suspense fallback={<FullPageLoader width="100%" />}>
          <RouterProvider router={isAuth ? AppRouter : AuthenticationRouter} />
        </Suspense>
      </ThemeProvider>
    </ApiClientProvider>
  );
}
