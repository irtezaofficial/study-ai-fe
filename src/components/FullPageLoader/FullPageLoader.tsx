import { Backdrop } from "@mui/material";

import { DRAWER_WIDTH_NUMBER } from "@Constants/app";

import AppLogo from "@Assets/icons/AppLogo.svg";
import { CenteredBox } from "@Theme/GeneralStyledComponents";

export default function FullPageLoader({
  open = true,
  zIndex = 100000000,
  width = `calc(100% + ${DRAWER_WIDTH_NUMBER - 48}px)`,
}: FullPageLoaderTypes) {
  return (
    <Backdrop
      open={open}
      sx={{
        background: "white",
        zIndex: zIndex,
        width: { xs: "100%", xl: width ?? "100%" },
      }}
    >
      <CenteredBox
        sx={{
          "@keyframes blink": { to: { opacity: 0.2 } },
          transform: { xs: "scale(1)", md: "scale(1)" },
          animation: "blink 1s infinite ease alternate",
        }}
      >
        <AppLogo width={'50%'}/>
      </CenteredBox>
    </Backdrop>
  );
}

type FullPageLoaderTypes = {
  open?: boolean;
  zIndex?: number;
  width?: string;
};
