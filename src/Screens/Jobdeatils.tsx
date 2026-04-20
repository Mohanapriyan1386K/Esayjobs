import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import type { Post } from "./type";

function Jobdeatils() {
  const navigate = useNavigate();
  const location = useLocation();
  const post = (location.state as { post?: Post } | undefined)?.post;
  const isWalkIn =
    post?.applyType === "walk-in" ||
    !!post?.applyLink?.toLowerCase().includes("walk");
  const applyEmail = post?.applyEmail || post?.details?.applyEmail || "";
  const applyHref =
    post?.applyType === "email"
      ? applyEmail
        ? `mailto:${applyEmail}`
        : ""
      : post?.applyType === "online"
        ? post?.applyLink || ""
        : "";
  const applyTypeLabel = isWalkIn
    ? "Walk-in"
    : post?.applyType === "email"
      ? "Apply by Email"
      : "Apply Online";

  if (!post) {
    return (
      <Box sx={{ maxWidth: 1000, mx: "auto", p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Job details not available.
        </Typography>
        <Button
          variant="contained"
          sx={{ textTransform: "none" }}
          onClick={() => navigate("/jobs")}
        >
          Back to Jobs
        </Button>
      </Box>
    );
  }

  const details = post.details || {};
  const info = [
    { label: "Company", value: post.company || details.companyName },
    { label: "Location", value: post.location || details.interviewLocation },
    { label: "Salary", value: post.salary || details.salaryInfo },
    { label: "Apply Type", value: applyTypeLabel },
    { label: "Apply Link", value: post.applyLink },
    { label: "Apply Email", value: applyEmail },
    { label: "Interview Timings", value: details.interviewTimings },
    { label: "Interview Date", value: details.interviewDate },
    { label: "Job Role", value: details.jobRole },
    { label: "Graduation", value: details.graduation },
    { label: "Year Of Passout", value: details.yearOfPassout },
    { label: "Vacancy", value: details.vacancy },
    { label: "Shift", value: details.shift },
    { label: "Shift Timings", value: details.shiftTimings },
    { label: "Weekly Off", value: details.weeklyOff },
    { label: "Bond And Agreement", value: details.bondAndAgreement },
    { label: "HR Name", value: details.hrName },
    { label: "HR Number", value: details.hrNumber },
    { label: "Rounds", value: details.rounds },
    { label: "Walk-in Info", value: details.walkInInfo },
    { label: "Note", value: details.note },
  ];

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", p: 2 }}>
      <Button
        variant="outlined"
        sx={{ textTransform: "none", mb: 2 }}
        onClick={() => navigate("/jobs")}
      >
        Back
      </Button>

      <Card sx={{ borderRadius: 3, border: "1px solid var(--border-soft)" }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 1,
              mb: 1,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              {post.title}
            </Typography>
            <Chip
              label={applyTypeLabel}
              sx={{ fontWeight: 700 }}
            />
          </Box>

          <Typography sx={{ color: "var(--text-muted)", mb: 2 }}>
            {post.content || post.description || "-"}
          </Typography>

          <Grid container spacing={2}>
            {info.map((item) => (
              <Grid size={{ xs: 12, sm: 6 }} key={item.label}>
                <Box
                  sx={{
                    border: "1px solid var(--border-soft)",
                    borderRadius: 2,
                    p: 1.5,
                    height: "100%",
                  }}
                >
                  <Typography sx={{ fontSize: 12, color: "var(--text-muted)" }}>
                    {item.label}
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    {item.value || "-"}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          {applyHref && (
            <Button
              component="a"
              href={applyHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              sx={{ textTransform: "none", mt: 2 }}
            >
              {post?.applyType === "email" ? "Apply via Email" : "Apply Now"}
            </Button>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default Jobdeatils;
