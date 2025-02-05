import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, User } from "lucide-react";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        zIndex: 40,
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <div>
          {authUser && (
            <Link to="/profile">
              <Button
                variant="text"
                startIcon={<User />}
                sx={{
                  textTransform: "none",
                  fontSize: "0.875rem",
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <span className="hidden sm:inline">Profile</span>
              </Button>
            </Link>
          )}
        </div>

        {authUser && (
          <div>
            <IconButton onClick={logout} sx={{ color: "text.primary" }}>
              <LogOut />
            </IconButton>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
