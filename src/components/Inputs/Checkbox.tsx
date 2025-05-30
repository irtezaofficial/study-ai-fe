import { CenteredBox } from "@Theme/GeneralStyledComponents";
import {
  FormControlLabel,
  FormControlLabelProps,
  CheckboxProps as MuiCheckboxProps,
  Checkbox as MuiCheckBox,
  Radio,
  RadioProps,
  CircularProgress,
} from "@mui/material";
import { ComponentType } from "react";

export default function Checkbox<T = any>({
  isRadio,
  controlComponentProps,
  ControlComponent,
  isLoading,
  disabled,
  checkBoxValue = "",
  onChange,
  ...rest
}: CheckboxProps<T>) {
  const Component = ControlComponent ?? (isRadio ? Radio : MuiCheckBox);
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange?.({ checked: event.target.checked, value: event.target.value });
  }
  return (
    <FormControlLabel
      {...rest}
      onChange={handleChange as any}
      value={checkBoxValue}
      disabled={disabled || isLoading}
      control={
        <Component
          {...(isLoading && {
            icon: <LoadingIcon />,
            checkedIcon: <LoadingIcon />,
          })}
          {...controlComponentProps}
        />
      }
    />
  );
}

function LoadingIcon() {
  return (
    <CenteredBox borderRadius="100%" width={20} height={20}>
      <CircularProgress size={12} />
    </CenteredBox>
  );
}

export type CheckboxProps<T> = {
  isRadio?: boolean;
  controlComponentProps?: RadioProps & MuiCheckboxProps & T;
  isLoading?: boolean;
  onChange?: (event: { checked: boolean; value: string }) => void;
  checkBoxValue?: string;
  ControlComponent?: ComponentType<any>;
} & Omit<FormControlLabelProps, "control" | "onChange">;
