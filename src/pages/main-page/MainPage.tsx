import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ChatSidebar from "../../components/ChatSidebar";
import ChatWindow from "../../components/ChatWindow";
import { useAuth } from "../../context/AuthContext";
import { ChatControllerApi, Configuration, MessageControllerApi, UserControllerApi } from "../../api";

const MainPage = () => {
  const { username, password, userId } = useAuth();
  const [selectedChatId, setSelectedChatId] = useState<string | undefined>();
  const [chatApi, setChatApi] = useState<ChatControllerApi | null>();
  const [messageApi, setMessageApi] = useState<MessageControllerApi | null>();
  const [userApi, setUserApi] = useState<UserControllerApi | null>();

  useEffect(() => {
    if (username && password) {
      const config = new Configuration({ username, password });
      const chatControllerApi = new ChatControllerApi(config);
      setChatApi(chatControllerApi);
      setUserApi(new UserControllerApi(config));
      setMessageApi(new MessageControllerApi(config));
    }
  }, [username, password]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
      }}
    >

      {chatApi &&
        <Box
          sx={{
            width: "25%",
            bgcolor: "#f5f5f5",
          }}
        >
          <ChatSidebar selectedChatId={selectedChatId} onSelectChat={setSelectedChatId} chatApi={chatApi} />
        </Box>
      }

      {chatApi && messageApi &&
        <Box
          sx={{
            width: "75%",
          }}
        >
          {selectedChatId && <ChatWindow chatId={selectedChatId} messageApi={messageApi} chatApi={chatApi} />}
        </Box>
      }

    </Box>
  );
};

export default MainPage;