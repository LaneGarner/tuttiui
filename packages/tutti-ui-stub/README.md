# tutti-ui

This package exists to point you at the real library: **[@tutti-ui/react](https://www.npmjs.com/package/@tutti-ui/react)**

## Install the real thing

React (web):

```bash
npm install @tutti-ui/react @tutti-ui/tokens @tutti-ui/shared
```

React Native:

```bash
npm install @tutti-ui/react-native @tutti-ui/tokens @tutti-ui/shared nativewind
```

## Links

- Repository: https://github.com/lanegarner/tutti-ui
- Live Storybook: https://lanegarner.github.io/tutti-ui/

---

### Maintainer notes (not published behavior — publish-time steps)

This stub claims the bare `tutti-ui` name on npm so typo installs get redirected.
It is excluded from the changesets release flow (`.changeset/config.json` `ignore`)
and has no build/test scripts, so turbo skips it.

To publish the stub (one time, done manually — not part of `changeset publish`):

```bash
cd packages/tutti-ui-stub
npm publish
npm deprecate tutti-ui "Use @tutti-ui/react"
```
