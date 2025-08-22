import React, { useEffect, useState, useRef } from "react";
import { Send, Bot, User, Languages, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { marked } from "marked";
import { GoogleGenerativeAI } from "@google/generative-ai";
interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
}
interface AssistantProps {
  initialQuestion?: string;
  onExit?: () => void;
}

const FarmerAssistantScreen: React.FC<AssistantProps> = ({
  initialQuestion,
  onExit,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI farming assistant powered by Gemini. I can help you with crop management, pest control, weather advice, and general farming questions. How can I assist you today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUserSentMessage, setHasUserSentMessage] = useState(false);
  const [language, setLanguage] = useState("english");
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Configure marked for better formatting
  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  // Auto-scroll to bottom when messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const formatMessageText = (text: string) => {
    const html = marked(text);
    return { __html: html };
  };
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Rate limiting: prevent requests more frequent than every 3 seconds
    const now = Date.now();
    if (now - lastRequestTime < 3000) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "Please wait a moment before sending another message to avoid rate limits.",
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      return;
    }

    // Check if API key is available
    if (!apiKey) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "API key not found. Please check your environment configuration.",
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      return;
    }

    // Update last request time
    setLastRequestTime(now);

    // Mark that user has sent a message
    setHasUserSentMessage(true);

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage.trim(),
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Create farming-focused prompt
      const farmingPrompt = `You are a helpful farming assistant for Indian farmers. Provide practical, actionable advice on farming topics. Keep responses concise and well-structured. ${language === "malayalam" ? "Please respond in Malayalam language." : "Please respond in English language."} User question: ${userMessage.text}`;

      // Try using the Google Generative AI SDK first
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const result = await model.generateContent(farmingPrompt);
        const response = await result.response;
        const assistantResponse = response.text();

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: assistantResponse,
          sender: "assistant",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } catch (sdkError) {
        console.log("SDK failed, trying direct API call...");

        // Fallback to direct API call
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: farmingPrompt,
                    },
                  ],
                },
              ],
            }),
          }
        );

        if (!response.ok) {
          throw new Error(
            `API call failed: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        const assistantResponse =
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Sorry, I could not generate a response.";

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: assistantResponse,
          sender: "assistant",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error("Gemini API Error:", error);
      let errorText = "Sorry, I encountered an error. Please try again.";

      if (error instanceof Error) {
        if (
          error.message.includes("API_KEY_INVALID") ||
          error.message.includes("API key")
        ) {
          errorText =
            "Invalid API key. Please check your Gemini API key configuration.";
        } else if (
          error.message.includes("QUOTA_EXCEEDED") ||
          error.message.includes("quota") ||
          error.message.includes("429")
        ) {
          errorText =
            "API quota exceeded. Please wait a moment and try again, or try asking a shorter question.";
        } else if (
          error.message.includes("RATE_LIMIT_EXCEEDED") ||
          error.message.includes("rate limit")
        ) {
          errorText =
            "Rate limit exceeded. Please wait a minute before sending another message.";
        } else if (
          error.message.includes("404") ||
          error.message.includes("not found") ||
          error.message.includes("model")
        ) {
          errorText =
            "Model not available. The AI service might be temporarily unavailable or the model version has changed.";
        } else if (
          error.message.includes("fetch") ||
          error.message.includes("network")
        ) {
          errorText =
            "Network error. Please check your internet connection and try again.";
        }
      }

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: errorText,
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-ask if initial question provided (from voice routing)
  useEffect(() => {
    if (initialQuestion) {
      setInputMessage(initialQuestion);
      // Slight delay to ensure UI updates
      const t = setTimeout(() => {
        void handleSendMessage();
      }, 50);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuestion]);
  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-border bg-background">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onExit && (
              <Button variant="ghost" size="sm" onClick={onExit}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <h1 className="text-lg font-semibold text-foreground whitespace-nowrap">
              Farming Assistant
            </h1>
          </div>
          <div className="ml-4">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="malayalam">Malayalam</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden"
      >
        <div className="p-4 space-y-4 pb-32">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.sender === "assistant" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}

              <div
                className={`max-w-[70%] p-3 rounded-lg ${message.sender === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted text-muted-foreground"}`}
              >
                {message.sender === "assistant" ? (
                  <div
                    className="text-sm prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground"
                    dangerouslySetInnerHTML={formatMessageText(message.text)}
                  />
                ) : (
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                )}
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {message.sender === "user" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="bg-muted text-muted-foreground max-w-[70%] p-3 rounded-lg">
                <p className="text-sm">Thinking...</p>
                <div className="flex items-center space-x-1 mt-2">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:0.1s]"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:0.2s]"></div>
                </div>
              </div>
            </div>
          )}

          {/* Invisible element to scroll to */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Assistant Robot Image - shown when no messages sent */}
      {!hasUserSentMessage && (
        <div className="fixed inset-0 flex items-center justify-center mt-16 pointer-events-none">
          <img
            src="/lovable-uploads/87bc0776-6ff4-4209-a8b5-8b0c47dc938a.png"
            alt="Farming Assistant Robot"
            className="w-80 h-80 object-contain"
          />
        </div>
      )}

      {/* Fixed Input Bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-background p-4 border-t border-border backdrop-blur-sm z-10">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask me anything about farming..."
            onKeyPress={(e) =>
              e.key === "Enter" && !e.shiftKey && handleSendMessage()
            }
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default FarmerAssistantScreen;
