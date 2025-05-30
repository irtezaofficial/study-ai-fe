import {
  CenteredOverLay,
  DelIconContainer,
  OverlayContainer,
} from "@Theme/GeneralStyledComponents";
import {
  Box,
  BoxProps,
  CircularProgress,
  IconButtonProps,
} from "@mui/material";
import React from "react";

type Props = {
  children: React.ReactNode;
  icon: React.ReactNode;
  iconButtonProps: IconButtonProps;
  isLoading?: boolean;
  containerProps?: BoxProps;
};

function ImageOverlay({
  children,
  icon,
  iconButtonProps,
  isLoading,
  containerProps,
}: Props) {
  return (
    <OverlayContainer {...containerProps}>
      {children}
      {isLoading ? (
        <>
          <Box
            component={CircularProgress}
            color="white"
            position="absolute"
            zIndex={1}
          />
          <Box
            bgcolor="common.black"
            width="100%"
            height="100%"
            sx={{ opacity: 0.5 }}
            position="absolute"
          />
        </>
      ) : (
        <CenteredOverLay sx={{ zIndex: 99999 }}>
          <DelIconContainer {...iconButtonProps}>{icon}</DelIconContainer>
        </CenteredOverLay>
      )}
    </OverlayContainer>
  );
}

export default ImageOverlay;
