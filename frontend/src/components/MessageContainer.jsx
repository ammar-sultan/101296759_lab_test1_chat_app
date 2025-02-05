import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Avatar, Box, Typography } from "@mui/material";

import ChatTopBar from "./ChatTopBar";
import MessageBox from "./MessageBox";
import ChatLoader from "./loaders/ChatLoader";
import { formatMessageTime } from "../lib/utils";

const MessageContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <Box className="flex-1 flex flex-col overflow-auto">
        <ChatTopBar />
        <ChatLoader />
        <MessageBox />
      </Box>
    );
  }

  return (
    <Box className="flex-1 flex flex-col overflow-auto">
      <ChatTopBar />
      <Box className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <Box
            key={message._id}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <Box className="chat-image avatar">
              <Avatar
                src={
                  message.senderId === authUser._id
                    ? authUser.profilePic || "/avatar.png"
                    : selectedUser.profilePic || "/avatar.png"
                }
                alt="profile pic"
                sx={{ width: 40, height: 40 }}
              />
            </Box>

            <Box className="chat-header mb-1">
              <Typography
                variant="caption"
                sx={{ marginLeft: 1, opacity: 0.5 }}
              >
                {formatMessageTime(message.createdAt)}
              </Typography>
            </Box>

            <Box className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <Typography>{message.text}</Typography>}
            </Box>
          </Box>
        ))}
      </Box>
      <MessageBox />
    </Box>
  );
};

export default MessageContainer;
