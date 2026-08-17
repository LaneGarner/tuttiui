import { forwardRef, useEffect, useRef } from "react";
import { ScrollView, View, Text, type ViewProps } from "react-native";
import { cn } from "@tutti-ui/shared";
import { AnimatedPulse } from "../../primitives";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: Date;
}

export interface AIChatProps extends ViewProps {
  messages: ChatMessage[];
  isLoading?: boolean;
}

const ChatBubble = ({ message }: { message: ChatMessage }) => {
  if (message.role === "system") {
    return (
      <View className="items-center">
        <View>
          <Text className="text-xs text-tt-fg-faint italic">
            {message.content}
          </Text>
          {message.timestamp && (
            <Text className="text-xs opacity-60 mt-1">
              {message.timestamp.toLocaleTimeString()}
            </Text>
          )}
        </View>
      </View>
    );
  }

  const isUser = message.role === "user";

  return (
    <View className={isUser ? "items-end" : "items-start"}>
      <View
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5",
          isUser
            ? "rounded-br-sm bg-tt-primary"
            : "rounded-bl-sm bg-tt-surface-2"
        )}
      >
        <Text
          className={cn(
            isUser ? "text-tt-primary-fg" : "text-tt-fg"
          )}
        >
          {message.content}
        </Text>
        {message.timestamp && (
          <Text
            className={cn(
              "text-xs opacity-60 mt-1",
              isUser ? "text-tt-primary-fg" : "text-tt-fg"
            )}
          >
            {message.timestamp.toLocaleTimeString()}
          </Text>
        )}
      </View>
    </View>
  );
};

const LoadingDot = ({ delay }: { delay: number }) => (
  <AnimatedPulse duration={1500}>
    <View
      className="h-2 w-2 rounded-full bg-tt-fg-faint"
      testID="loading-dot"
    />
  </AnimatedPulse>
);

const LoadingIndicator = () => (
  <View className="items-start">
    <View className="max-w-[80%] rounded-2xl rounded-bl-sm px-4 py-2.5 bg-tt-surface-2">
      <View className="flex-row gap-1.5 px-4 py-2.5">
        <LoadingDot delay={0} />
        <LoadingDot delay={150} />
        <LoadingDot delay={300} />
      </View>
    </View>
  </View>
);

export const AIChat = forwardRef<ScrollView, AIChatProps>(
  ({ messages, isLoading = false, className, ...props }, ref) => {
    const scrollRef = useRef<ScrollView>(null);

    useEffect(() => {
      const timer = setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollToEnd({ animated: true });
        }
      }, 100);
      return () => clearTimeout(timer);
    }, [messages]);

    const setRef = (node: ScrollView | null) => {
      (scrollRef as React.MutableRefObject<ScrollView | null>).current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<ScrollView | null>).current = node;
      }
    };

    return (
      <ScrollView
        ref={setRef}
        className={cn("flex-1", className)}
        accessibilityRole="text"
        accessibilityLiveRegion="polite"
        testID={props.testID}
        {...props}
      >
        <View className="flex-col gap-4">
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
          {isLoading && <LoadingIndicator />}
        </View>
      </ScrollView>
    );
  }
);

AIChat.displayName = "AIChat";
