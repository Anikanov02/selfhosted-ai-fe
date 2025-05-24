import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ChatMessages from "./ChatMessages";
import MessageInput from "./MessageInput";
import { ChatBaseDtoModelEnum, ChatControllerApi, ChatDto, MessageControllerApi } from "../api";
import { useAuth } from "../context/AuthContext";

type Props = {
  chatId: string;
  messageApi: MessageControllerApi,
  chatApi: ChatControllerApi
};

const ChatWindow = ({ chatId, messageApi, chatApi }: Props) => {
  const [selectedChat, setSelectedChat] = useState<ChatDto | null>(null);

  useEffect(() => {
    const getChat = async () => {
      if (chatId) {
        setSelectedChat(await chatApi.getChat({id: chatId}));
      }
    }

    getChat();
  }, [chatId]);

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Box flex={1} overflow="auto">
        <ChatMessages chatId={chatId} initialModel={selectedChat?.model} messageApi={messageApi} />
      </Box>
      <MessageInput chatId={chatId} messageApi={messageApi} />
    </Box>
  );
};

export default ChatWindow;