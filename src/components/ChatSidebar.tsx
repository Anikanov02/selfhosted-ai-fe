import React from "react";
import { Box, List, ListItemButton, Typography } from "@mui/material";

type ChatSummary = {
  id: string;
  title: string;
};

type Props = {
  selectedChatId: string | null;
  onSelectChat: (id: string) => void;
};

const ChatSidebar = ({ selectedChatId, onSelectChat }: Props) => {
  const chats: ChatSummary[] = [
    // TODO: Replace with fetched chat list
    { id: "1", title: "Logical Reasoning" },
    { id: "2", title: "Code Help" },
  ];

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Chats
      </Typography>
      <List>
        {chats.map((chat) => (
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