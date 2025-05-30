import { FormHelperText, SxProps } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";

export default function OtpInput({ error, sx, ...props }: OtpInputProps) {
  return (
    <>
      <MuiOtpInput
        {...props}
        // @ts-ignore
        inputMode="numeric"
        TextFieldsProps={{
          inputProps: {
            type: "number",
          },
        }}
        // @ts-ignore
        validateChar={(value) => !isNaN(value)}
        sx={{
          "& .MuiInputBase-root": {
            backgroundColor: "custom.bgInput",
            "& .MuiInputBase-input": {
              border: "1px solid",
              borderRadius: 2,
              borderColor: "primary.light",
              height: 40,
              fontSize: 20,
            },
            "&.Mui-focused": {
              "& .MuiInputBase-input": {
                border: "1px solid primary.main",
              },
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          ...sx,
        }}
      />
      <FormHelperText error> {error}</FormHelperText>
    </>
  );
}

export type OtpInputProps = {
  error: string;
  sx: SxProps;
};
