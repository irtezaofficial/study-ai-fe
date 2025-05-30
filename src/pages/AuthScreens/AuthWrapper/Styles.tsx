import { Grid, styled } from "@mui/material";

export const StyledImage = styled("img")<{ placement: "top" | "bottom" }>(
  ({ placement }) => ({
    position: "absolute",
    zIndex: -1,
    bottom: 0,
    left: 0,
    width: "80%",
  })
);

export const ContentGrid = styled(Grid)(
  ({ theme: { breakpoints, palette } }) => ({
    order: 2,
    zIndex: 2,
    background: palette.common.white,
    marginLeft: "auto",
    [breakpoints.up("md")]: {
      order: 1,
      marginTop: 0,
    },
  })
);
export const ImageGrid = styled(Grid)(({ theme: { breakpoints } }) => ({
  position: "fixed",
  inset: 0,
  display: "none",
  [breakpoints.up("md")]: {
    display: "block",
  },
}));
