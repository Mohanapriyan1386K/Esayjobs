import React from "react";
import { Box, Grid } from "@mui/material";
import CustomTextField from "../Component/CustomTextField";
import CustomButton from "../Component/CustomButton";

const FilterContent = React.memo(
  ({ filter, setFilter, handleSearch, handleClear }:any) => {
    return (
      <Box
        sx={{
          p: 2,
          borderRadius: 3,
          border: "1px solid var(--border-soft)",
          backgroundColor: "var(--bg-surface)",
          boxShadow: "var(--shadow-soft)",
          mb: 2.5,
        }}
      >
        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <CustomTextField
              name="title"
              placeholder="Search by Job title"
              value={filter.title}
              onChange={(e) =>
                setFilter((prev:any) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              labelname="Job Title"
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <CustomTextField
              labelname="Company Name"
              name="companyname"
              placeholder="Enter company name"
              value={filter.companyname}
              onChange={(e) =>
                setFilter((prev:any) => ({
                  ...prev,
                  companyname: e.target.value,
                }))
              }
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <CustomTextField
              labelname="From Date"
              type="date"
              name="fromdate"
              value={filter.fromdate}
              onChange={(e) =>
                setFilter((prev:any) => ({
                  ...prev,
                  fromdate: e.target.value,
                }))
              }
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <CustomTextField
              labelname="To Date"
              name="todate"
              type="date"
              value={filter.todate}
              onChange={(e) =>
                setFilter((prev:any) => ({
                  ...prev,
                  todate: e.target.value,
                }))
              }
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 1 }}>
            <CustomButton
              label="Search"
              variant="contained"
              onClick={handleSearch}
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 1 }}>
            <CustomButton
              label="Clear"
              variant="outlined"
              onClick={handleClear}
              fullWidth
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
);

export default FilterContent;
