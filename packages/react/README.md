<p align="center">
  <img src="https://raw.githubusercontent.com/LaneGarner/tuttiui/main/assets/tuttiui-lockup.svg" alt="tuttiui" width="280" />
</p>

# @tuttiui/react

A React component library with 32 component families and 60+ exports, built for web with Tailwind CSS.

## Install

```bash
npm install @tuttiui/react
```

For a single package that also exposes the design tokens, install `tuttiui` instead.

## Tailwind Setup

Add the tuttiui preset to your `tailwind.config.js`:

```js
const tuttiPreset = require('@tuttiui/react/tailwind');

module.exports = {
  presets: [tuttiPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@tuttiui/react/dist/**/*.{js,mjs}',
  ],
};
```

## Usage

```tsx
import { Button, Input, Card } from '@tuttiui/react';

function App() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Sign In</Card.Title>
      </Card.Header>
      <Card.Content>
        <Input placeholder="Email" />
        <Button variant="primary">Submit</Button>
      </Card.Content>
    </Card>
  );
}
```

## Components

### Form Inputs & Controls
Button, Input, Textarea, Select, Checkbox, Radio, Switch, Label, Form

### Display & Feedback
Card, Avatar, Tooltip, Alert, Dialog, Toast, Skeleton, Progress, Spinner

### Layout & Navigation
Stack/VStack/HStack, Divider, Tabs, Breadcrumbs, NavMenu, Sidebar, CommandPalette

### AI-Native
StreamingText, AIChat, AIInput, OptimisticAction, AgentWorkflow, ConfidenceIndicator, StreamingTable

## Links

- [GitHub](https://github.com/lanegarner/tuttiui)
- [Documentation](https://github.com/lanegarner/tuttiui#readme)

## License

MIT
