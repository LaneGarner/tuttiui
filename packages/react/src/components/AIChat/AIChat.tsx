import { forwardRef, useEffect, useRef, type HTMLAttributes } from "react";
import { cn } from "@tuttiui/shared";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: Date;
}

export interface AIChatProps extends HTMLAttributes<HTMLDivElement> {
  messages: ChatMessage[];
  isLoading?: boolean;
}

const ChatBubble = ({ message }: { message: ChatMessage }) => {
  if (message.role === "system") {
    return (
      <div className="flex justify-center">
        <div className="text-xs text-tt-fg-faint italic">
          <p className="whitespace-pre-wrap">{message.content}</p>
          {message.timestamp && (
            <time className="text-xs opacity-60 mt-1 block">
              {message.timestamp.toLocaleTimeString()}
            </time>
          )}
        </div>
      </div>
    );
  }

  const isUser = message.role === "user";

  return (
    <div className={isUser ? "flex justify-end" : "flex justify-start"}>
      <div
        className={
          isUser
            ? "max-w-[80%] rounded-2xl rounded-br-sm px-4 py-2.5 bg-tt-primary text-tt-primary-fg"
            : "max-w-[80%] rounded-2xl rounded-bl-sm px-4 py-2.5 bg-tt-surface-2 text-tt-fg"
        }
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        {message.timestamp && (
          <time className="text-xs opacity-60 mt-1 block">
            {message.timestamp.toLocaleTimeString()}
          </time>
        )}
      </div>
    </div>
  );
};

const LoadingIndicator = () => (
  <div className="flex justify-start">
    <div className="max-w-[80%] rounded-2xl rounded-bl-sm px-4 py-2.5 bg-tt-surface-2 text-tt-fg">
      <div className="flex gap-1.5 px-4 py-2.5">
        <span
          className="h-2 w-2 rounded-full bg-tt-fg-faint animate-pulse"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="h-2 w-2 rounded-full bg-tt-fg-faint animate-pulse"
          style={{ animationDelay: "150ms" }}
        />
        <span
          className="h-2 w-2 rounded-full bg-tt-fg-faint animate-pulse"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  </div>
);

export const AIChat = forwardRef<HTMLDivElement, AIChatProps>(
  ({ messages, isLoading = false, className, ...props }, ref) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof bottomRef.current?.scrollIntoView === "function") {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [messages]);

    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-4 overflow-y-auto", className)}
        {...props}
      >
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        {isLoading && <LoadingIndicator />}
        <div ref={bottomRef} />
      </div>
    );
  }
);

AIChat.displayName = "AIChat";
