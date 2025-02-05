import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarLoader from "./loaders/SidebarLoader";
import { Users } from "lucide-react";
import { Box, Button, Typography } from "@mui/material";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarLoader />;

  return (
    <Box
      sx={{
        height: "100%",
        width: { xs: 80, lg: 280 },
        borderRight: 1,
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        transition: "all 200ms",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider", p: 2 }}>
        <Box display="flex" alignItems="center" gap={1}>
          <Users className="size-6" />
          <Typography
            variant="h6"
            sx={{ display: { xs: "none", lg: "block" } }}
          >
            Contacts
          </Typography>
        </Box>
      </Box>

      <Box sx={{ overflowY: "auto", py: 2 }}>
        {users.map((user) => (
          <Button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            sx={{
              width: "100%",
              p: 2,
              display: "flex",
              gap: 2,
              justifyContent: "flex-start",
              textAlign: "left",
              backgroundColor:
                selectedUser?._id === user._id
                  ? "action.selected"
                  : "transparent",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            <Box sx={{ position: "relative" }}>
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                style={{
                  width: 48,
                  height: 48,
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </Box>
            <Box sx={{ display: { xs: "none", lg: "block" }, minWidth: 0 }}>
              <Typography variant="body2" noWrap>
                {user.fullName}
              </Typography>
            </Box>
          </Button>
        ))}

        {users.length === 0 && (
          <Box sx={{ textAlign: "center", color: "text.secondary", py: 3 }}>
            No users available
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
