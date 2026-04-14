import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
} from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #0f2f7a, #102a63)",
        borderTop: "1px solid rgba(219, 227, 239, 0.2)",
        mt: 5,
        pt: 5,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          
          {/* Portal Info */}
          <Grid size={{xs: 12, sm: 12, md: 4}} >
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#f1f5f9" }}>
              MyJobs
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: "#cbd5e1" }}>
              A modern job portal to discover opportunities and post hiring
              openings quickly.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid size={{xs: 12, sm: 12, md: 4}}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#f1f5f9" }}>
              Quick Links
            </Typography>

            <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="/" underline="none" sx={{ color: "#cbd5e1", "&:hover": { color: "#fecaca" } }}>Home</Link>
              <Link href="/jobs" underline="none" sx={{ color: "#cbd5e1", "&:hover": { color: "#fecaca" } }}>Jobs</Link>
              <Link href="/about" underline="none" sx={{ color: "#cbd5e1", "&:hover": { color: "#fecaca" } }}>About</Link>
              <Link href="/userposts" underline="none" sx={{ color: "#cbd5e1", "&:hover": { color: "#fecaca" } }}>My Posts</Link>
            </Box>
          </Grid>

          {/* Social Links */}
          <Grid size={{xs: 12, sm: 12, md: 4}}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#f1f5f9" }}>
              Follow Us
            </Typography>

            <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="#" underline="none" sx={{ color: "#cbd5e1", "&:hover": { color: "#fecaca" } }}>Facebook</Link>
              <Link href="#" underline="none" sx={{ color: "#cbd5e1", "&:hover": { color: "#fecaca" } }}>Twitter</Link>
              <Link href="#" underline="none" sx={{ color: "#cbd5e1", "&:hover": { color: "#fecaca" } }}>Instagram</Link>
              <Link href="#" underline="none" sx={{ color: "#cbd5e1", "&:hover": { color: "#fecaca" } }}>LinkedIn</Link>
            </Box>
          </Grid>

        </Grid>

        {/* Bottom */}
        <Box
          sx={{
            textAlign: "center",
            mt: 4,
            pt: 2,
            borderTop: "1px solid rgba(219, 227, 239, 0.25)",
          }}
        >
          <Typography variant="body2" sx={{ color: "#94a3b8" }}>
            (c) {new Date().getFullYear()} MyBlog. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
