import React, { useState, useRef, useEffect } from "react";
import { Send, RotateCcw, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MOCK_RESPONSES } from "@/utils/constants";

interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

interface ChatSimulationProps {
  assistantName: string;
  onSendMessage?: (message: string) => Promise<string>;
}

export const ChatSimulation: React.FC<ChatSimulationProps> = ({
  assistantName,
  onSendMessage,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getRandomResponse = () => {
    const randomIndex = Math.floor(Math.random() * MOCK_RESPONSES.length);
    return MOCK_RESPONSES[randomIndex];
  };

  const simulateResponse = async (userMessage: string): Promise<string> => {
    // Simular delay de 1-2 segundos
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 1000)
    );

    if (onSendMessage) {
      return await onSendMessage(userMessage);
    }

    return getRandomResponse();
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    const userMessageObj: ChatMessage = {
      id: Date.now().toString(),
      content: userMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessageObj]);
    setInputValue("");
    setIsLoading(true);

    try {
      const assistantResponse = await simulateResponse(userMessage);

      const assistantMessageObj: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: assistantResponse,
        sender: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessageObj]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Chat Simulado</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          disabled={messages.length === 0}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reiniciar
        </Button>
      </div>

      {/* Chat Container */}
      <div className="border border-gray-200 rounded-lg h-96 overflow-y-auto p-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <Bot className="h-12 w-12 mb-4 text-gray-400" />
            <p className="text-center">
              Comienza una conversación con {assistantName}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Las respuestas son simuladas con un delay de 1-2 segundos
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-primary-600 text-white"
                      : "bg-white border border-gray-200 text-gray-900"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.sender === "assistant" ? (
                      <Bot className="h-4 w-4" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                    <span className="text-xs font-medium">
                      {message.sender === "assistant" ? assistantName : "Tú"}
                    </span>
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 animate-pulse" />
                    <div className="flex gap-1">
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" />
                      <div
                        className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe tu mensaje aquí..."
          disabled={isLoading}
          className="flex-1"
        />
        <Button
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || isLoading}
          loading={isLoading}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
