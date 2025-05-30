import { CenteredBox } from "@Theme/GeneralStyledComponents";
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  IconButton,
  Typography,
  TypographyProps,
} from "@mui/material";
import BackIcon from "@Assets/icons/Back.svg";
import { Link, LinkProps, useNavigate } from "react-router-dom";
import { ComponentType, Fragment, useRef } from "react";
import { ModalRefType, ModalTypes } from "@Components/Modal/Modal";

export default function TitleHeader({
  title,
  fontSize = 20,
  children,
  showBackButton = false,
  center = false,
  backLink,
  modalProps,
  linkProps,
  modalButtonProps,
  modalButtonText,
  linkButtonProps,
  linkButtonText,
  Modal,
  headerProps,
  endExtention,
}: TitleHeaderProps) {
  const navigate = useNavigate();

  const modalRef = useRef<ModalRefType>();
  function showModal() {
    modalRef.current?.open();
  }
  function closeModal() {
    modalRef.current?.close();
  }

  function handleGoBack() {
    if (Boolean(backLink) && typeof backLink === "string") {
      navigate(backLink);
    } else {
      // goes to the previous rendered route
      navigate(-1);
    }
  }
  return (
    <Box
      flexGrow={1}
      display="flex"
      justifyContent={center ? "center" : "space-between"}
      flexWrap="wrap"
      gap={2}
    >
      <Box>
        <CenteredBox gap={1}>
          {showBackButton && (
            <IconButton disableRipple onClick={handleGoBack}>
              <BackIcon />
            </IconButton>
          )}
          <Typography
            fontSize={fontSize}
            fontWeight={500}
            color="common.black"
            {...headerProps}
          >
            {title}
          </Typography>
        </CenteredBox>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        flexWrap="wrap"
        width={{ xs: "100%", sm: "auto" }}
        flexGrow={{ xs: 1, sm: 0 }}
        flexDirection={{ xs: "column", sm: "row" }}
      >
        {endExtention}
        {Modal && (
          <>
            <Button onClick={showModal} variant="filled" {...modalButtonProps}>
              {modalButtonText}
            </Button>
            <Modal modalRef={modalRef} onClose={closeModal} {...modalProps} />
          </>
        )}
        {linkButtonText && linkProps && (
          <Box
            component={Link}
            width={{ xs: "100%", sm: "auto" }}
            order={{ xs: 1, sm: 2 }}
            {...linkProps}
          >
            <Button
              variant="filled"
              {...linkButtonProps}
              sx={{ width: { xs: "100%", sm: "auto" }, ...linkButtonProps?.sx }}
            >
              {linkButtonText}
            </Button>
          </Box>
        )}
      </Box>

      {children}
    </Box>
  );
}

export type TitleHeaderProps = {
  title: string;
  fontSize?: number;
  showBackButton?: boolean;
  children?: React.ReactNode;
  backLink?: string;
  modalButtonText?: string;
  showCrossButton?: boolean;
  center?: boolean;
  linkProps?: LinkProps & BoxProps;
  headerProps?: TypographyProps;
  linkButtonProps?: ButtonProps;
  linkButtonText?: string;
  modalButtonProps?: ButtonProps;
  modalProps?: Omit<ModalTypes, "modalRef" | "onClose">;
  Modal?: ComponentType<ModalTypes> | typeof Fragment;
  endExtention?: React.ReactNode;
};
