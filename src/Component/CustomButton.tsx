import { Button, CircularProgress } from "@mui/material";
import React from "react";

type CustomButtonProps = {
  label: string;
  onClick?: () => void;
  variant?: "text" | "outlined" | "contained";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  backgroundColor?: string;
  height?:number,
  type?: "submit" | "button" | "reset"; // ✅ fixed type
};

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  variant = "contained",
  size = "medium",
  loading = false,
  disabled = false,
  startIcon,
  endIcon,
  fullWidth = false,
  backgroundColor="",
  type = "button",
  height=40
}) => {
  const fillColor = backgroundColor || "var(--primary)";

  return (
    <Button
      onClick={onClick}
      variant={variant}
      size={size}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      startIcon={!loading ? startIcon : null}
      endIcon={!loading ? endIcon : null}
      type={type}
      sx={{
        backgroundColor: variant === "contained" ? fillColor : "transparent",
        textTransform: "none",
        borderRadius: "10px",
        fontWeight: 600,
        borderColor: variant === "outlined" ? "var(--border-soft)" : undefined,
        height:height,
        px: 2.5,
        py: 1,
        color:
          variant === "contained"
            ? "#fff"
            : backgroundColor || "var(--primary)",
        "&:hover": {
          backgroundColor:
            variant === "contained" ? "var(--primary-dark)" : "var(--bg-soft)",
          borderColor: "var(--secondary)",
        },
      }}
    >
      {loading ? <CircularProgress size={20} color="inherit" /> : label}
    </Button>
  );
};

export default CustomButton;
