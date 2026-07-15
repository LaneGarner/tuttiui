import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { View, Animated } from "react-native";
import { Toast, type ToastProps } from "./Toast";

type ToastVariant = NonNullable<ToastProps["variant"]>;

interface ToastEntry {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastOptions {
  title?: ReactNode;
  description?: ReactNode;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
  toasts: ToastEntry[];
}

const ToastContext = createContext<ToastContextValue | null>(null);

let toastCounter = 0;

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a <ToastProvider>");
  }
  return context;
}

export interface ToastProviderProps {
  children: ReactNode;
}

function AnimatedToast({
  entry,
  onDismiss,
}: {
  entry: ToastEntry;
  onDismiss: () => void;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY]);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      <Toast
        title={entry.title}
        description={entry.description}
        variant={entry.variant}
        onDismiss={onDismiss}
      />
    </Animated.View>
  );
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map()
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const toast = useCallback(
    (options: ToastOptions): string => {
      const id = `toast-${++toastCounter}`;
      const duration = options.duration ?? 5000;

      const entry: ToastEntry = {
        id,
        title: options.title,
        description: options.description,
        variant: options.variant,
        duration,
      };

      setToasts((prev) => [...prev, entry]);

      if (duration > 0) {
        const timer = setTimeout(() => {
          dismiss(id);
        }, duration);
        timersRef.current.set(id, timer);
      }

      return id;
    },
    [dismiss]
  );

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
    };
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss, toasts }}>
      <View className="flex-1">
        {children}
      </View>
      {toasts.length > 0 && (
        <View
          className="absolute bottom-4 right-4 left-4 z-50 flex flex-col gap-2"
          pointerEvents="box-none"
          testID="toast-viewport"
        >
          {toasts.map((t) => (
            <AnimatedToast
              key={t.id}
              entry={t}
              onDismiss={() => dismiss(t.id)}
            />
          ))}
        </View>
      )}
    </ToastContext.Provider>
  );
};

ToastProvider.displayName = "ToastProvider";
