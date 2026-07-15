# @tutti-ui/react-native

React Native components for the tutti-ui design system — 27 component families
sharing design tokens, prop APIs, and CVA variants with `@tutti-ui/react`,
styled with NativeWind.

## Install

```bash
npm install @tutti-ui/react-native @tutti-ui/tokens @tutti-ui/shared nativewind
npm install react-native-reanimated react-native-svg   # used by Skeleton, Spinner, icons
```

## NativeWind Setup

Include the package's dist in your `tailwind.config.js` content so NativeWind
compiles its classNames:

```js
module.exports = {
  content: [
    './App.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@tutti-ui/react-native/dist/**/*.{js,mjs}',
  ],
  presets: [require('nativewind/preset')],
};
```

## Usage

```tsx
import { Button, Input, Label, Card, CardContent } from '@tutti-ui/react-native';
import { ThemeProvider, useTheme } from '@tutti-ui/shared/native';

function App() {
  return (
    <ThemeProvider>
      <Card>
        <CardContent>
          <Label required>Email</Label>
          <Input placeholder="you@example.com" keyboardType="email-address" />
          <Button variant="primary" onPress={handleSubmit}>Submit</Button>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
```

Components ship with accessibility props (`accessibilityRole`,
`accessibilityLabel`, `accessibilityState`) out of the box.

## Components

### Form Inputs & Controls
Button, Input, Textarea, Select, Checkbox, Radio, Switch, Label, Form

### Display & Feedback
Card, Avatar, Tooltip (long-press), Alert, Dialog (RN Modal), Toast, Skeleton, Progress, Spinner

### Layout
Stack/VStack/HStack, Divider, Tabs

### AI-Native
StreamingText, AIChat, AIInput, OptimisticAction, AgentWorkflow, ConfidenceIndicator

See [PARITY.md](https://github.com/lanegarner/tutti-ui/blob/main/PARITY.md) for
web/native parity notes, including which web components are intentionally not
ported (CommandPalette, Breadcrumbs, Sidebar) and what replaces them on mobile.

## Links

- [GitHub](https://github.com/lanegarner/tutti-ui)
- [Documentation](https://github.com/lanegarner/tutti-ui#readme)

## License

MIT
