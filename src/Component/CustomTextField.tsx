import { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import type { TextFieldProps } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type Props = TextFieldProps & {
  name: string;
  formik?: any;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  sizeVariant?: "small" | "medium";
  borderColor?: string;
  focusBorderColor?: string;
  hoverBorderColor?: string;
  labelname?: string;
  height?: number;
};

export default function CustomTextField({
  name,
  formik,
  type = "text",
  startIcon,
  endIcon,
  sizeVariant = "medium",
  borderColor = "var(--border-soft)",
  focusBorderColor = "var(--primary)",
  hoverBorderColor = "var(--primary)",
  labelname,
  height = 40,
  sx,

  //@ts-ignore
  InputProps,
  ...rest
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const error = formik?.touched?.[name] && Boolean(formik?.errors?.[name]);
  const helperText = formik?.touched?.[name] && formik?.errors?.[name];

  const inputType = isPassword
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div>
      {labelname && <p style={{ marginBottom: 6 }}>{labelname}</p>}

      <TextField
        fullWidth
        name={name}
        type={inputType}
        size={sizeVariant}
        value={formik ? formik.values[name] : rest.value}
        onChange={formik ? formik.handleChange : rest.onChange}
        onBlur={formik ? formik.handleBlur : rest.onBlur}
        error={error}
        helperText={helperText}
        variant="outlined"
        {...rest}
        //@ts-ignore
        InputProps={{
          ...(InputProps || {}),

          startAdornment: startIcon ? (
            <InputAdornment position="start">
              {startIcon}
            </InputAdornment>
          ) : undefined,

          endAdornment: isPassword ? (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((p) => !p)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : endIcon ? (
            <InputAdornment position="end">
              {endIcon}
            </InputAdornment>
          ) : undefined,
        }}
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            height: height,
            "& fieldset": {
              borderColor: borderColor,
              borderWidth: 1.5,
            },
            "&:hover fieldset": {
              borderColor: hoverBorderColor,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: focusBorderColor,
              borderWidth: 2,
              boxShadow: "2px 2px 8px rgba(0,0,0,0.15)",
            },
          },
          "& .MuiFormHelperText-root": {
            marginLeft: 0,
          },
          ...sx,
        }}
      />
    </div>
  );
}
