import React, { useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ChatBaseDtoModelEnum, MessageDto } from "../api";

const modelLabels: Record<
  (typeof ChatBaseDtoModelEnum)[keyof typeof ChatBaseDtoModelEnum],
  string
> = {
  [ChatBaseDtoModelEnum.DeepseekR1]: "Logical",
  [ChatBaseDtoModelEnum.DeepseekCoder]: "Coder",
  [ChatBaseDtoModelEnum.DeepseekV3]: "Chat",
};

interface ChatMessagesProps {
  initialModel: ChatBaseDtoModelEnum | undefined;
  messages: MessageDto[];
  handleModelChange: (model: ChatBaseDtoModelEnum) => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  initialModel,
  handleModelChange
}) => {
  const [selectedModel, setSelectedModel] = useState(
    initialModel
  );

  const changeModel = (event: any) => {
    const newModel = event.target.value;
    setSelectedModel(newModel);
    handleModelChange(newModel);
  };

  return (
    <Box sx={{ px: 2, pt: 2 }}>
      <FormControl size="small">
        <InputLabel id="model-select-label">Model</InputLabel>
        <Select
          labelId="model-select-label"
          value={selectedModel}
          onChange={changeModel}
          IconComponent={ArrowDropDownIcon}
          sx={{ minWidth: 120 }}
        >
          {Object.values(ChatBaseDtoModelEnum).map((value) => (
            <MenuItem key={value} value={value}>
              {modelLabels[value]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box mt={2} display="flex" flexDirection="column" gap={1}>
        {messages.map((msg) => (
          <Box
            key={msg.id}
            display="flex"
            justifyContent={msg.userMessage ? "flex-end" : "flex-start"}
          >
            <Box
              sx={{
                bgcolor: msg.userMessage ? "#DCF8C6" : "#E0E0E0",
                px: 2,
                py: 1,
                borderRadius: 2,
                maxWidth: "70%",
                whiteSpace: "pre-wrap",
              }}
            >
              {msg.text}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ChatMessages;