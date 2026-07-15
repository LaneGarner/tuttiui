# Web / React Native Parity

Status of each `@tutti-ui/react` component family in `@tutti-ui/react-native`.

**Summary: 27 of 32 component families ported.** The remaining 5 are web-idiom
components that either map to a different mobile pattern or are intentionally
web-only (see the last table).

Legend: ✅ done · 🔜 deferred · 🌐 web-only by design

## Form Inputs & Controls

| Component | Status | Notes |
|-----------|--------|-------|
| Button | ✅ | Same variants/sizes; `Pressable` + `accessibilityRole="button"`, loading spinner |
| Input | ✅ | `TextInput` wrapper; focus ring approximated with border color/width |
| Textarea | ✅ | Multiline `TextInput`, `textAlignVertical="top"`, error/disabled states |
| Select | ✅ | Mobile picker pattern: trigger + bottom-sheet `Modal` option list. API is `options`/`value`/`onValueChange` instead of native `<option>` children |
| Checkbox | ✅ | `Pressable` with `accessibilityRole="checkbox"` + check icon |
| RadioGroup / RadioItem | ✅ | Context-based, controlled/uncontrolled, `accessibilityRole="radio"` |
| Switch | ✅ | Track + thumb, `accessibilityRole="switch"` |
| Label | ✅ | Required asterisk, same API |
| FormField / FormError / FormHint | ✅ | Same context API; `FormError` uses `accessibilityRole="alert"` |

## Display & Feedback

| Component | Status | Notes |
|-----------|--------|-------|
| Card (+ Header/Title/…) | ✅ | Same compound API |
| Avatar (+ Image/Fallback) | ✅ | RN `Image` load/error tracking |
| Tooltip | ✅ | **Long-press** to show (no hover on touch); auto-hides after `duration` ms; `top`/`bottom` sides only |
| Alert | ✅ | Same variants, dismiss button |
| Dialog | ✅ | RN `Modal` (`transparent` + fade) instead of portal; hardware back closes via `onRequestClose` |
| Toast | ✅ | `ToastProvider` + `useToast`, auto-dismiss |
| Skeleton | ✅ | Pulse animation via react-native-reanimated |
| Progress | ✅ | `accessibilityRole="progressbar"` + `accessibilityValue` |
| Spinner | ✅ | react-native-svg spinner, `accessibilityRole` + label |

## Layout & Navigation

| Component | Status | Notes |
|-----------|--------|-------|
| Stack / VStack / HStack | ✅ | Same spacing/align/justify variants |
| Divider | ✅ | Horizontal/vertical `View` |
| Tabs | ✅ | Same compound API; touch-first (no roving tabindex — not applicable) |

## AI-Native

| Component | Status | Notes |
|-----------|--------|-------|
| StreamingText | ✅ | Token-by-token reveal, respects reduce-motion via `AccessibilityInfo` |
| AIChat | ✅ | `ScrollView` auto-scroll instead of DOM scroll |
| AIInput | ✅ | Multiline `TextInput`, submit via send button / `onSubmitEditing` |
| OptimisticAction | ✅ | Same state machine (idle/pending/confirmed/failed) |
| AgentWorkflow | ✅ | Same 6 states, progress bars, connector lines |
| ConfidenceIndicator | ✅ | `accessibilityValue` min/max/now instead of `role="meter"` |

## Web-idiom components

These lean on desktop/browser conventions (hover, keyboard shortcuts, wide
viewports, URL-based navigation). Forcing them onto mobile would produce
worse UX than the established native patterns, so they are mapped instead:

| Web component | RN equivalent / decision |
|---------------|--------------------------|
| CommandPalette | 🌐 Web-only by design. Cmd+K is a keyboard idiom; the mobile equivalent is a dedicated search screen (typically owned by the app's navigation layer, e.g. react-navigation), not a design-system overlay |
| Breadcrumbs | 🌐 Web-only by design. Mobile navigation communicates hierarchy through the navigation stack (header + back button), not breadcrumb trails |
| NavMenu | 🔜 Deferred. The mobile pattern is a bottom tab bar; a styled `TabBar` that plugs into react-navigation's `tabBar` prop is planned |
| Sidebar | 🌐 Web-only by design. The mobile equivalent is a navigation drawer, which react-navigation's drawer navigator already owns (gesture handling, focus, state). A tutti-ui theme for it may ship later, but a parallel drawer implementation would fight the ecosystem |
| StreamingTable | 🔜 Deferred. Wide data tables don't fit phone viewports; the planned equivalent is a `StreamingList` (FlatList with skeleton rows and pending/streaming/complete row states) sharing the web version's data model |

## Shared foundations

- **Tokens** — both packages consume `@tutti-ui/tokens` (colors, spacing,
  typography, radii; `nativeShadows` provides RN-style shadow objects since
  CSS box-shadow strings don't translate).
- **`cn()`** — the same clsx + tailwind-merge utility from `@tutti-ui/shared`
  works with NativeWind classNames.
- **ThemeProvider** — `@tutti-ui/shared/native` exports an RN `ThemeProvider`
  with the same API as the web one (`initialPreference`, `onPreferenceChange`,
  `useTheme`), using `useColorScheme()` instead of `matchMedia`.
- **Variants** — components use the same CVA variant definitions and prop APIs
  as their web counterparts wherever the platform allows.
