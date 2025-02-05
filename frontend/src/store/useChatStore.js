import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

// Helper function for API requests
const apiRequest = async (method, url, data = null) => {
  try {
    const res =
      method === "post"
        ? await axiosInstance[method](url, data)
        : await axiosInstance[method](url);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  // Get users for chat
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const usersData = await apiRequest("get", "/messages/users");
      set({ users: usersData });
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // Get messages for the selected user
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const messagesData = await apiRequest("get", /messages/${userId});
      set({ messages: messagesData });
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // Send a new message
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const newMessage = await apiRequest(
        "post",
        /messages/send/${selectedUser._id},
        messageData
      );
      set({ messages: [...messages, newMessage] });
    } catch (error) {
      toast.error(error.message);
    }
  },

  // Subscribe to new messages
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  // Unsubscribe from new messages
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  // Set the selected user for chat
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));