import React, { useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { MessageControllerApi } from "../api";

type Props = {
  chatId: string | null;
  messageApi: MessageControllerApi
};

const MessageInput = ({ chatId, messageApi }: Props) => {
  const [prompt, setPrompt] = useState("");

  const handleSend = async () => {
    if (!chatId || !prompt.trim()) return;

    // TODO: Call POST /chats/:chatId/messages with { content: prompt }
    console.log("Sending message to chat:", chatId, prompt);

    setPrompt("");
  };

  return (
    <Box display="flex" p={2} borderTop="1px solid #eee">
      <TextField
        fullWidth
        multiline
        maxRows={4}
        placeholder="Type your message..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      <IconButton color="primary" onClick={handleSend} disabled={!prompt.trim()}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default MessageInput;