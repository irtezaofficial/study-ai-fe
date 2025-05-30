import AppLogo from "@Assets/icons/AppLogo.svg";
import AppLogoOnboard from "@Assets/icons/AppLogoOnboard.svg";
import AuthWave from "@Assets/images/AuthWave.webp";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import { CenteredBox } from "@Theme/GeneralStyledComponents";
import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ContentGrid, ImageGrid, StyledImage } from "./Styles";

export default function AuthWrapper({
  children,
  title,
  showGoToLogin,
  subtitle,
}: AuthWrapperProps) {
  return (
    <Grid height="100vh" container bgcolor="common.white">
      <ImageGrid item xs={12} md={7} height="inherit">
        <Box
          display="flex"
          zIndex={0}
          gap={"5vh"}
          p={9}
          flexDirection="column"
          height="inherit"
          sx={{
            background: ({ palette }) => palette.custom.appGradient,
          }}
          position="relative"
        >
          <StyledImage
            placement="top"
            src={AuthWave}
            sx={{ maxHeight: { xs: "30%", lg: "100%" } }}
          />
          <AppLogoOnboard width={'auto'} />
          <Box flexDirection="column">
            <Typography color="common.white" fontWeight={500} fontSize={36}>
              Welcome to Study AI
            </Typography>
            <Typography
              mt={3}
              fontSize={20}
              color="common.white"
              maxWidth={700}
            >
              Lorem ipsum dolor sit amet consectetur. Nulla commodo eu nulla
              condimentum mauris at integer aliquam.
            </Typography>
          </Box>
        </Box>
      </ImageGrid>
      <ContentGrid item xs={12} md={5}>
        <CenteredBox>
          <CenteredBox
            flexDirection="column"
            minHeight="100vh"
            width="80%"
            pt={{ xs: 0, xl: 8 }}
            pb={{ xs: 0, xl: 2 }}
          >
            <Box
              display={{ md: "none" }}
              component={AppLogo}
              sx={{ transform: "scale(1.3)" }}
            />
            <CenteredBox mt={6} width="100%">
              <Box flexGrow={1}>
                <Typography
                  color="custom.font1"
                  fontSize={24}
                  mb={1}
                  fontWeight={700}
                >
                  {title}
                </Typography>
                <Typography
                  color="custom.font1"
                  fontWeight={500}
                  mb={{ xs: 4, xl: 8 }}
                >
                  {subtitle}
                </Typography>

                {children}
                {showGoToLogin && (
                  <Link to={NavigationRoutes.APP_ROUTES.ONBOARDING}>
                    <Typography textAlign="center">Go Back to Login</Typography>
                  </Link>
                )}
              </Box>
            </CenteredBox>
          </CenteredBox>
        </CenteredBox>
      </ContentGrid>
    </Grid>
  );
}

type AuthWrapperProps = {
  children: React.ReactNode;
  title: string;
  showGoToLogin?: boolean;
  subtitle: string;
  showUserTypeSwitch?: boolean;
};
