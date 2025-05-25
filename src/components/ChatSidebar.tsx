import { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ChatControllerApi, ChatDto, ChatDtoModelEnum, PagedModel } from "../api";

type Props = {
  selectedChatId: string | undefined;
  onSelectChat: (id: string | undefined) => void;
  chatApi: ChatControllerApi;
};

// TODO: handle pages
const ChatSidebar = ({ selectedChatId, onSelectChat, chatApi }: Props) => {
  const [chats, setChats] = useState<PagedModel>();
  const [page, setPage] = useState<number>(0);

  const getChats = async () => {
    const response = await chatApi.getChats({ page, size: 100 });
    setChats(response);
  };

  const createChat = async () => {
    await chatApi.createChat({
      chatBaseDto: {
        title: "New Chat",
        model: ChatDtoModelEnum.DeepseekCoder,
      },
    });
    getChats();
  };

  useEffect(() => {
    getChats();
  }, []);

  return (
    <Box p={2}>
      {/* Header with title and + button */}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" gutterBottom>
          Chats
        </Typography>
        <IconButton
          aria-label="add chat"
          size="small"
          onClick={createChat}
          sx={{ mt: -1 }}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Stack>

      {/* List of chats */}
      <List>
        {(chats?.content as ChatDto[] | undefined)?.map((chat) => (
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
