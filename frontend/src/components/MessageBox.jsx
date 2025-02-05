import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Send } from "lucide-react";
import { Button, Input } from "@mui/material";

const MessageBox = () => {
  const [text, setText] = useState("");
  const { sendMessage } = useChatStore();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await sendMessage({ text: text.trim() });

      setText("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full">
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1">
          <Input
            fullWidth
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{ borderRadius: 2, paddingRight: 8 }}
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ borderRadius: "50%", padding: 1 }}
          disabled={!text.trim()}
        >
          <Send size={22} />
        </Button>
      </form>
    </div>
  );
};

export default MessageBox;
