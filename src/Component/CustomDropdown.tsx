import { useState, useRef, useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

type CustomDropdownProps = {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
};

export default function CustomDropdown({
  label,
  value,
  options,
  onChange,
}: CustomDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <p>{label}</p>
      <Box sx={{ position: "relative", minWidth: 150 }} ref={dropdownRef}>
        <Box
          sx={{
            border: "1px solid var(--border-soft)",
            borderRadius: 2,
            px: 2,
            py: 1,
            cursor: "pointer",
            backgroundColor: "var(--bg-surface)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            "&:hover": { borderColor: "var(--primary)" },
            "&:focus": {
              borderColor: "var(--primary) !important ",
              outline: "none",
              boxShadow: "0 0 0 2px rgba(18, 62, 168, 0.2) !important",
            },
          }}
          onClick={() => setOpen(!open)}
        >
          <Typography sx={{ color: value ? "inherit" : "#94a3b8" }}>
            {value ? options.find((o) => o.value === value)?.label : label}
          </Typography>
          <ArrowDropDownIcon
            sx={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "0.2s",
            }}
          />
        </Box>

        {open && (
          <Box
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              border: "1px solid var(--border-soft)",
              borderRadius: 1,
              backgroundColor: "var(--bg-surface)",
              zIndex: 10,
              mt: 0.5,
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            }}
          >
            <Stack>
              {options.map((opt) => (
                <Box
                  key={opt.value}
                  sx={{
                    px: 2,
                    py: 1,
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "var(--primary) !important",
                      color: "white",
                    },
                  }}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                >
                  {opt.label}
                </Box>
              ))}
            </Stack>
          </Box>
        )}
      </Box>
    </div>
  );
}
