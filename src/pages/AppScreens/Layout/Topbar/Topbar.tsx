import { CLOSE_SIDEBAR_ON } from "@Constants/app";
import { Box, Toolbar } from "@mui/material";
import { AppLogoContainer } from "../AuthenticatedAppRoot";
import Settings from "./Settings";
import { AppBar } from "./Styles";

export default function Topbar() {
  return (
    <AppBar>
      <Box
        component={Toolbar}
        width="100%"
        justifyContent={{
          xs: "space-between",
          [CLOSE_SIDEBAR_ON]: "flex-end",
        }}
      >
        <AppLogoContainer />
        <Settings />
      </Box>
    </AppBar>
  );
}
