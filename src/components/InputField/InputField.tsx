import BasicTextInput, {
  BasicInputProps,
} from "@Components/Inputs/BasicTextInput";
import { ComponentType, ReactNode } from "react";
import { UseFormReturn, useController } from "react-hook-form";

function InputField<T = BasicInputProps>({
  trigger = "onChange",
  blurTrigger = "onBlur",
  valuePropName = "value",
  refName = "inputRef",
  component: Component = BasicTextInput,
  children,
  getValueOnChange,
  control,
  readOnly,
  disabled,
  ...rest
}: InputFieldProps<T>) {
  const {
    field: { onBlur, onChange, value = "", ref },
    fieldState: { error, isTouched },
  } = useController({ control, disabled: disabled && !readOnly, ...rest });

  function handleChange(...args: any[]) {
    onChange(...args);
    getValueOnChange?.(rest.name, ...args);
  }

  return (
    <Component
      {...{
        [valuePropName]: value,
        [trigger]: handleChange,
        [blurTrigger]: onBlur,
        [refName]: ref,
      }}
      inputRef={ref}
      error={isTouched || error ? error?.message : undefined}
      disabled={disabled}
      readOnly={readOnly}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default InputField;

export type InputFieldProps<T> = {
  trigger?: string;
  name: string;
  blurTrigger?: string;
  control: UseFormReturn<any>["control"];
  valuePropName?: string;
  getValueOnChange?: (...args: any[]) => any;
  component?: ComponentType<any>;
  refName?: string;
  disabled?: boolean;
  readOnly?: boolean;
  children?: ReactNode;
  length?: number;
} & Omit<T, "value" | "onChange" | "error">;
