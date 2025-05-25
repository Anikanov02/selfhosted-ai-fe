import { useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

type Props = {
  handleSend: (prompt: string) => void;
};

const MessageInput = ({ handleSend }: Props) => {
  const [prompt, setPrompt] = useState("");

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
            handleSend(prompt);
            setPrompt("");
          }
        }}
      />
      <IconButton color="primary" onClick={() => handleSend(prompt)} disabled={!prompt.trim()}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default MessageInput;