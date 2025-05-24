import React, { useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ChatBaseDtoModelEnum, MessageControllerApi } from "../api";
import { useAuth } from "../context/AuthContext";

const modelLabels: Record<
  (typeof ChatBaseDtoModelEnum)[keyof typeof ChatBaseDtoModelEnum],
  string
> = {
  [ChatBaseDtoModelEnum.DeepseekR1]: "Logical",
  [ChatBaseDtoModelEnum.DeepseekCoder]: "Coder",
  [ChatBaseDtoModelEnum.DeepseekV3]: "Chat",
};

interface ChatMessagesProps {
  chatId: string;
  initialModel: ChatBaseDtoModelEnum | undefined;
  messageApi: MessageControllerApi;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  chatId,
  initialModel,
  messageApi
}) => {
  const [selectedModel, setSelectedModel] = useState(
    initialModel
  );

  const handleModelChange = (event: any) => {
    const newModel = event.target.value;
    setSelectedModel(newModel);
    // TODO: call API or state update if needed
  };

  return (
    <Box sx={{ px: 2, pt: 2 }}>
      <FormControl size="small">
        <InputLabel id="model-select-label">Model</InputLabel>
        <Select
          labelId="model-select-label"
          value={selectedModel}
          onChange={handleModelChange}
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

      {/* Chat content here */}
      <Box mt={2}>
        {/* TODO: Render chat messages */}
      </Box>
    </Box>
  );
};

export default ChatMessages;