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
import DeleteIcon from "@mui/icons-material/Delete";
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

  const deleteChat = async (id: string) => {
    await chatApi.deleteChat({ id });

    getChats();
  }

  useEffect(() => {
    getChats();
  }, []);

  return (
    <Box p={2}>
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

      <List>
        {(chats?.content as ChatDto[] | undefined)?.map((chat) => (
          <Box
            key={chat.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              "&:hover .delete-button": {
                opacity: 1,
              },
            }}
          >
            <ListItemButton
              selected={selectedChatId === chat.id}
              onClick={() => onSelectChat(chat.id)}
              sx={{ flex: 1 }}
            >
              {chat.title}
            </ListItemButton>
            <IconButton
              className="delete-button"
              size="small"
              onClick={() => deleteChat(chat.id!)}
              sx={{
                ml: 1,
                opacity: 0,
                transition: "opacity 0.2s ease-in-out",
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default ChatSidebar;
