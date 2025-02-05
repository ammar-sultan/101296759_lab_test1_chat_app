import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

// Error handler wrapper
const asyncHandler = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUsersForSidebar = asyncHandler(async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user._id } })
    .select("-password")
    .lean();
  res.status(200).json(users);
});

export const getMessages = asyncHandler(async (req, res) => {
  const { id: userToChatId } = req.params;
  const myId = req.user._id;

  const messages = await Message.find({
    $or: [
      { senderId: myId, receiverId: userToChatId },
      { senderId: userToChatId, receiverId: myId },
    ],
  }).lean();

  res.status(200).json(messages);
});

export const sendMessage = asyncHandler(async (req, res) => {
  const { text, image } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  const imageUrl = image
    ? (await cloudinary.uploader.upload(image)).secure_url
    : null;

  const newMessage = await Message.create({
    senderId,
    receiverId,
    text,
    image: imageUrl,
  });

  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) io.to(receiverSocketId).emit("newMessage", newMessage);

  res.status(201).json(newMessage);
});
