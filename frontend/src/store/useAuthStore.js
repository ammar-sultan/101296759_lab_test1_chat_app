import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

// Helper function for API requests
const apiRequest = async (method, url, data = null) => {
  try {
    const res =
      method === "post" || method === "put"
        ? await axiosInstance[method](url, data)
        : await axiosInstance[method](url);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  // Check if the user is authenticated
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const data = await apiRequest("get", "/auth/check");
      set({ authUser: data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // Handle signup
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const userData = await apiRequest("post", "/auth/signup", data);
      set({ authUser: userData });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  // Handle login
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const userData = await apiRequest("post", "/auth/login", data);
      set({ authUser: userData });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // Handle logout
  logout: async () => {
    try {
      await apiRequest("post", "/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.message);
    }
  },

  // Update user profile
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const updatedData = await apiRequest("put", "/auth/update-profile", data);
      set({ authUser: updatedData });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in update profile:", error);
      toast.error(error.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  // Manage socket connection
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: { userId: authUser._id },
    });
    socket.connect();
    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  // Disconnect socket
  disconnectSocket: () => {
    const socket = get().socket;
    if (socket?.connected) socket.disconnect();
  },
}));
