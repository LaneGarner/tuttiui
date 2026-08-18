<p align="center">
  <img src="https://raw.githubusercontent.com/LaneGarner/tuttiui/main/assets/tuttiui-lockup.svg" alt="tuttiui" width="280" />
</p>

# @tuttiui/react-native

React Native components for the tuttiui design system — 27 component families
sharing design tokens, prop APIs, and CVA variants with `@tuttiui/react`,
styled with NativeWind.

## Install

```bash
npm install @tuttiui/react-native @tuttiui/tokens @tuttiui/shared nativewind
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
    './node_modules/@tuttiui/react-native/dist/**/*.{js,mjs}',
  ],
  presets: [require('nativewind/preset')],
};
```

## Usage

```tsx
import { Button, Input, Label, Card, CardContent } from '@tuttiui/react-native';
import { ThemeProvider, useTheme } from '@tuttiui/shared/native';

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

See [PARITY.md](https://github.com/lanegarner/tuttiui/blob/main/PARITY.md) for
web/native parity notes, including which web components are intentionally not
ported (CommandPalette, Breadcrumbs, Sidebar) and what replaces them on mobile.

## Links

- [GitHub](https://github.com/lanegarner/tuttiui)
- [Documentation](https://github.com/lanegarner/tuttiui#readme)

## License

MIT
