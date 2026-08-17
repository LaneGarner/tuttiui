/**
 * Semantic colors.
 *
 * Every key here becomes a CSS custom property (`--tt-<kebab-case-key>`) and a
 * Tailwind color name (`tt-<kebab-case-key>`) via the preset in
 * `@tutti-ui/react/tailwind`. Components reference the semantic name only —
 * `bg-tt-surface`, never `bg-white` — so a consumer can retheme the whole
 * system by redeclaring the variables, and dark mode needs no `dark:` variants
 * anywhere in component source.
 *
 * The light values are exactly the literals the components rendered before the
 * semantic layer existed, so adopting it is not a visual change in light mode.
 */
export interface SemanticColors {
  // ---------------------------------------------------------------- surfaces
  /** Page background, behind everything else. */
  canvas: string;
  /** Default raised surface: cards, dialogs, toasts, popovers. */
  surface: string;
  /** One step in from `surface`: secondary buttons, avatar fallbacks, chips. */
  surface2: string;
  /** Two steps in: progress tracks, skeletons, inactive indicators. */
  surface3: string;
  /** Hover feedback on an otherwise transparent or `surface` element. */
  surfaceHover: string;
  /** Pressed/selected state: active nav items, selected rows. */
  surfaceActive: string;
  /**
   * Form control background. Deliberately distinct from `surface` — consumers
   * routinely want inputs a shade apart from the card they sit on, and in dark
   * themes they almost always do.
   */
  field: string;
  /** Modal scrim. Carries its own alpha; not a solid color. */
  overlay: string;
  /** Inverted surface: tooltips, and anything that must oppose the page. */
  inverse: string;
  /** Foreground on `inverse`. */
  inverseFg: string;

  // -------------------------------------------------------------- foreground
  /** Primary text. */
  fg: string;
  /** Headings and emphasized body text. */
  fgStrong: string;
  /** Body text and labels. The workhorse. */
  fgMuted: string;
  /** Secondary text: descriptions, captions, metadata. */
  fgSubtle: string;
  /** Tertiary text: placeholders, disabled labels, decorative icons. */
  fgFaint: string;

  // --------------------------------------------------------------- structure
  /** Default separator: card edges, dividers, table rules, tab underlines. */
  border: string;
  /** Higher-contrast edge, for form controls that must read as interactive. */
  borderStrong: string;
  /**
   * Focus ring. One color for the entire system — a focus ring is an
   * accessibility affordance, not a per-variant decoration.
   */
  focus: string;

  // ----------------------------------------------------------------- primary
  /** Primary action fill. */
  primary: string;
  /** Primary action fill, hovered. */
  primaryHover: string;
  /** Foreground on `primary`. */
  primaryFg: string;
  /** Tinted primary background, for informational surfaces. */
  primarySubtle: string;
  /** Foreground on `primarySubtle`. */
  primaryOnSubtle: string;

  // ------------------------------------------------------------------ status
  // Each family carries five roles because the library renders status two
  // different ways: Alert/Toast use the tinted treatment (`subtle` +
  // `onSubtle` + `border`), while Progress/ConfidenceIndicator/AgentWorkflow
  // use the solid one (`<family>` + `<family>Fg`). In a dark theme neither is
  // derivable from the other.
  success: string;
  successFg: string;
  successSubtle: string;
  successOnSubtle: string;
  successBorder: string;

  warning: string;
  warningFg: string;
  warningSubtle: string;
  warningOnSubtle: string;
  warningBorder: string;

  danger: string;
  dangerFg: string;
  dangerSubtle: string;
  dangerOnSubtle: string;
  dangerBorder: string;

  info: string;
  infoFg: string;
  infoSubtle: string;
  infoOnSubtle: string;
  infoBorder: string;

  // ------------------------------------------------------------- action tier
  // Status *indication* and destructive/confirming *action* are different jobs,
  // and the library already used different shades for them (red-500 for a
  // failed workflow step, red-600 for a destructive button). Separate tokens
  // preserve that distinction instead of flattening it.
  /** Destructive action fill (Button `danger`). */
  dangerStrong: string;
  /** Destructive action fill, hovered. */
  dangerStrongHover: string;
  /** Confirming action fill (OptimisticAction `confirmed`). */
  successStrong: string;

  /** Streaming/in-flight indicator, distinct from `info`'s steady running state. */
  stream: string;
  /** Foreground on `stream`. */
  streamFg: string;

  // ------------------------------------------------------------------ legacy
  // The original 0.2.0 token names, retained as aliases so anything reading
  // `useTheme().colors` keeps working. Prefer the semantic names above.
  /** @deprecated Use `canvas`. */
  background: string;
  /** @deprecated Use `surface2`. */
  surfaceSecondary: string;
  /** @deprecated Use `fg`. */
  text: string;
  /** @deprecated Use `fgSubtle`. */
  textSecondary: string;
  /** @deprecated Use `fgFaint`. */
  textTertiary: string;
  /** @deprecated Use `primaryHover`. */
  primaryDark: string;
  /** @deprecated Use `danger`. */
  error: string;
}

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface ColorPalette {
  gray: ColorScale;
  blue: ColorScale;
  green: ColorScale;
  amber: ColorScale;
  red: ColorScale;
  cyan: ColorScale;
}
