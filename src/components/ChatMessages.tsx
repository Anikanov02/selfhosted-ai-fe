import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { ChatBaseDtoModelEnum, MessageDto } from "../api";

interface ChatMessagesProps {
  messages: MessageDto[];
  isAiTyping: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isAiTyping,
}) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiTyping]); // Scroll on new message or typing indicator

  return (
    <Box sx={{ px: 2, pt: 2, height: "100%", overflowY: "auto" }}>
      <Box mt={2} display="flex" flexDirection="column" gap={1}>
        {messages.map((msg) => (
          <Box
            key={msg.id}
            display="flex"
            justifyContent={msg.userMessage ? "flex-end" : "flex-start"}
          >
            <Box
              sx={{
                bgcolor: msg.userMessage ? "#DCF8C6" : "#E0E0E0",
                px: 2,
                py: 1,
                borderRadius: 2,
                maxWidth: "70%",
                whiteSpace: "pre-wrap",
              }}
            >
              {msg.text}
            </Box>
          </Box>
        ))}

        {isAiTyping && (
          <Box display="flex" justifyContent="flex-start">
            <Box
              sx={{
                bgcolor: "#E0E0E0",
                px: 2,
                py: 1,
                borderRadius: 2,
                maxWidth: "70%",
                display: "inline-flex",
                gap: "4px",
              }}
            >
              {[0, 0.2, 0.4].map((delay, idx) => (
                <Box
                  key={idx}
                  sx={{
                    width: 8,
                    height: 8,
                    bgcolor: "#888",
                    borderRadius: "50%",
                    animation: "bounce 1s infinite ease-in-out",
                    animationDelay: `${delay}s`,
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* 🔽 Auto-scroll anchor */}
        <div ref={bottomRef} />
      </Box>

      {/* Keyframes */}
      <style>
        {`
          @keyframes bounce {
            0%, 80%, 100% { transform: scale(0.8); opacity: 0.3; }
            40% { transform: scale(1.2); opacity: 1; }
          }
        `}
      </style>
    </Box>
  );
};

export default ChatMessages;
