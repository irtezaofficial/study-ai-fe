import {
  ButtonProps,
  IconButton,
  InputAdornment,
  InputAdornmentProps,
} from "@mui/material";
import { AnyObject } from "yup";

export type IconsType = {
  end?: {
    icon: any;
    onClick?: () => void;
    buttonProps?: ButtonProps;
  };
  start?: {
    icon: any;
    onClick?: () => void;
    buttonProps?: ButtonProps;
  };
};

enum Adornments {
  "start" = "startAdornment",
  "end" = "endAdornment",
}

export default function renderIcon(icons: IconsType) {
  const adornments: AnyObject = {};
  Object.entries(icons ?? {})?.map(
    ([position, { icon: Icon, onClick, buttonProps }]) => {
      adornments[Adornments[position as InputAdornmentProps["position"]]] = (
        <InputAdornment position={position as InputAdornmentProps["position"]}>
          <IconButton
            sx={{padding: 0}}
            disableRipple={!onClick}
            onClick={onClick}
            {...buttonProps}
          >
            {Icon}
          </IconButton>
        </InputAdornment>
      );
    }
  );
  return adornments;
}
