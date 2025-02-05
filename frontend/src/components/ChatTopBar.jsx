import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { IconButton, Typography, Avatar } from "@mui/material";

const ChatTopBar = () => {
  const { selectedUser, setSelectedUser } = useChatStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar
            src={selectedUser.profilePic || "/avatar.png"}
            alt={selectedUser.fullName}
            sx={{
              width: 40,
              height: 40,
            }}
          />

          <div>
            <Typography variant="body1" fontWeight="medium">
              {selectedUser.fullName}
            </Typography>
          </div>
        </div>

        <IconButton onClick={() => setSelectedUser(null)}>
          <X />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatTopBar;
