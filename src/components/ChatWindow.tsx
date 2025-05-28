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
  const [isAiTyping, setIsAiTyping] = useState(false);

  const fetchMessages = async () => {
    const response = (await messageApi.getMessages({ page, size: 100, chatId })).content;
    if (response) {
      setMessages(response as MessageDto[]);
    }
  }

  const getChat = async () => {
    if (chatId) {
      setSelectedChat(await chatApi.getChat({ id: chatId }));
    }
  }

  const handleSend = async (prompt: string) => {
    if (!chatId || !prompt.trim()) return;

    setMessages([...messages, { text: prompt, userMessage: true }])
    setIsAiTyping(true);
    await messageApi.createMessage({ chatId, messageBaseDto: { text: prompt } });
    fetchMessages();
    setIsAiTyping(false);
  };

  const handleModelChange = async (model: ChatBaseDtoModelEnum) => {
    const { id, ...chatWithoutId } = selectedChat as ChatDto;

    await chatApi.updateChat({
      id: chatId,
      chatBaseDto: {
        ...chatWithoutId,
        model,
      },
    });
    await getChat();
  }

  useEffect(() => {
    getChat();
    fetchMessages();
  }, [chatId]);

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Box flex={1} overflow="hidden">
        <ChatMessages messages={messages} isAiTyping={isAiTyping} />
      </Box>
      <MessageInput handleSend={handleSend} handleModelChange={handleModelChange} selectedChat={selectedChat} />
    </Box>
  );
};

export default ChatWindow;