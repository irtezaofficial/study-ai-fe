import { ChipsList } from "@Components/ChipList/ChipList";
import { Clear, KeyboardArrowDown } from "@mui/icons-material";
import {
  CircularProgress,
  FormControl,
  FormControlProps,
  FormHelperText,
  IconButton,
  InputLabel,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { CenteredBox } from "@Theme/GeneralStyledComponents";

import { ReactNode, useReducer } from "react";
import { AnyObject } from "yup";
function Select({
  options,
  error,
  label,
  formControlProps,
  inputRef,
  disabled,
  placeholder,
  multiple,
  optionValuePropName = "value",
  optionLabelPropName = "label",
  value = "",
  name,
  isLoading,
  onClear,
  renderLabel,
  meta,
  ...rest
}: SelectProps) {
  const [isOpen, toggle] = useReducer((state) => !state, false);
  function handleClear() {
    onClear?.(name);
  }

  function IconComponent() {
    if (isLoading)
      return (
        <CenteredBox mr={1}>
          <CircularProgress size={15} />
        </CenteredBox>
      );

    if (Boolean(multiple ? value?.length : value) && Boolean(onClear)) {
      return (
        <IconButton
          onClick={handleClear}
          sx={{ padding: 0.5, mr: 1, color: "common.black" }}
        >
          <Clear sx={{ fontSize: 20 }} />
        </IconButton>
      );
    }

    return (
      <CenteredBox
        mr={1}
        onClick={disabled ? undefined : toggle}
        sx={{ cursor: disabled ? "not-allowed" : "pointer" }}
      >
        <KeyboardArrowDown />
      </CenteredBox>
    );
  }

  function chipRenderValue(selected: AnyObject[]) {
    if (!selected.length) return placeholder;
    const values = options.filter((item) =>
      selected.includes(item[optionValuePropName])
    );
    return (
      <ChipsList
        sx={{ height: "95%" }}
        data={values}
        valuePropName={optionLabelPropName}
      />
    );
  }

  function handleFetchMore(e: React.UIEvent<HTMLElement>) {
    // handleFetchOnScroll(e, meta!);
  }

  return (
    <FormControl variant="outlined" fullWidth {...formControlProps}>
      {label && <InputLabel>{label}</InputLabel>}
      <MuiSelect
        open={isOpen}
        onOpen={toggle}
        onClose={toggle}
        {...(multiple && { renderValue: chipRenderValue })}
        name={name}
        MenuProps={{
          slotProps: {
            paper: {
              sx: { maxHeight: 300, borderRadius: 2 },
              ...(meta && { onScroll: handleFetchMore }),
            },
          },
        }}
        disabled={isLoading || disabled}
        multiple={multiple}
        displayEmpty
        inputRef={inputRef}
        IconComponent={IconComponent}
        value={multiple && !value?.length ? [] : value ?? ""}
        {...rest}
        error={Boolean(error)}
      >
        <MenuItem sx={{ display: "none" }} value="">
          {placeholder}
        </MenuItem>
        {options.map((item) => (
          <MenuItem
            key={item[optionValuePropName]}
            value={item[optionValuePropName]}
          >
            {renderLabel?.(item) ?? item[optionLabelPropName]}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && (
        <FormHelperText sx={{ ml: 0 }} error>
          {error}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export default Select;

export type SelectProps = {
  optionValuePropName?: string;
  optionLabelPropName?: string;
  formControlProps: FormControlProps;
  options: AnyObject[];
  label?: string;
  value: any;
  onClear?: (name?: string) => void;
  renderLabel?: (props: AnyObject) => ReactNode;
  isLoading?: boolean;
  meta?: Partial<UseInfiniteQueryResult<any, any>>;
} & MuiSelectProps;
