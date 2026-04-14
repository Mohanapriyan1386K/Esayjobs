import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
  Menu,
  Divider,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../Redux/Slice/ModalSlice";
import type { RootState } from "../Redux/store";
import useResponsive from "../Hooks/CustomHooks";

const navLinks = [
  { label: "About", path: "/" },
  { label: "Job", path: "/jobs" },
  { label: "My Post", path: "/userposts", private: true },
];
const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const {isMobile}=useResponsive()

  const dispatch = useDispatch();
  const { isAuthenticated, userdata } = useSelector(
    (state: RootState) => state.auth,
  );

  const toggleDrawer = (state: any) => () => {
    setOpen(state);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    navigate("/userposts");
  };

  const handelmodalOpen = (method: "login" | "signup" | "Logout") => {
    console.log("open modal");
    dispatch(
      openModal({
        modalname:
          method == "login"
            ? "LOGIN"
            : method == "signup"
              ? "SIGNUP"
              : method == "Logout"
                ? "CONFIRMATIONMODAL"
                : "",
        data: {
          size: "xs",
          title:
            method == "login"
              ? "Login"
              : method == "signup"
                ? "SignUp"
                : method == "Logout"
                  ? "Logout"
                  : "",
          userdata: userdata,
          type: method == "Logout" ? "logout" : "",
        },
      }),
    );
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid var(--border-soft)",
        }}
      >
        <Container>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            {/* Logo */}
            <Box component={Link} to="/" sx={{ display: "inline-block" }}>
              <img src="/logomain.png" alt="MyJobs" style={{ height: 50 }} />
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 3,
              }}
            >
              {navLinks
                .filter((item) => !item.private || isAuthenticated)
                .map((item) => {
                  const isActive = location.pathname === item.path;

                  return (
                    <Button
                      key={item.path}
                      component={Link}
                      to={item.path}
                      sx={{
                        color: isActive
                          ? "var(--primary)"
                          : "var(--text-muted)",
                        fontWeight: isActive ? 600 : 400,
                        borderBottom: isActive
                          ? "2px solid var(--primary)"
                          : "2px solid transparent",
                        borderRadius: 0,
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "transparent",
                          color: "var(--primary)",
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  );
                })}
            </Box>

            {!isAuthenticated && (
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  gap: 2,
                }}
              >
                <Button
                  // Use a plain button so the click only opens the modal
                  component="button"
                  onClick={() => handelmodalOpen("login")}
                  sx={{ textTransform: "none", color: "var(--text-main)" }}
                >
                  Login
                </Button>

                <Button
                  component="button"
                  onClick={() => handelmodalOpen("signup")}
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    borderRadius: "20px",
                    px: 3,
                    backgroundColor: "var(--primary)",
                    "&:hover": { backgroundColor: "var(--primary-dark)" },
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            )}

            {isAuthenticated && !isMobile &&(
              <Box>
                {/* Profile Click */}
                <Box
                  onClick={handleMenuOpen}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer",
                  }}
                >
                  <Avatar>{}</Avatar>
                  <Typography sx={{ color: "var(--text-main)" }}>
                    {userdata?.user?.name}
                  </Typography>
                </Box>

                {/* Dropdown */}
                <Menu
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  {/* Profile Info */}
                  <Box sx={{ px: 2, py: 1 }}>
                    <Typography>{userdata?.user?.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {userdata?.user?.email}
                    </Typography>
                  </Box>

                  <Divider />

                  {/* Menu Items */}
                  <MenuItem onClick={handleMenuClose}>My Posts</MenuItem>

                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      handelmodalOpen("Logout");
                    }}
                    sx={{ color: "var(--secondary)" }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            )}

            {/* Mobile Menu Icon */}
            <IconButton
              sx={{
                display: { xs: "flex", md: "none" },
                color: "var(--text-main)",
              }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        //@ts-ignore
        PaperProps={{ sx: { backgroundColor: "var(--bg-surface)" } }}
      >
        <Box sx={{ width: 250,padding:1 }} role="presentation">
          {isAuthenticated && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar />

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <span>{userdata?.user?.name}</span>
                <span>{userdata?.user?.email}</span>
              </Box>
            </Box>
          )}
          <List>
            {navLinks
              .filter((item) => !item.private || isAuthenticated)
              .map((item) => (
                <ListItem key={item.path} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    onClick={toggleDrawer(false)}
                  >
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}

            {isAuthenticated && (
              <ListItem>
                <Button
                  sx={{
                    backgroundColor: "var(--secondary)",
                    color: "#fff",
                    "&:hover": { backgroundColor: "var(--secondary-dark)" },
                  }}
                  fullWidth
                  // Open modal on mobile too, then close drawer
                  component="button"
                  onClick={() => {
                    handelmodalOpen("Logout");
                    toggleDrawer(false)();
                  }}
                >
                  Logout
                </Button>
              </ListItem>
            )}

            {!isAuthenticated && (
              <div>
                <ListItem>
                  <Button
                    fullWidth
                    // Open modal on mobile too, then close drawer
                    component="button"
                    onClick={() => {
                      handelmodalOpen("login");
                      toggleDrawer(false)();
                    }}
                  >
                    Login
                  </Button>
                </ListItem>

                <ListItem>
                  <Button
                    fullWidth
                    variant="contained"
                    component="button"
                    onClick={() => {
                      handelmodalOpen("signup");
                      toggleDrawer(false)();
                    }}
                  >
                    Sign Up
                  </Button>
                </ListItem>
              </div>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
