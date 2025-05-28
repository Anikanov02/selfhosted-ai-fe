import { useState } from "react";
import { Box, TextField, IconButton, FormControl, InputLabel, Select, MenuItem, Stack } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SendIcon from "@mui/icons-material/Send";
import { ChatBaseDtoModelEnum, ChatDto } from "../api";

type Props = {
  selectedChat: ChatDto | null;
  handleModelChange: (model: ChatBaseDtoModelEnum) => void;
  handleSend: (prompt: string) => void;
};
//TODO move it to where enum is
const modelLabels: Record<
  (typeof ChatBaseDtoModelEnum)[keyof typeof ChatBaseDtoModelEnum],
  string
> = {
  [ChatBaseDtoModelEnum.DeepseekR1]: "Logical",
  [ChatBaseDtoModelEnum.DeepseekCoder]: "Coder",
  [ChatBaseDtoModelEnum.DeepseekV3]: "Chat",
};

const MessageInput = ({ handleSend, handleModelChange, selectedChat }: Props) => {
  const [prompt, setPrompt] = useState("");

  const changeModel = (event: any) => {
    const newModel = event.target.value;
    handleModelChange(newModel);
  };

  return (
    <Box p={2} borderTop="1px solid #eee">
      <Stack direction="row" spacing={2} alignItems="flex-end">
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="model-select-label">Model</InputLabel>
          <Select
            labelId="model-select-label"
            value={selectedChat?.model ?? ""}
            onChange={changeModel}
            IconComponent={ArrowDropDownIcon}
            label="Model"
          >
            {Object.values(ChatBaseDtoModelEnum).map((value) => (
              <MenuItem key={value} value={value}>
                {modelLabels[value]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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

        <IconButton
          color="primary"
          onClick={() => {
            handleSend(prompt);
            setPrompt("");
          }}
          disabled={!prompt.trim()}
          sx={{ alignSelf: "flex-end" }}
        >
          <SendIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default MessageInput;