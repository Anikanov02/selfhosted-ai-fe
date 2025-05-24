import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ChatMessages from "./ChatMessages";
import MessageInput from "./MessageInput";
import { ChatBaseDtoModelEnum } from "../api";

type Props = {
  chatId: string;
};

const ChatWindow = ({ chatId }: Props) => {
  const [model, setModel] = useState("DEEPSEEK_R1");

  useEffect(() => {
    if (chatId) {
      // TODO: Fetch model for chat via GET /chats/:id/model
    }
  }, [chatId]);

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Box flex={1} overflow="auto">
        <ChatMessages chatId={chatId} initialModel={ChatBaseDtoModelEnum.DeepseekR1} />
      </Box>
      <MessageInput chatId={chatId} />
    </Box>
  );
};

export default ChatWindow;