import { CLOSE_SIDEBAR_ON } from "@Constants/app";
import { Avatar, AppBar as MuiAppBar, styled } from "@mui/material";

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  background: theme.palette.common.white,
  boxShadow: "none",
  filter: `drop-shadow(15px 6px 20px ${theme.palette.custom.boxShadow})`,
  [theme.breakpoints.up(CLOSE_SIDEBAR_ON)]: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export const ProfileAvatar = styled(Avatar)(({ theme: { palette } }) => ({
  backgroundColor: palette.common.white,
  border: "1px solid ",
  borderColor: palette.primary.main,
  color: palette.primary.main,
}));
