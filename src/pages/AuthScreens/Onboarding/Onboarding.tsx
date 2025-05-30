import LoadingButton from "@Components/LoadingButton/LoadingButton";
import { Box } from "@mui/material";
import AuthWrapper from "../AuthWrapper/AuthWrapper";
import useLogin from "./OnboardingContainer";

export default function Login() {
  const { submitForm, isLoading } = useLogin();

  return (
    <AuthWrapper showUserTypeSwitch title="Welcome" subtitle="Let's Start">
      <Box component="form" onSubmit={submitForm}>
        <Box display="flex" justifyContent="end">
        <LoadingButton
          isLoading={isLoading}
          sx={{ my: 3 }}
          variant="main"
          type="submit"
        > Continue </LoadingButton>
        </Box>
      </Box>
    </AuthWrapper>
  );
}
