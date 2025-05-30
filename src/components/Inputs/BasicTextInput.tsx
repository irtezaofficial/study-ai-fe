import { Box, TextField, TextFieldProps, styled } from '@mui/material';
import React from 'react';
import renderIcon, { IconsType } from './helper';

export default function BasicTextInput({
  icons,
  type = 'text',
  label,
  error,
  value,
  defaultValue,
  showDatePicker = false,
  onChange,
  InputLabelProps,
  required,
  ...rest
}: BasicInputProps) {
  function handleToggleDatePicker(e: React.MouseEvent<HTMLInputElement>) {
    if (showDatePicker) return;
    // @ts-ignore
    e.target.showPicker();
  }

  return (
    <InputWrapperBox>
      <TextField
        label={label}
        {...(type === 'date' && {onClick: handleToggleDatePicker})}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        type={type}
        variant="outlined"
        fullWidth
        helperText={error}
        error={Boolean(error)}
        InputProps={{...(icons ? renderIcon(icons) : {})}}
        {...rest}
      />
    </InputWrapperBox>
  );
}

const InputWrapperBox = styled(Box)(({theme: {palette, spacing}}) => ({
  '&:has(.Mui-error)': {
    '& .MuiInputLabel-root': {
      color: palette.error.main,
    },
    '& .MuiInputAdornment-root': {},
  },
  '& .MuiFormLabel-root': {
    marginBottom: spacing(0.5),
    fontWeight: 600,
    '&, &.Mui-focused': {
      color: palette.text.primary,
    },
  },
}));
export type BasicInputProps = TextFieldProps & {
  icons?: IconsType;
  showDatePicker?: boolean;
};
