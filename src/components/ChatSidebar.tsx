import React, { useEffect, useState } from "react";
import { Box, List, ListItemButton, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { ChatBaseDto, ChatControllerApi, ChatDto, PageChatDto } from "../api";

type Props = {
  selectedChatId: string | undefined;
  onSelectChat: (id: string | undefined) => void;
  chatApi: ChatControllerApi;
};

const ChatSidebar = ({ selectedChatId, onSelectChat, chatApi }: Props) => {
  const [chats, setChats] = useState<PageChatDto | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await chatApi.getChats({
        request: { page: 1, size: 100, userId: 'id' },
      })
      setChats(response);
    }

    fetchData();
  }, [])

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Chats
      </Typography>
      <List>
        {chats && chats.content && chats.content.map((chat) => (
          <ListItemButton
            key={chat.id}
            selected={selectedChatId === chat.id}
            onClick={() => onSelectChat(chat.id)}
          >
            {chat.title}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default ChatSidebar;