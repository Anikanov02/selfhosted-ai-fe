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

//TODO move it to where enum is
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
  isAiTyping: boolean
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  initialModel,
  handleModelChange,
  isAiTyping
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

        {isAiTyping && (
          <Box display="flex" justifyContent="flex-start">
            <Box
              sx={{
                bgcolor: "#E0E0E0",
                px: 2,
                py: 1,
                borderRadius: 2,
                maxWidth: "70%",
                display: "inline-flex",
                gap: "4px",
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  bgcolor: "#888",
                  borderRadius: "50%",
                  animation: "bounce 1s infinite ease-in-out",
                  animationDelay: "0s",
                }}
              />
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  bgcolor: "#888",
                  borderRadius: "50%",
                  animation: "bounce 1s infinite ease-in-out",
                  animationDelay: "0.2s",
                }}
              />
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  bgcolor: "#888",
                  borderRadius: "50%",
                  animation: "bounce 1s infinite ease-in-out",
                  animationDelay: "0.4s",
                }}
              />
            </Box>
          </Box>
        )}
      </Box>

      {/* Keyframes injected via global style //TODO move to styles */}
      <style>
        {`
          @keyframes bounce {
            0%, 80%, 100% { transform: scale(0.8); opacity: 0.3; }
            40% { transform: scale(1.2); opacity: 1; }
          }
        `}
      </style>
    </Box>
  );
};

export default ChatMessages;