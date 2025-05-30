import ListRenderer from "@Components/ListRenderer/ListRenderer";
import { CenteredBox } from "@Theme/GeneralStyledComponents";
import { Done } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormGroupProps,
  FormHelperText,
  FormLabel,
  FormGroup as MuiFormGroup,
  styled,
} from "@mui/material";
import { AnyObject } from "yup";

export default function CheckBoxGroup({
  value = [],
  onChange,
  label,
  checkBoxContainerProps,
  optionLabelPropName = "label",
  optionValuePropName = "value",

  fields,
  error,
  ...props
}: CheckboxGroupProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = (event.target as HTMLInputElement).value;
    if (value.includes(currentValue)) {
      onChange(value.filter((val) => val !== currentValue));
      return;
    }
    onChange([...value, (event.target as HTMLInputElement).value]);
  };

  return (
    <FormControl fullWidth>
      {Boolean(label) && (
        <FormLabel
          sx={{ "&,&.Mui-focused": { color: "primary.contrastText" } }}
        >
          {label}
        </FormLabel>
      )}
      <MuiFormGroup {...props}>
        <ListRenderer
          data={fields}
          renderItem={({ control, ...rest }) => (
            <Label
              key={rest.value}
              label={rest[optionLabelPropName]}
              {...checkBoxContainerProps}
              {...rest}
              control={
                control ?? (
                  <Checkbox
                    onChange={handleChange}
                    disabled={
                      props?.disabled ||
                      props?.getDisabled?.(rest[optionValuePropName])
                    }
                    checked={value.includes(String(rest[optionValuePropName]))}
                    value={rest[optionValuePropName]}
                    name={rest[optionValuePropName]}
                    icon={<Icon />}
                    checkedIcon={<CheckedIcon />}
                  />
                )
              }
            />
          )}
        />
      </MuiFormGroup>
      {Boolean(error) && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
}

const Label = styled(FormControlLabel, {
  shouldForwardProp: (prop) => prop !== "isSelected",
})<{ isSelected?: boolean }>(({ theme: { palette, spacing } }) => ({
  height: 38,
  "& .MuiTypography-root": {
    fontSize: 18,
    fontWeight: 600,
  },
  color: palette.text.secondary,
  margin: 0,
  borderRadius: spacing(1),
}));
function Icon() {
  return (
    <Box
      mb={0.1}
      flexShrink={0}
      border="1px solid "
      borderColor="primary.main"
      borderRadius={1}
      height={24}
      width={24}
    />
  );
}

function CheckedIcon() {
  return (
    <CenteredBox
      mb={0.1}
      flexShrink={0}
      border="2px solid"
      borderColor="primary.main"
      borderRadius={1}
      height={24}
      width={24}
    >
      <Done sx={{ fontSize: 18 }} />
    </CenteredBox>
  );
}

export type CheckboxGroupProps = {
  value: string[];
  onChange: (value: string[]) => void;
  getDisabled: (value: string) => boolean;
  error?: string;
  label?: string;
  disabled?: boolean;
  checkBoxContainerProps?: Omit<
    FormControlLabelProps,
    "control" | "value" | "label"
  >;
  fields: AnyObject[];
  name: string;
  optionLabelPropName?: string;
  optionValuePropName?: string;
} & Omit<FormGroupProps, "onChange">;
