import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ChatSidebar from "../../components/ChatSidebar";
import ChatWindow from "../../components/ChatWindow";

const MainPage = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Fetch chats here
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "25%",
          bgcolor: "#f5f5f5",
        }}
      >
        <ChatSidebar selectedChatId={selectedChatId} onSelectChat={setSelectedChatId} />
      </Box>
      <Box
        sx={{
          width: "75%",
        }}
      >
        {selectedChatId && <ChatWindow chatId={selectedChatId} />}
      </Box>
    </Box>
  );
};

export default MainPage;