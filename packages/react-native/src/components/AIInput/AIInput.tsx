import {
  forwardRef,
  useState,
  useCallback,
  useRef,
} from "react";
import {
  View,
  TextInput,
  Pressable,
  Text,
  type ViewProps,
  type TextInputProps,
  type NativeSyntheticEvent,
  type TextInputContentSizeChangeEventData,
} from "react-native";
import { cn, useTheme } from "@tuttiui/shared";
import { AnimatedSpinner } from "../../primitives";

export interface AIInputProps extends Omit<ViewProps, "children"> {
  onSubmit?: (value: string) => void;
  loading?: boolean;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
  maxHeight?: number;
  minHeight?: number;
  textInputProps?: Omit<TextInputProps, "value" | "onChangeText" | "placeholder" | "editable" | "multiline">;
}

export const AIInput = forwardRef<TextInput, AIInputProps>(
  (
    {
      onSubmit,
      placeholder = "Ask anything...",
      disabled,
      loading,
      value: controlledValue,
      onChangeText,
      maxHeight = 150,
      minHeight = 44,
      className,
      textInputProps,
      ...props
    },
    ref
  ) => {
    // Values that can't be a className read the resolved theme instead of a
    // hardcoded hex. ThemeContext defaults to lightColors, so a tree without a
    // ThemeProvider degrades to light rather than crashing.
    const { colors } = useTheme();
    const [internalValue, setInternalValue] = useState("");
    const [inputHeight, setInputHeight] = useState(minHeight);
    const internalRef = useRef<TextInput | null>(null);

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? String(controlledValue) : internalValue;

    const setRef = useCallback(
      (node: TextInput | null) => {
        internalRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<TextInput | null>).current = node;
        }
      },
      [ref]
    );

    const handleChangeText = useCallback(
      (text: string) => {
        if (!isControlled) {
          setInternalValue(text);
        }
        onChangeText?.(text);
      },
      [isControlled, onChangeText]
    );

    const handleSubmit = useCallback(() => {
      const trimmed = value.trim();
      if (!trimmed || loading) return;
      onSubmit?.(trimmed);
      if (!isControlled) {
        setInternalValue("");
        setInputHeight(minHeight);
      }
    }, [value, loading, onSubmit, isControlled, minHeight]);

    const handleContentSizeChange = useCallback(
      (e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
        const contentHeight = e.nativeEvent.contentSize.height;
        setInputHeight(Math.min(Math.max(contentHeight, minHeight), maxHeight));
      },
      [minHeight, maxHeight]
    );

    const isEmpty = value.trim().length === 0;
    const isDisabled = disabled || loading;

    return (
      <View
        className={cn(
          "flex-row items-end rounded-lg border border-tt-border-strong bg-tt-field",
          className
        )}
        {...props}
      >
        <TextInput
          ref={setRef}
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.fgFaint}
          editable={!isDisabled}
          multiline
          onContentSizeChange={handleContentSizeChange}
          onSubmitEditing={handleSubmit}
          blurOnSubmit={false}
          style={{ height: inputHeight }}
          className="flex-1 px-4 py-3 text-sm text-tt-fg"
          accessibilityLabel={placeholder}
          {...textInputProps}
        />
        <Pressable
          onPress={handleSubmit}
          disabled={isEmpty || isDisabled}
          className={cn(
            "shrink-0 p-2 m-1 rounded-md bg-tt-primary",
            (isEmpty || isDisabled) && "opacity-50"
          )}
          accessibilityRole="button"
          accessibilityLabel={loading ? "Loading" : "Send"}
          accessibilityState={{ disabled: isEmpty || isDisabled }}
        >
          {loading ? (
            <AnimatedSpinner size="sm" color={colors.primaryFg} />
          ) : (
            <Text className="text-tt-primary-fg text-sm font-bold" testID="ai-input-send-icon">
              {"\u2191"}
            </Text>
          )}
        </Pressable>
      </View>
    );
  }
);

AIInput.displayName = "AIInput";
