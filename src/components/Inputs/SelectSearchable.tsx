import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteRenderInputParams,
} from '@mui/material';
import BasicTextInput, {BasicInputProps} from './BasicTextInput';
import React, {SyntheticEvent, useEffect} from 'react';
import {KeyboardArrowDown} from '@mui/icons-material';
import {AnyObject} from 'yup';
import {IconsType} from './helper';

export default function SelectSearchable({
  icons,
  renderInput,
  renderInputProps,
  label,
  placeholder,
  inputRef,
  value,
  onChange,
  optionValuePropName = 'value',
  optionLabelPropName = 'label',
  multiple,
  error,
  ...props
}: SelectSearchableProps) {
  const renderDefaultInput = (params: AutocompleteRenderInputParams) => {
    return (
      <BasicTextInput
        icons={icons}
        inputRef={inputRef}
        placeholder={placeholder}
        label={label}
        error={error}
        {...params}
        {...renderInputProps}
      />
    );
  };
  useEffect(() => {
    if (Boolean(value)) return;
    if (multiple) {
      value = [];
    } else {
      value = '';
    }
  }, []);

  function handleChange(
    event: SyntheticEvent<Element, Event>,
    value: AnyObject,
  ) {
    onChange?.(multiple ? value : value?.[optionValuePropName] ?? value);
  }

  function getOptionLabel(option: AnyObject) {
    return option[optionLabelPropName] ?? option;
  }

  function isOptionEqualToValue(option: AnyObject, value: AnyObject) {
    return (
      option[optionValuePropName] ===
      (multiple ? value?.[optionValuePropName] : value)
    );
  }

  return (
    <Autocomplete
      value={value}
      multiple={multiple}
      popupIcon={<KeyboardArrowDown />}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      {...props}
      onChange={handleChange}
      renderInput={renderInput ?? renderDefaultInput}
    />
  );
}

export type SelectSearchableProps = Omit<
  AutocompleteProps<any, any, any, any>,
  'renderInput' | 'onChange' | 'renderInputProps'
> & {
  icons?: IconsType;
  onChange?: (value: any) => void;
  renderInputProps?: AutocompleteRenderInputParams | BasicInputProps;
  inputRef?: React.MutableRefObject<HTMLInputElement>;
  label?: string;
  error?: boolean;
  placeholder?: string;
  optionValuePropName?: string;
  optionLabelPropName?: string;
  renderInput?: (params: AutocompleteRenderInputParams) => JSX.Element;
};
