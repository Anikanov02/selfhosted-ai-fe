import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ChatMessages from "./ChatMessages";
import MessageInput from "./MessageInput";
import { ChatBaseDtoModelEnum, ChatControllerApi, ChatDto, MessageControllerApi, MessageDto } from "../api";

type Props = {
  chatId: string;
  messageApi: MessageControllerApi,
  chatApi: ChatControllerApi
};

//TODO handle pages
const ChatWindow = ({ chatId, messageApi, chatApi }: Props) => {
  const [selectedChat, setSelectedChat] = useState<ChatDto | null>(null);
  const [messages, setMessages] = useState<MessageDto[]>([]);
  const [page, setPage] = useState<number>(0);

  const fetchMessages = async () => {
    const response = (await messageApi.getMessages({page, size: 100, chatId})).content;
    if (response) {
      setMessages(response as MessageDto[]);
    }
  }

  const handleSend = async (prompt: string) => {
    if (!chatId || !prompt.trim()) return;

    setMessages([...messages, { text: prompt, userMessage: true }])
    await messageApi.createMessage({ chatId, messageBaseDto: { text: prompt } });
    fetchMessages();
  };

  const handleModelChange = (model: ChatBaseDtoModelEnum) => {
    const { id, ...chatWithoutId } = selectedChat as ChatDto;

    chatApi.updateChat({
      id: chatId,
      chatBaseDto: {
        ...chatWithoutId,
        model,
      },
    });
  }

  useEffect(() => {
    const getChat = async () => {
      if (chatId) {
        setSelectedChat(await chatApi.getChat({ id: chatId }));
      }
    }

    getChat();
    fetchMessages();
  }, [chatId]);

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Box flex={1} overflow="auto">
        <ChatMessages messages={messages} handleModelChange={handleModelChange} initialModel={selectedChat?.model} />
      </Box>
      <MessageInput handleSend={handleSend} />
    </Box>
  );
};

export default ChatWindow;